import { useMutation, useQuery } from "react-query";
import { customFetch, FetchApi } from "./AxiosFetch";
import { toast } from "react-toastify";
import { queryClient } from "../App";

const useWishList = () => {
  //   return useQuery("wishlist", () => FetchApi("/wishlist"));

  const { data, wishListIsLoading, wishListIsError } = useQuery(
    "wishlist",
    () => FetchApi("/wishlist")
  );

  const { mutateAsync: addToWishList, isLoading: addItemLoading } = useMutation(
    async (data) => {
      const response = await customFetch.post("/wishlist", data);
      return response.data;
    },
    {
      onSuccess: () => {
        // toast.success("added successfully");
        queryClient.invalidateQueries("wishlist");
      },
      onError: (e) => {
        // toast.error(e.response.data.message);
      },
    }
  );
  const { mutateAsync: deleteItem, isLoading: deleteItemLoading } = useMutation(
    async ({ id, data = false }) => {
      console.log(data);
      const response = await customFetch.delete(
        `/wishlist/${id}?isSize=${data}`
      );
      return response.data;
    },
    {
      onSuccess: async () => {
        // toast.success("deleted successfully");
        queryClient.invalidateQueries("wishlist");
      },
      onError: (e) => {
        // toast.error(e.response.data.message);
      },
    }
  );
  const { mutateAsync: updateItem, isLoading: updateItemLoading } = useMutation(
    async ({ id, newSize, isSize = false }) => {
      console.log(data);
      const response = await customFetch.put(
        `/wishlist/${id}?isSize=${isSize}&newSize=${newSize}`
      );
      return response.data;
    },
    {
      onSuccess: async () => {
        // toast.success("deleted successfully");
        queryClient.invalidateQueries("wishlist");
      },
      onError: (e) => {
        // toast.error(e.response.data.message);
      },
    }
  );

  return {
    data,
    wishListIsLoading,
    wishListIsError,
    updateItem,
    addToWishList,
    addItemLoading,
    deleteItem,
    deleteItemLoading,
  };
};

export default useWishList;

// const useWishLists = () => {

//   const { mutateAsync: addToWishList, isLoading: addItemLoading } = useMutation(
//     async (data) => {
//       const response = await customFetch.post("/wishlist", data);
//       return response.data;
//     },
//     {
//       onSuccess: () => {
//         toast.success("added successfully");
//         queryClient.invalidateQueries("UserCart");
//       },
//       onError: (e) => {
//         toast.error(e.response.data.message);
//       },
//     }
//   );

//   const { mutateAsync: updateSize, isLoading: updateSizeLoading } = useMutation(
//     async (data) => {
//       console.log(data);
//       const response = await customFetch.put("/user/cart", data);
//       return response.data;
//     },
//     {
//       onSuccess: async () => {
//         toast.success("updated successfully");
//         await refetch();
//       },
//       onError: (e) => {
//         toast.error(e.response.data.message);
//       },
//     }
//   );
//   const { mutateAsync: updateQuantity, isLoading: updateQuantityLoading } =
//     useMutation(
//       async (data) => {
//         console.log(data);
//         const response = await customFetch.put(
//           `/user/cart/${data.id}`,
//           data.body
//         );
//         return response.data;
//       },
//       {
//         onSuccess: async () => {
//           toast.success("updated successfully");
//           await refetch();
//         },
//         onError: (e) => {
//           toast.error(e.response.data.message);
//         },
//       }
//     );
//   const { mutateAsync: deleteItem, isLoading: deleteItemLoading } = useMutation(
//     async (data) => {
//       console.log(data);
//       const response = await customFetch.delete(`/user/cart/${data.id}`);
//       return response.data;
//     },
//     {
//       onSuccess: async () => {
//         toast.success("deleted successfully");
//         await refetch();
//       },
//       onError: (e) => {
//         toast.error(e.response.data.message);
//       },
//     }
//   );
//   const {
//     data: cartData,
//     isLoading: cartDataLoading,
//     refetch,
//   } = useQuery(
//     ["UserCart"],
//     async () => {
//       const response = await customFetch("/user/cart");
//       return response.data;
//     },
//   );

//   return {
//     deleteItem,
//     deleteItemLoading,
//     updateQuantity,
//     updateQuantityLoading,
//     updateSize,
//     updateSizeLoading,
//     addItem,
//     addItemLoading,
//     cartData,
//     cartDataLoading,
//   };
// };

// export default useCart;
