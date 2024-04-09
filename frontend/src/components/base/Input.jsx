/* eslint-disable */
import React, { useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "Constants/Colors";
import { Field } from "formik";
import { motion } from "framer-motion";

const TextInputBlock = styled.div`
  width: 100%;
`;

const CustomTextInput = styled(Field)`
  width: 100% !important;
  height: 60px !important;
  font-family: "PTSans-Regular", sans-serif;
  font-size: 18px !important;
  font-weight: 600;
  line-height: 24px;
  background: ${COLORS.BLUE} !important;
  color: ${COLORS.GREY};
  border-radius: 16px !important;
  margin-bottom: ${(props) => (props.error ? "0px" : "25px")};
  border: ${(props) =>
    props.error
      ? `1px solid ${COLORS.RED};`
      : "1px solid transparent !important"};
  box-sizing: border-box !important;
  padding: 14px 20px !important;
  resize: none !important;

  &:disabled {
    color: ${COLORS.GREY} !important;
  }

  &:focus {
    color: ${COLORS.WHITE};
    outline: none !important;
    box-shadow: none !important;
  }

  @media screen and (max-height: 550px) {
    height: 40px !important;
  }
`;

const ErrorMsgText = styled(motion.div)`
  width: 100% !important;
  opacity: ${(props) => (props.isVisible === true ? 1 : 0)} !important;
  display: flex;
  justify-content: flex-start;
  font-family: "PTSans-Regular", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${COLORS.RED};
  margin-bottom: 12px;

  @media screen and (max-height: 550px) {
    margin-bottom: 10px;
  }
`;

function Input({ className, placeholder, name, type, hasError, errorText, disabled }) {

  useEffect(() => {
    console.log(name + " : " + hasError);
  }, [hasError]);

  return (
    <TextInputBlock className={className}>
      <CustomTextInput
        placeholder={placeholder}
        name={name}
        type={type}
        error={hasError}
        disabled={disabled}
      />
      <ErrorMsgText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        exit={{ opacity: 0 }}
        isVisible={hasError}
      >
        {errorText}
      </ErrorMsgText>
    </TextInputBlock>
  );
}

export default Input;
