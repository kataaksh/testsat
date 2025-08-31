import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { connectDB } from './config/db.js';
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
    res.status(200).send("Hello from Backend")
})

app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/admin', (req, res) => {
    res.status(200).send("Admin Route")
})


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})