import { create } from 'zustand';
import axios from 'axios';
import { Camper } from '@/types/camper';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';
const LIMIT = 4;

interface CampersState {
  campers: Camper[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  filters: Record<string, unknown>;
  fetchCampers: (filters?: Record<string, unknown>) => Promise<void>;
  loadMore: () => Promise<void>;
}

export const useCampersStore = create<CampersState>((set, get) => ({
  campers: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  filters: {},

  fetchCampers: async (filters = {}) => {
    try {
      set({ loading: true, campers: [], filters, page: 1 });
      const { data } = await axios.get<Camper[]>(BASE_URL, {
        params: { ...filters, page: 1, limit: LIMIT },
      });
      set({
        campers: data,
        loading: false,
        hasMore: data.length === LIMIT,
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        set({ error: err.message, loading: false });
      } else if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: 'Unknown error', loading: false });
      }
    }
  },

  loadMore: async () => {
    const { page, filters, campers } = get();
    const nextPage = page + 1;

    try {
      set({ loading: true });
      const { data } = await axios.get<Camper[]>(BASE_URL, {
        params: { ...filters, page: nextPage, limit: LIMIT },
      });
      set({
        campers: [...campers, ...data],
        page: nextPage,
        loading: false,
        hasMore: data.length === LIMIT,
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        set({ error: err.message, loading: false });
      } else if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: 'Unknown error', loading: false });
      }
    }
  },
}));
