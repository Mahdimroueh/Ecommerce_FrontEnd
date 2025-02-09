import React, { useState } from "react";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Open modal
  const handleFocus = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Search input with icon */}
      <div className="relative w-full mx-auto flex-grow">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          placeholder="Search..."
          className="input input-bordered input-primary w-[60%] pl-10 pr-4 py-2 rounded-md rounded-lg"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M13.293 12.707a7.5 7.5 0 1 0-1.415 1.415l4.8 4.8a1 1 0 1 0 1.415-1.415l-4.8-4.8zM11 7.5A3.5 3.5 0 1 1 7.5 11 3.5 3.5 0 0 1 11 7.5z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>

      {/* Modal for searching */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="modal modal-open">
            <div className="modal-box w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="input input-bordered w-full py-2"
                placeholder="Search here..."
              />
              <div className="mt-4">
                <button className="btn btn-primary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchInput;
