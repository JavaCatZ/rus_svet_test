/* eslint-disable */
import moment from "moment";
import "moment/locale/ru";

export const getFormattedDate = (date) => {
  moment.locale("ru");
  const dataFormat = "DD MMM YYYY HH:mm";

  return moment.utc(date).format(dataFormat);
};
