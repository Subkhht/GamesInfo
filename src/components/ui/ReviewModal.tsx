import { useState } from 'react';
import { X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: number;
  gameName: string;
  gameImage: string;
  existingReview?: {
    rating: number;
    text: string;
  };
  onSubmit: (rating: number, text: string) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  gameName,
  gameImage,
  existingReview,
  onSubmit,
}) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [text, setText] = useState(existingReview?.text || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Por favor selecciona una calificación');
      return;
    }
    onSubmit(rating, text);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-dark-card rounded-2xl border-2 border-primary-500 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src={gameImage}
                alt={gameName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {existingReview ? 'Editar Review' : 'Escribir Review'}
                </h2>
                <p className="text-gray-400">{gameName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Stars */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Calificación *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'text-gray-600'
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-gray-400 mt-2">
                  {rating === 1 && '😞 Muy malo'}
                  {rating === 2 && '😕 Malo'}
                  {rating === 3 && '😐 Regular'}
                  {rating === 4 && '😊 Bueno'}
                  {rating === 5 && '😍 Excelente'}
                </p>
              )}
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Tu opinión (opcional)
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="¿Qué te pareció este juego? Comparte tu experiencia..."
                className="w-full h-40 px-4 py-3 bg-gray-800 border-2 border-primary-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                maxLength={500}
              />
              <p className="text-gray-400 text-sm mt-2">
                {text.length}/500 caracteres
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                onClick={onClose}
                variant="ghost"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={rating === 0}
              >
                {existingReview ? 'Actualizar Review' : 'Publicar Review'}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
