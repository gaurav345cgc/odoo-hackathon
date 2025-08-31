// Environment configuration
export const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  
  // App Configuration
  APP_NAME: 'Student Dashboard',
  APP_VERSION: '1.0.0',
  
  // Feature Flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG_MODE: import.meta.env.DEV,
  
  // Timeouts
  API_TIMEOUT: 10000, // 10 seconds
  SESSION_TIMEOUT: 3600000, // 1 hour
  
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// Development helpers
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;
export const isTest = import.meta.env.MODE === 'test'; 