import Filter from "../Component/Costumer/general/Filter";
import Pagination from "../Component/Costumer/general/Pagination";
import ProductGrid from "../Component/Costumer/general/ProductGrid";

const ProductsPage = ({ category }) => {
  return (
    <>
      <Filter category={category} />
      <ProductGrid />
    </>
  );
};

export default ProductsPage;
