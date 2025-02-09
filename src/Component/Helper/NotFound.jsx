import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <div className="text-center">
        {/* Large, decorative 404 text */}
        <h1 className="text-9xl font-extrabold text-gray-300">404</h1>

        {/* Error message */}
        <p className="text-2xl font-semibold mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-lg mt-2">
          It might have been removed, renamed, or it never existed.
        </p>

        {/* Illustration or image */}
        <div className="mt-6">
          <img
            src="https://via.placeholder.com/300x200.png?text=404+Illustration"
            alt="404 Illustration"
            className="mx-auto w-64"
          />
        </div>

        {/* Back to home button */}
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
