import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('tasty_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [fulfillmentMode, setFulfillmentMode] = useState('curbside'); // curbside, takeaway, delivery, dinein
  
  // Curbside details for Chandigarh Sector 8
  const [curbsideInfo, setCurbsideInfo] = useState({
    carModel: 'Thar / Fortuner / City',
    carColor: 'Black',
    plateNumber: 'CH-01-XX-0007',
    parkingLane: 'Inner Market Lane 2'
  });

  // Delivery details
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: 'Harman Singh',
    phone: '9876543210',
    address: 'House #42, Sector 8-B, Chandigarh'
  });

  // Table info
  const [tableNumber, setTableNumber] = useState('07');

  // Active Order State
  const [activeOrder, setActiveOrder] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasty_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, quantity = 1, modifiers = {}) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        i => i.id === item.id && JSON.stringify(i.modifiers) === JSON.stringify(modifiers)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { ...item, quantity, modifiers }];
      }
    });

    // Fire subtle celebration
    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.85, x: 0.9 },
        colors: ['#FF5500', '#FFC700', '#FFFFFF']
      });
    } catch {
      // ignore
    }
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const packagingFee = subtotal > 0 ? 25 : 0;
  const deliveryFee = fulfillmentMode === 'delivery' ? 49 : 0;
  const total = subtotal + tax + packagingFee + deliveryFee;
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const placeOrder = (paymentMethod = 'upi') => {
    const orderId = `TC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      items: [...cart],
      total,
      fulfillmentMode,
      curbsideInfo: fulfillmentMode === 'curbside' ? curbsideInfo : null,
      deliveryInfo: fulfillmentMode === 'delivery' ? deliveryInfo : null,
      tableNumber: fulfillmentMode === 'dinein' ? tableNumber : null,
      paymentMethod,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedTime: fulfillmentMode === 'takeaway' || fulfillmentMode === 'curbside' ? '6 mins' : '25-30 mins',
      status: 'Fire Searing', // 'Received', 'Fire Searing', 'Quality Check', 'Ready'
      secondsLeft: 360
    };

    setActiveOrder(newOrder);
    clearCart();
    setIsCartOpen(false);
    setIsOrderModalOpen(true);

    try {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#FF5500', '#FFC700', '#00F5A0', '#8A2BE2']
      });
    } catch {
      // ignore
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        packagingFee,
        deliveryFee,
        total,
        totalItemsCount,
        isCartOpen,
        setIsCartOpen,
        fulfillmentMode,
        setFulfillmentMode,
        curbsideInfo,
        setCurbsideInfo,
        deliveryInfo,
        setDeliveryInfo,
        tableNumber,
        setTableNumber,
        activeOrder,
        setActiveOrder,
        isOrderModalOpen,
        setIsOrderModalOpen,
        placeOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
