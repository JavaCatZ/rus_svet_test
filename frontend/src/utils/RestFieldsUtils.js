/* eslint-disable */
import { API_BASE_HEADERS, API_MULTIPART_HEADERS } from "Api/Api";

export const getBearerAuthFields = (accessToken) =>
  Object.assign(API_BASE_HEADERS, { Authorization: `Bearer ${accessToken}` });

export const getBaseFields = (obj) => {
  const requestFields = new Map();
  requestFields.set(
    "headers",
    Object.assign(API_BASE_HEADERS, {
      Authorization: `Bearer ${obj.accessToken}`,
    })
  );
  requestFields.set("page", obj.page);
  requestFields.set("size", obj.size);

  return requestFields;
};

export const getFieldsWithBody = (obj) => {
  const requestFields = new Map();
  requestFields.set(
    "headers",
    Object.assign(API_BASE_HEADERS, {
      Authorization: `Bearer ${obj.accessToken}`,
    })
  );
  requestFields.set("body", obj.body);

  return requestFields;
};

export const getFieldsWithFilters = (obj) => {
  const requestFields = new Map();
  requestFields.set(
    "headers",
    Object.assign(API_BASE_HEADERS, {
      Authorization: `Bearer ${obj.accessToken}`,
    })
  );
  requestFields.set("filters", obj.filters);
  requestFields.set("page", obj.page);
  requestFields.set("size", obj.size);

  return requestFields;
};

export const getFieldsWithBodyAndFilters = (obj) => {
  const requestFields = new Map();
  requestFields.set(
    "headers",
    Object.assign(API_BASE_HEADERS, {
      Authorization: `Bearer ${obj.accessToken}`,
    })
  );
  requestFields.set("body", obj.body);
  requestFields.set("filters", obj.filters);
  requestFields.set("page", obj.page);
  requestFields.set("size", obj.size);

  return requestFields;
};

export const getFieldsWithProductFormAndHeaders = (obj) => {
  const requestFields = new Map();
  requestFields.set(
    "headers",
    Object.assign(API_MULTIPART_HEADERS, {
      Authorization: `Bearer ${obj.accessToken}`,
    })
  );

  const formData = new FormData();
  formData.append(
    "dto",
    new Blob([JSON.stringify(obj.dto)], { type: "application/json" })
  );

  if (obj.imageFile) {
    formData.append("image_file", obj.imageFile);
  }

  requestFields.set("body", formData);

  return requestFields;
};
