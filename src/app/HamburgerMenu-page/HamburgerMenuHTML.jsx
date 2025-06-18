"use client";
import React, {useState} from "react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import ChangeLang from "@/app/Lang/Lang";

const COLORS = {
  primaryDark: "#115b4c",
  primaryLight: "#B6EDC8",
};

const MenuLabel = styled.label`
  background-color: ${COLORS.primaryLight};
  position: fixed;
  top: 2rem;
  right: 2rem;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 1rem 3rem rgba(182, 237, 200, 0.3);
  text-align: center;
`;
const NavBackground = styled.div.attrs(props => ({
  clicked: props.clicked ? true : undefined,
}))`
  position: fixed;
  top: 6.5rem;
  right: 6.5rem;
  background-image: radial-gradient(
    ${COLORS.primaryDark},
    ${COLORS.primaryLight}
  );
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  z-index: 600;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.8s;
`;

const Icon = styled.span.attrs(props => ({
  clicked: props.clicked ? true : undefined,
}))`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : "black")};
  width: 1rem;
  height: 2px;
  display: inline-block;
  margin-top: 1rem;
  transition: all 0.3s;

  &::before,
  &::after {
    content: "";
    background-color: black;
    width: 1rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.3s;
  }

  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.3rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }

  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.3rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }

  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-.3rem")};
  }

  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : ".3rem")};
  }
`;

const Navigation = styled.nav.attrs(props => ({clicked: props.clicked ? true : undefined}))`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 600;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};
  transition: width 0.2s, opacity 0.1s;
`;

const List = styled.ul`
  position: absolute;
  list-style: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;
const ItemLink = styled.a`
  display: inline-block;
  font-size: 2rem;
  font-weight: 300;
  text-decoration: none;
  color: ${COLORS.primaryLight};
  padding: 0 2rem;
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fff 50%
  );
  background-size: 240%;
  transition: all 0.4s;
  cursor: pointer;

  &:hover,
  &:active {
    background-position: 100%;
    color: ${COLORS.primaryDark};
    transform: translateX(1rem);
  }
`;

function HamburgerMenu() {
  const {t} = useTranslation();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>
      <MenuLabel htmlFor="navi-toggle" className="hamburger-menu" onClick={handleClick}>
        <Icon clicked={click}>&nbsp;</Icon>
      </MenuLabel>
      <NavBackground clicked={click}>&nbsp;</NavBackground>

      <Navigation clicked={click}>
        <List>
          <li>
            <ItemLink onClick={handleClick} to="/" href="/Home-page">
              {t("home")}
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/about" href="/about-page">
              {t("about")}
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/blog" href="/Blog-Page">
              {t("blog")}
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/portfolio" href="/Projects-page">
              {t("project")}
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/skills" href="/Skills-page">
              {t("skills")}
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/timeline" href="/Timeline-page">
              {t("timeLine")}
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/contacts" href="/Contacts-page">
              {t("contact")}
            </ItemLink>
          </li>
          <li onClick={handleClick}>
            <ItemLink onClick={handleClick} to="/login" href="/Login-page">
              {t("login")}
            </ItemLink>
          </li>
          <li onClick={handleClick}>
            <ChangeLang/>
          </li>
        </List>
      </Navigation>
    </>
  );
}

export default HamburgerMenu;
