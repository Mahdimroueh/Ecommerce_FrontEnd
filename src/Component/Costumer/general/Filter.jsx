import React, { useState, useEffect } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import TextField from "../../InputComponent/TextField";
import ColorPicker from "../../InputComponent/ColorPicker";
import RangeInput from "../../InputComponent/RangeInput";
import CategorySelect from "../../InputComponent/CategorySelect";
import BrandSelect from "../../InputComponent/BrandSelect";
import SizeOptionSelect from "../../InputComponent/SizeOptionSelect";

const Filter = ({ category }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    search: queryParams.get("search") || "",
    category: queryParams.get("category") || "",
    brand: queryParams.get("brand") || "",
    color: queryParams.get("color") || "",
    size: queryParams.get("size") || "",
    maxPrice: queryParams.get("maxPrice") || "",
    page: queryParams.get("page") || 0,
    parentCategory: category || "men",
  });

  // Update filter state when URL changes
  useEffect(() => {
    setFilter({
      search: queryParams.get("search") || "",
      category: queryParams.get("category") || "",
      brand: queryParams.get("brand") || "",
      color: queryParams.get("color") || "",
      size: queryParams.get("size") || "",
      maxPrice: queryParams.get("maxPrice") || "",
      page: queryParams.get("page") || 0,
      parentCategory: category || "men",
    });
  }, [location.search, category]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();

    if (filter.search) queryParams.set("search", filter.search);
    if (filter.category) queryParams.set("category", filter.category);
    if (filter.brand) queryParams.set("brand", filter.brand);
    if (filter.color) queryParams.set("color", filter.color);
    if (filter.size) queryParams.set("size", filter.size);
    if (filter.maxPrice) queryParams.set("maxPrice", filter.maxPrice);
    queryParams.set("parentCategory", category);

    navigate(`?${queryParams.toString()}`, {
      replace: true,
    });
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFilter({
      search: "",
      category: "",
      brand: "",
      color: "",
      size: "",
      maxPrice: "",
      page: 0,
      parentCategory: category || "men",
    });

    navigate(`?parentCategory=${category}`, {
      replace: true,
    });
  };

  return (
    <Form
      className="bg-white rounded-xl shadow-sm p-6 mb-8"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {/* Search Field */}
        <div>
          <TextField
            name="search"
            type="text"
            value={filter.search}
            onChange={handleFilterChange}
            label="Search"
            placeholder="Search products..."
            className="w-full px-4 py-2 text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Field */}
        <div>
          <CategorySelect
            name="category"
            value={filter.category}
            onChange={handleFilterChange}
            parentCategory={category}
            className="w-full px-4 py-2 text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Brand Field */}
        <div>
          <BrandSelect
            name="brand"
            value={filter.brand}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Color Field */}
        <div>
          <ColorPicker
            name="color"
            value={filter.color}
            onChange={handleFilterChange}
            className="w-full"
          />
        </div>

        {/* Size Field */}
        <div>
          <SizeOptionSelect
            name="size"
            value={filter.size}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Max Price Field */}
        <div>
          <RangeInput
            name="maxPrice"
            value={filter.maxPrice}
            label="Price"
            type="range"
            onChange={handleFilterChange}
            className="w-full"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-6 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition duration-200"
        >
          Search
        </button>
      </div>
    </Form>
  );
};

export default Filter;
