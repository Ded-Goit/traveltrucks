import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Camper } from '@/types/camper';
import { getCampers, getCamperById, type CamperFilters } from '@/api/campers';

interface CampersState {
  campers: Camper[];
  selectedCamper: Camper | null;
  favorites: string[];
  filters: CamperFilters;
  page: number;
  total: number;
  loading: boolean;
  error: string | null;

  // Actions
  fetchCampers: (reset?: boolean) => Promise<void>;
  fetchCamperById: (id: string) => Promise<void>;
  setFilters: (filters: CamperFilters) => void;
  toggleFavorite: (id: string) => void;
  clearFilters: () => void;
  loadMore: () => Promise<void>;
}

export const useCampersStore = create<CampersState>()(
  persist(
    (set, get) => ({
      campers: [],
      selectedCamper: null,
      favorites: [],
      filters: {},
      page: 1,
      total: 0,
      loading: false,
      error: null,

      // --- Getting a list of campers ---
      fetchCampers: async (reset = false) => {
        const { filters, page } = get();
        set({ loading: true, error: null });

        try {
          const data = await getCampers({
            ...filters,
            page,
            limit: 4, // number of cards per page
          });

          const campersArray = Array.isArray(data) ? data : [];

          set((state) => ({
            campers: reset ? campersArray : [...state.campers, ...campersArray],
            loading: false,
            total:
              campersArray.length < 1
                ? state.campers.length + campersArray.length
                : state.total,
          }));
        } catch (err) {
          console.error('fetchCampers error:', err);
          set({ error: 'Nothing was found for your query.', loading: false });
        }
      },

      // --- Getting one camper per ID ---
      fetchCamperById: async (id) => {
        set({ loading: true, error: null });
        try {
          const camper = await getCamperById(id);
          set({ selectedCamper: camper, loading: false });
        } catch {
          set({
            error: 'Не вдалося завантажити деталі кемпера',
            loading: false,
          });
        }
      },

      // --- Filter updates ---
      setFilters: (filters) => {
        set({ filters, page: 1 });
      },

      // --- Add/remove from favorites ---
      toggleFavorite: (id) => {
        set((state) => {
          const isFav = state.favorites.includes(id);
          const updatedFavorites = isFav
            ? state.favorites.filter((fav) => fav !== id)
            : [...state.favorites, id];
          return { favorites: updatedFavorites };
        });
      },

      // --- Reset filters ---
      clearFilters: () => {
        set({ filters: {}, page: 1 });
      },

      // --- Loading next page ---
      loadMore: async () => {
        const nextPage = get().page + 1;
        set({ page: nextPage });
        await get().fetchCampers(false);
      },
    }),
    {
      name: 'traveltrucks-store', // key in localStorage
      partialize: (state) => ({ favorites: state.favorites }), // we only keep favorites
    },
  ),
);
