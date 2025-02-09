import React from "react";
import useProduct from "../../../api/FetchProduct";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductForm = () => {
  const { data, isLoading, isError } = useProduct();

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center p-4 text-red-600">
        Error loading products!
      </div>
    );
  }
  const { content: products } = data;

  return (
    <div className="overflow-x-auto p-4">
      <div>
        <Link  className="btn btn-primary" to="/addProduct">add a Product</Link>
      </div>
      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left font-semibold">Images</th>
            <th className="py-2 px-4 text-left font-semibold">Name</th>
            <th className="py-2 px-4 text-left font-semibold">Sale Price</th>
            <th className="py-2 px-4 text-left font-semibold">Category</th>
            <th className="py-2 px-4 text-left font-semibold">Brand</th>
            <th className="py-2 px-4 text-left font-semibold">Action</th>
            {/* <th className="py-2 px-4 text-left font-semibold">Description</th>
            <th className="py-2 px-4 text-left font-semibold">
              Care Instruction
            </th>
            <th className="py-2 px-4 text-left font-semibold">About</th> */}
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.productId} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 object-contain"
                />
              </td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.salePrice}</td>
              <td className="py-2 px-4 border-b">{product.categoryName}</td>
              <td className="py-2 px-4 border-b">{product.brandName}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex gap-x-4">
                  <button>
                    <FaEdit />
                  </button>
                  <button className="text-red-400">
                    <FaTrash />
                  </button>
                </div>
              </td>
              {/* <td className="py-2 px-4 border-b truncate overflow-hidden text-ellipsis max-w-xs">
                {product.desc}
              </td>
              <td className="py-2 px-4 border-b truncate overflow-hidden text-ellipsis max-w-xs">
                {product.careInstructions}
              </td>
              <td className="py-2 px-4 border-b truncate overflow-hidden text-ellipsis max-w-xs">
                {product.about}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductForm;
