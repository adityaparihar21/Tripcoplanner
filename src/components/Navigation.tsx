import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plane, Menu, X, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-tertiary/80 backdrop-blur-md border-b border-neutral">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-full bg-neutral flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Plane className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-serif tracking-wide font-medium">TripCo</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <a href="#features" onClick={(e) => handleScrollToSection(e, "features")} className="text-sm font-medium text-secondary/70 hover:text-primary transition-colors cursor-pointer">Features</a>
            <Link to="/auth" className="text-sm font-medium text-secondary/70 hover:text-primary transition-colors cursor-pointer">Agents</Link>
            <div className="w-px h-4 bg-neutral"></div>
            <Link to="/auth" className="text-sm font-medium text-secondary hover:text-primary transition-colors flex items-center">
              Sign In
            </Link>
            <Link to="/auth" className="bg-primary text-tertiary px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary-hover transition-colors flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Start Planning</span>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-secondary hover:text-primary transition-colors p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-tertiary border-b border-neutral overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
              <a href="#features" onClick={(e) => handleScrollToSection(e, "features")} className="text-secondary/70 hover:text-primary font-medium p-2">Features</a>
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary/70 hover:text-primary font-medium p-2">Agents</Link>
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary hover:text-primary font-medium p-2">
                Sign In
              </Link>
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="bg-primary text-tertiary px-5 py-3 rounded-xl text-center font-medium hover:bg-primary-hover mt-4 flex justify-center items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Start Planning</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
