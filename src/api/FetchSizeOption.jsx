import { useQuery } from "react-query";
import { FetchApi } from "./AxiosFetch";

const useSizeOption = (id) => {
  return useQuery(["SizeOption", id], () => FetchApi("options",  id ));
};

export default useSizeOption;
