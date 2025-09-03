import express from 'express';
import {
  signup,
  login,
  googleAuthCallback,
  googleAuthRedirect
} from '../controllers/authController.js';

const router = express.Router();

// Email/password
router.post('/signup', signup);
router.post('/login', login);

// Google OAuth
router.get('/google', googleAuthRedirect); // Redirect to Google
router.get('/google/callback', googleAuthCallback); // Google callback

export default router;