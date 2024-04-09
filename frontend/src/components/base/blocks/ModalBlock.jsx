/* eslint-disable */
import React from "react";
import styled from "styled-components";
import { COLORS } from "Constants/Colors";

const ModalView = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  transition: 0.5s;
  z-index: 999;

  &.active {
    opacity: 1;
    pointer-events: all !important;
  }
`;

const ModalContent = styled.div`
  height: auto;
  width: auto;
  border-radius: 12px;
  background-color: ${COLORS.WHITE};
  transform: scale(0.5);
  transition: 0.5s all;

  &.active {
    transform: scale(1);
  }
`;

function ModalBlock({ open, content }) {
  return (
    <ModalView className={open ? "active" : null}>
      <ModalContent className={open ? "active" : null}>{content}</ModalContent>
    </ModalView>
  );
}

export default ModalBlock;
