import React from "react";
import styled from "styled-components";
import bannerImage from "../../assets/images/bannerImg.jpg";
import Home from "../../pages/Home";

// Contenedor principal del banner
const BannerContainer = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${bannerImage});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

// Capa de opacidad sobre la imagen
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); // Ajusta la opacidad
  z-index: 1;
`;

// Contenedor del contenido
const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Contenedor del texto
const TextContent = styled.div`
  color: #fff;
  max-width: 600px;
`;

// Tag de categoría
const CategoryTag = styled.div`
  background-color: ${({ $color }) => $color || "#0066ff"}; // Color dinámico
  padding: 8px 12px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  display: inline-block;
  margin-bottom: 15px;
  text-transform: uppercase;
`;

// Título del video
const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

// Descripción del video
const Description = styled.p`
  font-size: 16px;
  color: #ddd;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Contenedor de la imagen del video
const ImageContainer = styled.div`
  width: 470px;
  height: 270px;
  background-image: ${({ $image }) => `url(${$image})`};
  background-size: cover;
  background-position: center;
  border: 4px solid ${({ $color }) => $color || "#0066ff"}; // Borde dinámico
  border-radius: 8px;
  box-shadow: 0 0 15px ${({ $color }) => $color || "#0066ff"}; // Box-shadow dinámico

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

function Banner({ latestVideo }) {
  if (!latestVideo) {
    return null;
  }

  return (
    <BannerContainer>
      <Overlay />
      <Content>
        <TextContent>
          <CategoryTag $color={latestVideo.categoryColor}>
            {latestVideo.category.toUpperCase()}
          </CategoryTag>
          <Title>{latestVideo.title}</Title>
          <Description>{latestVideo.description}</Description>
        </TextContent>
        <ImageContainer
          $image={latestVideo.image}
          $color={latestVideo.categoryColor}
        />
      </Content>
    </BannerContainer>
  );
}

export default Banner;
