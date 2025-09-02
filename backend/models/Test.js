import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: String, required: true }
});

const testSchema = new mongoose.Schema({
    testname: { type: String, required: true },
    questions: [questionSchema]
});

export default mongoose.model('Test', testSchema);