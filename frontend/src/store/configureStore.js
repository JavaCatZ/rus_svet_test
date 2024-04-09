/* eslint-disable */
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "Store/categoriesSlice";
import productsReducer from "Store/productsSlice";

export default configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
  },
});
