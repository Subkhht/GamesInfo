import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { gamesApi } from '../services/gamesApi';
import { GameCard } from '../components/game/GameCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { SearchAutocomplete } from '../components/ui/SearchAutocomplete';
import { useGamesStore } from '../store/gamesStore';
import type { GameFilters, Game } from '../types/game.types';

const SearchPage = () => {
  const [filters, setFilters] = useState<GameFilters>({
    search: '',
    platforms: '',
    genres: '',
    ordering: '-rating',
    page: 1,
  });

  const [allGames, setAllGames] = useState<Game[]>([]);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { addFavorite, removeFavorite, addCompleted, removeCompleted, isFavorite, isCompleted } =
    useGamesStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['games', filters],
    queryFn: () => gamesApi.getGames(filters),
  });

  // Accumulate games on page change
  useEffect(() => {
    if (data?.results) {
      if (filters.page === 1) {
        setAllGames(data.results);
      } else {
        setAllGames((prev) => [...prev, ...data.results]);
      }
    }
  }, [data, filters.page]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && data?.next && !isLoading) {
          setFilters((prev) => ({ ...prev, page: (prev.page || 1) + 1 }));
        }
      },
      { threshold: 0.8 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [data?.next, isLoading]);

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query, page: 1 }));
    setAllGames([]);
  };

  const handleFilterChange = (key: keyof GameFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
    setAllGames([]);
  };

  const handleToggleFavorite = async (game: Game) => {
    if (isFavorite(game.id)) {
      removeFavorite(game.id);
    } else {
      addFavorite(game as any);
    }
  };

  const handleToggleCompleted = async (game: Game) => {
    if (isCompleted(game.id)) {
      removeCompleted(game.id);
    } else {
      addCompleted(game as any);
    }
  };

  const handleReview = (game: Game) => {
    // Implementar modal de review
    console.log('Review for:', game.name);
  };

  return (
    <div className="space-y-8">
      {/* Search Box */}
      <div className="bg-dark-card p-6 rounded-2xl border-2 border-primary-500 shadow-xl">
        <SearchAutocomplete onSearch={handleSearch} />

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <select
            value={filters.platforms}
            onChange={(e) => handleFilterChange('platforms', e.target.value)}
            className="px-4 py-3 bg-gray-800 border-2 border-primary-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          >
            <option value="">Todas las plataformas</option>
            <option value="4">PC</option>
            <option value="187">PlayStation 5</option>
            <option value="18">PlayStation 4</option>
            <option value="1">Xbox One</option>
            <option value="186">Xbox Series X</option>
            <option value="7">Nintendo Switch</option>
          </select>

          <select
            value={filters.genres}
            onChange={(e) => handleFilterChange('genres', e.target.value)}
            className="px-4 py-3 bg-gray-800 border-2 border-primary-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          >
            <option value="">Todos los géneros</option>
            <option value="4">Action</option>
            <option value="51">Indie</option>
            <option value="3">Adventure</option>
            <option value="5">RPG</option>
            <option value="10">Strategy</option>
            <option value="2">Shooter</option>
          </select>

          <select
            value={filters.ordering}
            onChange={(e) => handleFilterChange('ordering', e.target.value)}
            className="px-4 py-3 bg-gray-800 border-2 border-primary-500 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          >
            <option value="-rating">Mejor valorados</option>
            <option value="-released">Más recientes</option>
            <option value="name">Nombre (A-Z)</option>
            <option value="-added">Más populares</option>
          </select>
        </div>
      </div>

      {/* Results */}
      {isLoading && <LoadingSpinner />}

      {error && (
        <div className="text-center text-red-400 text-lg">
          <p>Error al cargar los juegos</p>
          <p className="text-sm text-gray-400 mt-2">Por favor, verifica tu API key en el archivo .env</p>
        </div>
      )}

      {allGames.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onFavorite={() => handleToggleFavorite(game)}
                onCompleted={() => handleToggleCompleted(game)}
                onReview={() => handleReview(game)}
              />
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          {data?.next && (
            <div ref={loadMoreRef} className="py-8 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto" />
              <p className="text-gray-400 mt-2">Cargando más juegos...</p>
            </div>
          )}
        </>
      )}

      {data && allGames.length === 0 && !isLoading && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400">No se encontraron juegos</p>
          <p className="text-gray-500 mt-2">Intenta con otros filtros o términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
