import { useQuery } from "react-query";
import { FetchApi } from "./AxiosFetch";

const useCategory = (id) => {
  return useQuery(["AllCategory", id], () => FetchApi("/categories", id));
};

export default useCategory;
