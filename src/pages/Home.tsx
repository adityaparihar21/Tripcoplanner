import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data';
import { useState } from 'react';
import { ArrowRight, Star } from 'lucide-react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] w-full bg-gray-100 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2062&auto=format&fit=crop" 
          alt="Modern living room interior"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-xl text-white"
            >
              <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-tight">
                Design for Everyday Living
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/90 font-light">
                Discover pieces that bring intention and beauty to your space.
              </p>
              <div className="mt-8">
                <button className="bg-white text-gray-900 px-8 py-3.5 text-sm font-medium hover:bg-gray-100 transition-colors inline-flex items-center group">
                  Shop Collection
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight">Curated Selection</h2>
            <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
              View All
            </Link>
          </div>

          {/* Category Filter */}
          <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar space-x-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2 text-sm rounded-full transition-colors ${
                  activeCategory === category 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
                      <div className="bg-white/90 backdrop-blur text-gray-900 text-xs font-medium px-6 py-3 shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Quick View
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                    </div>
                    <span className="text-base font-medium text-gray-900">${product.price.toFixed(2)}</span>
                  </div>
                  <div className="mt-2 flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
                    <span className="text-xs font-medium text-gray-900">{product.rating}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-medium tracking-tight">The Art of Subtraction</h2>
                <p className="mt-6 text-gray-600 leading-relaxed text-lg font-light">
                  We believe that a well-designed space is not about filling it with things, but curating it with purpose. Our pieces are crafted by independent makers who prioritize materials, longevity, and timeless forms over fleeting trends.
                </p>
                <button className="mt-8 text-sm font-medium text-gray-900 uppercase tracking-widest hover:text-gray-500 transition-colors pb-1 border-b border-gray-900 hover:border-gray-500">
                  Read Our Story
                </button>
              </motion.div>
            </div>
            <div className="order-1 md:order-2">
              <div className="aspect-square overflow-hidden rounded-sm">
                <img 
                  src="https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?q=80&w=2009&auto=format&fit=crop" 
                  alt="Craftsmanship detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
