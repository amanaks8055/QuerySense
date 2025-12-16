import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance
const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (email: string, password: string, role?: string) =>
        api.post('/auth/register', { email, password, role }),

    login: (email: string, password: string) =>
        api.post('/auth/login', { email, password }),

    getProfile: () =>
        api.get('/auth/profile'),
};

// Query API
export const queryAPI = {
    submit: (question: string) =>
        api.post('/query', { question }),

    getHistory: (limit = 20, offset = 0) =>
        api.get('/query/history', { params: { limit, offset } }),

    getById: (id: number) =>
        api.get(`/query/${id}`),
};

// Admin API
export const adminAPI = {
    getAnalytics: () =>
        api.get('/admin/analytics'),

    getUsers: () =>
        api.get('/admin/users'),

    getAllQueries: (limit = 50, offset = 0) =>
        api.get('/admin/queries', { params: { limit, offset } }),
};

export default api;
