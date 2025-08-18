// frontend/src/api.js
import axios from 'axios';

// Prefer dev proxy: we call "/api/*" and webpack forwards to backend:5000.
// In non-dev (or if someone hard-hosts), allow window.API_BASE_URL override.
function detectBase() {
  if (typeof window !== 'undefined' && window.API_BASE_URL) {
    return window.API_BASE_URL.replace(/\/+$/, '');
  }
  // Dev: rely on proxy, keep base empty so we call "/api"
  return '';
}

const API_BASE = detectBase();
const instance = axios.create({
  baseURL: API_BASE ? `${API_BASE}` : '',
  withCredentials: true,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

// Optional: attach JWT if you add auth later
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---- Products ----
export const fetchProducts = (params = {}) => instance.get('/api/products', { params });
export const fetchProductById = (id) => instance.get(`/api/products/${id}`);

// ---- Auth (optional bonus) ----
export const login = (email, password) =>
  instance.post('/api/auth/login', { email, password });
export const getMe = () => instance.get('/api/auth/me');
