import express from 'express';
import { studentGetAllTests, studentGetTestById, studentGetTestResults, studentSubmitTest } from '../controllers/studentTestController.js';

const studentTestRoutes = express.Router();

studentTestRoutes.get('/all',studentGetAllTests);

studentTestRoutes.get('/:id', studentGetTestById);

studentTestRoutes.post('/:id/submit', studentSubmitTest);

studentTestRoutes.get('/:id/results', studentGetTestResults);



export default studentTestRoutes;