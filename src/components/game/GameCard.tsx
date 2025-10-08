import { motion } from 'framer-motion';
import type { Game } from '../../types/game.types';
import { Heart, Trophy, Star } from 'lucide-react';
import { useGamesStore } from '../../store/gamesStore';

interface GameCardProps {
  game: Game;
  onClick: () => void;
  onFavorite: () => void;
  onCompleted: () => void;
  onReview: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onClick,
  onFavorite,
  onCompleted,
  onReview,
}) => {
  const { isFavorite, isCompleted } = useGamesStore();

  const getPlatformIcons = () => {
    if (!game.platforms || game.platforms.length === 0) return '🎮';
    const names = game.platforms.map((p) => p.platform.name.toLowerCase()).join(' ');

    const icons = [];
    if (names.includes('playstation')) icons.push('🎮');
    if (names.includes('xbox')) icons.push('🎮');
    if (names.includes('pc') || names.includes('windows')) icons.push('💻');
    if (names.includes('nintendo') || names.includes('switch')) icons.push('🎮');

    return icons.join(' ') || '🎮';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-dark-card rounded-xl overflow-hidden border-2 border-transparent hover:border-primary-500 transition-all duration-300 cursor-pointer group shadow-xl"
    >
      {/* PEGI Badge */}
      {game.esrb_rating && (
        <div className="absolute top-4 left-4 z-10 bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg font-bold text-sm shadow-lg">
          {game.esrb_rating.name}
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden" onClick={onClick}>
        <img
          src={game.background_image || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x200?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-60"></div>
      </div>

      {/* Content */}
      <div className="p-5" onClick={onClick}>
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3 className="text-lg font-bold text-white line-clamp-2 flex-1">{game.name}</h3>
          {game.rating > 0 && (
            <div className="flex items-center gap-1 bg-primary-500 px-2 py-1 rounded-full text-sm font-bold whitespace-nowrap">
              <Star className="w-4 h-4 fill-current" />
              {game.rating}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {game.released && (
            <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-lg border border-primary-500">
              📅 {game.released}
            </span>
          )}
          {game.genres && game.genres.length > 0 && (
            <span className="text-xs bg-gray-800 text-primary-300 px-2 py-1 rounded-lg border border-primary-500">
              {game.genres[0].name}
            </span>
          )}
        </div>

        <div className="text-2xl mb-4">{getPlatformIcons()}</div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite();
            }}
            className={`flex-1 p-2 rounded-lg border-2 transition-all ${
              isFavorite(game.id)
                ? 'bg-pink-500 border-pink-500 text-white'
                : 'bg-gray-800 border-primary-500 text-gray-300 hover:bg-primary-500 hover:text-white'
            }`}
            title="Favorito"
          >
            <Heart className={`w-5 h-5 mx-auto ${isFavorite(game.id) ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onCompleted();
            }}
            className={`flex-1 p-2 rounded-lg border-2 transition-all ${
              isCompleted(game.id)
                ? 'bg-green-500 border-green-500 text-white'
                : 'bg-gray-800 border-primary-500 text-gray-300 hover:bg-primary-500 hover:text-white'
            }`}
            title="Completado"
          >
            <Trophy className={`w-5 h-5 mx-auto ${isCompleted(game.id) ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onReview();
            }}
            className="flex-1 p-2 rounded-lg border-2 bg-gray-800 border-primary-500 text-gray-300 hover:bg-primary-500 hover:text-white transition-all"
            title="Review"
          >
            <Star className="w-5 h-5 mx-auto" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
