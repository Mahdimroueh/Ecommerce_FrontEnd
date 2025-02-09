import React, { useState } from "react";

const AddMultiLevelCategoryForm = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Men",
      subCategories: [
        {
          id: 4,
          name: "Clothing",
          subCategories: [
            { id: 7, name: "T-Shirts", subCategories: [] },
            { id: 8, name: "Jeans", subCategories: [] },
            { id: 9, name: "Jackets", subCategories: [] },
          ],
        },
        {
          id: 5,
          name: "Shoes",
          subCategories: [
            { id: 10, name: "Sneakers", subCategories: [] },
            { id: 11, name: "Formal Shoes", subCategories: [] },
            { id: 12, name: "Boots", subCategories: [] },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Women",
      subCategories: [
        {
          id: 6,
          name: "Clothing",
          subCategories: [
            { id: 13, name: "Dresses", subCategories: [] },
            { id: 14, name: "Tops", subCategories: [] },
            { id: 15, name: "Skirts", subCategories: [] },
          ],
        },
        {
          id: 16,
          name: "Shoes",
          subCategories: [
            { id: 17, name: "Flats", subCategories: [] },
            { id: 18, name: "Heels", subCategories: [] },
            { id: 19, name: "Boots", subCategories: [] },
          ],
        },
      ],
    },
    {
      id: 20,
      name: "Children",
      subCategories: [
        {
          id: 21,
          name: "Boys",
          subCategories: [
            {
              id: 22,
              name: "Clothing",
              subCategories: [
                { id: 23, name: "Shirts", subCategories: [] },
                { id: 24, name: "Pants", subCategories: [] },
              ],
            },
            {
              id: 25,
              name: "Shoes",
              subCategories: [
                { id: 26, name: "Sandals", subCategories: [] },
                { id: 27, name: "Sneakers", subCategories: [] },
              ],
            },
          ],
        },
        {
          id: 28,
          name: "Girls",
          subCategories: [
            {
              id: 29,
              name: "Clothing",
              subCategories: [
                { id: 30, name: "Tops", subCategories: [] },
                { id: 31, name: "Skirts", subCategories: [] },
              ],
            },
            {
              id: 32,
              name: "Shoes",
              subCategories: [
                { id: 33, name: "Ballet Flats", subCategories: [] },
                { id: 34, name: "Boots", subCategories: [] },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 35,
      name: "Accessories",
      subCategories: [
        { id: 36, name: "Bags", subCategories: [] },
        { id: 37, name: "Hats", subCategories: [] },
        { id: 38, name: "Belts", subCategories: [] },
      ],
    },
  ]);

  const [currentCategories, setCurrentCategories] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategoryData, setNewCategoryData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewCategoryData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleCategorySelection = (e) => {
    const selectedId = parseInt(e.target.value);
    const category = categories.find((cat) => cat.id === selectedId);
    setSelectedCategory(category);
    if (category) {
      setCurrentCategories(category.subCategories);
    } else {
      setCurrentCategories(categories);
    }
  };

  const handleAddNewCategory = () => {
    const newCategory = {
      id: Math.random(), // Use a better unique id generation in production
      name: newCategoryData.name,
      description: newCategoryData.description,
      image: newCategoryData.image,
      subCategories: [],
    };

    if (selectedCategory) {
      // Update parent category
      const updatedParent = {
        ...selectedCategory,
        subCategories: [...selectedCategory.subCategories, newCategory],
      };
      const updatedCategories = categories.map((cat) =>
        cat.id === selectedCategory.id ? updatedParent : cat
      );
      setCategories(updatedCategories);
      setCurrentCategories(updatedParent.subCategories); // Show updated subcategories
    } else {
      // If no category is selected, add to the root
      setCategories((prev) => [...prev, newCategory]);
      setCurrentCategories([...currentCategories, newCategory]); // Update current categories
    }

    // Reset state after adding
    setNewCategoryData({ name: "", description: "", image: null });
    setSelectedCategory(null);
  };

  const handleDeepenSelection = () => {
    if (selectedCategory && selectedCategory.subCategories.length > 0) {
      setCurrentCategories(selectedCategory.subCategories);
      setSelectedCategory(null); // Reset selectedCategory to let user choose from new subcategories
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(categories);
    // Here you would send categories to your backend
  };

  const isLeafCategory =
    selectedCategory && selectedCategory.subCategories.length === 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-10 p-5 bg-white rounded shadow"
    >
      <h2 className="text-lg font-bold mb-4">Add Category</h2>

      <h3 className="text-lg font-bold mb-2">Select a Parent Category:</h3>

      {/* Conditionally Render Select or Add Category Button */}
      {!isLeafCategory ? (
        <div className="mb-4">
          <select
            onChange={handleCategorySelection}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
            value={selectedCategory ? selectedCategory.id : ""}
          >
            <option value="">Select Category</option>
            {currentCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleDeepenSelection}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
            disabled={!selectedCategory || isLeafCategory}
          >
            Go Deeper
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <p className="mb-2 text-gray-500">
            You have selected: <strong>{selectedCategory.name}</strong>. You can
            add a new category below:
          </p>
        </div>
      )}

      {/* New Category Input */}
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="New Category Name"
          value={newCategoryData.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded p-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newCategoryData.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
        <label className="block mb-2">
          Category Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </label>
        {isLeafCategory && (
          <button
            type="button"
            onClick={handleAddNewCategory}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Add Category
          </button>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 bg-green-500 text-white p-2 rounded"
      >
        Submit All Categories
      </button>
    </form>
  );
};

export default AddMultiLevelCategoryForm;
