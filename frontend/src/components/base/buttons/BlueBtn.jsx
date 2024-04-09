/* eslint-disable */
import React from "react";
import BaseBtn from "Components/base/buttons/BaseBtn";
import { COLORS } from "Constants/Colors";

function BlueBtn({ className, value, callback, disabled, type }) {
  return (
    <BaseBtn
      className={className}
      bgColor={COLORS.BLUE}
      fontColor={COLORS.WHITE}
      value={value}
      callback={callback}
      disabled={disabled}
      type={type}
    />
  );
}

export default BlueBtn;
