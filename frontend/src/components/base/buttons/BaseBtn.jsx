/* eslint-disable */
import React from "react";
import { Button } from "react-materialize";
import styled from "styled-components";

const BaseButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 58px;
  font-family: "PTSans-Regular", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  background: ${(props) => props.bgcolor};
  color: ${(props) => props.fontcolor};
  padding: 24px auto;
  border-radius: 16px;
  transition: 0.2s linear;

  &:active {
    background: ${(props) => props.bgcolor};
    filter: brightness(1.1);
  }

  &:hover {
    background: ${(props) => props.bgcolor};
    filter: brightness(1.1);
  }

  &:focus {
    background: ${(props) => props.bgcolor};
    filter: brightness(1.1);
  }
`;

function BaseBtn({ className, bgColor, fontColor, value, callback, disabled, type }) {
  return (
    <BaseButton
      className={className}
      onClick={callback}
      bgcolor={bgColor}
      fontcolor={fontColor}
      disabled={disabled}
      type={type}
    >
      {value}
    </BaseButton>
  );
}

export default BaseBtn;
