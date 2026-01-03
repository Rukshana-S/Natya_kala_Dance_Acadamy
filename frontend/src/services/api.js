import axios from 'axios';

const API_BASE_URL = 'http://${import.meta.env.VITE_API_URL}/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  adminLogin: (credentials) => api.post('/auth/admin-login', credentials),
};

export const registrationAPI = {
  create: (data) => api.post('/registrations', data),
  getAll: () => api.get('/admin/registrations'),
  approve: (id) => api.patch(`/admin/registrations/${id}/approve`),
};

export default api;