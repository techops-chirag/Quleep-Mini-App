import axios from 'axios';

const API_BASE =  window.API_BASE_URL || 'http://localhost:5000';

export const api = axios.create({ baseURL: API_BASE });

export const fetchProducts = (params = {}) => api.get('/api/products', { params });
export const fetchProductById = (id) => api.get(`/api/products/${id}`);
