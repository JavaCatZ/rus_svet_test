/* eslint-disable */
import React from "react";
import { Select } from "react-materialize";
import {css} from "styled-components";
import { COLORS } from "Constants/Colors";

const CustomSelect = css`
    .dropdown-select {
      width: 100%;
      padding: 16px 12px;
      border: 1px solid ${COLORS.BLUE};
      border-radius: 16px;
      font-family: "PTSans-Regular", sans-serif;
      font-variant-numeric: lining-nums;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: ${COLORS.BLUE};
    } 
`;

function RsSelect({ className, id, name, children, onChange }) {
  return (
    <Select
      id={id}
      multiple={false}
      name={name}
      classes={CustomSelect}
      className={className}
      onChange={onChange}
      options={{
        dropdownOptions: {
          alignment: "left",
          autoTrigger: true,
          closeOnClick: true,
          constrainWidth: true,
          coverTrigger: true,
          hover: false,
          inDuration: 150,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 250,
        },
      }}
    >
      {children}
    </Select>
  );
}

export default RsSelect;
