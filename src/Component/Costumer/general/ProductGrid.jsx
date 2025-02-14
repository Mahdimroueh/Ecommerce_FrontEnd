import { Link, useLocation, useNavigate } from "react-router-dom";
import useProduct from "../../../api/FetchProduct";
import Loading from "../../Helper/Loading";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Pagination from "./Pagination";
import NoProductFound from "./NoProductFound";
import useWishList from "../../../api/FetchWishList";
import useAuth from "../../../api/Auth";

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
    return <Loading />;
  }
  if (isError || wishListIsError) {
    return <>An error occurred</>;
  }

  const { content: products, totalPages, totalElements, pageable } = data;

  if (!products?.length) {
    return <NoProductFound />;
  }

  return (
    <>
      <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => {
          const {
            id,
            name,
            images = [],
            salePrice,
            colorVariationsResponses = [],
          } = p;

          let imageUrl = images[0] || ""; // Ensure a fallback
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

          return (
            <Link
              className="group relative border border-gray-200 p-4 sm:p-6"
              to={`/products/${id}`}
              key={id}
            >
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={name}
                  className="aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                />
                {hoverImageUrl && (
                  <img
                    src={hoverImageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full rounded-lg object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                )}
                <button
                  className="absolute right-0 bottom-4 text-xl text-white bg-black bg-opacity-50 p-2 rounded-full transition-colors duration-300 hover:bg-opacity-70"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (!user?.authenticated) {
                      navigate("/login");
                      return;
                    }

                    const isInWishlist = wishListItem?.find(
                      (i) =>
                        i.colorId == colorVariation?.id && i.sizeId === null
                    );

                    if (isInWishlist) {
                      deleteItem({ id: colorVariation.id, data: false });
                    } else {
                      addToWishList({ colorVariationId: colorVariation.id });
                    }
                  }}
                >
                  {wishListItem?.find(
                    (i) => i.colorId == colorVariation?.id && i.sizeId === null
                  ) ? (
                    <FaHeart className="text-black" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>
              <div className="pt-10">
                <h3 className="text-lg font-medium text-gray-900">
                  <span>{name}</span>
                </h3>
                <p className="mt-4 text-base font-semibold text-gray-900">
                  ${salePrice}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <Pagination pageCount={totalPages} page={pageable.pageNumber} />
    </>
  );
};

export default ProductGrid;
