import { useEffect, useState } from "react";
import useSingleProduct from "../../../api/FetchSingleProduct";
import Loading from "../../Helper/Loading";
import { 
  MdOutlineKeyboardArrowLeft, 
  MdOutlineKeyboardArrowRight,
  MdExpandMore,
  MdOutlineInfo
} from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import useCart from "../../../api/CartApi";
import { toast } from "react-toastify";
import useAuth from "../../../api/Auth";
import { useNavigate } from "react-router-dom";
import useWishList from "../../../api/FetchWishList";

const SingleProduct = ({ id }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    addToWishList,
    data: wishListItem,
    wishListIsLoading,
    deleteItem,
  } = useWishList();

  const [activeTab, setActiveTab] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentColorVariationIndex, setCurrentColorVariationIndex] = useState(0);
  const [currentSizeVariationId, setCurrentSizeVariationId] = useState(0);
  const { data: product, isLoading, isError } = useSingleProduct(id);
  const [currentColorName, setCurrentColorName] = useState("");
  const { addItem, addItemLoading } = useCart();
  const [showGallery, setShowGallery] = useState(false);

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

  const productInfo = [
    { label: "Product Details", info: desc },
    { label: "Brand", info: brandName },
    { label: "Care Instructions", info: careInstructions },
    { label: "About", info: about },
  ];

  const handleImageNavigation = (direction) => {
    if (direction === "prev") {
      setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  const handleAddToCart = () => {
    if (!user?.roles) {
      toast.error("Please sign in to continue", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
      return;
    }
    
    if (currentSizeVariationId === 0) {
      toast.error("Please select a size", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      addItem({ itemId: currentSizeVariationId, quantity: 1 });
      toast.success("Added to cart", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleWishlistToggle = () => {
    if (!user?.roles) {
      toast.error("Please sign in to continue", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
      return;
    }

    if (currentSizeVariationId > 0) {
      const inWishlist = wishListItem?.find(item => item.sizeId == currentSizeVariationId);
      
      if (inWishlist) {
        deleteItem({ id: currentSizeVariationId, data: true });
        toast.info("Removed from wishlist", { autoClose: 2000 });
      } else {
        addToWishList({ sizeVariationId: currentSizeVariationId });
        toast.success("Added to wishlist", { autoClose: 2000 });
      }
    } else {
      const inWishlist = wishListItem?.find(item => 
        item.colorId == currentColorVariant.id && item.sizeId === null
      );
      
      if (inWishlist) {
        deleteItem({ id: currentColorVariant.id, data: false });
        toast.info("Removed from wishlist", { autoClose: 2000 });
      } else {
        addToWishList({ colorVariationId: currentColorVariant.id });
        toast.success("Added to wishlist", { autoClose: 2000 });
      }
    }
  };

  const isInWishlist = currentSizeVariationId > 0
    ? wishListItem?.some(item => item.sizeId == currentSizeVariationId)
    : wishListItem?.some(item => item.colorId == currentColorVariant.id && item.sizeId === null);

  return (
    <div className="max-w-[1200px] mx-auto px-4 mt-8 mb-16">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="relative">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-50">
            <img
              src={images[currentImageIndex]}
              alt={`${name} - ${currentColorVariant.colorName}`}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            
            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
              <button 
                className="bg-white bg-opacity-70 rounded-full p-2 text-gray-800 hover:bg-opacity-90 transition-all shadow-md"
                onClick={() => handleImageNavigation("prev")}
                aria-label="Previous image"
              >
                <MdOutlineKeyboardArrowLeft className="text-3xl" />
              </button>
              <button 
                className="bg-white bg-opacity-70 rounded-full p-2 text-gray-800 hover:bg-opacity-90 transition-all shadow-md"
                onClick={() => handleImageNavigation("next")}
                aria-label="Next image"
              >
                <MdOutlineKeyboardArrowRight className="text-3xl" />
              </button>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded-md border-2 transition-all ${
                  currentImageIndex === idx 
                    ? "border-black" 
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => setCurrentImageIndex(idx)}
              >
                <img 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="text-2xl font-medium text-gray-900 mb-1">{name}</h1>
            <h2 className="text-sm text-gray-500">{brandName}</h2>
          </div>

          <div className="mb-8">
            <span className="text-2xl font-bold text-gray-900">${salePrice}</span>
          </div>

          {/* Color Selection */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">
              Color: <span className="font-normal">{currentColorName || currentColorVariant.colorName}</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {colorVariations.map((color, index) => (
                <button
                  key={color.id}
                  className={`relative overflow-hidden rounded-md transition-all ${
                    currentColorVariationIndex === index 
                      ? "ring-2 ring-black" 
                      : "hover:ring-1 hover:ring-gray-300"
                  }`}
                  onClick={() => {
                    setCurrentColorVariationIndex(index);
                    setCurrentImageIndex(0);
                  }}
                  onMouseEnter={() => setCurrentColorName(color.colorName)}
                  onMouseLeave={() => setCurrentColorName("")}
                >
                  <img
                    src={color.images[0]}
                    alt={color.colorName}
                    className="w-16 h-16 object-cover"
                  />
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1"
                    style={{ backgroundColor: color.colorName }}
                  ></div>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizeVariationList.map((size) => (
                <button
                  key={size.id}
                  className={`px-4 py-2 border rounded-md transition-all ${
                    currentSizeVariationId == size.id
                      ? "bg-black text-white border-black"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                  onClick={() => setCurrentSizeVariationId(size.id)}
                >
                  {size.sizeName}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-10">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex justify-center items-center gap-2 py-3 bg-black hover:bg-gray-800 text-white font-medium rounded-md transition-colors"
            >
              <HiOutlineShoppingBag className="text-xl" />
              <span>Add to Cart</span>
            </button>
            
            <button
              disabled={wishListIsLoading}
              onClick={handleWishlistToggle}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              {isInWishlist ? (
                <FaHeart className="text-xl text-red-500" />
              ) : (
                <FaRegHeart className="text-xl text-gray-600" />
              )}
            </button>
          </div>

          {/* Accordion Product Info */}
          <div className="border-t border-gray-200">
            {productInfo.map((item, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  className="flex w-full items-center justify-between py-4 text-left"
                  onClick={() => setActiveTab(activeTab === index ? null : index)}
                >
                  <span className="font-medium text-gray-900">{item.label}</span>
                  <MdExpandMore
                    className={`text-2xl text-gray-500 transition-transform ${
                      activeTab === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeTab === index 
                      ? "max-h-96 opacity-100 pb-4" 
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600">{item.info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;