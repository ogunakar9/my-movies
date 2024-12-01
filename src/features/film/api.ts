import type { IQueryParameters } from '@/lib/types/film';

import axios from 'axios';

import { BASE_URL } from '@/lib/constants';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const parameters = (config.params as IQueryParameters) || {};
    config.params = { ...parameters, apikey: import.meta.env.VITE_API_KEY as string };
    return config;
  },
  (error) => {
    throw error instanceof Error ? error : new Error(String(error));
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

export default api;
