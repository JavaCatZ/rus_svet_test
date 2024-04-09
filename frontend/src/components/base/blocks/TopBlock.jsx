/* eslint-disable */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "Assets/images/Logo";
import { COLORS } from "Constants/Colors";
import { clearCache } from "Utils/CacheUtils";
import Exit from "Assets/icons/Exit";
import { BASE_ROUTES, ROUTE_LINKS } from "Api/Links";

const PanelBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLORS.WHITE};
  width: 100vw;
  height: 70px;
  min-height: 70px;
  z-index: 1;
  overflow: hidden;

  @media screen and (max-height: 550px), (max-width: 800px) {
    height: 50px;
  }

  @media screen and (max-width: 670px) {
    display: none;
  }
`;

const LogoBlock = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
  height: inherit;
  margin-left: 24px;

  @media screen and (max-height: 550px), (max-width: 800px) {
    width: 50px;
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;

  @media screen and (max-height: 550px), (max-width: 800px) {
    width: 30px;
    height: 30px;
  }
`;

const ExitBlock = styled.div`
  display: flex;
  align-items: center;
  width: 70px;
  height: inherit;
  margin-right: 24px;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-height: 550px), (max-width: 800px) {
    width: 50px;
  }
`;

function TopBlock() {
  const navigate = useNavigate();
  const location = useLocation();

  const onExit = () => {
    clearCache();
    navigate(ROUTE_LINKS.LOGIN_PATH, { replace: true });
  };

  return (
    <PanelBlock>
      <LogoBlock>
        <Img src={Logo} />
      </LogoBlock>
      {BASE_ROUTES.includes(location.pathname) && (
        <ExitBlock onClick={onExit}>
          <Img src={Exit} />
        </ExitBlock>
      )}
    </PanelBlock>
  );
}

export default TopBlock;
