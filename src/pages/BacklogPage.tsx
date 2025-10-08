import { motion } from 'framer-motion';
import { BookMarked, Trash2, ArrowRight } from 'lucide-react';
import { useGamesStore } from '../store/gamesStore';
import { GameCard } from '../components/game/GameCard';

const BacklogPage = () => {
  const { backlog, removeBacklog, updateBacklogPriority, addFavorite, addCompleted } = useGamesStore();

  const priorityColors = {
    high: 'bg-red-500 border-red-500',
    medium: 'bg-yellow-500 border-yellow-500',
    low: 'bg-green-500 border-green-500',
  };

  const priorityLabels = {
    high: 'Alta ⚡',
    medium: 'Media 📌',
    low: 'Baja 💤',
  };

  // Group by priority
  const gamesByPriority = {
    high: backlog.filter((g) => g.priority === 'high'),
    medium: backlog.filter((g) => g.priority === 'medium'),
    low: backlog.filter((g) => g.priority === 'low'),
  };

  const handleMoveToFavorites = (gameId: number) => {
    const game = backlog.find((g) => g.id === gameId);
    if (game) {
      addFavorite(game as any);
      removeBacklog(gameId);
    }
  };

  const handleMoveToCompleted = (gameId: number) => {
    const game = backlog.find((g) => g.id === gameId);
    if (game) {
      addCompleted(game as any);
      removeBacklog(gameId);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">📚 Mi Backlog</h1>
        <p className="text-gray-400">Juegos que quiero jugar en el futuro</p>
        <p className="text-gray-500 text-sm mt-1">
          Total: {backlog.length} juegos
        </p>
      </motion.div>

      {backlog.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <BookMarked className="w-20 h-20 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2">
            Tu backlog está vacío
          </h2>
          <p className="text-gray-500">
            Agrega juegos que quieras jugar en el futuro
          </p>
        </motion.div>
      ) : (
        <>
          {(['high', 'medium', 'low'] as const).map((priority, index) => {
            const games = gamesByPriority[priority];
            if (games.length === 0) return null;

            return (
              <motion.div
                key={priority}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${priorityColors[priority]}`} />
                  <h2 className="text-2xl font-bold text-white">
                    Prioridad {priorityLabels[priority]} ({games.length})
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {games.map((game) => (
                    <div key={game.id} className="relative">
                      <GameCard
                        game={game}
                        onFavorite={() => {}}
                        onCompleted={() => {}}
                        onReview={() => {}}
                      />

                      {/* Priority Badge */}
                      <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-white text-sm font-bold ${priorityColors[game.priority]} z-10 shadow-lg`}>
                        {priorityLabels[game.priority]}
                      </div>

                      {/* Actions Overlay */}
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/80 transition-all duration-300 rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 z-20">
                        <div className="flex flex-col gap-3 p-4">
                          {/* Change Priority */}
                          <div className="flex gap-2 justify-center">
                            {(['high', 'medium', 'low'] as const).map((p) => (
                              <button
                                key={p}
                                onClick={() => updateBacklogPriority(game.id, p)}
                                className={`w-8 h-8 rounded-full ${priorityColors[p]} hover:scale-110 transition-transform ${game.priority === p ? 'ring-2 ring-white' : ''}`}
                                title={`Prioridad ${priorityLabels[p]}`}
                              />
                            ))}
                          </div>

                          {/* Move to Favorites/Completed */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleMoveToFavorites(game.id)}
                              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors text-sm"
                            >
                              ❤️ Favoritos
                            </button>
                            <button
                              onClick={() => handleMoveToCompleted(game.id)}
                              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors text-sm"
                            >
                              ✅ Completado
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeBacklog(game.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </>
      )}

      {/* Info Card */}
      {backlog.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-dark-card p-6 rounded-2xl border-2 border-primary-500"
        >
          <div className="flex items-start gap-4">
            <ArrowRight className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                💡 Consejos para tu Backlog
              </h3>
              <ul className="text-gray-400 space-y-1 text-sm">
                <li>• Pasa el mouse sobre un juego para cambiar su prioridad</li>
                <li>• Mueve juegos a Favoritos cuando los estés jugando</li>
                <li>• Marca como Completado cuando termines un juego</li>
                <li>• Usa las prioridades para organizar qué jugar primero</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BacklogPage;
