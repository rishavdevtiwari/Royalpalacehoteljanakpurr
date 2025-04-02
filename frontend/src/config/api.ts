
// Production API URL - used for deployed site
const PROD_API_URL = 'https://api.royalpalacehotel.com/api';

// Development API URL - used for local development
const DEV_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Determine environment
const isProd = import.meta.env.MODE === 'production';

// Export the appropriate API URL
export const API_URL = isProd ? PROD_API_URL : DEV_API_URL;

// Check if the API is reachable
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`, {
      credentials: 'include', // Include credentials to match other requests
    });
    return await response.json();
  } catch (error) {
    console.error("API health check failed:", error);
    return { status: 'error', message: 'Cannot connect to API' };
  }
};

// Common fetch options to ensure credentials are always sent
export const fetchWithCredentials = (url: string, options = {}) => {
  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });
};

export default API_URL;
