import useCart from "../../../api/CartApi";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const Cart = () => {
  const {
    cartData,
    cartDataLoading,
    updateSize,
    updateSizeLoading,
    updateQuantity,
    updateQuantityLoading,
    deleteItem,
    deleteItemLoading,
  } = useCart();

  const handleSizeChange = (data) => {
    updateSize(data);
  };

  // Loading state
  if (
    !cartData &&
    (cartDataLoading ||
      updateSizeLoading ||
      updateQuantityLoading ||
      deleteItemLoading)
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const subTotal = cartData.shoppingCartItems.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  const totalItems = cartData.shoppingCartItems.length;

  const totalQuantity = cartData.shoppingCartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          {!totalItems ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartData.shoppingCartItems.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4 relative"
                  key={index}
                >
                  <div className="relative h-24 w-24 bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      className="object-cover w-full h-full"
                      alt={item.productName}
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800">
                      {item.productName}
                    </h3>
                    <div className="text-sm text-gray-500 mt-1">
                      Color: {item.color}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-3">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">Size</span>
                        <select
                          className="bg-gray-50 border border-gray-200 rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          defaultValue={
                            item.sizes.find(
                              (size) => size.id === item.productId
                            )?.id || ""
                          }
                          onChange={(e) =>
                            handleSizeChange({
                              itemId: item.productId,
                              newSizeId: e.target.value,
                            })
                          }
                        >
                          {item.sizes.map((size) => (
                            <option key={size.id} value={size.id}>
                              {size.size}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center">
                        <span className="text-xs text-gray-500 mr-2">Qty</span>
                        <select
                          className="bg-gray-50 border border-gray-200 rounded-md text-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          defaultValue={item.quantity}
                          onChange={(e) => {
                            updateQuantity({
                              id: item.productId,
                              body: {
                                quantity: parseInt(e.target.value),
                              },
                            });
                          }}
                        >
                          {Array.from(
                            { length: Math.max(item.quantity * 2, 10) },
                            (_, index) => index + 1
                          ).map((qnt) => (
                            <option key={qnt} value={qnt}>
                              {qnt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <p className="font-medium text-gray-900">
                      ${item.unitPrice.toFixed(2)}
                    </p>
                    <button
                      className="mt-3 text-sm text-gray-500 hover:text-red-600 flex items-center transition-colors"
                      onClick={() => deleteItem({ id: item.productId })}
                    >
                      <FaTrash className="mr-1 text-xs" /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-lg font-medium text-gray-800 pb-4 border-b border-gray-200">
              Order Summary
            </h2>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Subtotal ({totalItems} items)
                </span>
                <span className="font-medium">${subTotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Quantity</span>
                <span className="font-medium">{totalQuantity}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between mb-4">
                <span className="text-gray-900 font-medium">Total</span>
                <span className="text-xl font-bold text-gray-900">
                  ${subTotal.toFixed(2)}
                </span>
              </div>

              <button className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors">
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center">
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
