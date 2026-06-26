import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, Calendar, Users, ArrowRight, CheckCircle2, Globe2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navigation from '../components/Navigation';

export default function Landing() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [isPlanning, setIsPlanning] = useState(false);
  const [planningStep, setPlanningStep] = useState(0);

  const steps = [
    "Analyzing destination context...",
    "Planner Agent mapping routes...",
    "Budget Agent optimizing costs...",
    "Local Guide finding hidden gems...",
    "Finalizing your itinerary..."
  ];

  const handleStartPlanning = (e: FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    
    setIsPlanning(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setPlanningStep(step);
      if (step >= steps.length) {
        clearInterval(interval);
        setTimeout(() => navigate('/dashboard'), 800);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-tertiary text-secondary selection:bg-primary/30">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          {/* Background Map/Grid decoration */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_60%)]"></div>
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: '0.1' }}></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <div className="inline-flex items-center space-x-2 bg-neutral px-4 py-2 rounded-full mb-8 border border-neutral-light">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-secondary/80">TripCo 2.0 is now live</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight tracking-tight">
                The <span className="text-primary italic">Intelligence</span> Behind<br/>Every Great Journey
              </h1>
              
              <p className="text-lg md:text-xl text-secondary/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Experience the world's first AI Travel Operating System. Far beyond a simple itinerary generator, TripCo plans, reasons, adapts, and remembers every detail.
              </p>

              {/* Search/Input Bar */}
              <motion.div 
                className="bg-neutral p-2 rounded-2xl md:rounded-full border border-neutral-light/50 shadow-2xl max-w-3xl mx-auto backdrop-blur-md relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <form onSubmit={handleStartPlanning} className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-neutral-light">
                  <div className="flex items-center flex-1 px-4 py-3 md:py-2 w-full">
                    <MapPin className="w-5 h-5 text-secondary/40 mr-3 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Where do you want to go?" 
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-secondary placeholder:text-secondary/30 text-lg font-medium"
                      disabled={isPlanning}
                    />
                  </div>
                  
                  <div className="flex items-center px-4 py-3 md:py-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-neutral-light group">
                    <Calendar className="w-5 h-5 text-secondary/40 mr-3 shrink-0" />
                    <div className="flex flex-col w-full">
                      <span className="text-[10px] text-secondary/50 font-medium uppercase tracking-wider mb-0.5">Dates</span>
                      <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-transparent text-sm outline-none text-secondary [&::-webkit-calendar-picker-indicator]:invert-[0.8] w-full" 
                        disabled={isPlanning}
                      />
                    </div>
                  </div>

                  <div className="flex items-center px-4 py-3 md:py-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-neutral-light group">
                    <Users className="w-5 h-5 text-secondary/40 mr-3 shrink-0" />
                    <div className="flex flex-col w-full">
                      <span className="text-[10px] text-secondary/50 font-medium uppercase tracking-wider mb-0.5">Travelers</span>
                      <input 
                        type="number" 
                        min="1" 
                        max="20"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="bg-transparent text-sm outline-none text-secondary w-full" 
                        disabled={isPlanning}
                      />
                    </div>
                  </div>

                  <div className="px-2 py-2 w-full md:w-auto">
                    <button 
                      type="submit"
                      disabled={isPlanning || !destination}
                      className="w-full md:w-auto bg-primary text-tertiary px-8 py-4 rounded-xl md:rounded-full font-medium hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isPlanning ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-tertiary border-t-transparent rounded-full animate-spin"></div>
                          <span>Planning...</span>
                        </div>
                      ) : (
                        <>
                          <span>Start Planning</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* AI Planning Progress Overlay */}
                <AnimatePresence>
                  {isPlanning && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-full left-0 right-0 mt-4 bg-neutral border border-neutral-light rounded-2xl p-6 shadow-2xl overflow-hidden"
                    >
                      <div className="relative z-10">
                        <div className="flex items-center space-x-3 mb-6">
                          <Sparkles className="w-6 h-6 text-primary" />
                          <h3 className="text-lg font-serif">TripCo Multi-Agent AI System</h3>
                        </div>
                        <div className="space-y-4">
                          {steps.map((step, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ 
                                opacity: idx <= planningStep ? 1 : 0.3,
                                x: 0 
                              }}
                              className="flex items-center space-x-3"
                            >
                              {idx < planningStep ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald" />
                              ) : idx === planningStep ? (
                                <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-neutral-light"></div>
                              )}
                              <span className={`text-sm ${idx === planningStep ? 'text-primary font-medium' : 'text-secondary/70'}`}>
                                {step}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="mt-16 flex flex-wrap justify-center gap-8 text-secondary/40">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm">Personalized to you</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe2 className="w-4 h-4" />
                  <span className="text-sm">Global coverage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Multi-agent intelligence</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Five Stages Section */}
        <section id="features" className="py-24 bg-tertiary border-t border-neutral relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-serif mb-6">Five Stages of Travel. One Platform.</h2>
              <p className="text-secondary/60 text-lg font-light">TripCo intelligently assists you throughout the entire lifecycle of your journey.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { title: 'Dream', desc: 'Find inspiration based on your unique travel style.' },
                { title: 'Plan', desc: 'Multi-agent AI handles the complex logistics.' },
                { title: 'Optimize', desc: 'Refine routes, budgets, and schedules automatically.' },
                { title: 'Travel', desc: 'Live alerts and offline maps act as your copilot.' },
                { title: 'Remember', desc: 'AI-generated journals and memories post-trip.' },
              ].map((stage, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-neutral p-8 rounded-2xl border border-neutral-light hover:border-primary/50 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-tertiary border border-neutral-light flex items-center justify-center mb-6 text-primary font-serif">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{stage.title}</h3>
                  <p className="text-sm text-secondary/50 leading-relaxed font-light">{stage.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
