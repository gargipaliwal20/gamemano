import React, { useState, useEffect } from "react";
import api from "../utils/axiosInstance";

interface ICategory {
  name: string;
}

interface IFiltersProps {
  onFilter: (selectedCategories: string[]) => void;
}

const Filters: React.FC<IFiltersProps> = ({ onFilter }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    api
      .get("https://dummyjson.com/products/categories")
      .then((res) => setCategories([{ name: "All" }, ...res.data]))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleFilter = (category: string) => {
    setSelectedCategories((prevSelected) => {
      let updatedCategories;
      if (category === "All") {
        updatedCategories = prevSelected.includes("All") || prevSelected.length === categories.length - 1
          ? [] 
          : categories.map((c) => c.name); 
      } else {
        updatedCategories = prevSelected.includes(category)
          ? prevSelected.filter((c) => c !== category) 
          : [...prevSelected, category]; 

        if (updatedCategories.length === categories.length - 1) {
          updatedCategories.push("All");
        } else {
          updatedCategories = updatedCategories.filter((c) => c !== "All");
        }
      }

      onFilter(updatedCategories.includes("All") ? [] : updatedCategories);
      return updatedCategories;
    });
  };

  return (
    <div className="w-50 bg-[#3a0a24]/70 mt-[72px] p-4 rounded-sm p-4">
      <p className="text-md font-extrabold uppercase tracking-wide border-b-2 border-white pb-2">
        Category
      </p>
      <div className="mt-4 space-y-3">
        {categories.map((category) => (
          <div key={category.name} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.name)}
              onChange={() => handleFilter(category.name)}
              className="accent-pink-400 cursor-pointer"
            />
            <span className="ml-2 text-sm font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
