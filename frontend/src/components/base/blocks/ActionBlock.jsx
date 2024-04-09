/* eslint-disable */
import React from "react";
import EditIcon from "Assets/icons/Edit";
import DeleteIcon from "Assets/icons/Delete";
import styled from "styled-components";
import { MODE_TYPE } from "Constants/Base";

const ActionsBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: flex-start;
  width: 100%;
`;

const ActionImage = styled.img`
  height: 35px;
  width: 35px;
  margin-right: 24px;
  transition: transform 0.5s;

  &:hover {
    transform: scale(1.1);
  }
`;

function ActionBlock({ showCallback, deleteCallback, obj }) {
  return (
    <ActionsBlock>
      <ActionImage
        src={EditIcon}
        onClick={(e) => {
          e.stopPropagation();
          showCallback(obj, MODE_TYPE.UPDATE);
        }}
      />
      <ActionImage
        src={DeleteIcon}
        onClick={(e) => {
          e.stopPropagation();
          deleteCallback(obj.id);
        }}
      />
    </ActionsBlock>
  );
}

export default ActionBlock;
