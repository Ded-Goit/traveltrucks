import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Camper } from '@/types/camper';

interface FavoritesState {
  favorites: Camper[];
  toggleFavorite: (camper: Camper) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create(
  persist<FavoritesState>(
    (set, get) => ({
      favorites: [],
      toggleFavorite(camper) {
        const exists = get().favorites.find((c) => c.id === camper.id);
        set({
          favorites: exists
            ? get().favorites.filter((c) => c.id !== camper.id)
            : [...get().favorites, camper],
        });
      },
      isFavorite(id) {
        return !!get().favorites.find((c) => c.id === id);
      },
    }),
    { name: 'favorites-storage' },
  ),
);
