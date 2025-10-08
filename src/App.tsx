import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

// Lazy loading de páginas
const SearchPage = lazy(() => import('./pages/SearchPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const CompletedPage = lazy(() => import('./pages/CompletedPage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-gray-900 to-dark-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/completed" element={<CompletedPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
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
