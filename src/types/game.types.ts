export interface Game {
  id: number;
  name: string;
  slug: string;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  released: string;
  playtime: number;
  genres: Genre[];
  platforms: PlatformInfo[];
  esrb_rating: EsrbRating | null;
  short_screenshots?: Screenshot[];
  description_raw?: string;
  developers?: Developer[];
  publishers?: Publisher[];
  tags?: Tag[];
  metacritic?: number;
}

export interface GameDetails extends Game {
  description: string;
  description_raw: string;
  developers: Developer[];
  publishers: Publisher[];
  tags: Tag[];
  website: string;
  reddit_url: string;
  reddit_name: string;
  metacritic: number;
  metacritic_url: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface PlatformInfo {
  platform: Platform;
  released_at: string;
  requirements_en?: Requirements | null;
  requirements_ru?: Requirements | null;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Requirements {
  minimum: string;
  recommended: string;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
}

export interface Publisher {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
}

export interface GamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export interface GameFilters {
  search?: string;
  platforms?: string;
  genres?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
}

// Local storage types
export interface FavoriteGame extends Game {
  addedAt: string;
}

export interface CompletedGame extends Game {
  completedAt: string;
}

export interface GameReview {
  gameId: number;
  gameName: string;
  gameImage: string;
  rating: number;
  text: string;
  date: string;
}
