import React from 'react';
import styled from 'styled-components';
import Logo from './logo.svg';
import { usePage } from '../../Context/PageContext'; // Importar el hook personalizado

// Estilos (igual que antes)
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  padding: 10px 40px;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  border-bottom: 2px solid #0066ff;
`;

const LogoImage = styled.img`
  height: 40px;
`;

const NavContainer = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ active }) => (active ? '#fff' : '#0066ff')};
  background-color: ${({ active }) => (active ? '#0066ff' : 'transparent')};
  border: ${({ active }) => (active ? 'none' : '2px solid #0066ff')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? '#0050cc' : '#003f99')};
    color: #fff;
  }
`;

function Header() {
  const { currentPage, setCurrentPage } = usePage(); // Usar contexto para obtener y cambiar la página

  return (
    <HeaderContainer>
      <LogoImage src={Logo} alt="AluraFlix Logo" />
      <NavContainer>
        <NavButton
          active={currentPage === 'HOME'}
          onClick={() => setCurrentPage('HOME')}
        >
          Home
        </NavButton>
        <NavButton
          active={currentPage === 'NUEVO VIDEO'}
          onClick={() => setCurrentPage('NUEVO VIDEO')}
        >
          Nuevo Video
        </NavButton>
      </NavContainer>
    </HeaderContainer>
  );
}

export default Header;
