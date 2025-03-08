import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from '../src/components/pages/CartContext.jsx'; // Make sure to import CartProvider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);