import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from './logo.svg';

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

const NavButton = styled(Link)`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ active }) => (active ? '#fff' : '#0066ff')};
  background-color: ${({ active }) => (active ? '#0066ff' : 'transparent')};
  border: ${({ active }) => (active ? 'none' : '2px solid #0066ff')};
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0050cc;
    color: #fff;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <LogoImage src={Logo} alt="AluraFlix Logo" />
      <NavContainer>
        <NavButton to="/">Home</NavButton>
        <NavButton to="/nuevo-video">Nuevo Video</NavButton>
      </NavContainer>
    </HeaderContainer>
  );
}

export default Header;
