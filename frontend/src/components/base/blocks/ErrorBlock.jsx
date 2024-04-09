/* eslint-disable */
import React from "react";
import styled from "styled-components";
import { COLORS } from "Constants/Colors";

const ErrorText = styled.div`
  font-family: "PTSans-Regular", sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 30px;
  border-radius: 24px;
  padding: 12px;
  margin: 24px;
  opacity: 0.8;
  background-color: ${COLORS.RED};
  color: ${COLORS.WHITE};
`;

function ErrorBlock({ textValue }) {
  return <ErrorText>Ошибка: {textValue}</ErrorText>;
}

export default ErrorBlock;
