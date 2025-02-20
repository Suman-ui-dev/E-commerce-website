import React from 'react'
import "../css/style.css";
import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import icons

const Navbar = () => {
  return (
    <>
   <header className="header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-2 col-lg-1">
                            <div className="header__logo">
                                <a href="./index.html">
                                    <img src={logo} alt="logo" />
                                </a>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-8">
      <nav className="header__menu">
      
        <ul>
          <li className="active">
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#">Women’s</a>
          </li>
          <li>
            <a href="#">Men’s</a>
          </li>
          <li>
            <a href="/pages/Shop">Shop</a>
          </li>
          <li>
            <a href="#">Pages</a>
            <ul className="dropdown">
              <li>
                <a href="/pages/ProductCategory">Product Details</a>
              </li>
              <li>
                <a href="/pages/ShopCart">Shop Cart</a>
              </li>
              <li>
                <a href="/pages/CheckOut">Checkout</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="./blog.html">Blog</a>
          </li>
          <li>
            <a href="/pages/Contact">Contact</a>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <FontAwesomeIcon
              icon={faTimes}
              className="clear-icon"
              onClick={() => document.querySelector('.search-input').value = ''} // Clear input on click
            />
          </div>
        </div>
      </nav>
    </div>
                        <div className="col-lg-3">
                            <div className="header__right">
                                <div className="header__right__auth">
                                    <a href="/pages/LoginSignup">Login</a>
                                
                                </div>
                                <ul className="header__right__widget">
                                    <li>
                                        <FontAwesomeIcon icon={"cart-shopping"}/>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <FontAwesomeIcon icon={"heart"} />     <div className="tip">2</div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="icon_bag_alt"></span>
                                            <div className="tip-2">2</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="canvas__open">
                        <FontAwesomeIcon icon={"bars"}/>
                    </div>
                </div>
            </header>

    </>
  )
}

export default Navbar