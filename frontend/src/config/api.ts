
// Production API URL - used for deployed site
const PROD_API_URL = 'https://api.rishavdevtiwari.com.np/api';

// Development API URL - used for local development
const DEV_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Determine environment
const isProd = import.meta.env.MODE === 'production';

// Export the appropriate API URL
export const API_URL = isProd ? PROD_API_URL : DEV_API_URL;

export default API_URL;
