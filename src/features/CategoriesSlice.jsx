// // categorySlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { customFetch } from "../api/AxiosFetch";

// // Define the async thunk for fetching categories from the API
// export const fetchCategories = createAsyncThunk(
//   "categories/fetchCategories",
//   async () => {
//     const response = await customFetch("/categories"); // Using cusTomFetch and passing the endpoint
//     return response.data; // Return the data to the reducer
//   }
// );

// const categorySlice = createSlice({
//   name: "categories",
//   initialState: {
//     categories: [],
//     CategoryStatus: "idle", // 'idle', 'loading', 'succeeded', 'failed'
//     CategoryError: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.status = "loading"; // Set the status to loading when the request is pending
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.status = "succeeded"; // Set the status to succeeded when data is fetched
//         state.categories = action.payload; // Store fetched categories in the state
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.status = "failed"; // Set the status to failed if there is an error
//         state.error = action.error.message; // Store the error message in the state
//       });
//   },
// });

// export default categorySlice.reducer;
