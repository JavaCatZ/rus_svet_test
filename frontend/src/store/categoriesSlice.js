/* eslint-disable */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_LINKS } from "Api/Links";
import { REST_STATUSES } from "Api/Api";

export const getCategoriesPage = createAsyncThunk(
  "company/getCategoriesPage",
  async (requestFields, { rejectWithValue }) => {
    const res = await axios
      .get(
        `${API_LINKS.CATEGORIES_LIST}?page=${requestFields.get(
          "page"
        )}&size=${requestFields.get("size")}`,
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

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categoriesList: [],
    categoriesCount: 0,
    status: null,
    error: null,
  },
  extraReducers: {
    [getCategoriesPage.pending]: (state) => {
      state.status = REST_STATUSES.LOADING;
      state.error = null;
    },
    [getCategoriesPage.fulfilled]: (state, action) => {
      state.status = REST_STATUSES.RESOLVED;
      state.categoriesList = action.payload.content;
      state.categoriesCount = action.payload.totalElements;
    },
    [getCategoriesPage.rejected]: setError,
  },
});

export default categoriesSlice.reducer;
