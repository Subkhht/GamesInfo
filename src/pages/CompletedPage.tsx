import { useGamesStore } from '../store/gamesStore';
import { GameCard } from '../components/game/GameCard';
import { Trophy } from 'lucide-react';

const CompletedPage = () => {
  const { completed, removeCompleted, addFavorite, removeFavorite, isFavorite } = useGamesStore();

  if (completed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Trophy className="w-24 h-24 text-gray-600 mb-4" />
        <h2 className="text-3xl font-bold text-gray-400 mb-2">No has completado ningún juego</h2>
        <p className="text-gray-500">Marca juegos como completados para llevar tu progreso</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-3 text-green-500">
        🏆 Juegos Completados
        <span className="text-lg text-gray-400">({completed.length})</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {completed.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onFavorite={() => {
              if (isFavorite(game.id)) {
                removeFavorite(game.id);
              } else {
                addFavorite(game as any);
              }
            }}
            onCompleted={() => removeCompleted(game.id)}
            onReview={() => console.log('Review:', game.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CompletedPage;
