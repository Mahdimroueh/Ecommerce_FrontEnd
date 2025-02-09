import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  // const navigate = useNavigate();

  const handleGoHome = () => {
    // navigate("/");
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! Page not found.</h2>
      <p className="text-lg mb-6 text-gray-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default ErrorPage;
