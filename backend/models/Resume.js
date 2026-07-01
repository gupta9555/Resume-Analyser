const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    fileName: { type: String, required: true },
    targetRole: { type: String, default: '' },
    resumeText: { type: String, required: true },
    analysis: {
      overallScore: { type: Number, default: 0 },
      atsScore: { type: Number, default: 0 },
      strengths: [{ type: String }],
      weaknesses: [{ type: String }],
      missingKeywords: [{ type: String }],
      suggestions: [{ type: String }],
      summary: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);
