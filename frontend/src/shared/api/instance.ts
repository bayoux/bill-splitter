import axios from 'axios';
import axiosRetry from 'axios-retry';
import { useAuth } from '@/entities/user';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
  timeout: 15000,
});

axiosRetry(api, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (e) => {
    return (
      e.config.method === 'get' &&
      axiosRetry.isNetworkOrIdempotentRequestError(e)
    );
  },
});

api.interceptors.request.use((config) => {
  const { token } = useAuth();
  if (token.value) {
    config.headers.Authorization = `Bearer ${token.value}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (e) => {
    if (e.code === 'ECONNABORTED') {
      e.message = 'Сервер не отвечает. Попробуйте ещё раз';
    }
    return Promise.reject(e);
  },
);
