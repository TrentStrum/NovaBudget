import axios from 'axios';
import axiosRetry from 'axios-retry';
import { getStoredToken } from '../auth/token';

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add retry mechanism for failed requests
axiosRetry(apiClient, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000; // exponential backoff
  },
  retryCondition: (error) => {
    // Retry on network errors or 5xx server errors
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || 
           (error.response?.status ?? 0) >= 500;
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token && !token.isTokenExpired(token.expiresAt)) {
    config.headers.Authorization = `Bearer ${token.token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);