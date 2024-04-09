/* eslint-disable import/no-unresolved */
import React from 'react';
import styled from 'styled-components';
import { COLORS } from 'Constants/Colors';

const TitleBlock = styled.div`
    font-family: 'PTSans-Regular', sans-serif;
    font-size: 32px;
    font-weight: 1000;
    line-height: 40px;
    color: ${COLORS.BLACK};
`;

function Title({ className, textValue }) {
    return (
        <TitleBlock className={className}>
            {textValue}
        </TitleBlock>
    );
}

export default Title;
