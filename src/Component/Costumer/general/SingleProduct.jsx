import { useEffect, useState } from "react";
import useSingleProduct from "../../../api/FetchSingleProduct";
import Loading from "../../Helper/Loading";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { FaMinus, FaPlus, FaRegHeart } from "react-icons/fa";
import useCart from "../../../api/CartApi";
import { toast } from "react-toastify";
import useAuth from "../../../api/Auth";
import { Navigate, useNavigate } from "react-router-dom";

const SingleProduct = ({ id }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isIndexOpen, setIsIndexOpen] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentColorVariationIndex, setCurrentColorVariationIndex] =
    useState(0);
  const [currentSizeVariationId, setCurrentSizeVariationId] = useState(0);
  const { data: product, isLoading, isError } = useSingleProduct(id);

  const [currentColorName, setCurrentColorName] = useState("");

  const { addItem, addItemLoading } = useCart();

  if (!product && (isLoading || addItemLoading)) {
    return <Loading />;
  }

  const {
    about,
    careInstructions,
    desc,
    brandName,
    salePrice,
    colorVariationsResponses: colorVariations,
    name,
  } = product;
  const currentColorVariant = colorVariations[currentColorVariationIndex];
  const { sizeVariationsResponses: sizeVariationList } = currentColorVariant;
  const images = currentColorVariant.images;

  const ProductInfo = [
    { label: "Product Details", info: desc },
    { label: "brand", info: brandName },
    { label: "Look after me", info: careInstructions },
    { label: "About me", info: about },
  ];

  const handleClickLeft = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(images.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleClickRight = () => {
    if (currentImageIndex === images.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  return (
    <div className="grid w-full sm:mx-auto max-w-[900px] gap-x-10 sm:grid-cols-2  px-2 mt-10">
      <div className="relative h-[630px]">
        <img
          src={images[currentImageIndex]}
          alt=""
          className="w-full object-cover h-full"
        />
        <button className="absolute left-0 top-1/2 text-5xl">
          <MdOutlineKeyboardArrowLeft onClick={handleClickLeft} />
        </button>
        <button className="absolute right-0 top-1/2 text-5xl">
          <MdOutlineKeyboardArrowRight onClick={handleClickRight} />
        </button>
      </div>
      <div className="flex flex-col gap-y-3">
        <h4 className="text-xl text-gray-500">{name}</h4>
        <span className="font-bold text-sm">{salePrice}$</span>
        <div className="">
          <div className="text-lg flex gap-x-2 items-center">
            <span>Color : </span>
            <span
              className={`w-4 h-4 rounded-full border-2 border-solid border-black`}
              style={
                currentColorName
                  ? { background: currentColorName }
                  : { background: currentColorVariant.colorName }
              }
            ></span>
            <span> {currentColorName || currentColorVariant.colorName} </span>
          </div>
          <div className="flex gap-3 mt-2">
            {colorVariations.map((color, index) => {
              return (
                <button
                  key={color.id}
                  className=""
                  onClick={() => {
                    setCurrentColorVariationIndex(index);
                    setCurrentImageIndex(0);
                  }}
                  onMouseEnter={() => {
                    setCurrentColorName(color.colorName);
                  }}
                  onMouseLeave={() =>
                    setCurrentColorName(currentColorVariant.colorName)
                  }
                >
                  <img
                    src={color.images[0]}
                    alt=""
                    className={`w-16 h-16 object-cover hover:border-2 hover:border-solid hover:border-black ${
                      currentColorVariationIndex == index
                        ? "border-2 border-solid border-black"
                        : ""
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid gap-y-2">
          <label htmlFor="">Size : </label>
          <select
            className="w-64 px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
            value={currentSizeVariationId}
            onChange={(e) => setCurrentSizeVariationId(e.target.value)}
          >
            <option value="">select a size</option>
            {sizeVariationList.map((size) => {
              return (
                <option value={size.id} key={size.id}>
                  {size.sizeName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex gap-x-4">
          <button
            onClick={() => {
              if (user.roles === null) {
                toast.error("you must log in");
                navigate("/login");
                return;
              }
              if (currentSizeVariationId === 0) {
                toast.error("you must select a size");
              } else {
                addItem({ itemId: currentSizeVariationId, quantity: 1 });
              }
            }}
            className="p-4 w-64 bg-green-500 hover:bg-green-700 text-white font-medium border-solid rounded-sm border-2"
          >
            add to card
          </button>
          <button className="w-12 h-12 rounded-full bg-slate-300 relative">
            <FaRegHeart className="text-xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 " />
          </button>
        </div>
        <div className="grid">
          {ProductInfo.map((item, index) => {
            return (
              <div
                key={index}
                className={`${index == 0 ? "border-t-2" : ""} border-b-2 py-4`}
              >
                <div className="flex justify-between ">
                  <span className={`font-semibold`}>{item.label}</span>
                  {isIndexOpen.includes(index) ? (
                    <button
                      onClick={() =>
                        setIsIndexOpen(isIndexOpen.filter((i) => i !== index))
                      }
                    >
                      <FaMinus />
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsIndexOpen([...isIndexOpen, index])}
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
                <div
                  className={`${
                    isIndexOpen.includes(index)
                      ? "h-auto"
                      : "h-0 overflow-hidden"
                  } transition-all duration-300 ease-in-out mt-4`}
                >
                  {item.info}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
