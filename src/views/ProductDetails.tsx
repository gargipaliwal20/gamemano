import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axiosInstance";
import { Product } from "../types/product";
import { BackspaceIcon, BackwardIcon } from "@heroicons/react/24/outline";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true); 
    api.get(`/${id}`).then((res) => setProduct(res.data))
      .catch(() => setError("Failed to load product details."))
      .finally(() => setLoading(false)); 
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product)
    return <p className="text-center text-gray-500">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white ">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
        <button onClick={() => navigate('/products')} className="px-4 py-1 rounded-lg bg-pink-500 text-white">
            ← Back
        </button>
        </div>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="mt-4 font-semibold text-lg text-pink-600">
        ${product.price}
      </p>
      <img
        src={product.thumbnail}
        alt={product.title}
        className=" mt-4 mx-auto w-[400px] h-[350px] object-cover rounded-md"
      />
    </div>
  );
};

export default ProductDetails;
