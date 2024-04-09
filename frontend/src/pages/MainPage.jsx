/* eslint-disable */
import React from "react";
import LogoImg from "Assets/images/Logo";
import styled from "styled-components";
import { COLORS } from "Constants/Colors";
import { motion } from "framer-motion";

const MainPageContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${COLORS.WHITE};
  width: 100%;
  height: calc(100vh - 70px);
  overflow: hidden;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 128px;

  @media screen and (max-width: 1000px) {
    width: 128px;
    height: 128px;
    display: none;
  }
`;

const Logo = styled.img`
  width: 128px;
  height: 128px;

  @media screen and (max-width: 1000px) {
    width: 96px;
    height: 96px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: inherit;
  width: 100%;
`;

function MainPage({ Form }) {
  return (
    <MainPageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FormContainer>
        <LogoContainer>
          <Logo src={LogoImg} />
        </LogoContainer>
        <Form />
      </FormContainer>
    </MainPageContainer>
  );
}

export default MainPage;
