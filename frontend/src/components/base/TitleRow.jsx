/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Row } from "react-materialize";
import styled from "styled-components";
import Title from "Components/base/Title";
import { COLORS } from "Constants/Colors";
import AddIcon from "Assets/icons/Add";
import { MODE_TYPE } from "Constants/Base";
import { getUserProfileFromCache } from "Utils/CacheUtils";

const CustomRow = styled(Row)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 32px;
`;

const CustomTitle = styled(Title)`
  font-size: 26px;
  font-weight: 700;
  line-height: 32px;
  margin-left: 10px;
  color: ${COLORS.BLUE};

  @media screen and (max-width: 1500px), (max-height: 780px) {
    font-size: 24px;
    line-height: 32px;
  }

  @media screen and (max-width: 1300px), (max-height: 690px) {
    font-size: 22px;
    line-height: 28px;
  }

  @media screen and (max-width: 940px), (max-height: 600px) {
    font-size: 20px;
    line-height: 26px;
  }

  @media screen and (max-width: 800px), (max-height: 540px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

const ActionImage = styled.img`
  height: 32px;
  width: 32px;
  margin-left: 24px;
  transition: transform 0.5s;

  &:hover {
    transform: scale(1.1);
  }
`;

function TitleRow({ titleText, showCallback }) {
  const [showCreateBtn, setShowCreateBtn] = useState(false);

  useEffect(() => {
    const profile = getUserProfileFromCache();
    if (profile) {
      if (profile.roles.includes("ADMIN")) {
        setShowCreateBtn(true);
      }
    }
  }, []);

  return (
    <CustomRow s={12}>
        <CustomTitle textValue={titleText} />
        {showCreateBtn && (
          <ActionImage
            src={AddIcon}
            onClick={(e) => {
              e.stopPropagation();
              showCallback(null, MODE_TYPE.CREATE);
            }}
          />
        )}
    </CustomRow>
  );
}

export default TitleRow;
