import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import homeIcon from "../../assets/icons/home.svg";
import addIcon from "../../assets/icons/add.svg";

// Contenedor principal del MobileNav
const MobileNavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  border-top: 2px solid #0066ff;
  z-index: 1000;
`;

// Botón de navegación
const NavButton = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#0066ff")};
  background-color: ${({ $isActive }) => ($isActive ? "#0066ff" : "transparent")};
  border: 2px solid ${({ $isActive }) => ($isActive ? "#0066ff" : "transparent")};
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #102744;
    color: #fff;
  }

  img {
    width: 20px;
    height: 20px;
  }
 

  /* Estilo específico para Home */
  &.home {
    background-color: ${({ $isActive }) =>
      $isActive ? "transparent" : "#000"};
    color: ${({ $isActive }) => ($isActive ? "#0066ff" : "#fff")};
    border: ${({ $isActive }) =>
      $isActive ? "2px solid #0066ff" : "2px solid transparent"};
  }

  /* Estilo específico para Nuevo Video */
  &.nuevo-video {
    background-color: ${({ $isActive }) =>
      $isActive ? "#0066ff" : "transparent"};
    color: ${({ $isActive }) => ($isActive ? "#fff" : "#0066ff")};
    border: ${({ $isActive }) =>
      $isActive ? "2px solid #0066ff" : "2px solid transparent"};
  }
`;

function MobileNav() {
  return (
    <MobileNavContainer>
      {/* Botón Home */}
      <NavButton
        to="/"
        className={({ isActive }) => (isActive ? "home" : "")}
        $isActive={({ isActive }) => isActive}
      >
        <img src={homeIcon} alt="Home Icon" />
        Home
      </NavButton>
      {/* Botón Nuevo Video */}
      <NavButton
        to="/nuevo-video"
        className={({ isActive }) => (isActive ? "nuevo-video" : "")}
        $isActive={({ isActive }) => isActive}
      >
        <img src={addIcon} alt="Add Icon" />
        Nuevo Video
      </NavButton>
    </MobileNavContainer>
  );
}

export default MobileNav;
