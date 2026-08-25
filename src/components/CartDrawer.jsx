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

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden border-l editorial-border">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b editorial-border-light flex items-center justify-between bg-zinc-50">
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-ember">
                OMNICHANNEL TRAY
              </div>
              <h2 className="font-syne font-black text-xl text-brand-dark">Your Order Spec</h2>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-10 h-10 rounded-xl bg-white border editorial-border-light hover:bg-zinc-100 flex items-center justify-center text-zinc-600 transition min-h-[44px] min-w-[44px]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 font-sans">
            
            {/* Fulfillment Mode Switcher with 44px Touch Targets */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-bold text-zinc-700 uppercase">Fulfillment Protocol</div>
              <div className="grid grid-cols-2 gap-2">
                {FULFILLMENT_MODES.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setFulfillmentMode(mode.id)}
                    className={`p-2.5 sm:p-3 rounded-2xl border text-left transition flex items-center gap-2.5 min-h-[48px] ${
                      fulfillmentMode === mode.id
                        ? 'bg-brand-dark text-white border-brand-ember shadow-md ring-1 ring-brand-ember'
                        : 'bg-zinc-50 editorial-border-light hover:border-brand-ember text-zinc-700'
                    }`}
                  >
                    <span className="text-lg">{mode.icon}</span>
                    <div className="overflow-hidden">
                      <div className="font-syne font-bold text-xs truncate">{mode.name}</div>
                      <div className="text-[10px] opacity-70 truncate font-mono">{mode.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Inputs based on mode */}
            {fulfillmentMode === 'curbside' && (
              <div className="bg-red-50/50 p-4 rounded-2xl border border-brand-ember/20 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-ember uppercase">
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
                      className="w-full bg-white border editorial-border-light rounded-xl p-2 text-brand-dark text-xs min-h-[40px]"
                      placeholder="e.g. Black Thar"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-1 font-semibold">Plate Number</label>
                    <input
                      type="text"
                      value={curbsideInfo.plateNumber}
                      onChange={(e) => setCurbsideInfo({...curbsideInfo, plateNumber: e.target.value})}
                      className="w-full bg-white border editorial-border-light rounded-xl p-2 text-brand-dark text-xs font-mono font-semibold min-h-[40px]"
                      placeholder="CH-01-XX-0007"
                    />
                  </div>
                </div>
              </div>
            )}

            {fulfillmentMode === 'delivery' && (
              <div className="bg-zinc-50 p-4 rounded-2xl border editorial-border-light space-y-2">
                <label className="text-[10px] text-zinc-500 uppercase font-bold block">Delivery Address (Chandigarh / Tricity)</label>
                <input
                  type="text"
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                  className="w-full bg-white border editorial-border-light rounded-xl p-2.5 text-brand-dark text-xs font-medium min-h-[40px]"
                  placeholder="House / Flat No., Sector / Phase"
                />
              </div>
            )}

            {fulfillmentMode === 'dinein' && (
              <div className="bg-zinc-50 p-4 rounded-2xl border editorial-border-light space-y-2">
                <label className="text-[10px] text-zinc-500 uppercase font-bold block">Table Number (Inside Sector 8 Store)</label>
                <input
                  type="text"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full bg-white border editorial-border-light rounded-xl p-2.5 text-brand-dark text-xs font-mono font-bold min-h-[40px]"
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
                <div className="text-center py-10 bg-zinc-50 rounded-2xl border editorial-border-light space-y-2">
                  <div className="text-3xl">🍔</div>
                  <p className="text-sm font-syne font-bold text-brand-dark">Your tray is empty</p>
                  <p className="text-xs text-zinc-500">Add a flame-seared burger or combo tray to start.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-zinc-50 p-3 sm:p-3.5 rounded-2xl border editorial-border-light flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="font-syne font-bold text-xs sm:text-sm text-brand-dark leading-snug">
                          {item.name}
                        </div>
                        <div className="font-mono text-xs font-bold text-brand-ember">
                          ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                        </div>
                        {item.modifiers && Object.keys(item.modifiers).length > 0 && (
                          <div className="text-[10px] text-zinc-500">
                            {JSON.stringify(item.modifiers).replace(/[{"}]/g, '').replace(/,/g, ' · ')}
                          </div>
                        )}
                      </div>

                      {/* Accessible Quantity Controls (40px touch targets) */}
                      <div className="flex items-center gap-1 bg-white px-1.5 py-1 rounded-xl border editorial-border-light">
                        <button
                          onClick={() => updateQuantity(idx, -1)}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-600 hover:text-black transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono text-xs font-bold text-brand-dark px-1 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(idx, 1)}
                          className="w-8 h-8 rounded-lg hover:bg-zinc-100 flex items-center justify-center text-zinc-600 hover:text-black transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Delete (40px touch target) */}
                      <button
                        onClick={() => removeFromCart(idx)}
                        className="w-9 h-9 rounded-xl hover:bg-red-50 text-zinc-400 hover:text-brand-ember flex items-center justify-center transition"
                        aria-label="Remove item"
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
              <div className="bg-zinc-50 p-4 rounded-2xl border editorial-border-light space-y-2 text-xs">
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
                <div className="pt-2 border-t editorial-border-light flex justify-between font-syne font-black text-base text-brand-dark">
                  <span>Final Total</span>
                  <span className="font-mono text-xl text-brand-ember">₹{total}</span>
                </div>
              </div>
            )}

          </div>

          {/* Drawer Footer / Checkout CTA */}
          <div className="p-4 sm:p-6 border-t editorial-border-light bg-white space-y-3 pb-safe">
            {!otpStep ? (
              <button
                onClick={handleProceedToAuth}
                disabled={cart.length === 0}
                className={`w-full py-4 rounded-2xl font-syne font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl transition min-h-[48px] ${
                  cart.length === 0
                    ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                    : 'bg-brand-ember hover:bg-red-700 text-white shadow-brand-ember/30 hover:scale-[1.02]'
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
                  className="w-full py-4 rounded-2xl bg-brand-ember hover:bg-red-700 text-white font-syne font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-ember/30 hover:brightness-105 min-h-[48px]"
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
