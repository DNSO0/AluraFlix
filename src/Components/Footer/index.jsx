import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/images/logo.svg'; // Ruta al logo

// Contenedor principal del Footer
const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px 0;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #0066ff;
`;

const LogoImage = styled.img`
  height: 40px;
`;

function Footer() {
  return (
    <FooterContainer>
      <LogoImage src={Logo} alt="AluraFlix Logo" />
    </FooterContainer>
  );
}

export default Footer;
