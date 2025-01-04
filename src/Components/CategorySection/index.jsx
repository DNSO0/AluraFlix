import React from 'react';
import styled from 'styled-components';

// Contenedor principal de la categoría
const SectionContainer = styled.div`
  margin: 40px 0;
  text-align: left; /* Centra la etiqueta */
`;

// Contenedor del título de la categoría
const TitleContainer = styled.div`
  display: inline-block;
  padding: 10px 20px;
  border-radius: 50px;
  background-color: ${({ color }) => color};
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px;
`;

function CategorySection({ title, color }) {
  return (
    <SectionContainer>
      <TitleContainer color={color}>{title}</TitleContainer>
    </SectionContainer>
  );
}

export default CategorySection;
