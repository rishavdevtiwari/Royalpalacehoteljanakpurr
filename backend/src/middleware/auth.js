import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// ... keep existing code (middleware functions)

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_change_in_production');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Access denied: Admin privileges required' });
  }
  next();
};

export const isAlreadyLoggedIn = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_change_in_production');
    req.user = decoded;
    
    // User is logged in, redirect based on role
    return res.status(200).json({ 
      isLoggedIn: true, 
      message: 'User is already logged in',
      role: decoded.role,
      redirectTo: decoded.role === 'ADMIN' ? '/dashboard' : '/'
    });
  } catch (error) {
    // Token is invalid, proceed to login/register
    next();
  }
};
