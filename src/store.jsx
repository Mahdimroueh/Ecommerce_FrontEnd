import { configureStore } from "@reduxjs/toolkit";
// import FilterSlice from "./features/FilterSlice";
const store = configureStore({
  reducer: {
    // filter: FilterSlice,
  },
});

export default store;
