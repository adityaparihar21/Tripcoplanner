import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Sparkles, BrainCircuit, Map, CalendarHeart, Camera } from 'lucide-react';

const phases = [
  { id: 'dream', label: 'Dreaming up destinations', icon: Sparkles, duration: 2000 },
  { id: 'plan', label: 'Crafting the perfect itinerary', icon: Map, duration: 3000 },
  { id: 'book', label: 'Finding the best spots', icon: BrainCircuit, duration: 2500 },
  { id: 'experience', label: 'Curating unique experiences', icon: CalendarHeart, duration: 2000 },
  { id: 'remember', label: 'Finalizing your memory book', icon: Camera, duration: 2000 },
];

export default function AIPlannerLoading() {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const advancePhase = (index: number) => {
      if (index < phases.length - 1) {
        timeout = setTimeout(() => {
          setCurrentPhaseIndex(index + 1);
          advancePhase(index + 1);
        }, phases[index].duration);
      }
    };

    advancePhase(0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-tertiary/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-6"
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6"
          >
            <Sparkles className="w-10 h-10" />
          </motion.div>
          <h2 className="text-3xl font-serif text-secondary mb-2">TripCo AI</h2>
          <p className="text-secondary/60">Designing your dream journey...</p>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = index === currentPhaseIndex;
              const isPast = index < currentPhaseIndex;
              
              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isActive || isPast ? 1 : 0.4, 
                    y: 0,
                    scale: isActive ? 1.02 : 1
                  }}
                  className={`flex items-center p-4 rounded-2xl border transition-all duration-500 ${
                    isActive 
                      ? 'bg-neutral border-primary/30 shadow-lg shadow-primary/5' 
                      : isPast
                        ? 'bg-neutral/50 border-neutral-light text-secondary/60'
                        : 'bg-transparent border-transparent text-secondary/40'
                  }`}
                >
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 transition-colors duration-500 ${
                    isActive ? 'bg-primary text-tertiary shadow-md shadow-primary/20' : isPast ? 'bg-neutral-light text-secondary/60' : 'bg-neutral-light/50 text-secondary/40'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${isActive ? 'text-primary' : ''}`}>
                      {phase.label}
                    </p>
                  </div>
                  {isActive && (
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-primary"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
