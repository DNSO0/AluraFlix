import React, { useState } from 'react';
import styled from 'styled-components';
import Banner from '../Components/Banner';
import CategorySection from '../Components/CategorySection';
import VideoCard from '../Components/VideoCard';
import EditModal from '../Components/EditModal';

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
  const [isModalOpen, setModalOpen] = useState(false); // Controla si el modal está abierto
  const [editData, setEditData] = useState({}); // Datos actuales de la card a editar

  const handleEdit = (video) => {
    setEditData(video); // Establece los datos actuales de la card
    setModalOpen(true); // Abre el modal
  };

  const handleSubmit = (data) => {
    console.log('Datos actualizados:', data);
    setModalOpen(false); // Cierra el modal después de guardar
  };

  const handleDelete = () => {
    alert('Video borrado');
  };

  return (
    <MainContent>
      <Banner />
      {categories.map((category, index) => (
        <div key={index}>
          <CategorySection title={category.title} color={category.color} />
          <CardContainer>
            <VideoCard
              title="Ejemplo de Video"
              image="https://via.placeholder.com/300x170"
              categoryColor={category.color}
              onDelete={handleDelete}
              onEdit={() =>
                handleEdit({
                  title: 'Ejemplo de Video',
                  category: category.title.toLowerCase(),
                  image: 'https://via.placeholder.com/300x170',
                  video: 'https://www.youtube.com',
                  description: 'Descripción del video',
                })
              }
            />
          </CardContainer>
        </div>
      ))}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)} // Cierra el modal
        onSubmit={handleSubmit} // Maneja el guardado
        initialValues={editData} // Datos prellenados del modal
      />
    </MainContent>
  );
}

export default Home;
