/* eslint-disable */
import React from "react";
import styled from "styled-components";
import BlueBtn from "Components/base/buttons/BlueBtn";
import BtnPreloader from "Components/base/buttons/BtnPreloader";
import { COLORS } from "Constants/Colors";
import { REST_STATUSES } from "Api/Api";

const ResetButton = styled(BlueBtn)`
  width: 100%;
  margin-bottom: 32px;

  @media screen and (max-height: 550px) {
    height: 40px;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 12px;
  }
`;

function ResetBtn({ className, text, status }) {
  return (
    <ResetButton
      className={className}
      value={
        status === REST_STATUSES.LOADING ? (
          <BtnPreloader fillColor={COLORS.WHITE} />
        ) : (
          text
        )
      }
      type="reset"
    />
  );
}

export default ResetBtn;