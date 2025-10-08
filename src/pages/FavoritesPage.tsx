import { useGamesStore } from '../store/gamesStore';
import { GameCard } from '../components/game/GameCard';
import { HeartCrack } from 'lucide-react';

const FavoritesPage = () => {
  const { favorites, removeFavorite, addCompleted, removeCompleted, isCompleted } = useGamesStore();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <HeartCrack className="w-24 h-24 text-gray-600 mb-4" />
        <h2 className="text-3xl font-bold text-gray-400 mb-2">No tienes juegos favoritos</h2>
        <p className="text-gray-500">Agrega juegos a tus favoritos desde la búsqueda</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-3 text-primary-500">
        ❤️ Mis Juegos Favoritos
        <span className="text-lg text-gray-400">({favorites.length})</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => console.log('Game details:', game.id)}
            onFavorite={() => removeFavorite(game.id)}
            onCompleted={() => {
              if (isCompleted(game.id)) {
                removeCompleted(game.id);
              } else {
                addCompleted(game as any);
              }
            }}
            onReview={() => console.log('Review:', game.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
