import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ChevronRight, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step] = useState(2); // 1=cart, 2=info, 3=shipping, 4=payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [placed, setPlaced] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    phone: '',
  });

  const shipping = totalPrice > 5000 ? 0 : 150;
  const finalTotal = totalPrice + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="pt-32 pb-16 px-5 lg:px-8 content-max-width text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-[#8B9D83] flex items-center justify-center mb-6">
          <Check size={32} className="text-white" />
        </div>
        <h1 className="font-heading text-3xl md:text-4xl uppercase mb-4">ORDER PLACED</h1>
        <p className="font-body text-[#A09890] max-w-md mb-8">
          Thank you for your order! We&apos;ve sent a confirmation to your email. Your customized
          pieces will be crafted with care and shipped within 5-7 business days.
        </p>
        <Link to="/shop" className="btn-primary">
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  if (items.length === 0 && !placed) {
    navigate('/cart');
    return null;
  }

  const steps = [
    { id: 1, label: 'Cart', status: step > 1 ? 'completed' : 'current' },
    { id: 2, label: 'Information', status: step === 2 ? 'current' : step > 2 ? 'completed' : 'upcoming' },
    { id: 3, label: 'Shipping', status: step === 3 ? 'current' : step > 3 ? 'completed' : 'upcoming' },
    { id: 4, label: 'Payment', status: step === 4 ? 'current' : 'upcoming' },
  ];

  return (
    <div className="pt-24 pb-16 px-5 lg:px-8 content-max-width">
      <h1 className="font-heading text-3xl md:text-4xl uppercase text-center mb-8">CHECKOUT</h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-12 max-w-lg mx-auto">
        {steps.map((s, index) => (
          <div key={s.id} className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                s.status === 'completed'
                  ? 'bg-[#8B9D83] text-white'
                  : s.status === 'current'
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {s.status === 'completed' ? <Check size={14} /> : s.id}
            </div>
            <span
              className={`hidden sm:inline font-body text-xs ${
                s.status === 'current' ? 'text-black' : 'text-[#A09890]'
              }`}
            >
              {s.label}
            </span>
            {index < steps.length - 1 && <ChevronRight size={14} className="text-[#A09890]" />}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form */}
        <div className="lg:w-[60%]">
          {/* Contact Information */}
          <div className="mb-10">
            <h2 className="font-heading text-xl uppercase mb-6">CONTACT INFORMATION</h2>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              className="w-full px-4 py-3 border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83] transition-colors"
            />
          </div>

          {/* Shipping Address */}
          <div className="mb-10">
            <h2 className="font-heading text-xl uppercase mb-6">SHIPPING ADDRESS</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className="w-full px-4 py-3 border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83]"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className="w-full px-4 py-3 border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83]"
              />
            </div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="w-full px-4 py-3 border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83] mt-4"
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full px-4 py-3 border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83]"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className="w-full px-4 py-3 border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83]"
              />
              <input
                type="text"
                name="pin"
                value={formData.pin}
                onChange={handleInputChange}
                placeholder="PIN code"
                className="w-full px-4 py-3 border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83]"
              />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone number"
              className="w-full px-4 py-3 border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83] mt-4"
            />
          </div>

          {/* Shipping Method */}
          <div className="mb-10">
            <h2 className="font-heading text-xl uppercase mb-6">SHIPPING METHOD</h2>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-4 border border-[#8B9D83] bg-[#8B9D83]/5 cursor-pointer rounded">
                <div className="flex items-center gap-3">
                  <input type="radio" name="shipping" defaultChecked className="accent-[#8B9D83]" />
                  <span className="font-body text-sm">Standard Shipping (3-5 days)</span>
                </div>
                <span className="font-price">{shipping === 0 ? 'FREE' : `BDT ${shipping}`}</span>
              </label>
              <label className="flex items-center justify-between p-4 border border-gray-200 cursor-pointer hover:border-[#8B9D83]/50 rounded transition-colors">
                <div className="flex items-center gap-3">
                  <input type="radio" name="shipping" className="accent-[#8B9D83]" />
                  <span className="font-body text-sm">Express Shipping (1-2 days)</span>
                </div>
                <span className="font-price">BDT 350</span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-10">
            <h2 className="font-heading text-xl uppercase mb-6">PAYMENT METHOD</h2>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`w-full flex items-center gap-4 p-4 border rounded transition-colors ${
                  paymentMethod === 'card' ? 'border-[#8B9D83] bg-[#8B9D83]/5' : 'border-gray-200'
                }`}
              >
                <CreditCard size={20} className="text-[#8B9D83]" />
                <span className="font-body text-sm">Credit / Debit Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`w-full flex items-center gap-4 p-4 border rounded transition-colors ${
                  paymentMethod === 'upi' ? 'border-[#8B9D83] bg-[#8B9D83]/5' : 'border-gray-200'
                }`}
              >
                <Smartphone size={20} className="text-[#8B9D83]" />
                <span className="font-body text-sm">UPI / Wallet</span>
              </button>
              <button
                onClick={() => setPaymentMethod('cod')}
                className={`w-full flex items-center gap-4 p-4 border rounded transition-colors ${
                  paymentMethod === 'cod' ? 'border-[#8B9D83] bg-[#8B9D83]/5' : 'border-gray-200'
                }`}
              >
                <Banknote size={20} className="text-[#8B9D83]" />
                <span className="font-body text-sm">Cash on Delivery</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full px-4 py-3 border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83]"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full px-4 py-3 border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83]"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full px-4 py-3 border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Name on card"
                  className="w-full px-4 py-3 border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83]"
                />
              </div>
            )}

            {paymentMethod === 'upi' && (
              <input
                type="text"
                placeholder="Enter UPI ID (e.g., name@upi)"
                className="w-full px-4 py-3 border border-gray-200 font-body text-sm outline-none focus:border-[#8B9D83]"
              />
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-[40%]">
          <div className="bg-gray-50 p-8 rounded sticky top-24">
            <h3 className="font-heading text-xl uppercase mb-6">ORDER SUMMARY</h3>

            {/* Items */}
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.color}-${item.size}`} className="flex gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                    />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8B9D83] text-white rounded-full flex items-center justify-center text-[0.6rem]">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium truncate">{item.product.name}</p>
                    <p className="font-body text-xs text-[#A09890]">
                      {item.color} / {item.size}
                    </p>
                  </div>
                  <p className="font-price text-sm">
                    BDT {(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-[#A09890]">Subtotal</span>
                <span className="font-price">BDT {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-sm text-[#A09890]">Shipping</span>
                <span className="font-price">{shipping === 0 ? 'FREE' : `BDT ${shipping}`}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                <span className="font-body font-medium">Total</span>
                <span className="font-heading text-xl">BDT {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button onClick={handlePlaceOrder} className="btn-primary w-full mt-6">
              PLACE ORDER
            </button>

            <p className="font-body text-[0.625rem] text-[#A09890] text-center mt-4">
              By placing your order, you agree to our{' '}
              <Link to="/terms" className="underline hover:text-[#8B9D83]">Terms</Link> and{' '}
              <Link to="/privacy" className="underline hover:text-[#8B9D83]">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
