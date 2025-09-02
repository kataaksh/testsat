import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import addTest from './routes/test.js';
import studentTestRoutes from './routes/studentTest.js';


dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
    res.status(200).send("Hello from Backend")
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/test', addTest); 
app.use('/api/v1/student/test', studentTestRoutes);

// app.use('/api/v1/admin', (req, res) => {
//     res.status(200).send("Admin Route")
// })


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})