import React from 'react';
import styled from 'styled-components'; // Importar styled-components
import NuevoVideoForm from '../Components/NuevoVideo'; // Componente del formulario

// Contenedor principal estilizado
const MainContent = styled.main`
  padding: 20px;
  background-color: #121212;
  padding-top: 70px; /* Espacio para el header fijo */
  min-height: calc(100vh - 70px); /* Altura mínima para empujar el footer hacia el final */
`;

function NuevoVideo() {
  return (
    <MainContent>
      <NuevoVideoForm />
    </MainContent>
  );
}

export default NuevoVideo;
