/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-materialize";
import styled from "styled-components";
import ActionBlock from "Components/base/blocks/ActionBlock";
import { COLORS } from "Constants/Colors";
import { MODE_TYPE, USER_ROLES } from "Constants/Base";
import { getUserProfileFromCache } from "Utils/CacheUtils";
import { getFormattedDate } from "Utils/DateUtils";
import { getColorByStatusActiveValue } from 'Utils/BaseUtils';

const StatusText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.baseColor};
  padding: 2px;
  border: 1px solid ${(props) => props.baseColor};
  border-radius: 16px;
`;

const ContainerRow = styled(Row)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 12px;
  margin-bottom: 8px;
  border: 1px solid ${COLORS.BLUE};
  border-radius: 16px;
  font-family: "PTSans-Regular", sans-serif;
  font-variant-numeric: lining-nums;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: ${COLORS.BLUE};
  text-overflow: ellipsis;

  @media screen and (max-width: 1500px), (max-height: 780px) {
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 6px;
  }

  @media screen and (max-width: 1300px), (max-height: 690px) {
    font-size: 12px;
    line-height: 18px;
    padding: 8px 6px;
    margin-bottom: 4px;
  }

  @media screen and (max-width: 940px), (max-height: 600px) {
    font-size: 10px;
    line-height: 16px;
    padding: 8px 4px;
    margin-bottom: 4px;
  }

  @media screen and (max-width: 800px), (max-height: 540px) {
    font-size: 10px;
    line-height: 16px;
    padding: 8px 2px;
    margin-bottom: 4px;
  }

  @media screen and (max-width: 670px) {
    display: none;
  }
`;

const CustomCol = styled(Col)`
  overflow: hidden;
  text-overflow: ellipsis;
`;

function ProductRowBlock({ product, showCallback, deleteCallback }) {
  const [showActionBlock, setShowActionBlock] = useState(false);

  useEffect(() => {
    const profile = getUserProfileFromCache();
    if (profile) {
      if (profile.roles.includes(USER_ROLES.ADMIN)) {
        setShowActionBlock(true);
      }
    }
  }, []);

  const statusText = product.status === true ? "Активен" : "Не активен";

  return (
    <ContainerRow onClick={() => showCallback(product, MODE_TYPE.SHOW)}>
      <CustomCol s={1}>{product.id}</CustomCol>
      <CustomCol s={3}>{product.name}</CustomCol>
      <CustomCol s={2}>{product.category_dto && product.category_dto.name}</CustomCol>
      <CustomCol s={2}>{getFormattedDate(product.create_date)}</CustomCol>
      <CustomCol s={2}>
        <StatusText baseColor={getColorByStatusActiveValue(product.status)}>
          {statusText}
        </StatusText>
      </CustomCol>
      <CustomCol s={2}>
        {showActionBlock ? (
          <ActionBlock
            showCallback={showCallback}
            deleteCallback={deleteCallback}
            obj={product}
          />
        ) : (
          "Только просмотр"
        )}
      </CustomCol>
    </ContainerRow>
  );
}

export default ProductRowBlock;
