import { PRODUCTS } from '../data';
import { motion } from 'motion/react';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  // Mock cart using first two products
  const cartItems = [
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[2], quantity: 2 }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping: number = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[70vh]">
      <div className="flex items-baseline justify-between mb-10">
        <h1 className="text-3xl font-medium tracking-tight">Your Cart</h1>
        <span className="text-sm text-gray-500">{cartItems.length} items</span>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <div className="border-t border-gray-200">
            {cartItems.map((item, index) => (
              <motion.div 
                key={item.product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex py-8 border-b border-gray-200"
              >
                <div className="h-32 w-24 shrink-0 overflow-hidden bg-gray-100 rounded-sm sm:h-40 sm:w-32">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                  <div>
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                      </h4>
                      <p className="ml-4 text-sm font-medium text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                  </div>

                  <div className="mt-auto flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center border border-gray-200">
                      <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 font-medium text-xs">{item.quantity}</span>
                      <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button type="button" className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors flex items-center">
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 mt-12 lg:mt-0">
          <div className="bg-[#fafafa] rounded-sm px-6 py-8 border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-500">
                <p>Subtotal</p>
                <p className="text-gray-900 font-medium">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-gray-500 pb-4 border-b border-gray-200">
                <p>Shipping</p>
                <p className="text-gray-900 font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
              </div>
              <div className="flex justify-between items-center pt-2">
                <p className="text-base font-medium text-gray-900">Total</p>
                <p className="text-xl font-medium text-gray-900">${total.toFixed(2)}</p>
              </div>
            </div>

            <button className="w-full mt-8 bg-gray-900 text-white py-4 px-4 text-sm font-medium hover:bg-gray-800 transition-colors flex justify-center items-center group">
              Checkout
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="mt-6 flex justify-center text-sm text-gray-500">
              <p>
                or{' '}
                <Link to="/" className="font-medium text-gray-900 hover:text-gray-700 underline underline-offset-4">
                  Continue Shopping
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
