import React from "react";
import { Link } from "react-router-dom";

const WomenPage = () => {
  return (
    <div>
      {" "}
      <Link to="/women/products" className="btn btn-primary btn-outline">
        {" "}
        Check Product
      </Link>
    </div>
  );
};

export default WomenPage;
