import React, { useState, createContext } from "react";

// Create the context
export const GroceryContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addCartItem = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    //console.log(cart);
  };

  const removeCartItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    //console.log(cart);
  };

  return (
    <GroceryContext.Provider
      value={{ cart, setCart, addCartItem, removeCartItem }}
    >
      {children}
    </GroceryContext.Provider>
  );
};
