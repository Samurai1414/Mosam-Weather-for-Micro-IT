const config = {
  // Use the Render backend URL in production, or local development URL
  API_URL: import.meta.env.PROD 
    ? 'https://momosam-weather-backend-for-micro-it.onrender.com'
    : ''  // Empty string will use the proxy in development
};

export default config; 