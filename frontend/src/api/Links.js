/* eslint-disable */
//export const BASE_URL = "http://89.104.70.130:9003";
export const BASE_URL = "http://127.0.0.1:9003";
export const API_LINKS = {
  SIGN_IN: `${BASE_URL}/api/public/user/auth`,
  VALIDATE_JWT: `${BASE_URL}/api/public/user/validate-token`,
  CREATE_CATEGORY: `${BASE_URL}/api/secured/category/create`,
  CHANGE_CATEGORY: `${BASE_URL}/api/secured/category/change`,
  DELETE_CATEGORY: `${BASE_URL}/api/secured/category/delete`,
  CATEGORIES_LIST: `${BASE_URL}/api/secured/category/list`,
  CATEGORIES_ALL: `${BASE_URL}/api/secured/category/all`,
  CREATE_PRODUCT: `${BASE_URL}/api/secured/product/create`,
  CHANGE_PRODUCT: `${BASE_URL}/api/secured/product/change`,
  DELETE_PRODUCT: `${BASE_URL}/api/secured/product/delete`,
  PRODUCTS_LIST: `${BASE_URL}/api/secured/product/list`,
};

export const ROUTE_LINKS = {
  LOGIN_PATH: "/",
  CATEGORIES_PATH: "/categories",
  PRODUCTS_PATH: "/products",
};

export const BASE_ROUTES = [ROUTE_LINKS.CATEGORIES_PATH, ROUTE_LINKS.PRODUCTS_PATH];
