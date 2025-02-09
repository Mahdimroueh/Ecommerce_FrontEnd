import React from "react";
import SingleProduct from "../Component/Costumer/general/SingleProduct";
import { useParams } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams();

  return (
    <div>
      <SingleProduct id={id} />
    </div>
  );
};

export default SingleProductPage;
