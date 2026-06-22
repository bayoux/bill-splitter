import axios from 'axios';
import axiosRetry from 'axios-retry';

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

api.interceptors.response.use(
  (response) => response,
  (e) => {
    if (e.code === 'ECONNABORTED') {
      e.message = 'Сервер не отвечает. Попробуйте ещё раз';
    }
    return Promise.reject(e);
  },
);
