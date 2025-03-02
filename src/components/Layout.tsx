import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "../views/Home";
import Products from "../views/Products";
import ProductDetails from "../views/ProductDetails";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Filters from "./Filters";
import Signup from "../views/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../views/Login";

export const Layout: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const location = useLocation();

  const handleCategoryFilter = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  return (
    <div className="min-h-screen bg-pink-50 flex">
      {location.pathname === "/" && <Sidebar />}
      {location.pathname === "/products" && (
        <Filters onFilter={handleCategoryFilter} />
      )}

      <div className="flex-1">
        <Navbar />
        <main className="pt-20 ml-10">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/products"
                      element={
                        <Products selectedCategories={selectedCategories} />
                      }
                    />
                    <Route path="/products/:id" element={<ProductDetails />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};
