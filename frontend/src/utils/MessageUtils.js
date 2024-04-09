/* eslint-disable */
import M from "materialize-css";

export const showSuccessMessage = (message) => {
  M.toast({ html: message, classes: "rounded green darken-2" });
};

export const showErrorMessage = (message) => {
  M.toast({ html: message, classes: "rounded red darken-1" });
};
