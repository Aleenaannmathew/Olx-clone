import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { ChatBubbleLeftEllipsisIcon, BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import logo from "../assets/olx.png"; 
import arrowIcon from "../assets/arrowdown.png"; 
import lensIcon from "../assets/lens.png";
import searchIcon from "../assets/search.png"; 

const Navbar = ({setSearch}) => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  const [loginPop, setLoginPop] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSellClick = () => {
    if (user) {
      navigate('/sell');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-gray-100 shadow-md">
      <div className="flex items-center gap-2 px-6 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} className="w-12 h-auto" alt="OLX Logo" />
        </div>

        {/* Location Selector */}
        <div className="flex items-center justify-between h-12 border-2 border-black bg-white w-[300px] px-3">
  <img src={lensIcon} className="w-5 h-5 mr-2" alt="Lens Icon" />
  <input
    type="text"
    placeholder="India"
    className="outline-none text-sm text-gray-700 w-20"
  />
  <img src={arrowIcon} className="w-4 h-4 ml-2" alt="Arrow Icon" />
</div>


        {/* Search Bar */}
        <div className="flex items-center border-2 border-black h-12   w-[700px] px-4 py-1 bg-white shadow-sm">
          <input
            type="text"
            onChange={(e)=>
              setSearch(e.target.value)
            }
            placeholder="Find Cars, Mobile Phones and more..."
            className="flex-grow outline-none text-sm text-gray-700"
          />
          <img src={searchIcon} className="w-12 h-12 ml-[500px]" alt="Search Icon" />
        </div>

        {/* Language Selector */}
        <div className="flex items-center ml-6 cursor-pointer">
          <h1 className="text-sm font-medium text-gray-700">ENGLISH</h1>
          <img src={arrowIcon} className="w-4 h-4 ml-2" alt="Arrow Icon" />
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-6 ml-6">
          {/* Chat Icon */}
          <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-gray-700 cursor-pointer" />

          {/* Bell Icon */}
          <BellIcon className="w-5 h-5 text-gray-700 cursor-pointer" />

          {/* Profile Icon */}
           {/* Login/Logout */}
        {user ? (
          <div
            onClick={handleLogout}
            className="flex items-center ml-4 cursor-pointer underline hover:no-underline"
          >
            <h1 className="text-sm font-bold">Logout</h1>
          </div>
        ) : (
          <div
            onClick={() => setLoginPop(!loginPop)}
            className="flex items-center ml-4 cursor-pointer underline hover:no-underline"
          >
            <h1 className="text-sm font-bold">Login</h1>
          </div>
        )}

        </div>

        {/* Sell Button */}
        <div 
        className="ml-6">
          <button onClick={handleSellClick} className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-blue-400 to-green-400 text-white font-bold text-sm shadow-md">
            + SELL
          </button>
        </div>
      </div>
      {loginPop && <Login setLoginPop={setLoginPop} />}

    </div>
  );
};

export default Navbar;
