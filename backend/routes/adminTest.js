import express from 'express';
import { getAdminTests, getAdminTestById, updateAdminTest } from '../controllers/adminTestController.js';

const router = express.Router();

router.get('/tests', getAdminTests); // Get all tests
router.get('/tests/:id', getAdminTestById); // Get test by ID
router.put('/tests/:id', updateAdminTest); // Update test by ID

export default router;