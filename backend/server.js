import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import './config/passport.js';
import authRoutes from './routes/auth.js';
import addTest from './routes/test.js';
import studentTestRoutes from './routes/studentTest.js';
import adminTestRoutes from './routes/adminTest.js';
import adminRoutes from "./routes/adminRoutes.js";





dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();


app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.status(200).send("Hello from Backend")
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/test', addTest); 
app.use('/api/v1/student/test', studentTestRoutes);
app.use('/api/v1/admin', adminTestRoutes);
app.use("/api/v1/admin", adminRoutes);


app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})