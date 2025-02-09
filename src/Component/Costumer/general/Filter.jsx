import { Form, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import TextField from "../../InputComponent/TextField";
import ColorPicker from "../../InputComponent/ColorPicker";
import RangeInput from "../../InputComponent/RangeInput";
import SubmitBtn from "../../InputComponent/SubmitBtn";
import CategorySelect from "../../InputComponent/CategorySelect";
import BrandSelect from "../../InputComponent/BrandSelect";
import SizeOptionSelect from "../../InputComponent/SizeOptionSelect";

const Filter = ({ category }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [filter, setFilter] = useState({
    search: "",
    category: "",
    brand: "",
    color: "",
    size: "",
    maxPrice: "",
    page: queryParams.get("page") || 0,
    parentCategory: category || "men",
  });

  const navigate = useNavigate();
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
  return (
    <Form
      className="bg-gray-200 rounded-md p-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
      onSubmit={handleSubmit}
    >
      {/* Search Field */}
      <TextField
        name="search"
        type="text"
        value={filter.search}
        onChange={handleFilterChange}
        label="search"
        placeholder="search for a product"
      />
      {/* Category Field */}
      <CategorySelect
        name="category"
        value={filter.category}
        onChange={handleFilterChange}
        parentCategory={category}
      />
      {/* Brand Field */}
      <BrandSelect
        name="brand"
        value={filter.brand}
        onChange={handleFilterChange}
      />

      {/* Color Field */}
      <ColorPicker
        name="color"
        value={filter.color}
        onChange={handleFilterChange}
      />

      {/* Size Field */}
      <SizeOptionSelect
        name="size"
        value={filter.size}
        onChange={handleFilterChange}
      />

      {/* Max Price Field */}
      <RangeInput
        name="maxPrice"
        value={filter.maxPrice}
        label="price"
        type="range"
        onChange={handleFilterChange}
      />

      {/* Buttons */}
      <SubmitBtn text="search" />
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => {
          setFilter({
            ...filter,
            search: "",
            category: "",
            brand: "",
            color: "",
            size: "",
            maxPrice: "",
          });
        }}
      >
        Reset
      </button>
    </Form>
  );
};

export default Filter;
