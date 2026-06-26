import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data';
import { motion } from 'motion/react';
import { ChevronRight, Minus, Plus, Truck, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function ProductDetails() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-medium">Product not found</h2>
        <Link to="/" className="mt-4 text-sm underline hover:text-gray-500">Return to Shop</Link>
      </div>
    );
  }

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/" className="hover:text-gray-900 transition-colors">{product.category}</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Images */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Mock thumbnail gallery */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={`aspect-square bg-gray-100 rounded-sm overflow-hidden cursor-pointer ${item === 1 ? 'ring-2 ring-gray-900' : 'opacity-60 hover:opacity-100'}`}>
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Details */}
        <div className="flex flex-col pt-4 lg:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl font-medium text-gray-900 tracking-tight">{product.name}</h1>
            <p className="mt-4 text-2xl text-gray-900">${product.price.toFixed(2)}</p>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-gray-600 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center justify-between border border-gray-200 p-1 sm:w-32">
                <button 
                  onClick={decreaseQuantity}
                  className="p-3 text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                <button 
                  onClick={increaseQuantity}
                  className="p-3 text-gray-500 hover:text-gray-900 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button className="flex-1 bg-gray-900 text-white px-8 py-4 text-sm font-medium hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
            </div>

            <div className="mt-12 space-y-6">
              <div className="flex items-start">
                <Truck className="w-5 h-5 text-gray-400 mr-4 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Free Standard Shipping</h4>
                  <p className="mt-1 text-sm text-gray-500">Delivery in 3-5 business days. Ships directly from our studio.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to all products
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
