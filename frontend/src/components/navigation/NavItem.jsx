/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { COLORS } from 'Constants/Colors';

const NavItemBlock = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 50px;
    margin-right: 60px;
    margin-left: 62px;
    padding: 12px 18px 12px 18px;
    border-radius: 12px;
    opacity: 1.0;
    transition: 0.3s linear;

    @media screen and (max-width: 1500px), (max-height: 780px) {
        margin-right: 30px;
        margin-left: 30px;
    }
    
    @media screen and (max-width: 1000px), (max-height: 690px) {
        margin-right: 12px;
        margin-left: 12px;
    }
  
    @media screen and (max-width: 800px), (max-height: 600px) {
        margin-right: 6px;
        margin-left: 6px;
    }

    @media screen and (max-width: 670px) {
        margin: 0;
    }

    &:hover {
      background: rgba(191, 199, 202, 0.1);
    }
`;

const NavItemLink = styled(NavLink)`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-family: 'PTSans-Regular', sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    color: ${COLORS.GREY};

    @media screen and (max-width: 1500px), (max-height: 780px) {
        font-size: 16px;
        line-height: 22px;
    }
    
    @media screen and (max-width: 1000px), (max-height: 690px) {
        font-size: 14px;
        line-height: 20px;
    }
  
    @media screen and (max-width: 800px), (max-height: 600px) {
        font-size: 12px;
        line-height: 18px;
    }

    @media screen and (max-width: 670px) {
        align-items: center;
        font-size: 16px;
        line-height: 22px;
        margin: 0;
        padding: 4px;
    }

    &.active {
      color: ${COLORS.BLUE};
      background: ${COLORS.LIGHT_GREY_200};
    }

    &.active > img {
      filter: brightness(1);
      opacity: 1;
    }
`;

const NavIcon = styled.img`
    width: 30px; 
    height: 30px;
    margin-right: 8px;
    filter: brightness(0.55);
    opacity: 0.55;
    color: ${COLORS.GREY}

    @media screen and (max-width: 1500px), (max-height: 780px) {
        width: 20px; 
        height: 20px;
    }
    
    @media screen and (max-width: 1000px), (max-height: 690px) {
        width: 16px; 
        height: 16px;
    }
  
    @media screen and (max-width: 800px), (max-height: 600px) {
        width: 12px; 
        height: 12px;
    }

    &.active {
        color: ${COLORS.BLUE};
    }

    @media screen and (max-width: 670px) {
        width: 30px; 
        height: 30px;
    }
`;

function NavItem(props) {
    return (
        <NavItemBlock onClick={props.onClick !== 'undefined' ? props.onClick : null}>
            <NavItemLink to={`${props.path}`}>
                <NavIcon src={props.icon} />
                {props.title}
            </NavItemLink>
        </NavItemBlock>
    );
}

export default NavItem;