import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FavoriteGame, CompletedGame, GameReview, BacklogGame } from '../types/game.types';

interface GamesStore {
  favorites: FavoriteGame[];
  completed: CompletedGame[];
  reviews: GameReview[];
  backlog: BacklogGame[];
  
  // Favorites
  addFavorite: (game: FavoriteGame) => void;
  removeFavorite: (gameId: number) => void;
  isFavorite: (gameId: number) => boolean;
  
  // Completed
  addCompleted: (game: CompletedGame) => void;
  removeCompleted: (gameId: number) => void;
  isCompleted: (gameId: number) => boolean;
  
  // Backlog
  addBacklog: (game: BacklogGame) => void;
  removeBacklog: (gameId: number) => void;
  isBacklog: (gameId: number) => boolean;
  updateBacklogPriority: (gameId: number, priority: 'high' | 'medium' | 'low') => void;
  
  // Reviews
  addReview: (review: GameReview) => void;
  updateReview: (gameId: number, review: Partial<GameReview>) => void;
  removeReview: (gameId: number) => void;
  getReview: (gameId: number) => GameReview | undefined;
}

export const useGamesStore = create<GamesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      completed: [],
      reviews: [],
      backlog: [],

      // Favorites
      addFavorite: (game) =>
        set((state) => ({
          favorites: [...state.favorites, { ...game, addedAt: new Date().toISOString() }],
        })),

      removeFavorite: (gameId) =>
        set((state) => ({
          favorites: state.favorites.filter((game) => game.id !== gameId),
        })),

      isFavorite: (gameId) => {
        return get().favorites.some((game) => game.id === gameId);
      },

      // Completed
      addCompleted: (game) =>
        set((state) => ({
          completed: [...state.completed, { ...game, completedAt: new Date().toISOString() }],
        })),

      removeCompleted: (gameId) =>
        set((state) => ({
          completed: state.completed.filter((game) => game.id !== gameId),
        })),

      isCompleted: (gameId) => {
        return get().completed.some((game) => game.id === gameId);
      },

      // Backlog
      addBacklog: (game) =>
        set((state) => ({
          backlog: [...state.backlog, { ...game, addedAt: new Date().toISOString(), priority: 'medium' }],
        })),

      removeBacklog: (gameId) =>
        set((state) => ({
          backlog: state.backlog.filter((game) => game.id !== gameId),
        })),

      isBacklog: (gameId) => {
        return get().backlog.some((game) => game.id === gameId);
      },

      updateBacklogPriority: (gameId, priority) =>
        set((state) => ({
          backlog: state.backlog.map((game) =>
            game.id === gameId ? { ...game, priority } : game
          ),
        })),

      // Reviews
      addReview: (review) =>
        set((state) => ({
          reviews: [...state.reviews, { ...review, date: new Date().toISOString() }],
        })),

      updateReview: (gameId, reviewUpdate) =>
        set((state) => ({
          reviews: state.reviews.map((review) =>
            review.gameId === gameId
              ? { ...review, ...reviewUpdate, date: new Date().toISOString() }
              : review
          ),
        })),

      removeReview: (gameId) =>
        set((state) => ({
          reviews: state.reviews.filter((review) => review.gameId !== gameId),
        })),

      getReview: (gameId) => {
        return get().reviews.find((review) => review.gameId === gameId);
      },
    }),
    {
      name: 'gamesinfo-storage',
    }
  )
);
