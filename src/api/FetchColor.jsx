import { useQuery } from "react-query";
import { FetchApi } from "./AxiosFetch";

const useColor = () => {
  return useQuery(["AllColors"], () => FetchApi("/colors"));
};

export default useColor;
