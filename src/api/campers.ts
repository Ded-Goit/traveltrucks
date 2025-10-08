import axios from 'axios';
import type { Camper } from '@/types/camper';

// Створюємо axios instance
export const api = axios.create({
  baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---- Типи для фільтрації ----
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

// ---- Запити ----

// Отримати список кемперів (з фільтрацією на бекенді)
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

  // fallback — якщо структура невідома
  console.warn(' Unexpected API format in getCampers():', data);
  return [];
};

// Отримати один кемпер за ID
export const getCamperById = async (id: string): Promise<Camper> => {
  const { data } = await api.get<Camper>(`/campers/${id}`);
  return data;
};
