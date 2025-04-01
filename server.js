// import express from "express";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from 'url';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';

// // Import routes - we'll need to convert these to ES modules or use a dynamic import
// // For now we'll setup a proxy to the backend

// const app = express();
// dotenv.config();

// const PORT = process.env.PORT || 8080;
// const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

// // ES modules don't have __dirname, so we need to create it
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:8080',
//   credentials: true
// }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// // MongoDB Connection (if we need it directly in this server)
// const connectMongoDB = async () => {
//   if (process.env.MONGODB_URI) {
//     try {
//       await mongoose.connect(process.env.MONGODB_URI);
//       console.log("MongoDB connection successful");
//     } catch (error) {
//       console.error("MongoDB connection failed:", error);
//     }
//   } else {
//     console.log("No MONGODB_URI provided, skipping direct database connection");
//   }
// };

// // Connect to MongoDB if URI is provided
// if (process.env.MONGODB_URI) {
//   connectMongoDB();
// }

// // Log environment configuration
// console.log('Environment configuration:');
// console.log('- PORT:', PORT);
// console.log('- BACKEND_URL:', BACKEND_URL);
// console.log('- NODE_ENV:', process.env.NODE_ENV);

// // API proxy to backend
// app.use('/api', (req, res, next) => {
//   // Forward API requests to backend
//   console.log(`Proxying request to: ${BACKEND_URL}${req.url}`);
  
//   // For now, just redirect with a message
//   // In a production setup, you would implement a proper proxy here
//   res.redirect(`${BACKEND_URL}${req.url}`);
// });

// // Health check route
// app.get("/health", (req, res) => {
//   res.status(200).json({ 
//     status: 'ok', 
//     server: 'frontend-server',
//     timestamp: new Date().toISOString()
//   });
// });

// // Hello route for testing
// app.get("/hello", (req, res) => {
//   res.send("Hello World! API is working fine.");
// });

// // Serve frontend for all other routes
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Handle graceful shutdown
// process.on('SIGINT', async () => {
//   console.log('Shutting down gracefully...');
//   if (mongoose.connection.readyState === 1) {
//     await mongoose.disconnect();
//   }
//   process.exit(0);
// });

// process.on('SIGTERM', async () => {
//   console.log('Shutting down gracefully...');
//   if (mongoose.connection.readyState === 1) {
//     await mongoose.disconnect();
//   }
//   process.exit(0);
// });
