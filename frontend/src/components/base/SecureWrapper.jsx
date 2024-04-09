/* eslint-disable */
import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessTokenFromCache } from "Utils/CacheUtils";

function SecureWrapper({ page }) {
  const accessToken = getAccessTokenFromCache();

  return !accessToken || accessToken === "" ? <Navigate to="/" /> : page;
}

export default SecureWrapper;
