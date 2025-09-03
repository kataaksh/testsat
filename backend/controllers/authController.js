import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

// ✅ Email/password signup
export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // ⚠️ Secure role assignment: only allow "student" or "admin"
    const validRoles = ["student", "admin"];
    const assignedRole = validRoles.includes(role) ? role : "student";

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: assignedRole,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token, user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
};

// ✅ Email/password login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ token, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

// ✅ Google OAuth (using passport.js)
export const googleAuthRedirect = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    if (err || !user) {
      return res.redirect("http://localhost:5173/login?error=google");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/auth-success?token=${token}`);
  })(req, res, next);
};
