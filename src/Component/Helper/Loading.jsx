import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50 border-l-transparent border-r-transparent"></div>
    </div>
  );
};

export default Loading;
