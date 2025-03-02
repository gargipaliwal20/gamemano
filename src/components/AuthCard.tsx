import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

const AuthCard: React.FC<any> = ({ setShowAuthCard }) => {
  const auth: any = localStorage.getItem("auth") || null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="fixed top-16 right-8 bg-white text-black shadow-lg rounded-lg w-80 p-4 z-50">
      <div className="flex justify-between items-center border-b pb-2">
      <h3 className="text-lg font-semibold">My Profile</h3>
        <XMarkIcon
          className="w-5 h-5 cursor-pointer"
          onClick={() => setShowAuthCard(false)}
        />
      </div>
      {auth ? (
        <ul>
          <li
            onClick={handleLogout}
            className="py-2 border-b cursor-pointer last:border-none"
          >
            Logout
          </li>
        </ul>
      ) : (
        <ul>
          <li className="py-2 border-b last:border-none">
            <Link to="/login">Login</Link>
          </li>
          <li className="py-2 border-b last:border-none">
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AuthCard;
