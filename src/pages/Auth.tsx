import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, ArrowRight, Github } from 'lucide-react';

export default function Auth() {
  const navigate = useNavigate();

  const handleAuth = (e: FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-tertiary flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="flex items-center space-x-2 group mb-12">
            <div className="w-10 h-10 rounded-full bg-neutral flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Plane className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-serif tracking-wide font-medium text-secondary">TripCo</span>
          </Link>

          <div>
            <h2 className="mt-6 text-3xl font-serif text-secondary">Welcome back</h2>
            <p className="mt-2 text-sm text-secondary/60">
              Sign in to continue planning your next adventure.
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleAuth} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary/80">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    defaultValue="alex@example.com"
                    className="appearance-none block w-full px-4 py-3 bg-neutral border border-neutral-light rounded-xl text-secondary placeholder-secondary/30 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-tertiary bg-primary hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-tertiary space-x-2"
                >
                  <span>Continue with Email</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-light" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-tertiary text-secondary/50">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="w-full flex justify-center items-center px-4 py-3 border border-neutral-light rounded-xl shadow-sm bg-neutral text-sm font-medium text-secondary hover:bg-neutral-light transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="w-full flex justify-center items-center px-4 py-3 border border-neutral-light rounded-xl shadow-sm bg-neutral text-sm font-medium text-secondary hover:bg-neutral-light transition-colors"
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </button>
              </div>
            </div>
            
            <p className="mt-8 text-center text-sm text-secondary/60">
              Don't have an account?{' '}
              <button onClick={() => navigate('/dashboard')} className="font-medium text-primary hover:text-primary-hover bg-transparent border-none p-0 cursor-pointer">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
          alt="Travel landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tertiary/90 to-tertiary/20 mix-blend-multiply" />
        <div className="absolute bottom-12 left-12 right-12 text-secondary">
          <blockquote className="space-y-2">
            <p className="text-2xl font-serif font-medium italic">
              "TripCo feels like having a world-class travel agent, a personal assistant, and a local guide all in my pocket."
            </p>
            <footer className="text-sm font-medium text-secondary/70">
              — Sarah Jenkins, Solo Traveler
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
