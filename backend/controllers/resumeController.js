const multer = require('multer');
const Resume = require('../models/Resume');
const { extractTextFromPDF } = require('../utils/pdfParser');
const { analyzeResume: runGeminiAnalysis } = require('../services/geminiService');

// Memory storage keeps the request stateless and fast - no disk I/O bottleneck
// under concurrent load, which matters for multi-user throughput.
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') return cb(null, true);
    cb(new Error('Only PDF files are supported'));
  },
});

const analyze = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a resume in PDF format' });
    }

    const resumeText = await extractTextFromPDF(req.file.buffer);
    if (!resumeText || resumeText.length < 50) {
      return res.status(422).json({ message: 'Could not extract readable text from this PDF' });
    }

    const targetRole = req.body.targetRole || '';
    const analysis = await runGeminiAnalysis(resumeText, targetRole);

    const resume = await Resume.create({
      user: req.user.id,
      fileName: req.file.originalname,
      targetRole,
      resumeText,
      analysis,
    });

    res.status(201).json({ resume });
  } catch (err) {
    next(err);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user.id })
      .select('-resumeText')
      .sort({ createdAt: -1 });
    res.json({ resumes });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user.id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json({ resume });
  } catch (err) {
    next(err);
  }
};

module.exports = { upload, analyze, getHistory, getOne };
