import { useState, useEffect, useRef } from "react";

import '../css/style.css'; // Import the CSS file
import logo from '../assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const categories = [
    {
      title: "Clothing",
      subcategories: [
        "Women Western & Maternity Wear",
        "Topwear",
        "Dresses",
        "Jeans",
        "Shorts",
        "Skirts",
        "Jeggings & Tights",
        "Trousers & Capris",
      ],
    },
    {
      title: "Ethnic Wear",
      subcategories: [
        "Sarees",
        "Kurtas & Kurtis",
        "Dress Material",
        "Lehenga Choli",
        "Blouse",
        "Kurta Sets & Salwar Suits",
        "Gowns",
        "Duppattas",
      ],
    },
    {
      title: "Footwear",
      subcategories: ["Sandals", "Flats", "Heels", "Wedges", "Sports Shoes", "Casual Shoes", "Boots"],
    },
    {
      title: "Beauty & Grooming",
      subcategories: ["Make Up", "Skin Care", "Hair Care", "Bath & Spa", "Deodorants & Perfumes"],
    },
    {
      title: "Jewellery",
      subcategories: ["Artificial Jewellery", "Silver Jewellery", "Precious Jewellery"],
    },
    {
      title: "Featured",
      subcategories: ["Forever 21", "Accessorize", "W", "Pantaloons", "Chemistry", "Lakme", "Nivea", "Catwalk", "Titan-Raga"],
    },
  ];
  return (
    <div>
      {/* Main Navbar */}
      <nav className="navbar">
        {/* Logo on the left */}
        <div className="navbar-brand">
          <img src={logo} alt="" />
         
        </div>

        {/* Navigation items in the middle */}
       

        {/* Search bar and submit button on the right */}
        <div className="search-bar">
            
          <input type="text" placeholder="Search for products, brands and more" />
          <div className="remove-icon text-black relative right-7">    <FontAwesomeIcon icon={'remove'}/></div>
      
        </div>
        <ul className="navbar-nav">
         
          <li className='font-semibold'><a href="#"> <FontAwesomeIcon icon={'lock'}/> Login / Signup</a></li>
          <li className='text-black font-semibold'><a href="#">Cart</a> <FontAwesomeIcon icon={faCartShopping}/> </li> 
          
          <button className="click-btn w-40 px-4 py-2 shadow-md  transition duration-300">
  Know More
</button>

      
       
        </ul>
      </nav>

      {/* Category Navbar */}
      <nav className="sub-nav relative shadow-md">
      {/* Navigation Menu */}
      <ul className="flex justify-center space-x-6 text-gray-800 font-medium">
        {["Electronics", "TVs & Appliances", "Men", "Women", "Baby & Kids", "Home & Furniture"].map((item) => (
          <li key={item} className="relative">
            <button
              className=" hover:text-white-500"
              onClick={() => setActiveMenu(activeMenu === item ? null : item)}
            >
              {item} <span className="ml-1"><FontAwesomeIcon icon={faChevronDown}/></span>
            </button>
          </li>
        ))}
      </ul>

      {/* Dropdown Menu - Positioned Absolutely to Navbar */}
      {activeMenu && (
        <div
          ref={menuRef}
          className="absolute left-40 top-full mt-2 w-[1000px] bg-white shadow-lg p-6 grid grid-cols-5 gap-6 border rounded-lg animate-fade-in z-50"
        >
          {categories.map((category, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-700 mb-2">{category.title}</h3>
              <ul className="space-y-2 text-gray-600">
                {category.subcategories.map((sub, i) => (
                  <li key={i} className="hover:text-blue-500 cursor-pointer">{sub}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </nav>
    </div>
  );
};

export default Navbar;