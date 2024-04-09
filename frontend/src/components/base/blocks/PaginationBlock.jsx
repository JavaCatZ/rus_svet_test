/* eslint-disable */
import React from "react";
import { Pagination } from "react-materialize";
import styled from "styled-components";
import { COLORS } from "Constants/Colors";

const CustomPagination = styled(Pagination)`
  font-family: "PTSans-Regular", sans-serif;
  font-variant-numeric: lining-nums;
  font-size: 16px !important;
  font-weight: 500;
  line-height: 22px !important;
  margin-top: auto;

  @media screen and (max-width: 670px) {
    display: flex;
    justify-content: center;
  }

  li.active {
    background-color: ${COLORS.BLUE} !important;
  }

  li.waves-effect:first-child a {
    background-color: ${COLORS.WHITE} !important;
    color: ${COLORS.DARK_GREY} !important;
    font-weight: 600;
  }

  li.waves-effect:last-child a {
    background-color: ${COLORS.WHITE} !important;
    color: ${COLORS.DARK_GREY} !important;
    font-weight: 600;
  }

  li.disabled a {
    color: ${COLORS.GREY} !important;
    font-weight: 600;
  }

  li a {
    @media screen and (max-width: 1500px), (max-height: 780px) {
      font-size: 14px !important;
      line-height: 20px !important;
    }

    @media screen and (max-width: 1300px), (max-height: 690px) {
      font-size: 12px !important;
      line-height: 18px !important;
    }

    @media screen and (max-width: 940px), (max-height: 600px) {
      font-size: 10px !important;
      line-height: 16px !important;
    }

    @media screen and (max-width: 800px), (max-height: 540px) {
      font-size: 10px !important;
      line-height: 16px !important;
    }

    @media screen and (max-width: 670px) {
      font-size: 20px !important;
      line-height: 28px !important;
      margin-bottom: 24px;
    }
  }
`;

function PaginationBlock({ page, size, count, callback }) {
  const updateCurentPage = (newPage) => {
    callback(newPage - 1);
  };

  return (
    <CustomPagination
      activePage={page + 1}
      items={Math.ceil(count / size)}
      leftBtn="<--"
      rightBtn="-->"
      maxButtons={5}
      onSelect={(p) => updateCurentPage(p)}
    />
  );
}
export default PaginationBlock;
