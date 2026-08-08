import axios, { AxiosError } from 'axios';

// Create a custom Axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Don't intercept auth endpoints like login/register to allow them to handle their own errors
      if (!error.config?.url?.includes('/auth/')) {
        const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/register';
        
        // Only destroy session and redirect if we aren't already on an auth page
        if (!isAuthPage) {
          api.post('/auth/logout').finally(() => {
            window.location.href = '/login';
          });
          // Return a pending promise so the calling code doesn't proceed with the error while redirecting
          return new Promise(() => {});
        }
      }
    }

    const customError = new Error('An unexpected error occurred.');

    if (error.response?.data) {
      const data = error.response.data as any;
      if (data.error) {
        customError.message = data.error;
      }
    } else if (error.message) {
      customError.message = error.message;
    }

    return Promise.reject(customError);
  }
);

export default api;
