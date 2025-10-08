import { useGamesStore } from '../store/gamesStore';
import { Star, Trash2, Edit, Pen } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const ReviewsPage = () => {
  const { reviews, removeReview } = useGamesStore();

  const handleDelete = (gameId: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta review?')) {
      removeReview(gameId);
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Pen className="w-24 h-24 text-gray-600 mb-4" />
        <h2 className="text-3xl font-bold text-gray-400 mb-2">No has escrito ninguna review</h2>
        <p className="text-gray-500">Escribe reviews para compartir tu opinión sobre los juegos</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold flex items-center gap-3 text-yellow-500">
        ⭐ Mis Reviews
        <span className="text-lg text-gray-400">({reviews.length})</span>
      </h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.gameId}
            className="bg-dark-card p-6 rounded-2xl border-2 border-primary-500 shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Image */}
              <img
                src={review.gameImage || 'https://via.placeholder.com/200x120?text=No+Image'}
                alt={review.gameName}
                className="w-full md:w-48 h-32 object-cover rounded-xl"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/200x120?text=No+Image';
                }}
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-400 mb-1">
                      {review.gameName}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {format(new Date(review.date), "d 'de' MMMM, yyyy", { locale: es })}
                    </p>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`w-6 h-6 ${
                          index < review.rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-4">{review.text}</p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => console.log('Edit review:', review.gameId)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="hidden sm:inline">Editar</span>
                  </button>

                  <button
                    onClick={() => handleDelete(review.gameId)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
