import React from "react";
import useWishList from "../../../api/FetchWishList";
import Loading from "../../Helper/Loading";
import useCart from "../../../api/CartApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    return <Loading />;
  }

  if (wishListIsError) {
    return <h1>an error occurred</h1>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
          <div key={sizeId || colorId}>
            <div className="w-full h-80">
              <img
                src={images[0]}
                alt={productName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 grid gap-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {productName}
              </h3>
              <p className="text-gray-600">${unitPrice.toFixed(2)}</p>
              <span className=" block px-3 py-1 border-y">{color}</span>
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
                className="w-full select select-md"
                value={sizeId || ""}
              >
                {sizeId ? "" : <option value="">choose a size</option>}
                {sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.size}
                  </option>
                ))}
              </select>

              <button
                className="btn btn-outline w-full"
                onClick={() => {
                  if (sizeId === null) {
                    toast.error("you must select a size");
                    return;
                  }
                  addItem({ itemId: sizeId, quantity: 1 });
                  deleteItem({ id: sizeId, data: true });
                  navigate("/cart");
                }}
              >
                move to bag
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WishList;
