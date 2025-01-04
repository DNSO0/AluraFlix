import React from 'react';
import styled from 'styled-components';
import bannerImage from '../../assets/images/bannerImg.jpg';

// Contenedor principal del banner
const BannerContainer = styled.div`
  width: 100%; /* Ocupa el 100% del ancho */
  height: 400px; /* Ajusta la altura del banner */
  background-image: url(${bannerImage}); /* Imagen de fondo */
  background-size: cover; /* Asegura que la imagen cubra todo el contenedor */
  background-position: center; /* Centra la imagen */
  position: relative; /* Necesario para aplicar opacidad */
`;

// Capa de opacidad sobre la imagen
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Color negro con opacidad */
`;

function Banner() {
  return (
    <BannerContainer>
      <Overlay />
    </BannerContainer>
  );
}

export default Banner;
