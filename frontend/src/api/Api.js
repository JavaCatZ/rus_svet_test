/* eslint-disable */
import axios from "axios";
import { API_LINKS } from "Api/Links";

export const API_BASE_HEADERS = {
  "Accept-Language": "ru",
  "Content-Type": "application/json",
};

export const API_MULTIPART_HEADERS = {
  "Accept-Language": "ru",
  "Content-Type": "multipart/form-data",
};

export const REST_STATUSES = {
  LOADING: "loading",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export const signIn = async (authDto) => {
  const res = await axios
    .post(`${API_LINKS.SIGN_IN}`, authDto)
    .catch((error) => Promise.reject(error.response.data));

  return res.data;
};

export const getAllCategories = async (headers) => {
  const res = await axios
    .get(`${API_LINKS.CATEGORIES_ALL}`, {
      headers,
    })
    .catch((error) => Promise.reject(error.response.data));

  return res.data;
};

export const createCategory = async (headers, dto) => {
  const res = await axios
    .post(`${API_LINKS.CREATE_CATEGORY}`, dto, {
      headers,
    })
    .catch((error) => Promise.reject(error.response.data));

  return res.data;
};

export const changeCategory = async (headers, dto) => {
  const res = await axios
    .put(`${API_LINKS.CHANGE_CATEGORY}`, dto, {
      headers,
    })
    .catch((error) => Promise.reject(error.response.data));

  return res.data;
};

export const deleteCategory = async (headers, id) => {
  const res = await axios
    .delete(`${API_LINKS.DELETE_CATEGORY}`, {
      headers,
      params: {
        id,
      },
    })
    .catch((error) => Promise.reject(error.response.data));

  return res.data;
};

export const createProduct = async (headers, formData) => {
  const res = await axios
    .post(`${API_LINKS.CREATE_PRODUCT}`, formData, {
      headers,
    })
    .catch((error) => Promise.reject(error.response.data));

  return res.data;
};

export const changeProduct = async (headers, formData) => {
  const res = await axios
    .put(`${API_LINKS.CHANGE_PRODUCT}`, formData, {
      headers,
    })
    .catch((error) => Promise.reject(error.response.data));

  return res.data;
};

export const deleteProduct = async (headers, id) => {
  const res = await axios
    .delete(`${API_LINKS.DELETE_PRODUCT}`, {
      headers,
      params: {
        id,
      },
    })
    .catch((error) => Promise.reject(error.response.data));

  return res.data;
};
