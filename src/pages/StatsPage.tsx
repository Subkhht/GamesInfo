import { motion } from 'framer-motion';
import { Heart, Trophy, Star, Gamepad2, TrendingUp } from 'lucide-react';
import { useGamesStore } from '../store/gamesStore';

const StatsPage = () => {
  const { favorites, completed, reviews } = useGamesStore();

  // Calcular estadísticas
  const totalGames = new Set([...favorites.map(g => g.id), ...completed.map(g => g.id)]).size;
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  // Géneros favoritos
  const genreCounts: { [key: string]: number } = {};
  [...favorites, ...completed].forEach(game => {
    game.genres?.forEach(genre => {
      genreCounts[genre.name] = (genreCounts[genre.name] || 0) + 1;
    });
  });
  const topGenres = Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Plataformas más jugadas
  const platformCounts: { [key: string]: number } = {};
  [...favorites, ...completed].forEach(game => {
    game.platforms?.forEach(p => {
      platformCounts[p.platform.name] = (platformCounts[p.platform.name] || 0) + 1;
    });
  });
  const topPlatforms = Object.entries(platformCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">📊 Mis Estadísticas</h1>
        <p className="text-gray-400">Un vistazo a tu actividad en GamesInfo</p>
      </motion.div>

      {/* Cards de Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-pink-500 to-red-500 p-6 rounded-2xl shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <Heart className="w-10 h-10 text-white" />
            <span className="text-4xl font-bold text-white">{favorites.length}</span>
          </div>
          <h3 className="text-white font-semibold text-lg">Favoritos</h3>
          <p className="text-white/80 text-sm">Juegos que amas</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-2xl shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <Trophy className="w-10 h-10 text-white" />
            <span className="text-4xl font-bold text-white">{completed.length}</span>
          </div>
          <h3 className="text-white font-semibold text-lg">Completados</h3>
          <p className="text-white/80 text-sm">¡Bien hecho!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 rounded-2xl shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <Star className="w-10 h-10 text-white" />
            <span className="text-4xl font-bold text-white">{reviews.length}</span>
          </div>
          <h3 className="text-white font-semibold text-lg">Reviews</h3>
          <p className="text-white/80 text-sm">Opiniones escritas</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-500 to-indigo-500 p-6 rounded-2xl shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <Gamepad2 className="w-10 h-10 text-white" />
            <span className="text-4xl font-bold text-white">{totalGames}</span>
          </div>
          <h3 className="text-white font-semibold text-lg">Total Juegos</h3>
          <p className="text-white/80 text-sm">En tu colección</p>
        </motion.div>
      </div>

      {/* Rating Promedio */}
      {reviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-card p-6 rounded-2xl border-2 border-primary-500"
        >
          <div className="flex items-center gap-4">
            <TrendingUp className="w-12 h-12 text-primary-500" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                Rating Promedio: {averageRating} ⭐
              </h3>
              <p className="text-gray-400">
                Basado en {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Top Géneros */}
      {topGenres.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-dark-card p-6 rounded-2xl border-2 border-primary-500"
        >
          <h2 className="text-3xl font-bold text-white mb-6">🎮 Géneros Favoritos</h2>
          <div className="space-y-4">
            {topGenres.map(([genre, count], index) => (
              <div key={genre} className="flex items-center gap-4">
                <span className="text-2xl font-bold text-primary-500 w-8">
                  #{index + 1}
                </span>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">{genre}</span>
                    <span className="text-gray-400">{count} juego{count !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / Math.max(...topGenres.map(([, c]) => c))) * 100}%` }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Top Plataformas */}
      {topPlatforms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-dark-card p-6 rounded-2xl border-2 border-primary-500"
        >
          <h2 className="text-3xl font-bold text-white mb-6">🎯 Plataformas Más Jugadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topPlatforms.map(([platform, count]) => (
              <div
                key={platform}
                className="bg-gray-800 p-4 rounded-xl border-2 border-primary-500"
              >
                <h3 className="text-white font-semibold mb-2">{platform}</h3>
                <p className="text-3xl font-bold text-primary-500">{count}</p>
                <p className="text-gray-400 text-sm">juego{count !== 1 ? 's' : ''}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {totalGames === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <Gamepad2 className="w-20 h-20 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2">
            No hay datos todavía
          </h2>
          <p className="text-gray-500">
            Empieza agregando juegos a tus favoritos o completados
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default StatsPage;
