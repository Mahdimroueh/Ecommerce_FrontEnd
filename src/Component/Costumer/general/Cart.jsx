import useCart from "../../../api/CartApi";
import Loading from "../../Helper/Loading";
import { FaTimes } from "react-icons/fa";

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

  if (
    !cartData &&
    (cartDataLoading ||
      updateSizeLoading ||
      updateQuantityLoading ||
      deleteItemLoading)
  ) {
    return <Loading />;
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
    <div className="grid lg:grid-cols-2 xl pt-10 gap-x-5 ">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold bg-white p-5 mb-2 lg:shadow-xl mt-2">
          My Bag
        </h1>
        {!totalItems ? <h1>Empty Cart</h1> : ""}
        {cartData.shoppingCartItems.map((item, index) => {
          return (
            <div
              className="flex justify-start items-center gap-x-5 relative border-b-2 p-4 bg-white lg:shadow-xl"
              key={index}
            >
              <img
                src={item.image}
                className="object-cover w-[150px] h-[150px]"
                alt=""
              />
              <div className="flex flex-col gap-y-4">
                <h3 className="font-bold">${item.unitPrice.toFixed(2)}</h3>
                <p className="">{item.productName}</p>
                <div className="flex gap-x-2 items-center">
                  <span>{item.color}</span>
                  <select
                    className="w-24 select select-bordered select-sm"
                    defaultValue={
                      item.sizes.find((size) => size.id === item.productId)
                        ?.id || ""
                    }
                    onChange={(e) =>
                      handleSizeChange({
                        itemId: item.productId,
                        newSizeId: e.target.value,
                      })
                    }
                  >
                    {item.sizes.map((size) => {
                      return (
                        <option key={size.id} value={size.id}>
                          {size.size}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    className="w-24 select select-bordered select-sm"
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
              <button
                className="absolute text-lg top-5 right-5"
                onClick={() => deleteItem({ id: item.productId })}
              >
                <FaTimes />
              </button>
            </div>
          );
        })}
      </div>
      <div className="lg:w-[400px] p-4 lg:bg-white h-[400px] lg:shadow-xl rounded-xl sticky top-4">
        <h1 className="border-b-2 p-6 font-bold uppercase text-lg ">Total</h1>
        <div className="grid gap-y-5 mt-4">
          <div className="flex justify-between ">
            <span className="font-bold">Sub-total</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Total Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Total Quantity</span>
            <span>{totalQuantity}</span>
          </div>
        </div>
        <button className="btn bg-green-700 hover:bg-green-900 text-white w-full mt-4">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
