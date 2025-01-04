import React from 'react';
import styled from 'styled-components';
import Banner from '../Components/Banner';
import CategorySection from '../Components/CategorySection';
import VideoCard from '../Components/VideoCard'; // Importa el componente de la card

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

// Contenedor para las cards de prueba
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

function Home() {
  const handleDelete = () => {
    alert('Video borrado');
  };

  const handleEdit = () => {
    alert('Editando video');
  };

  return (
    <MainContent>
      <Banner />
      {categories.map((category, index) => (
        <div key={index}>
          <CategorySection title={category.title} color={category.color} />
          {/* Añadir una card temporal debajo de cada categoría */}
          <CardContainer>
            <VideoCard
              title="Ejemplo de Video"
              image="https://via.placeholder.com/300x170"
              categoryColor={category.color}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </CardContainer>
        </div>
      ))}
    </MainContent>
  );
}

export default Home;
