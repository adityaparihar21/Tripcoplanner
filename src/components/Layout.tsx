import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans selection:bg-gray-200">
      <header className="sticky top-0 z-50 bg-[#fafafa]/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={toggleMenu}
                className="p-2 -ml-2 text-gray-500 hover:text-gray-900 md:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link to="/" className="text-xl font-medium tracking-tighter md:text-2xl">
                AURA
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-600">Home</Link>
              <Link to="/" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">Shop</Link>
              <Link to="/" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">About</Link>
              <Link to="/" className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">Journal</Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/cart" className="p-2 text-gray-500 hover:text-gray-900 transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-900"></span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-16 inset-x-0 bg-white border-b border-gray-200 z-40"
          >
            <div className="px-4 py-6 space-y-4">
              <Link to="/" onClick={toggleMenu} className="block text-lg font-medium text-gray-900">Home</Link>
              <Link to="/" onClick={toggleMenu} className="block text-lg font-medium text-gray-500">Shop</Link>
              <Link to="/" onClick={toggleMenu} className="block text-lg font-medium text-gray-500">About</Link>
              <Link to="/" onClick={toggleMenu} className="block text-lg font-medium text-gray-500">Journal</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <span className="text-xl font-medium tracking-tighter">AURA</span>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                Curated home goods for the mindful dweller. Designed with intention, crafted with care.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Shop</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" className="text-sm text-gray-500 hover:text-gray-900">All Products</Link></li>
                <li><Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Furniture</Link></li>
                <li><Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Decor</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" className="text-sm text-gray-500 hover:text-gray-900">FAQ</Link></li>
                <li><Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Shipping & Returns</Link></li>
                <li><Link to="/" className="text-sm text-gray-500 hover:text-gray-900">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Connect</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Instagram</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Pinterest</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-gray-900">Journal</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">&copy; 2026 Aura Home. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
