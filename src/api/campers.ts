import axios from 'axios';
import type { Camper } from '@/types/camper';

// Creating an axios instance
export const api = axios.create({
  baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---- Types for filtering ----
export interface CamperFilters {
  location?: string;
  form?: string;
  AC?: boolean;
  kitchen?: boolean;
  bathroom?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  page?: number;
  limit?: number;
}

// ---- Queries ----

// Get a list of campers (with backend filtering)
export const getCampers = async (
  filters?: CamperFilters,
): Promise<Camper[]> => {
  const response = await api.get('/campers', { params: filters });
  const data = response.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  // fallback — if the structure is unknown
  console.warn(' Unexpected API format in getCampers():', data);
  return [];
};

// Get one camper by ID
export const getCamperById = async (id: string): Promise<Camper> => {
  const { data } = await api.get<Camper>(`/campers/${id}`);
  return data;
};
