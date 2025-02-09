import { useQuery } from "react-query";
import { customFetch } from "./AxiosFetch";

const fetchProductApi = async (filter) => {
  const baseUrl = "/products";
  const urlParams = new URLSearchParams(filter).toString();
  const requestUrl = `${baseUrl}?${urlParams}`;
  const response = await customFetch(requestUrl);
  return response.data;
};

const useProduct = (filter) => {
  return useQuery(["AllProduct", filter], () => fetchProductApi(filter));
};

export default useProduct;
