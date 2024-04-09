/* eslint-disable */
import { COLORS } from "Constants/Colors";

export const emailValidate = (email) => {
  var re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(email).toLowerCase());
};

export const PASSWORD_REGEX_RULES = /^[A-Za-z0-9]{1,12}$/;

export const getColorByStatusActiveValue = (statusValue) => {
  return statusValue === true ? COLORS.GREEN : COLORS.RED;
};
