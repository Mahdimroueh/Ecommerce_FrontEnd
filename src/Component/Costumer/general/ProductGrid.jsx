import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import useProduct from "../../../api/FetchProduct";
import useWishList from "../../../api/FetchWishList";
import useAuth from "../../../api/Auth";
import Loading from "../../Helper/Loading";
import Pagination from "./Pagination";
import NoProductFound from "./NoProductFound";

const ProductGrid = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    addToWishList,
    addItemLoading,
    data: wishListItem,
    wishListIsLoading,
    wishListIsError,
    deleteItem,
  } = useWishList();

  const filterFromQueryParams = {
    search: queryParams.get("search") || "",
    category: queryParams.get("category") || "",
    brand: queryParams.get("brand") || "",
    color: queryParams.get("color") || "",
    size: queryParams.get("size") || "",
    maxPrice: queryParams.get("maxPrice") || "",
    page: queryParams.get("page") || 0,
    parentCategory: queryParams.get("parentCategoryId") || "men",
  };

  const { data, isLoading, isError } = useProduct(filterFromQueryParams);

  if (isLoading || wishListIsLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loading />
      </div>
    );
  }

  if (isError || wishListIsError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-center">
        An error occurred while loading products. Please try again later.
      </div>
    );
  }

  const { content: products, totalPages, pageable } = data;

  if (!products?.length) {
    return <NoProductFound />;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => {
          const {
            id,
            name,
            images = [],
            salePrice,
            colorVariationsResponses = [],
          } = product;

          let imageUrl = images[0] || "";
          let hoverImageUrl = images[1] || "";

          // Determine the color variation to show
          let colorVariation = colorVariationsResponses[0] || null;
          if (filterFromQueryParams.color) {
            const matchedColor = colorVariationsResponses.find(
              (i) => i.colorName === filterFromQueryParams.color
            );
            if (matchedColor) {
              colorVariation = matchedColor;
              imageUrl = matchedColor.images?.[0] || imageUrl;
              hoverImageUrl = matchedColor.images?.[1] || hoverImageUrl;
            }
          }

          const isInWishlist = wishListItem?.find(
            (i) => i.colorId == colorVariation?.id && i.sizeId === null
          );

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group"
            >
              <Link
                to={`/products/${id}`}
                className="block overflow-hidden rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  {/* Main Image */}
                  <img
                    src={imageUrl}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover Image */}
                  {hoverImageUrl && (
                    <img
                      src={hoverImageUrl}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  )}

                  {/* Quick View Button */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:bg-opacity-20 group-hover:opacity-100">
                    <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                      <span className="inline-flex items-center px-4 py-2 bg-white text-black text-sm font-medium rounded-full shadow-lg">
                        <FaSearch className="mr-2" /> Quick View
                      </span>
                    </div>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md z-10 transition-transform duration-300 hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();

                      if (!user?.authenticated) {
                        navigate("/login");
                        return;
                      }

                      if (isInWishlist) {
                        deleteItem({ id: colorVariation.id, data: false });
                      } else {
                        addToWishList({ colorVariationId: colorVariation.id });
                      }
                    }}
                  >
                    {isInWishlist ? (
                      <FaHeart className="text-red-500" size={18} />
                    ) : (
                      <FaRegHeart className="text-gray-700" size={18} />
                    )}
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 truncate">
                    {name}
                  </h3>
                  <p className="text-lg font-bold text-black">
                    ${parseFloat(salePrice).toFixed(2)}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-12">
        <Pagination pageCount={totalPages} page={pageable.pageNumber} />
      </div>
    </>
  );
};

export default ProductGrid;
