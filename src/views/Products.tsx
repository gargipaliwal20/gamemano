import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../utils/axiosInstance";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

interface ProductsProps {
  selectedCategories: string[];
}

const Products: React.FC<ProductsProps> = ({ selectedCategories }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

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

  const filteredProducts = products.filter((product) => {
    const matchSearch = searchQuery === "" || product.title.toLowerCase().includes(searchQuery);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.some(
        (category) => category.toLowerCase() === product.category.toLowerCase()
      );
    return matchSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto p-10 shadow-lg">
      {searchQuery && (
        <span className="text-gray-700">
          Search results for <strong>"{searchQuery}"</strong>
          <br />
          <strong>{searchQuery}</strong> - {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "item" : "items"}
        </span>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="w-[320px] h-[370px]">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
