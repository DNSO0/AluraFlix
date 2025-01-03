import React from 'react';
import styled from 'styled-components';
import Logo from './logo.svg';

// Contenedor principal del header (ocupa todo el ancho)
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000; /* Color de fondo negro */
  padding: 10px 20px;
  width: 100%; /* Asegura que ocupa todo el ancho */
  position: fixed; /* Fija el header en la parte superior */
  top: 0;
  left: 0;
  z-index: 1000; /* Asegura que esté encima del contenido */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
`;

// Logo (sin fondo blanco visible)
const LogoImage = styled.img`
  height: 40px;
  background-color: transparent; /* Asegura que no tenga fondo */
`;

// Contenedor de los botones
const NavButtons = styled.div`
  display: flex;
  gap: 10px;
`;

// Estilo para los botones
const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: black; /* Fondo negro para ambos botones */
  border: 2px solid; /* Borde común para ambos botones */
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  /* Estilo específico para el botón "Home" */
  &:first-child {
    color: white; /* Letra blanca */
    border-color: white; /* Borde blanco */
  }

  /* Estilo específico para el botón "Nuevo Video" */
  &:last-child {
    color: #257be5; /* Letra azul */
    border-color: #257be5; /* Borde azul */
  }

  /* Efecto hover para ambos botones */
  &:hover {
    background-color: ${({ primary }) => (primary ? '#004FCC' : '#333')}; /* Fondo más oscuro al pasar el mouse */
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <LogoImage src={Logo} alt="AluraFlix Logo" />
      <NavButtons>
        <Button>Home</Button>
        <Button>Nuevo Video</Button>
      </NavButtons>
    </HeaderContainer>
  );
}

export default Header;