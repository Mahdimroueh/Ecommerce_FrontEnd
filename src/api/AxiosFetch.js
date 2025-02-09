import axios from "axios";

const ProductionUrl = "http://localhost:5455";

export const customFetch = axios.create({
  baseURL: ProductionUrl,
  withCredentials: true,
});

export const FetchApi = async (url, id = "") => {
  try {
    const response = await customFetch(`${url}${id === "" ? "" : "/"}${id}`);
    return response.data;
  } catch (error) {
    console.error("FetchApi Error:", error);
    throw error; 
  }
};
