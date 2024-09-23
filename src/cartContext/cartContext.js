import React, { createContext, useState,useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(false);
  const isMobile = useMediaQuery('(min-width:768px)');
  useEffect(() => {
    const handleResize = () => {
      if (isMobile) {
        const root = document.getElementById('root');
        root.style.position = 'static';
      }
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);
 

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
