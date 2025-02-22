import { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductCategory from "./components/pages/ProductCategory";
import Footer from "./components/Footer";
import ShopCart from "./components/pages/ShopCart";
import CheckOut from "./components/pages/CheckOut";
import Shop from "./components/pages/Shop";
import Contact from "./components/pages/Contact";
import LoginSignupPage from "./components/pages/LoginSignupPage";
import Preloader from "./components/pages/Preloader";

function App() {
  library.add(fas, fab);

  const [loading, setLoading] = useState(true); // Show preloader first
  const [showLogin, setShowLogin] = useState(false); // Show login/signup after delay

  useEffect(() => {
    // Step 1: Show preloader for 2 seconds
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Step 2: Show Login/Signup after 3 seconds (1 sec after website appears)
    setTimeout(() => {
      setShowLogin(true);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader /> // Show preloader first
      ) : (
        <div className={showLogin}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pages/ProductCategory" element={<ProductCategory />} />
              <Route path="/pages/ShopCart" element={<ShopCart />} />
              <Route path="/pages/CheckOut" element={<CheckOut />} />
              <Route path="/pages/Shop" element={<Shop />} />
              <Route path="/pages/Contact" element={<Contact />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      )}

      {showLogin && <LoginSignupPage onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default App;
