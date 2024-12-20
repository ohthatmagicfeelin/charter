// client/src/api/api.js
import axios from 'axios';
import config from '@/config/env'
import fetchCsrfToken from '@/common/services/csrfService.js'; 

const api = axios.create({
  baseURL: config.BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(async config => {
    if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase())) {
        try {
            const token = await fetchCsrfToken();
            config.headers['X-CSRF-Token'] = token;

        } catch (error) {
            console.error('Failed to fetch CSRF token:', error);
            return Promise.reject(error);
        }
    }

    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        
        // Handle CSRF token errors
        if (error.response?.status === 403 && error.response?.data?.code === 'INVALID_CSRF' && !originalRequest._retry) {
            originalRequest._retry = true;
            
            // Reset and fetch new CSRF token
            await import('@/common/services/csrfService').then(module => module.resetCsrfToken());
            const newToken = await import('@/common/services/csrfService').then(module => module.default());
            
            // Update the request with new token
            originalRequest.headers['X-CSRF-Token'] = newToken;
            return api(originalRequest);
        }

        if (config.NODE_ENV === 'development' || config.DEBUG) {
            console.error('Request error:', {
                status: error.response?.status,
                data: error.response?.data,
                headers: error.response?.headers
            });
        }
        return Promise.reject(error);
    }
);

export default api;