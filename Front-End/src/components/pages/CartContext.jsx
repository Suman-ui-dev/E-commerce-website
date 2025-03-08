import React, { createContext, useReducer, useContext, useEffect } from "react";

// Helper function to get cart from localStorage
const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : { cartItems: [] };
};

// Initial state for the cart
const initialState = getCartFromLocalStorage();

// Create Cart Context
const CartContext = createContext();

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedCartItems = [...state.cartItems, action.payload];
      localStorage.setItem("cart", JSON.stringify({ cartItems: updatedCartItems })); // Save to localStorage
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case "REMOVE_FROM_CART":
      const filteredCartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify({ cartItems: filteredCartItems })); // Save to localStorage
      return {
        ...state,
        cartItems: filteredCartItems,
      };
    default:
      return state;
  }
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Optional: Sync cart with localStorage on initial load
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use CartContext
export const useCart = () => useContext(CartContext);