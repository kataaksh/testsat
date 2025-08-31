// addTest

import express from 'express';
import { addTest, deleteTest, getAllTests, getTestById, updateTest } from '../controllers/testController.js';


const testRoutes = express.Router();

testRoutes.post('/add', addTest);
testRoutes.get('/all', getAllTests);
testRoutes.get('/:id', getTestById);
testRoutes.put('/:id', updateTest);
testRoutes.delete('/:id', deleteTest);

export default testRoutes;