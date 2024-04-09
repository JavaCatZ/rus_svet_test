/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-materialize';
import { COLORS } from 'Constants/Colors';

const HeaderRow = styled(Row)`
    width: 100%;
    margin-bottom: 24px;
    font-family: 'PTSans-Regular', sans-serif;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    padding: 0 12px;
    color: ${COLORS.BLUE};

    @media screen and (max-width: 1500px), (max-height: 780px) {
      font-size: 16px;
      line-height: 22px;
    }

    @media screen and (max-width: 1300px), (max-height: 690px) {
      font-size: 14px;
      line-height: 20px;
      padding: 0 6px;
    }

    @media screen and (max-width: 940px), (max-height: 600px) {
      font-size: 12px;
      line-height: 16px;
      padding: 0 6px;
    }
  
    @media screen and (max-width: 800px), (max-height: 540px) {
      font-size: 10px;
      line-height: 16px;
      padding: 0 6px;
    }

    @media screen and (max-width: 670px) {
      display: none;
    }
`;

function ProductsHeaderBlock() {
    return (
        <HeaderRow>
            <Col
              s={1}
            >
                Id
            </Col>
            <Col
              s={3}
            >
                Наименование
            </Col>
            <Col
              s={2}
            >
                Категория
            </Col>
            <Col
              s={2}
            >
                Дата добавления
            </Col>
            <Col
              s={2}
            >
                Статус
            </Col>
            <Col
              s={2}
            >
                Действия
            </Col>
        </HeaderRow>
    );
}

export default ProductsHeaderBlock;