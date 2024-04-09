/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "Constants/Colors";
import { INPUT_TYPE } from "Constants/Base";
import { motion } from "framer-motion";
import Show from "Assets/icons/Show";
import NoShow from "Assets/icons/NoShow";
import { Field } from "formik";

const PassInputBlock = styled.div`
  width: 100%;
`;

const CustomPassInput = styled(Field)`
  width: 100% !important;
  height: 60px !important;
  font-family: "PTSans-Regular", sans-serif;
  font-size: 18px !important;
  font-variant-numeric: lining-nums;
  font-weight: 600;
  line-height: 24px;
  background: ${COLORS.BLUE} !important;
  color: ${COLORS.GREY};
  border-top-left-radius: 16px !important;
  border-bottom-left-radius: 16px !important;
  margin-bottom: ${(props) => (props.error ? "0px" : "25px")};
  border: ${(props) =>
    props.error
      ? `1px solid ${COLORS.RED};`
      : "1px solid transparent !important"};
  box-sizing: border-box !important;
  padding: 14px 20px !important;
  resize: none !important;

  @media screen and (max-height: 550px) {
    height: 40px !important;
  }

  &:focus {
    color: ${COLORS.WHITE};
    outline: none !important;
    box-shadow: none !important;
  }
`;

const ErrorMsgText = styled(motion.div)`
  width: 100% !important;
  display: "flex";
  opacity: ${(props) => (props.isVisible ? 1 : 0)} !important;
  justify-content: flex-start;
  font-family: "PTSans-Regular", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${COLORS.RED};
  margin-bottom: 12px;

  @media screen and (max-height: 550px) {
    margin-bottom: 10px;
  }
`;

const InnerButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
`;

const ShowBtnBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 60px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  border-left: 1px solid ${COLORS.WHITE};
  background: ${COLORS.BLUE} !important;
  transition: 0.2s linear;

  &:hover {
    filter: brightness(1.1) !important;
    cursor: pointer;
  }

  @media screen and (max-height: 550px) {
    height: 40px !important;
  }
`;

const ShowIcon = styled(motion.img)`
  width: 32px;
  height: 32px;
`;

function PassInput({ className, placeholder, name, hasError, errorText }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <PassInputBlock className={className}>
      <InnerButtonBlock>
        <CustomPassInput
          type={showPass ? INPUT_TYPE.TEXT : INPUT_TYPE.PASS}
          error={hasError}
          placeholder={placeholder}
          name={name}
        />
        <ShowBtnBlock onClick={() => setShowPass(!showPass)}>
          <ShowIcon
            key={showPass ? NoShow : Show}
            src={showPass ? NoShow : Show}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            exit={{ opacity: 0 }}
          />
        </ShowBtnBlock>
      </InnerButtonBlock>
      <ErrorMsgText
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        exit={{ opacity: 0 }}
        isVisible={hasError}
      >
        {errorText}
      </ErrorMsgText>
    </PassInputBlock>
  );
}

export default PassInput;
