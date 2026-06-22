import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Cart() {
  const { items, totalPrice, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const shipping = items.length > 0 ? (totalPrice > 5000 ? 0 : 150) : 0;
  const discount = promoApplied ? Math.round(totalPrice * 0.1) : 0;
  const finalTotal = totalPrice + shipping - discount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'modify10') {
      setPromoApplied(true);
    }
  };

  return (
    <div className="pt-24 pb-16 px-5 lg:px-8 content-max-width min-h-[60vh]">
      <h1 className="font-heading text-4xl md:text-5xl uppercase text-center mb-2">YOUR CART</h1>
      <p className="font-body text-sm text-[#A09890] text-center mb-12">
        {items.length} {items.length === 1 ? 'item' : 'items'}
      </p>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingBag size={64} className="text-[#A09890] mb-6" strokeWidth={1} />
          <h2 className="font-heading text-2xl mb-3">Your cart is empty</h2>
          <p className="font-body text-[#A09890] mb-8">Start shopping to fill it up</p>
          <Link to="/shop" className="btn-outline">
            SHOP NOW
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Items List */}
          <div className="lg:w-[65%]">
            <div className="space-y-0">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.color}-${item.size}`}
                  className="flex gap-6 py-6 border-b border-gray-100"
                >
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Link to={`/product/${item.product.id}`}>
                          <p className="font-body text-sm font-medium hover:text-[#8B9D83] transition-colors">
                            {item.product.name}
                          </p>
                        </Link>
                        <p className="font-body text-xs text-[#A09890] mt-1">
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.color, item.size)}
                        className="p-1 text-[#A09890] hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.color, item.size, item.quantity - 1)
                          }
                          className="px-3 py-1 text-sm hover:bg-gray-50"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.color, item.size, item.quantity + 1)
                          }
                          className="px-3 py-1 text-sm hover:bg-gray-50"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="font-price">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-[35%]">
            <div className="bg-gray-50 p-8 rounded">
              <h3 className="font-heading text-xl uppercase mb-6">ORDER SUMMARY</h3>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className="flex-1 px-4 py-2 bg-white border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83]"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-[#8B9D83] text-white font-label text-xs hover:bg-[#7A8D73] transition-colors"
                >
                  APPLY
                </button>
              </div>
              {promoApplied && (
                <p className="font-body text-xs text-[#8B9D83] mb-4">
                  Promo code applied! 10% off
                </p>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-[#A09890]">Subtotal</span>
                  <span className="font-price">Rs. {totalPrice.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-[#8B9D83]">Discount</span>
                    <span className="font-price text-[#8B9D83]">- Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-[#A09890]">Shipping</span>
                  <span className="font-price">
                    {shipping === 0 ? 'FREE' : `Rs. ${shipping}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                  <span className="font-body font-medium">Total</span>
                  <span className="font-heading text-xl">Rs. {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="btn-primary w-full"
              >
                PROCEED TO CHECKOUT
              </button>

              <button
                onClick={() => navigate('/shop')}
                className="w-full text-center font-body text-xs text-[#A09890] hover:text-[#8B9D83] mt-4 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
