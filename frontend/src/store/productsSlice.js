/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_LINKS } from "Api/Links";
import { REST_STATUSES } from "Api/Api";

export const getProductsPage = createAsyncThunk(
  "company/getProductsPage",
  async (requestFields, { rejectWithValue }) => {
    const res = await axios
      .get(
        `${API_LINKS.PRODUCTS_LIST}?page=${requestFields.get(
          "page"
        )}&size=${requestFields.get("size")}${requestFields.get("filters")}`,
        {
          headers: requestFields.get("headers"),
        }
      )
      .catch((error) => {
        throw rejectWithValue(error.response.data);
      });

    return res.data;
  }
);

const setError = (state, action) => {
  state.status = REST_STATUSES.REJECTED;
  state.error = action.payload;
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
    productsCount: 0,
    status: null,
    error: null,
  },
  extraReducers: {
    [getProductsPage.pending]: (state) => {
      state.status = REST_STATUSES.LOADING;
      state.error = null;
    },
    [getProductsPage.fulfilled]: (state, action) => {
      state.status = REST_STATUSES.RESOLVED;
      state.productsList = action.payload.content;
      state.productsCount = action.payload.totalElements;
    },
    [getProductsPage.rejected]: setError,
  },
});

export default productsSlice.reducer;
