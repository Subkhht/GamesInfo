import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { LoadingSpinner } from './components/ui/LoadingSpinner.tsx';
import { useTheme } from './context/ThemeContext';

// Lazy loading de páginas
const SearchPage = lazy(() => import('./pages/SearchPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage.tsx'));
const CompletedPage = lazy(() => import('./pages/CompletedPage.tsx'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage.tsx'));
const GameDetailsPage = lazy(() => import('./pages/GameDetailsPage'));
const StatsPage = lazy(() => import('./pages/StatsPage'));
const BacklogPage = lazy(() => import('./pages/BacklogPage'));

function App() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-dark-bg via-gray-900 to-dark-bg' 
        : 'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100'
    }`}>
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/game/:id" element={<GameDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/completed" element={<CompletedPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/backlog" element={<BacklogPage />} />
          </Routes>
        </Suspense>
      </main>

      <footer className="bg-dark-card border-t-2 border-primary-500 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p className="mb-2">GamesInfo © 2025 | Powered by RAWG API</p>
          <p className="text-sm">
            Hecho con ❤️ usando React, TypeScript, TailwindCSS y más tecnologías modernas
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
