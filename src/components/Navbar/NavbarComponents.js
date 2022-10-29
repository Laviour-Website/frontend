import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const Nav = styled.nav`
  background: #000;
  height: 80px;
  // margin-top: -80px;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1500px;
`;

export const NavLogo = styled(LinkR)`
  color: #fff;
  justify-self: flex-start;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 30px;
  font-weight: bold;
  text-decoration: none;
  outline: none !important;
  @media screen and (max-width: 760px) {
    margin-left: -3px;
    cursor: none;
  }
`;

export const MobileIcon = styled.div`
  box-shadow: none !important;
  outline: none !important;
  display: none;

  @media screen and (max-width: 760px) {
    display: block;
    position: abosolute;
    top: 0;
    right: 0;
    transform: translate(-5%, 30%);
    font-size: 1.8rem;
    color: #fff;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  box-shadow: none !important;
  outline: none !important;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
  box-shadow: none !important;
  outline: none !important;
`;

export const NavLinks = styled(LinkS)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: sans-serif;
  font-weight: bold;

  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    border-bottom: 5px solid #dd00ae;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(LinkS)`
  border-radius: 50px;
  background: #fff;
  font-weight: bold;
  font-family: sans-serif;
  white-space: nowrap;
  padding: 10px 22px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

export const NavLogoMobileImg = styled.img`
  @media screen and (min-width: 769px) {
    display: none;
  }

  @media screen and (max-width: 768px) {
    height: 60px;
  }
`;

export const NavLogoImg = styled.img`
  @media screen and (max-width: 768px) {
    display: none;
  }

  @media screen and (min-width: 769px) {
    height: 50px;
  }
`;