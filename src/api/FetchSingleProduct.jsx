import { useQuery } from "react-query";
import { FetchApi } from "./AxiosFetch";

const useSingleProduct = (id) => {
  return useQuery(["SizeOption", id], () => FetchApi("/products",id));
};

export default useSingleProduct;
