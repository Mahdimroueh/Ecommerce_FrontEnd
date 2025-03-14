import React, { useState } from "react";
import Filter from "../Component/Costumer/general/Filter";
import ProductGrid from "../Component/Costumer/general/ProductGrid";
import { motion } from "framer-motion";

const ProductsPage = ({ category }) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold capitalize">
          {category || "Products"}
        </h1>
        <button
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-200"
        >
          {isFilterExpanded ? "Hide Filters" : "Show Filters"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18M6 12h12M10 18h4" />
          </svg>
        </button>
      </div>

      <motion.div
        initial={{ height: "auto" }}
        animate={{ height: isFilterExpanded ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden mb-8"
      >
        <Filter category={category} />
      </motion.div>

      <ProductGrid />
    </div>
  );
};

export default ProductsPage;
