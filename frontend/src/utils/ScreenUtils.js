/* eslint-disable */
export const getViewCategoriesCountByRes = () => {
  const h = screen.height;
  if (h >= 920) {
    return 8;
  }
  if (h < 920 && h >= 780) {
    return 7;
  }

  if (h < 780 && h >= 690) {
    return 5;
  }

  if (h < 690) {
    return 4;
  }
};

export const getViewProductsCountByRes = () => {
  const h = screen.height;
  if (h >= 920) {
    return 6;
  }
  if (h < 920 && h >= 780) {
    return 5;
  }

  if (h < 780 && h >= 690) {
    return 4;
  }

  if (h < 690) {
    return 3;
  }
};
