import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = Cookies.get('refresh_token');
      if (refresh) {
        try {
          const { data } = await axios.post(`${BASE_URL}/api/auth/refresh`, { refreshToken: refresh });
          Cookies.set('access_token', data.accessToken, { expires: 1 / 96 });
          original.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(original);
        } catch {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  register: (data: { name: string; email: string; password: string; shopName?: string }) =>
    api.post('/api/auth/register', data),
  refresh: (refreshToken: string) =>
    api.post('/api/auth/refresh', { refreshToken }),
};

export const imageApi = {
  upload: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return api.post('/api/images/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export const projectApi = {
  list: () => api.get('/api/projects'),
  create: (data: { name: string; imageId: string }) => api.post('/api/projects', data),
  get: (id: string) => api.get(`/api/projects/${id}`),
  pollStatus: (id: string) => api.get(`/api/projects/${id}/status`),
  segment: (id: string, useImageCleaner = false) =>
    api.post(`/api/projects/${id}/segment`, { useImageCleaner }),
  updateRegionColor: (projectId: string, regionId: string, hex: string) =>
    api.patch(`/api/projects/${projectId}/regions/${regionId}`, { colorHex: hex }),
  share: (id: string) => api.post(`/api/projects/${id}/share`),
};

export const shadeApi = {
  list: (params?: {
    brand?: string;
    colorFamily?: string;
    finish?: string;
    search?: string;
    page?: number;
    size?: number;
  }) => api.get('/api/shades', { params }),
  findSimilar: (hex: string) => api.get('/api/shades/similar', { params: { hex } }),
};
