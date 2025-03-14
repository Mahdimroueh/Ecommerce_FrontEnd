import React from "react";
import useWishList from "../../../api/FetchWishList";
import useCart from "../../../api/CartApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaShoppingBag } from "react-icons/fa";

const WishList = () => {
  const navigate = useNavigate();
  const {
    data: products,
    wishListIsLoading,
    wishListIsError,
    updateItem,
    deleteItem,
  } = useWishList();

  const { addItem, addItemLoading } = useCart();

  if (wishListIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (wishListIsError) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-medium text-gray-800">
          Unable to load wishlist
        </h2>
        <p className="text-gray-600 mt-2">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>

      {products?.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-10 text-center">
          <h2 className="text-xl font-medium text-gray-800">
            Your wishlist is empty
          </h2>
          <button
            className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            onClick={() => navigate("/shop")}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((p) => {
            const {
              sizeId,
              colorId,
              productName,
              images,
              unitPrice,
              color,
              sizes,
            } = p;
            return (
              <div
                key={sizeId || colorId}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="relative aspect-square">
                  <img
                    src={images[0]}
                    alt={productName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
                    onClick={() => {
                      if (sizeId) {
                        deleteItem({ id: sizeId, data: true });
                      } else {
                        deleteItem({ id: colorId, data: false });
                      }
                    }}
                  >
                    <FaTrash className="text-red-500" size={14} />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                    {productName}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900 mb-3">
                    ${unitPrice.toFixed(2)}
                  </p>

                  <div className="flex items-center mb-3">
                    <div className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-700">
                      {color}
                    </div>
                  </div>

                  <select
                    onChange={(e) => {
                      if (sizeId) {
                        updateItem({
                          id: sizeId,
                          newSize: e.target.value,
                          isSize: true,
                        });
                      } else {
                        updateItem({
                          id: colorId,
                          newSize: e.target.value,
                          isSize: false,
                        });
                      }
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-md text-sm py-2 px-3 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    value={sizeId || ""}
                  >
                    {sizeId ? "" : <option value="">Select Size</option>}
                    {sizes.map((size) => (
                      <option key={size.id} value={size.id}>
                        {size.size}
                      </option>
                    ))}
                  </select>

                  <button
                    className="flex items-center justify-center w-full bg-gray-900 text-white py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                    onClick={() => {
                      if (sizeId === null) {
                        toast.error("Please select a size");
                        return;
                      }
                      addItem({ itemId: sizeId, quantity: 1 });
                      deleteItem({ id: sizeId, data: true });
                      navigate("/cart");
                    }}
                    disabled={addItemLoading}
                  >
                    <FaShoppingBag className="mr-2" size={14} />
                    Move to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishList;
