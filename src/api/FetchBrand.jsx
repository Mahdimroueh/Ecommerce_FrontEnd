import { useQuery } from "react-query";
import {FetchApi } from "./AxiosFetch";

const useBrand = () => {
  return useQuery(["AllBrand"], () => FetchApi("/brand"));
};

export default useBrand;
