// frontend/src/api.js
import axios from 'axios';

// Read API base URL from React environment vars
// Must be defined in .env with prefix REACT_APP_
// Example: REACT_APP_API_BASE_URL=http://localhost:5000
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT if you implement the bonus auth
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---- Products ----
export const fetchProducts = (params = {}) =>
  instance.get('/api/products', { params });

export const fetchProductById = (id) =>
  instance.get(`/api/products/${id}`);

// ---- Auth (optional bonus) ----
export const login = (email, password) =>
  instance.post('/api/auth/login', { email, password });

export const getMe = () => instance.get('/api/auth/me');
