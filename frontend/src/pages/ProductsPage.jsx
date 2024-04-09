/* eslint-disable */
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProductsContainer from "Components/products/ProductsContainer";
import { COLORS } from "Constants/Colors";

const ProductsPageContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    background-color: ${COLORS.WHITE};
    width: 100%;
    height: calc(100vh - 70px);
    padding: 35px 82px; 117px; 40px;
    overflow: auto;

    $:last-child {
      position: absolute;
      bottom: 0;
    }

    @media screen and (max-width: 1500px) {
      padding: 35px 82px; 117px; 40px;
    }

    @media screen and (max-width: 1300px) {
      padding: 35px 72px; 117px; 40px;
    }

    @media screen and (max-width: 940px) {
      padding: 35px 62px; 117px; 40px;
    }

    @media screen and (max-width: 800px) {
      padding: 35px 42px; 117px; 40px;
    }

    @media screen and (max-width: 670px) {
      height: 100%;
      padding: 24px 20px; 0px; 20px;
    }
`;

function ProductsPage() {
  return (
    <ProductsPageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ProductsContainer />
    </ProductsPageContainer>
  );
}

export default ProductsPage;
