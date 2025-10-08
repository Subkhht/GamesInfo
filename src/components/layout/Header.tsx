import { NavLink } from 'react-router-dom';
import { Search, Heart, Trophy, Star, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header = () => {
  const navItems = [
    { to: '/', icon: Search, label: 'Buscar' },
    { to: '/favorites', icon: Heart, label: 'Favoritos' },
    { to: '/completed', icon: Trophy, label: 'Completados' },
    { to: '/reviews', icon: Star, label: 'Reviews' },
  ];

  return (
    <header className="bg-dark-bg/95 backdrop-blur-lg border-b-2 border-primary-500 sticky top-0 z-50 shadow-lg shadow-primary-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Gamepad2 className="w-10 h-10 text-primary-500 animate-pulse-slow" />
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              GamesInfo
            </h1>
          </motion.div>

          {/* Navigation */}
          <nav className="flex gap-2 flex-wrap">
            {navItems.map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 border-2 ${
                      isActive
                        ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/50'
                        : 'border-primary-500 text-gray-300 hover:bg-primary-500/20 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </NavLink>
              </motion.div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
