import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FULFILLMENT_MODES } from '../data/menuData';
import { X, Trash2, Plus, Minus, Car, ShieldCheck, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    tax,
    packagingFee,
    deliveryFee,
    total,
    fulfillmentMode,
    setFulfillmentMode,
    curbsideInfo,
    setCurbsideInfo,
    deliveryInfo,
    setDeliveryInfo,
    tableNumber,
    setTableNumber,
    placeOrder
  } = useCart();

  const [otpStep, setOtpStep] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isCartOpen) return null;

  const handleProceedToAuth = () => {
    if (cart.length === 0) return;
    setOtpStep(true);
  };

  const handleConfirmOrder = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setOtpStep(false);
      placeOrder('upi_whatsapp');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFCF7] border-l border-black/10 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-black/10 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-orange animate-ping" />
              <h2 className="font-syne font-black text-xl text-brand-dark">Your Fire Order</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Fulfillment Mode Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-zinc-500">
                Fulfillment Channel:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {FULFILLMENT_MODES.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setFulfillmentMode(mode.id)}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                      fulfillmentMode === mode.id
                        ? 'bg-orange-50 border-brand-orange text-brand-dark shadow-sm'
                        : 'bg-white border-black/5 text-zinc-600 hover:border-black/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-lg">{mode.icon}</span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-brand-orange/10 text-brand-orange">
                        {mode.badge}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="font-syne font-bold text-xs leading-tight text-brand-dark">{mode.name}</div>
                      <div className="text-[10px] text-zinc-500 line-clamp-1">{mode.subtext}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Fulfillment Custom Fields */}
            {fulfillmentMode === 'curbside' && (
              <div className="card-light p-4 rounded-2xl border-brand-orange/40 space-y-3 bg-orange-50/50">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-orange uppercase">
                  <Car className="w-4 h-4" />
                  <span>Sector 8 Curbside Car-Hop Details</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-1 font-semibold">Car Model / Color</label>
                    <input
                      type="text"
                      value={curbsideInfo.carModel}
                      onChange={(e) => setCurbsideInfo({...curbsideInfo, carModel: e.target.value})}
                      className="w-full bg-white border border-black/10 rounded-xl p-2 text-brand-dark text-xs"
                      placeholder="e.g. Black Thar"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-1 font-semibold">Plate Number</label>
                    <input
                      type="text"
                      value={curbsideInfo.plateNumber}
                      onChange={(e) => setCurbsideInfo({...curbsideInfo, plateNumber: e.target.value})}
                      className="w-full bg-white border border-black/10 rounded-xl p-2 text-brand-dark text-xs font-mono font-semibold"
                      placeholder="CH-01-XX-0007"
                    />
                  </div>
                </div>
              </div>
            )}

            {fulfillmentMode === 'delivery' && (
              <div className="card-light p-4 rounded-2xl border-black/10 space-y-2">
                <label className="text-[10px] text-zinc-500 uppercase font-bold block">Delivery Address (Chandigarh / Tricity)</label>
                <input
                  type="text"
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                  className="w-full bg-white border border-black/10 rounded-xl p-2 text-brand-dark text-xs font-medium"
                />
              </div>
            )}

            {fulfillmentMode === 'dinein' && (
              <div className="card-light p-4 rounded-2xl border-black/10 space-y-2">
                <label className="text-[10px] text-zinc-500 uppercase font-bold block">Table Number (Inside Sector 8 Store)</label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full bg-white border border-black/10 rounded-xl p-2 text-brand-dark text-xs font-mono font-bold"
                  placeholder="Table 07"
                />
              </div>
            )}

            {/* Cart Items List */}
            <div className="space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-500">
                Selected Items ({cart.length})
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-10 card-light rounded-2xl border-black/5 space-y-2">
                  <div className="text-3xl">🍔</div>
                  <p className="text-sm font-syne font-bold text-brand-dark">Your tray is empty</p>
                  <p className="text-xs text-zinc-500">Add a flame-seared burger or combo tray to start.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="card-light p-3.5 rounded-2xl border-black/5 flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="font-syne font-bold text-sm text-brand-dark leading-snug">
                          {item.name}
                        </div>
                        <div className="font-mono text-xs font-bold text-brand-orange">
                          ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                        </div>
                        {item.modifiers && Object.keys(item.modifiers).length > 0 && (
                          <div className="text-[10px] text-zinc-500">
                            {JSON.stringify(item.modifiers).replace(/[{"}]/g, '').replace(/,/g, ' · ')}
                          </div>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-zinc-100 px-2 py-1 rounded-xl border border-black/5">
                        <button
                          onClick={() => updateQuantity(idx, -1)}
                          className="text-zinc-600 hover:text-black p-1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs font-bold text-brand-dark px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(idx, 1)}
                          className="text-zinc-600 hover:text-black p-1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(idx)}
                        className="text-zinc-400 hover:text-red-500 p-1.5 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bill Summary */}
            {cart.length > 0 && (
              <div className="card-light p-4 rounded-2xl border-black/10 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Item Subtotal</span>
                  <span className="font-mono">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>GST (5%)</span>
                  <span className="font-mono">₹{tax}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Recyclable Heat Box</span>
                  <span className="font-mono">₹{packagingFee}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-zinc-600">
                    <span>Express Delivery Rider</span>
                    <span className="font-mono">₹{deliveryFee}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-black/10 flex justify-between font-syne font-black text-base text-brand-dark">
                  <span>Final Total</span>
                  <span className="font-mono text-xl text-brand-orange">₹{total}</span>
                </div>
              </div>
            )}

          </div>

          {/* Drawer Footer / Checkout CTA */}
          <div className="p-6 border-t border-black/10 bg-white space-y-3">
            {!otpStep ? (
              <button
                disabled={cart.length === 0}
                onClick={handleProceedToAuth}
                className={`w-full py-4 rounded-2xl font-syne font-extrabold text-sm flex items-center justify-center gap-2 transition shadow-xl ${
                  cart.length === 0
                    ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-brand-orange to-brand-amber text-white shadow-brand-orange/30 hover:scale-[1.02]'
                }`}
              >
                <span>Proceed with 1-Tap OTP · ₹{total}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-3 animate-fade-in">
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                  <span>WhatsApp Cloud OTP auto-verified: <strong className="font-mono font-bold">7864</strong></span>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  disabled={isVerifying}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-syne font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-orange/30 hover:brightness-105"
                >
                  {isVerifying ? (
                    <span>Igniting Fire Kitchen...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm & Send to Kitchen (₹{total})</span>
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Kitchen Dispatch · Strict 6-Min Standard</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
