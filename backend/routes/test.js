// addTest

import express from 'express';
import { addTest, deleteTest, getAllTests, getTestById, updateTest, getAllTestsWithStatus, checkTestAccess } from '../controllers/testController.js';
import { protect } from '../middlewares/authMiddleware.js';


const testRoutes = express.Router();

testRoutes.post('/add', addTest);
testRoutes.get('/all', getAllTests);
testRoutes.get('/with-status', protect, getAllTestsWithStatus);
testRoutes.get('/:id/access', protect, checkTestAccess);
testRoutes.get('/:id', getTestById);
testRoutes.put('/:id', updateTest);
testRoutes.delete('/:id', deleteTest);

export default testRoutes;