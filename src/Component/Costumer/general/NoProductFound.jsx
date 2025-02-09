import React from "react";
import { useNavigate } from "react-router-dom";

const NoProductFound = ({ onClickFunc }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-20">
      <img
        src="https://as2.ftcdn.net/v2/jpg/04/75/01/23/1000_F_475012363_aNqXx8CrsoTfJP5KCf1rERd6G50K0hXw.jpg"
        alt="No products found"
        className="h-40 w-40 mb-4"
      />
      <h2 className="text-2xl font-semibold text-gray-700">
        No products available
      </h2>
      <p className="text-gray-500 mt-2">
        Try adjusting your filters or explore other categories.
      </p>
      <button onClick={onClickFunc} className="mt-6 btn btn-link ">
        Go Back to Home
      </button>
    </div>
  );
};

export default NoProductFound;
