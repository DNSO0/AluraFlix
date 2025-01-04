import React from 'react';
import styled from 'styled-components';
import Banner from '../Components/Banner';
import CategorySection from '../Components/CategorySection';

const MainContent = styled.main`
  padding: 20px;
  background-color: #121212;
  padding-top: 70px; /* Espacio para el header fijo */
  min-height: calc(100vh - 70px); /* Altura mínima para empujar el footer hacia el final */
`;

// Datos de las categorías
const categories = [
  { title: 'Frontend', color: '#0066ff' },
  { title: 'Backend', color: '#33cc33' },
  { title: 'Innovación y Gestión', color: '#ff9900' },
];

function Home() {
  return (
    <MainContent>
      <Banner />
      {categories.map((category, index) => (
        <CategorySection key={index} title={category.title} color={category.color} />
      ))}
    </MainContent>
  );
}

export default Home;
