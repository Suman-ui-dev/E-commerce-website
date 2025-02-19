import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons"; // Solid icons
import { fab } from "@fortawesome/free-brands-svg-icons"; // Brand icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductCategory from "./components/pages/ProductCategory"; // Ensure correct path
import Footer from "./components/Footer";
import ShopCart from "./components/pages/ShopCart";
import CheckOut from "./components/pages/CheckOut";
import Shop from "./components/pages/Shop";
import Contact from "./components/pages/Contact";
import LoginSignup from "./components/pages/LoginSignup";

function App() {
  library.add(fas, fab);

  return (
    <Router> {/* Wrap everything inside Router */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/ProductCategory" element={<ProductCategory />} />
        <Route path="/pages/ShopCart" element={<ShopCart />}/>
        <Route path="/pages/CheckOut" element={<CheckOut />}/>
        <Route path="/pages/Shop" element={<Shop/>}/>
        <Route path="/pages/Contact" element={<Contact/>}/>
        <Route path="/pages/LoginSignup" element={<LoginSignup/>}/>

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
