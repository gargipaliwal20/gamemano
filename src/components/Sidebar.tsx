import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ChatBubbleBottomCenterTextIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  TrophyIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PercentBadgeIcon 
} from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate('/login')
  };

  return (
    <div
        className={`fixed top-0 left-0 h-full text-white transition-all duration-300 flex flex-col justify-between ${
            isOpen ? "w-60 bg-[#5a2d52]" : "w-[85px] bg-[#3a0a24]"
        } z-50 border-r border-gray-600`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        >
      <div>
        <div className="flex items-center justify-center py-4">
            <span className="text-pink-500 text-3xl font-extrabold tracking-widest drop-shadow-lg">
                {isOpen ? (
                <span className="flex items-center space-x-2">
                    <span className="text-xl text-pink-300">Velvet Vanity</span>
                </span>
                ) : (
                "VV"
                )}
            </span>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-6 mt-10">
          <li className="flex items-center space-x-4 px-4 hover:text-pink-300 transition-colors duration-300">
            <HomeIcon className="w-6 h-6" />
            {isOpen && <Link to="/">Home</Link>}
          </li>
          <li className="flex items-center space-x-4 px-4 hover:text-pink-300 transition-colors duration-300">
            <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
            {isOpen && <Link to="/messages">Messages</Link>}
          </li>
          <li className="flex items-center space-x-4 px-4 hover:text-pink-300 transition-colors duration-300">
            <ShoppingCartIcon className="w-6 h-6" />
            {isOpen && <Link to="/products">Beauty Products</Link>}
          </li>
          <li className="flex items-center space-x-4 px-4 hover:text-pink-300 transition-colors duration-300">
            <CreditCardIcon className="w-6 h-6" />
            {isOpen && <Link to="/payments">Payments</Link>}
          </li>
          <li className="flex items-center space-x-4 px-4 hover:text-pink-300 transition-colors duration-300">
            <PercentBadgeIcon className="w-6 h-6" />
            {isOpen && <Link to="/leaderboard">Offers</Link>}
          </li>
        </ul>
      </div>

      {/* Bottom Section - Settings & Logout */}
      <div className="mb-6">
        <ul className="space-y-6">
          <li onClick={handleLogout} className="flex items-center space-x-4 px-4 hover:text-pink-300 transition-colors duration-300 cursor-pointer">
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            {isOpen && <span>Logout</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
