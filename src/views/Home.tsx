//@ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get("/").then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-10 text-white">
      <div className="w-full flex flex-col items-center">
        <Carousel slides={products} onChange={setCurrentSlide} />
      </div>

      <div className="mt-10 w-full">
        <div className="flex items-center justify-between bg-pink-100 p-4 rounded-lg shadow-md">
          <div>
            <h2 className="text-2xl font-bold text-pink-700">
              TOP NEW ARRIVALS OF THE WEEK
            </h2>
            <h3 className="text-xl text-pink-500 font-medium">
              HANDPICKED FOR YOU
            </h3>
          </div>

          <a
            href="#"
            className="text-lg font-semibold text-pink-600 hover:text-white bg-pink-200 px-4 py-2 rounded-md hover:bg-pink-500"
            onClick={() => navigate("/products")}
          >
            View All →
          </a>
        </div>

        <div className="relative w-full overflow-hidden ">
          <div className="flex overflow-x-auto space-x-6 scrollbar-hide p-4 w-full justify-center">
            {loading ? (
              <p className="text-gray-400 text-center w-full">
                Loading products...
              </p>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
