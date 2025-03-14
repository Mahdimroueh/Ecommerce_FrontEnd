import { useState } from "react";
import { FaSearch, FaFilter, FaList, FaThLarge } from "react-icons/fa";
import ProductForm from "./ProductForm";

const ProductPage = () => {
  const [viewMode, setViewMode] = useState("list");

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Product Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and organize your product inventory
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className={`p-2 rounded-md ${
              viewMode === "list"
                ? "bg-indigo-100 text-indigo-600"
                : "bg-gray-100 text-gray-500"
            }`}
            onClick={() => setViewMode("list")}
          >
            <FaList />
          </button>
          <button
            className={`p-2 rounded-md ${
              viewMode === "grid"
                ? "bg-indigo-100 text-indigo-600"
                : "bg-gray-100 text-gray-500"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <FaThLarge />
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <ProductForm />
      </div>
    </div>
  );
};

export default ProductPage;
