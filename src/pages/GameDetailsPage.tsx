import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Star, Calendar, Users, Trophy, Heart, Check, MessageSquare, BookMarked } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { gamesApi } from '../services/gamesApi';
import { useGamesStore } from '../store/gamesStore';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ReviewModal } from '../components/ui/ReviewModal';
import { ImageLightbox } from '../components/ui/ImageLightbox';

const GameDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    addFavorite, removeFavorite, addCompleted, removeCompleted, 
    addBacklog, removeBacklog, isFavorite, isCompleted, isBacklog,
    addReview, reviews 
  } = useGamesStore();
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data: game, isLoading: gameLoading } = useQuery({
    queryKey: ['game', id],
    queryFn: () => gamesApi.getGameDetails(Number(id)),
    enabled: !!id,
  });

  const { data: trailers } = useQuery({
    queryKey: ['trailers', id],
    queryFn: () => gamesApi.getGameTrailers(Number(id)),
    enabled: !!id,
  });

  const { data: screenshots } = useQuery({
    queryKey: ['screenshots', id],
    queryFn: () => gamesApi.getGameScreenshots(Number(id)),
    enabled: !!id,
  });

  // Similar games based on genres
  const { data: similarGames } = useQuery({
    queryKey: ['similar', id, game?.genres],
    queryFn: () => {
      const genreIds = game?.genres.map((g) => g.id).join(',');
      return gamesApi.getGames({
        genres: genreIds,
        page: 1,
        page_size: 6,
      });
    },
    enabled: !!game && game.genres.length > 0,
  });

  if (gameLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
        <p className="text-white ml-4">Cargando juego...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-gray-400">Juego no encontrado</p>
      </div>
    );
  }

  const isFav = isFavorite(game.id);
  const isComp = isCompleted(game.id);

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFavorite(game.id);
    } else {
      addFavorite(game as any);
    }
  };

  const handleToggleCompleted = () => {
    if (isComp) {
      removeCompleted(game.id);
    } else {
      addCompleted(game as any);
    }
  };

  const handleSubmitReview = (rating: number, text: string) => {
    addReview({
      gameId: game.id,
      gameName: game.name,
      gameImage: game.background_image,
      rating,
      text,
      date: new Date().toISOString(),
    });
  };

  const existingReview = reviews.find(r => r.gameId === game.id);

  const getPegiRating = () => {
    if (!game.esrb_rating) return null;
    const ratingMap: { [key: string]: string } = {
      'everyone': '3',
      'everyone-10-plus': '7',
      'teen': '12',
      'mature': '18',
      'adults-only': '18',
    };
    return ratingMap[game.esrb_rating.slug] || game.esrb_rating.name;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Back Button */}
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        className="mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver
      </Button>

      {/* Header with Background */}
      <div className="relative h-96 rounded-2xl overflow-hidden">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-5xl font-bold text-white mb-4">{game.name}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {game.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-primary-500 text-white rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            
            {getPegiRating() && (
              <div className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg text-2xl">
                {getPegiRating()}+
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trailer - Moved to top for prominence */}
      {trailers && trailers.results && trailers.results.length > 0 ? (
        <div className="bg-dark-card p-6 rounded-2xl border-2 border-primary-500 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
            🎬 Trailer Oficial
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
            <video
              controls
              autoPlay
              muted
              poster={trailers.results[0].preview}
              className="w-full h-full bg-black"
              src={trailers.results[0].data.max}
            >
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        </div>
      ) : (
        <div className="bg-dark-card p-6 rounded-2xl border-2 border-gray-700">
          <h2 className="text-2xl font-bold text-gray-400 mb-2 flex items-center gap-3">
            🎬 Trailer
          </h2>
          <p className="text-gray-500">
            No hay trailer disponible para este juego en este momento.
          </p>
        </div>
      )}

      {/* Stats & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-dark-card p-6 rounded-xl border-2 border-primary-500">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-3xl font-bold text-white">{game.rating}</p>
              <p className="text-gray-400 text-sm">Rating</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-card p-6 rounded-xl border-2 border-primary-500">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-xl font-bold text-white">{game.released}</p>
              <p className="text-gray-400 text-sm">Lanzamiento</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-card p-6 rounded-xl border-2 border-primary-500">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-xl font-bold text-white">{game.ratings_count.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">Reviews</p>
            </div>
          </div>
        </div>

        {game.metacritic && (
          <div className="bg-dark-card p-6 rounded-xl border-2 border-primary-500">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-3xl font-bold text-white">{game.metacritic}</p>
                <p className="text-gray-400 text-sm">Metacritic</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={handleToggleFavorite}
          variant={isFav ? 'secondary' : 'primary'}
          size="lg"
        >
          <Heart className={`w-5 h-5 mr-2 ${isFav ? 'fill-current' : ''}`} />
          {isFav ? 'En Favoritos' : 'Añadir a Favoritos'}
        </Button>

        <Button
          onClick={handleToggleCompleted}
          variant={isComp ? 'secondary' : 'primary'}
          size="lg"
        >
          <Check className="w-5 h-5 mr-2" />
          {isComp ? 'Completado' : 'Marcar como Completado'}
        </Button>

        <Button
          onClick={() => {
            if (isBacklog(game.id)) {
              removeBacklog(game.id);
            } else {
              addBacklog(game as any);
            }
          }}
          variant={isBacklog(game.id) ? 'secondary' : 'primary'}
          size="lg"
        >
          <BookMarked className={`w-5 h-5 mr-2 ${isBacklog(game.id) ? 'fill-current' : ''}`} />
          {isBacklog(game.id) ? 'En Backlog' : 'Añadir a Backlog'}
        </Button>

        <Button
          onClick={() => setIsReviewModalOpen(true)}
          variant="primary"
          size="lg"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          {existingReview ? 'Editar Review' : 'Escribir Review'}
        </Button>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        gameId={game.id}
        gameName={game.name}
        gameImage={game.background_image}
        existingReview={existingReview}
        onSubmit={handleSubmitReview}
      />

      {/* Description */}
      <div className="bg-dark-card p-6 rounded-2xl border-2 border-primary-500">
        <h2 className="text-3xl font-bold text-white mb-4">📝 Descripción</h2>
        <div
          className="text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: game.description }}
        />
      </div>

      {/* Platforms */}
      <div className="bg-dark-card p-6 rounded-2xl border-2 border-primary-500">
        <h2 className="text-3xl font-bold text-white mb-4">🎮 Plataformas</h2>
        <div className="flex flex-wrap gap-3">
          {game.platforms.map((p) => (
            <span
              key={p.platform.id}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg border-2 border-primary-500"
            >
              {p.platform.name}
            </span>
          ))}
        </div>
      </div>

      {/* Developers & Publishers */}
      {(game.developers?.length > 0 || game.publishers?.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {game.developers && game.developers.length > 0 && (
            <div className="bg-dark-card p-6 rounded-2xl border-2 border-primary-500">
              <h2 className="text-2xl font-bold text-white mb-4">👨‍💻 Desarrolladores</h2>
              <div className="space-y-2">
                {game.developers.map((dev) => (
                  <p key={dev.id} className="text-gray-300">{dev.name}</p>
                ))}
              </div>
            </div>
          )}

          {game.publishers && game.publishers.length > 0 && (
            <div className="bg-dark-card p-6 rounded-2xl border-2 border-primary-500">
              <h2 className="text-2xl font-bold text-white mb-4">🏢 Publicadores</h2>
              <div className="space-y-2">
                {game.publishers.map((pub) => (
                  <p key={pub.id} className="text-gray-300">{pub.name}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Screenshots */}
      {screenshots && screenshots.results.length > 0 && (
        <div className="bg-dark-card p-6 rounded-2xl border-2 border-primary-500">
          <h2 className="text-3xl font-bold text-white mb-4">📸 Capturas de Pantalla</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screenshots.results.slice(0, 6).map((screenshot, idx) => (
              <motion.img
                key={screenshot.id}
                src={screenshot.image}
                alt={`Screenshot ${screenshot.id}`}
                className="w-full h-48 object-cover rounded-xl cursor-pointer hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setLightboxIndex(idx);
                  setLightboxOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Image Lightbox */}
      {screenshots && screenshots.results.length > 0 && (
        <ImageLightbox
          images={screenshots.results.slice(0, 6)}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNext={() => setLightboxIndex((prev) => Math.min(prev + 1, screenshots.results.length - 1))}
          onPrevious={() => setLightboxIndex((prev) => Math.max(prev - 1, 0))}
        />
      )}

      {/* Tags */}
      {game.tags && game.tags.length > 0 && (
        <div className="bg-dark-card p-6 rounded-2xl border-2 border-primary-500">
          <h2 className="text-3xl font-bold text-white mb-4">🏷️ Tags</h2>
          <div className="flex flex-wrap gap-2">
            {game.tags.slice(0, 15).map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-primary-500"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Similar Games */}
      {similarGames && similarGames.results.length > 0 && (
        <div className="bg-dark-card p-6 rounded-2xl border-2 border-primary-500">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">🎮 Juegos Similares</h2>
            <button
              onClick={() => {
                const genreIds = game.genres.map((g) => g.id).join(',');
                navigate(`/?genres=${genreIds}`);
              }}
              className="text-primary-500 hover:text-primary-400 font-semibold flex items-center gap-2"
            >
              Ver más
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarGames.results
              .filter((g) => g.id !== game.id)
              .slice(0, 6)
              .map((similarGame) => (
                <button
                  key={similarGame.id}
                  onClick={() => navigate(`/game/${similarGame.id}`)}
                  className="group bg-gray-800 rounded-2xl overflow-hidden border-2 border-transparent hover:border-primary-500 transition-all duration-300 transform hover:scale-105 text-left"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    {similarGame.background_image ? (
                      <img
                        src={similarGame.background_image}
                        alt={similarGame.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                        <span className="text-gray-600 text-4xl">🎮</span>
                      </div>
                    )}
                    {similarGame.rating && (
                      <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded-lg flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-white font-bold">{similarGame.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-white font-bold text-lg line-clamp-2 mb-2 group-hover:text-primary-500 transition-colors">
                      {similarGame.name}
                    </h3>
                    {similarGame.released && (
                      <p className="text-gray-400 text-sm">
                        {new Date(similarGame.released).getFullYear()}
                      </p>
                    )}
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GameDetailsPage;
