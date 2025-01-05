import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive"; // Importar useMediaQuery
import Logo from "../../assets/images/logo.svg";
import MobileNav from "../MobileNav"; // Importar el componente MobileNav

// Estilo del contenedor del Header
const HeaderContainer = styled.header`
  position: fixed; /* Fijo en la parte superior */
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 40px;
  background-color: #000;
  z-index: 1000; /* Asegura que esté por encima de otros elementos */
  display: flex; /* Alinea los elementos horizontalmente */
  justify-content: space-between; /* Logo a la izquierda, botones a la derecha */
  align-items: center; /* Centra verticalmente los elementos */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  border-bottom: 2px solid #0066ff;

  @media (max-width: 768px) {
    justify-content: center; /* Centrar el logo en móvil */
  }
`;

// Estilo del logo
const LogoImage = styled.img`
  height: 40px;

  @media (max-width: 768px) {
    height: 30px;
  }
`;

// Contenedor de navegación
const NavContainer = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: none; /* Ocultar navegación de escritorio en móvil */
  }
`;

// Botón de navegación
const NavButton = styled(NavLink)`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: #0066ff;
  background-color: transparent;
  border: 2px solid #0066ff;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    color: #fff;
    background-color: #0066ff;
    border-color: #0066ff;
  }

  &:hover {
    background-color: #0050cc;
    color: #fff;
  }
`;

function Header() {
  // Detectar si el dispositivo es móvil
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <HeaderContainer>
      <LogoImage src={Logo} alt="AluraFlix Logo" />
      {/* Mostrar navegación según el tamaño de la pantalla */}
      {isMobile ? (
        <MobileNav /> // Mostrar navegación móvil
      ) : (
        <NavContainer>
          <NavButton to="/">Home</NavButton>
          <NavButton to="/nuevo-video">Nuevo Video</NavButton>
        </NavContainer>
      )}
    </HeaderContainer>
  );
}

export default Header;
