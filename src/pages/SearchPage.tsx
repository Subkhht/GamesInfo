import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { gamesApi } from '../services/gamesApi';
import { GameCard } from '../components/game/GameCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/Button';
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

  const [searchInput, setSearchInput] = useState('');

  const { addFavorite, removeFavorite, addCompleted, removeCompleted, isFavorite, isCompleted } =
    useGamesStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['games', filters],
    queryFn: () => gamesApi.getGames(filters),
  });

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, search: searchInput, page: 1 }));
  };

  const handleFilterChange = (key: keyof GameFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
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
        <div className="flex gap-3">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Buscar videojuegos..."
            className="flex-1 px-4 py-3 bg-gray-800 border-2 border-primary-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
          <Button onClick={handleSearch} size="lg" className="px-8">
            <Search className="w-5 h-5" />
          </Button>
        </div>

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

      {data && data.results.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.results.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onFavorite={() => handleToggleFavorite(game)}
                onCompleted={() => handleToggleCompleted(game)}
                onReview={() => handleReview(game)}
              />
            ))}
          </div>

          {data.next && (
            <div className="flex justify-center">
              <Button
                onClick={() => setFilters((prev) => ({ ...prev, page: (prev.page || 1) + 1 }))}
                size="lg"
                variant="secondary"
              >
                Cargar más juegos
              </Button>
            </div>
          )}
        </>
      )}

      {data && data.results.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400">No se encontraron juegos</p>
          <p className="text-gray-500 mt-2">Intenta con otros filtros o términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
