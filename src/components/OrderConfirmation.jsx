import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Flame, Clock, PhoneCall, X } from 'lucide-react';
import { BRAND_INFO } from '../data/menuData';

export default function OrderConfirmation() {
  const { activeOrder, isOrderModalOpen, setIsOrderModalOpen } = useCart();
  const [seconds, setSeconds] = useState(360);

  useEffect(() => {
    if (!isOrderModalOpen) return;
    const timer = setInterval(() => {
      setSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOrderModalOpen]);

  if (!isOrderModalOpen || !activeOrder) return null;

  const minutes = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;

  const getStageIndex = () => {
    if (seconds > 270) return 0;
    if (seconds > 180) return 1;
    if (seconds > 60) return 2;
    return 3;
  };

  const currentStage = getStageIndex();

  const stages = [
    { title: "Order Accepted & Bun Toasting", desc: "Brushing 5am milk bun with cultured butter" },
    { title: "288°C Flame Cast-Iron Sear", desc: "Searing steak patty to lock crust & juices" },
    { title: "Molten Volcano Core Infusion", desc: "Injecting 88°C smoked gouda core & onions" },
    { title: activeOrder.fulfillmentMode === 'curbside' ? "Delivering to Sector 8 Car Window" : "Counter-to-Hand Ready", desc: "Thermal heat box sealed" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 max-h-[95vh] overflow-y-auto relative shadow-2xl border border-black/10">
        
        {/* Close */}
        <button
          onClick={() => setIsOrderModalOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 text-brand-orange text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 animate-bounce" />
            Live Kitchen Dispatch · #{activeOrder.orderId}
          </div>

          <h3 className="text-2xl sm:text-3xl font-black font-syne text-brand-dark">
            YOUR FIRE IS IGNITED!
          </h3>

          <p className="text-xs text-zinc-600">
            Our kitchen line is preparing your order at #7 Inner Market, Sector 8.
          </p>
        </div>

        {/* 6-Minute Live Countdown Gauge */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 border border-brand-orange/30 text-center space-y-2 shadow-md">
          <div className="text-[11px] uppercase font-extrabold tracking-widest text-brand-orange flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Estimated Counter-to-Hand Time
          </div>

          <div className="font-mono text-5xl sm:text-6xl font-black text-brand-orange tracking-wider">
            {formattedTime}
          </div>

          <p className="text-[11px] text-zinc-600 font-medium">
            Guaranteed under our strict 6-minute commitment.
          </p>
        </div>

        {/* 4-Stage Kitchen Pipeline */}
        <div className="space-y-3">
          <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-700">
            Real-Time Kitchen Progress:
          </div>

          <div className="space-y-2">
            {stages.map((stage, idx) => {
              const isDone = idx < currentStage;
              const isCurrent = idx === currentStage;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex items-center gap-3.5 transition ${
                    isCurrent
                      ? 'bg-orange-50 border-brand-orange text-brand-dark shadow-sm'
                      : isDone
                      ? 'bg-zinc-50 border-black/5 text-zinc-700'
                      : 'bg-white border-black/5 text-zinc-400'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    isDone 
                      ? 'bg-emerald-500 text-white' 
                      : isCurrent 
                      ? 'bg-brand-orange text-white animate-pulse' 
                      : 'bg-zinc-200 text-zinc-500'
                  }`}>
                    {isDone ? '✓' : idx + 1}
                  </div>

                  <div className="space-y-0.5">
                    <div className="font-syne font-bold text-xs">{stage.title}</div>
                    <div className="text-[10px] text-zinc-500">{stage.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fulfillment Summary */}
        <div className="card-light p-4 rounded-2xl border-black/10 text-xs space-y-2">
          <div className="flex items-center justify-between text-zinc-600">
            <span>Channel</span>
            <span className="font-bold text-brand-orange uppercase">{activeOrder.fulfillmentMode}</span>
          </div>

          {activeOrder.curbsideInfo && (
            <div className="flex items-center justify-between text-zinc-600">
              <span>Curbside Vehicle</span>
              <span className="font-mono text-brand-dark font-bold">{activeOrder.curbsideInfo.carModel} ({activeOrder.curbsideInfo.plateNumber})</span>
            </div>
          )}

          <div className="flex items-center justify-between text-zinc-600">
            <span>Amount Paid</span>
            <span className="font-mono font-bold text-brand-dark">₹{activeOrder.total} via Instant UPI</span>
          </div>
        </div>

        {/* Action button */}
        <div className="flex gap-3">
          <a
            href={`tel:${BRAND_INFO.phone}`}
            className="flex-1 py-3.5 rounded-2xl border border-black/10 hover:border-black/30 text-zinc-800 font-syne font-bold text-xs flex items-center justify-center gap-2 glass-panel transition"
          >
            <PhoneCall className="w-3.5 h-3.5 text-brand-orange" />
            <span>Call Sector 8 Kitchen</span>
          </a>

          <button
            onClick={() => setIsOrderModalOpen(false)}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-syne font-bold text-xs flex items-center justify-center shadow-lg transition"
          >
            Keep Exploring
          </button>
        </div>

      </div>
    </div>
  );
}
