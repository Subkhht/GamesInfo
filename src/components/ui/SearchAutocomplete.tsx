import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { gamesApi } from '../../services/gamesApi';
import { motion, AnimatePresence } from 'framer-motion';
import type { Game } from '../../types/game.types';

interface SearchAutocompleteProps {
  onSearch?: (query: string) => void;
}

export const SearchAutocomplete = ({ onSearch }: SearchAutocompleteProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch suggestions
  const { data: suggestions, isLoading } = useQuery({
    queryKey: ['suggestions', debouncedQuery],
    queryFn: () =>
      gamesApi.getGames({
        search: debouncedQuery,
        page: 1,
        page_size: 8,
      }),
    enabled: debouncedQuery.length >= 2,
  });

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || !suggestions?.results.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectGame(suggestions.results[selectedIndex]);
        } else {
          handleSubmitSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectGame = (game: Game) => {
    navigate(`/game/${game.id}`);
    setIsOpen(false);
    setSearchQuery('');
    setSelectedIndex(-1);
  };

  const handleSubmitSearch = () => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      setIsOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsOpen(value.length >= 2);
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    setSearchQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery.length >= 2 && setIsOpen(true)}
          placeholder="Buscar videojuegos..."
          className="w-full pl-12 pr-12 py-3 bg-gray-800 border-2 border-primary-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isOpen && debouncedQuery.length >= 2 && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-dark-card border-2 border-primary-500 rounded-xl shadow-2xl overflow-hidden"
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-400">
                <div className="animate-spin w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full mx-auto" />
              </div>
            ) : suggestions?.results.length ? (
              <div className="max-h-96 overflow-y-auto">
                {suggestions.results.map((game, index) => (
                  <button
                    key={game.id}
                    onClick={() => handleSelectGame(game)}
                    className={`w-full flex items-center gap-4 p-3 hover:bg-primary-500/20 transition-colors ${
                      index === selectedIndex ? 'bg-primary-500/30' : ''
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                      {game.background_image ? (
                        <img
                          src={game.background_image}
                          alt={game.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                          <Search className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Game Info */}
                    <div className="flex-1 text-left">
                      <h3 className="text-white font-semibold line-clamp-1">
                        {game.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                        {game.released && (
                          <span>{new Date(game.released).getFullYear()}</span>
                        )}
                        {game.rating && (
                          <>
                            <span>•</span>
                            <span className="text-yellow-500">⭐ {game.rating}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-400">
                No se encontraron resultados
              </div>
            )}

            {/* Press Enter hint */}
            {!isLoading && suggestions?.results.length && searchQuery && (
              <div className="border-t border-primary-500/30 p-3 bg-gray-900/50">
                <p className="text-xs text-gray-400 text-center">
                  Presiona <kbd className="px-2 py-1 bg-gray-800 rounded border border-gray-700">Enter</kbd> para buscar más resultados
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
