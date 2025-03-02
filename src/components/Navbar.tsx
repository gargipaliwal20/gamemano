import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BellIcon,
  ShoppingBagIcon,
  UserIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Notification from "./Notification";
import AuthCard from "./AuthCard";

const Navbar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showAuthCard, setShowAuthCard] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/products?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#3a0a24]/70 backdrop-blur-md text-white py-4 px-8 flex items-center border-b border-[#914f7e] shadow-lg transition-all duration-300 z-40">
      <ul className="flex space-x-8 text-lg font-medium">
        <li>
          <Link
            to="/"
            className="text-pink-500 text-3xl font-extrabold tracking-widest drop-shadow-lg"
          >
            VV
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="px-4 hover:text-pink-300 transition-colors duration-300"
          >
            Home
          </Link>
        </li>
        <li className="border-l border-gray-300 px-4">
          <Link
            to="/products"
            className="px-4 hover:text-pink-300 transition-colors duration-300"
          >
            Beauty Products
          </Link>
        </li>
        <li className="border-l border-gray-300 px-4">
          <Link
            to="/leaderboard"
            className="px-4 hover:text-pink-300 transition-colors duration-300"
          >
            Offers
          </Link>
        </li>
      </ul>

      <div className="relative w-96 mx-auto">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Search for Products and Brands"
          className="w-full rounded-lg px-4 py-2 pl-10 text-gray-800"
          value={search}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
        {search && (
          <XMarkIcon
            className="w-5 h-5 text-gray-500 absolute right-3 top-2.5 cursor-pointer"
            onClick={() => setSearch("")}
          />
        )}
      </div>

      <div className="flex items-center space-x-4 ml-auto">
        <span
          onClick={() => setShowNotification(true)}
          className="border-l border-gray-300 px-4 cursor-pointer hover:text-pink-300 transition"
        >
          <BellIcon className="w-6 h-6" />
        </span>
        <span className="border-l border-gray-300 px-4 cursor-pointer hover:text-pink-300 transition">
          <ShoppingBagIcon className="w-6 h-6" />
        </span>
        <span
          onClick={() => setShowAuthCard(!showAuthCard)}
          className="border-l border-gray-300 px-4 cursor-pointer hover:text-pink-300 transition"
        >
          <UserIcon className="w-6 h-6" />
        </span>
      </div>

      {/* Notification Modal */}
      {showNotification && <Notification setShowNotification={setShowNotification} />}
      {showAuthCard && <AuthCard setShowAuthCard={setShowAuthCard} />}
    </nav>
  );
};

export default Navbar;
