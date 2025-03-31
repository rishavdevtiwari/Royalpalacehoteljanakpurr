/**
 * API Configuration
 * 
 * This centralizes all API URL configuration to avoid issues with 
 * environment variables across different builds
 */

// Production API URL - used for deployed site
const PROD_API_URL = 'https://api.rishavdevtiwari.com.np/api';

// Development API URL - used for local development
const DEV_API_URL = 'http://localhost:3001/api';

// Determine environment
const isProd = process.env.NODE_ENV === 'production';

// Export the appropriate API URL
export const API_URL = isProd ? PROD_API_URL : DEV_API_URL;

export default API_URL;