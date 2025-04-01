
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './src/routes/auth.js';

// Import routes
import userRoutes from './src/routes/users.js';
import roomRoutes from './src/routes/rooms.js';
import bookingRoutes from './src/routes/bookings.js';
import contactRoutes from './src/routes/contact.js';

const app = express();
dotenv.config();

// Default port is 8080, but we'll try alternative ports if it's in use
const DEFAULT_PORT = process.env.PORT || 8080;
let PORT = DEFAULT_PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// ES modules don't have __dirname, so we need to create it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// MongoDB Connection
const connectMongoDB = async () => {
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log("MongoDB connection successful");
    } catch (error) {
      console.error("MongoDB connection failed:", error);
    }
  } else {
    console.log("No MONGODB_URI provided, skipping direct database connection");
  }
};

// Connect to MongoDB if URI is provided
if (MONGODB_URI) {
  connectMongoDB();
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);

// Basic API routes
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    server: 'Royal Palace Hotel API',
    timestamp: new Date().toISOString()
  });
});

// MongoDB health check route
app.get('/api/mongodb-health', async (req, res) => {
  try {
    // Test MongoDB connection
    const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    res.status(200).json({
      status: 'ok',
      mongodb: mongoStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.message 
    });
  }
});

// Serve frontend for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// Function to start the server with port fallback
const startServer = (port) => {
  const server = app.listen(port, () => {
    PORT = port;
    console.log(`Server is running on port ${port}`);
    console.log(`Frontend available at http://localhost:${port}`);
    console.log(`API available at http://localhost:${port}/api`);
    
    // Define BACKEND_URL based on the actual port being used
    const BACKEND_URL = `http://localhost:${port}`;
    
    // Log environment configuration
    console.log('Environment configuration:');
    console.log('- PORT:', port);
    console.log('- BACKEND_URL:', BACKEND_URL);
    console.log('- NODE_ENV:', process.env.NODE_ENV);
    console.log('- FRONTEND_URL:', process.env.FRONTEND_URL || BACKEND_URL);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying port ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

// Start server with port fallback
startServer(DEFAULT_PORT);

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
  process.exit(0);
});
