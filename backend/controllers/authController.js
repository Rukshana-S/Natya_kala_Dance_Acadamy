const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const authController = {
  // Student Signup
  signup: async (req, res) => {
    try {
      const { fullName, email, password, acceptedPrivacyPolicy, acceptedTerms } = req.body;

      if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Validate consent
      if (!acceptedPrivacyPolicy || !acceptedTerms) {
        return res.status(400).json({
          message: 'You must accept the Privacy Policy and Terms & Conditions to create an account'
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      const user = new User({
        fullName,
        email,
        password,
        role: 'student',
        acceptedPrivacyPolicy,
        acceptedTerms,
        consentDate: new Date()
      });

      await user.save();
      res.status(201).json({ message: 'Account created successfully. Please login.' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Login (Both Student and Admin)
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // Check for default admin
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = generateToken('admin', 'admin');
        return res.json({
          token,
          user: { id: 'admin', email, role: 'admin', fullName: 'Administrator' }
        });
      }

      // Check database user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user._id, user.role);
      res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          fullName: user.fullName
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Forgot Password
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(20).toString('hex');

      // Hash and set to user
      user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      // Token expires in 10 minutes
      user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

      await user.save();

      // SIMULATION: Log token to console for dev environment
      console.log(`\n=== PASSWORD RESET TOKEN ===\nUser: ${email}\nToken: ${resetToken}\nReset Link: http://localhost:5173/reset-password/${resetToken}\n============================\n`);

      res.json({
        message: 'Password reset link sent to email',
        // Returning token in response for easier testing
        devToken: resetToken
      });

    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Reset Password
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      // Hash token to compare with DB
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

      // Set new password (pre-save hook will hash it)
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.json({ message: 'Password reset successful. Please login.' });

    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = authController;