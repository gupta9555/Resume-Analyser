const express = require('express');
const { protect } = require('../middleware/auth');
const { upload, analyze, getHistory, getOne } = require('../controllers/resumeController');

const router = express.Router();

router.use(protect);
router.post('/analyze', upload.single('resume'), analyze);
router.get('/history', getHistory);
router.get('/:id', getOne);

module.exports = router;
