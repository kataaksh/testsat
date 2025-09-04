import express from 'express';
import {
  submitTest,
  getSubmissionHistory,
  getSubmissionReview,
  getTestSubmissions
} from '../controllers/submissionController.js';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Student routes (protected)
router.post('/submit', protect, submitTest);
router.get('/history', protect, getSubmissionHistory);
router.get('/review/:submissionId', protect, getSubmissionReview);

// Admin routes (protected + admin only)
router.get('/test/:testId', protect, isAdmin, getTestSubmissions);

export default router;
