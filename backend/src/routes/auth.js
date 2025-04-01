import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isAlreadyLoggedIn, isAuthenticated } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Register a new user
router.post('/register', isAlreadyLoggedIn, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Create user in MongoDB
    const user = new User({
      name,
      email,
      password // Will be hashed in pre-save middleware
    });
    
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET || 'default_secret_change_in_production',
      { expiresIn: '7d' }
    );

    // Set cookie and send response
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login user
router.post('/login', isAlreadyLoggedIn, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check for hardcoded admin
    if (email === 'admin@royalhotelpalace' && password === 'qwerty@123456') {
      // Generate JWT token for hardcoded admin
      const token = jwt.sign(
        { 
          id: 'admin-hardcoded-id', 
          email: 'admin@royalhotelpalace', 
          role: 'ADMIN',
          name: 'Admin User'
        },
        process.env.JWT_SECRET || 'default_secret_change_in_production',
        { expiresIn: '7d' }
      );
      
      // Set cookie and send response
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
      
      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: 'admin-hardcoded-id',
          email: 'admin@royalhotelpalace',
          name: 'Admin User',
          role: 'ADMIN'
        }
      });
    }

    // For regular users, find user by email in MongoDB
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password using the comparePassword method
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET || 'default_secret_change_in_production',
      { expiresIn: '7d' }
    );

    // Set cookie and send response
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Logout user
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// Check authentication status
router.get('/status', (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(200).json({ isLoggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_change_in_production');
    res.status(200).json({ 
      isLoggedIn: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      }
    });
  } catch (error) {
    res.status(200).json({ isLoggedIn: false });
  }
});

export default router;
