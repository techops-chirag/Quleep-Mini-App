// frontend/src/api.js
import axios from 'axios';

/**
 * Detect API base for:
 *  - Localhost dev (http://localhost:5000)
 *  - Codespaces/Gitpod style URLs (e.g., 3000-xxxx -> replace to 5000-xxxx)
 *  - Or respect window.API_BASE_URL if explicitly set in index.html
 */
function detectApiBase() {
  if (typeof window !== 'undefined' && window.API_BASE_URL) {
    return window.API_BASE_URL.replace(/\/+$/, ''); // strip trailing slash
  }
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location;
    // Match "<port>-rest-of-host" and replace leading port with 5000
    const m = host.match(/^(\d+)-(.*)$/);
    if (m) {
      return `${protocol}//5000-${m[2]}`;
    }
  }
  // Fallback to local dev
  return 'http://localhost:5000';
}

const API_BASE = detectApiBase();

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchProducts = (params = {}) => api.get('/api/products', { params });
export const fetchProductById = (id) => api.get(`/api/products/${id}`);
