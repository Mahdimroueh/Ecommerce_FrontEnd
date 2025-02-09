// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   search: "",
//   category: "",
//   brand: "",
//   color: "",
//   size: "",
//   maxPrice: "",
//   page: 0,
// };

// const filterSlice = createSlice({
//   name: "filter",
//   initialState,
//   reducers: {
//     setSearchText(state, action) {
//       state.search = action.payload;
//     },
//     setCategory(state, action) {
//       state.category = action.payload;
//     },
//     setBrand(state, action) {
//       state.brand = action.payload;
//     },
//     setColor(state, action) {
//       state.color = action.payload;
//     },
//     setSize(state, action) {
//       state.size = action.payload;
//     },
//     setMaxPrice(state, action) {
//       state.maxPrice = action.payload;
//     },
//     setPage(state, action) {
//       state.page = action.payload;
//     },
//     resetFilters(state) {
//       (state.search = ""),
//         (state.category = ""),
//         (state.brand = ""),
//         (state.color = ""),
//         (state.size = ""),
//         (state.maxPrice = ""),
//         (state.page = 0);
//     },
//   },
// });

// export const {
//   setSearchText,
//   setCategory,
//   setBrand,
//   setColor,
//   resetFilters,
//   setSize,
//   setMaxPrice,
//   setPage,
// } = filterSlice.actions;

// export default filterSlice.reducer;
