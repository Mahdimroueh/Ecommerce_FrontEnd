// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { customFetch } from "../api/AxiosFetch";

// export const fetchBrand = createAsyncThunk("brand/fetchBrand", async () => {
//   const response = await customFetch("/brand");
//   return response.data;
// });

// const brandSlice = createSlice({
//   name: "brand",
//   initialState: {
//     brand: [],
//     brandStatus: "idle",
//     brandError: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBrand.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchBrand.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.brand = action.payload;
//       })
//       .addCase(fetchBrand.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default brandSlice.reducer;
