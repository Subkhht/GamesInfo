import axios from 'axios';
import type { GamesResponse, GameDetails, GameFilters } from '../types/game.types';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY || '';
const BASE_URL = 'https://api.rawg.io/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const gamesApi = {
  getGames: async (filters: GameFilters = {}): Promise<GamesResponse> => {
    const { data } = await axiosInstance.get<GamesResponse>('/games', {
      params: {
        ...filters,
        page_size: filters.page_size || 12,
      },
    });
    return data;
  },

  getGameDetails: async (id: number): Promise<GameDetails> => {
    const { data } = await axiosInstance.get<GameDetails>(`/games/${id}`);
    return data;
  },

  searchGames: async (query: string, page: number = 1): Promise<GamesResponse> => {
    const { data } = await axiosInstance.get<GamesResponse>('/games', {
      params: {
        search: query,
        page,
        page_size: 12,
      },
    });
    return data;
  },
};

export default gamesApi;
