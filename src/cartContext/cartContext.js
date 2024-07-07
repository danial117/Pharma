import React, { createContext, useState } from 'react';
import { useMediaQuery } from '@mui/material';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(false);
  const isMobile = useMediaQuery('(min-width:768px)');
  const toggleCart = () => {
   
    setCart((prevCart) => !prevCart);
    if (!isMobile) {
      const root = document.getElementById('root');
      root.style.position = !cart ? 'fixed' : 'static';
    }
  };

  return (
    <CartContext.Provider value={{ cart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};
