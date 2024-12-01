import type { IDetailQueryParameters, IQueryParameters } from '@/lib/types/film';

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
    if (config.params) {
      // Ensure the params object exists
      const parameters = (config.params as IQueryParameters) || ({} as IQueryParameters);
      parameters.apikey = import.meta.env.VITE_API_KEY as string;
    } else {
      config.params = { apikey: import.meta.env.VITE_API_KEY as string };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

export default api;

export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export const fetchFilms = async (parameters: IQueryParameters | IDetailQueryParameters) => {
  try {
    const response = await axios.get(BASE_URL, { params: parameters });
    return response.data as unknown;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
