/* eslint-disable */
import React from "react";
import styled from "styled-components";
import AppPreloader from "Assets/anim/AppPreloader";

const PreloaderBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: inherit;

  @media screen and (max-width: 670px) {
    height: 100vmin;
  }
`;

const PreloaderImg = styled.img`
  width: 200px;
  height: 200px;

  @media screen and (max-width: 1500px) {
    width: 150px;
    height: 150px;
  }

  @media screen and (max-width: 1300px) {
    width: 100px;
    height: 100px;
  }

  @media screen and (max-width: 900px) {
    width: 50px;
    height: 50px;
  }

  @media screen and (max-width: 670px) {
    width: 150px;
    height: 150px;
  }
`;

function Preloader() {
  return (
    <PreloaderBlock>
      <PreloaderImg src={AppPreloader} />
    </PreloaderBlock>
  );
}

export default Preloader;
