import { useNavigate } from "react-router-dom";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const viewProduct = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      key={product.id}
      onClick={() => {viewProduct(product.id)}}
      className="bg-pink-100 p-6 rounded-2xl cursor-pointer shadow-lg min-w-[280px] h-[350px] flex flex-col items-center text-center relative"
    >
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-[200px] h-auto object-contain"
          onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
        />
      </div>
      <h3 className="text-xl font-bold text-black mt-6">{product.title}</h3>

      <p className="text-pink-500 text-lg">★★★★★</p>

      <p className="text-sm text-red-500 mt-2">
        10k+ Reviews • Beauty • Cosmetics
      </p>

      <p className="text-xs text-gray-600 mt-1">Released 10th march 2025</p>

      <div className="mt-auto flex items-center justify-between w-full">
        <span className="text-lg font-bold text-black">${product.price}</span>
        <button className="border-2 border-red-400 text-red-400 py-2 px-4 rounded-lg shadow-md hover:bg-red-400 hover:text-white transition">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
