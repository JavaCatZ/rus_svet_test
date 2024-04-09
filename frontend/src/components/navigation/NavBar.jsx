/* eslint-disable */
import React from "react";
import { useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import NavItem from "Components/navigation/NavItem";
import CategoryIco from "Assets/icons/Category";
import ProductIco from "Assets/icons/Product";
import { COLORS } from "Constants/Colors";
import { ROUTE_LINKS, BASE_ROUTES } from "Api/Links";
import { clearCache } from "Utils/CacheUtils";
import Exit from "Assets/icons/Exit";

const wave = keyframes`
  0% {
    transform: translateX(-10%);
  }

  25% {
    transform: translateX(-25%);
  }

  50% {
    transform: translateX(-50%);
  }

  75% {
    transform: translateX(-25%);
  }

  100% {
    transform: translateX(-10%);
  }
`;

const NavigationBlock = styled.div`
  min-width: 300px;
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  height: calc(100vh - 70px);
  min-height: calc(100vh - 70px);
  background: ${COLORS.WHITE};
  overflow: hidden;

  @media screen and (max-width: 1500px), (max-height: 780px) {
    min-width: 250px;
  }

  @media screen and (max-width: 1000px), (max-height: 690px) {
    min-width: 180px;
  }

  @media screen and (max-width: 800px), (max-height: 600px) {
    min-width: 140px;
  }

  @media screen and (max-width: 670px) {
    flex-direction: row;
    justify-content: center;
    height: 70px;
    min-height: 70px;
  }

  .navContainer {
    padding-top: 28px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 670px) {
      display: none;
    }
  }

  .navMobileContainer {
    padding-top: 28px;
    display: none;
    flex-direction: row;
    justify-content: center;
    height: 70px;
    min-height: 70px;

    @media screen and (max-width: 670px) {
      display: flex;
    }
  }

  .bottomContainer {
    position: relative;
    margin-top: auto;

    @media screen and (max-width: 670px) {
      display: none;
    }
  }

  .wavesContainer {
    z-index: 99;
    overflow: hidden;
    max-width: 100%;
    min-height: 12em;
    position: relative;
  }

  .wavesContainer > .wave {
    background: rgba(18, 65, 147, 0.5);
    border-radius: 1000% 1000% 0 0;
    position: absolute;
    width: 500%;
    height: 12em;
    animation: ${wave} 10s -3s linear infinite;
    transform: translate3d(0, 0, 0);
    opacity: 0.8;
    bottom: 0;
    left: 0;
    z-index: -1;
  }

  .wavesContainer > .wave:nth-of-type(2) {
    bottom: -1.25em;
    animation: ${wave} 18s linear reverse infinite;
    opacity: 0.8;
  }

  .wavesContainer > .wave:nth-of-type(3) {
    bottom: -2.5em;
    animation: ${wave} 20s -1s reverse infinite;
    opacity: 0.9;
  }
`;

const BottomText = styled.div`
  display: flex;
  justify-content: center;
  font-family: "PTSans-Regular", sans-serif;
  font-variant-numeric: lining-nums;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  color: ${COLORS.WHITE};
  position: absolute;
  z-index: 999;
  bottom: 0;
  width: 100%;
  margin-bottom: 34px;

  @media screen and (max-width: 1500px), (max-height: 780px) {
    font-size: 14px;
    line-height: 20px;
  }

  @media screen and (max-width: 1000px), (max-height: 690px) {
    font-size: 13px;
    line-height: 19px;
  }

  @media screen and (max-width: 800px), (max-height: 600px) {
    font-size: 12px;
    line-height: 18px;
  }

  @media screen and (max-width: 670px) {
    display: none;
  }
`;

const onExit = () => {
  clearCache();
};

function NavBar() {
  const location = useLocation();
  return (
    <NavigationBlock visible={BASE_ROUTES.includes(location.pathname)}>
      <div className="navContainer">
        <NavItem
          path={ROUTE_LINKS.CATEGORIES_PATH}
          icon={CategoryIco}
          title="Категории"
        />
        <NavItem
          path={ROUTE_LINKS.PRODUCTS_PATH}
          icon={ProductIco}
          title="Продукты"
        />
      </div>
      <div className="navMobileContainer">
        <NavItem path={ROUTE_LINKS.CATEGORIES_PATH} icon={CategoryIco} />
        <NavItem path={ROUTE_LINKS.PRODUCTS_PATH} icon={ProductIco} />
        <NavItem path={ROUTE_LINKS.LOGIN_PATH} onClick={onExit} icon={Exit} />
      </div>
      <div className="bottomContainer">
        <BottomText>©2024 RusSvet Test</BottomText>
        <div className="wavesContainer">
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
        </div>
      </div>
    </NavigationBlock>
  );
}

export default NavBar;
