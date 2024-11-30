// A mock function to mimic making an async request for data
import type { IDetailQueryParameters, IQueryParameters } from '@/lib/types/film';

import axios from 'axios';

import { BASE_URL } from '@/lib/constants';

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
