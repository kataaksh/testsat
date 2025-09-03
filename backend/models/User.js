import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Not required for Google users
  googleId: { type: String }, // Only for Google users
  role: { type: String, enum: ['student', 'admin'], required: true }
});

export default mongoose.model('User', userSchema);