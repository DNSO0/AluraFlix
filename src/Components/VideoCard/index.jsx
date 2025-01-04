import React from 'react';
import styled from 'styled-components';
import editIcon from '../../assets/icons/edit-icon.svg'; // Icono de editar
import deleteIcon from '../../assets/icons/delete-icon.svg'; // Icono de borrar

// Contenedor principal de la card
const CardContainer = styled.div`
  width: 300px;
  background-color: #000;
  border: 3px solid ${({ borderColor }) => borderColor || '#fff'};
  border-radius: 8px;
  box-shadow: 0 0 10px ${({ borderColor }) => borderColor || '#fff'};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

// Imagen del video
const VideoImage = styled.div`
  width: 100%;
  height: 170px;
  background: ${({ image }) => `url(${image})`} no-repeat center center;
  background-size: cover;
`;

// Contenedor del título
const VideoTitle = styled.div`
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  background-color: #111;
`;

// Contenedor de botones
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #222;
`;

// Botón estilizado
const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || '#444'};
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

function VideoCard({ title, image, categoryColor, onDelete, onEdit }) {
  return (
    <CardContainer borderColor={categoryColor}>
      <VideoImage image={image} />
      <VideoTitle>{title}</VideoTitle>
      <ButtonContainer>
        <IconButton hoverColor="#ff0000" onClick={onDelete}>
          <img src={deleteIcon} alt="Delete Icon" />
          Borrar
        </IconButton>
        <IconButton hoverColor="#0066ff" onClick={onEdit}>
          <img src={editIcon} alt="Edit Icon" />
          Editar
        </IconButton>
      </ButtonContainer>
    </CardContainer>
  );
}

export default VideoCard;
