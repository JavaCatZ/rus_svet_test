/* eslint-disable */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import styled, { createGlobalStyle } from "styled-components";
import { AnimatePresence } from "framer-motion";
import PTSansRegular from "Assets/fonts/PTSans-Regular.ttf";
import Navbar from "Components/navigation/Navbar";
import MainPage from "Pages/MainPage";
import CategoriesPage from "Pages/CategoriesPage";
import ProductsPage from "Pages/ProductsPage";
import SecureWrapper from "Components/base/SecureWrapper";
import LoginForm from "Components/users/LoginForm";
import TopBlock from "Components/base/blocks/TopBlock";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  z-index: 1;
  overflow: hidden;

  @media screen and (max-width: 670px) {
    flex-direction: column;
  }
`;

const GlobalStyle = createGlobalStyle`
* {
    @font-face {
        font-family: 'PTSans-Regular';
        src: url(${PTSansRegular});
        font-variant-numeric: lining-nums;
    }
}`;

export default function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Router>
        <TopBlock />
        <ContentContainer>
          <Navbar />
          <AnimatePresence>
            <Routes>
              <Route path={"/"} element={<MainPage Form={LoginForm} />} />
              <Route
                path={"/categories"}
                element={<SecureWrapper page={<CategoriesPage />} />}
              />
              <Route
                path={"/products"}
                element={<SecureWrapper page={<ProductsPage />} />}
              />
            </Routes>
          </AnimatePresence>
        </ContentContainer>
      </Router>
    </AppContainer>
  );
}
