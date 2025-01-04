import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../../services/api";
import closeIcon from "../../assets/icons/close.svg";

// Contenedor del modal (fondo oscuro y centrado)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Contenedor principal del modal
const ModalContainer = styled.div`
  width: 400px;
  background-color: #002244;
  border: 3px solid #00bfff; /* Borde claro */
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  position: relative;
  color: #fff;
`;

// Botón para cerrar modal
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover img {
    filter: brightness(0.8);
  }
`;

// Título del modal
const ModalTitle = styled.h2`
  font-size: 40px;
  font-weight: bold;
  color: #0066ff;
  margin-bottom: 20px;
  text-align: center;
`;

// Formulario
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Campo de texto
const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 2px solid ${({ error }) => (error ? "#ff0000" : "#0066ff")};
  border-radius: 4px;
  background-color: #001122;
  color: #fff;

  &:focus {
    border-color: ${({ error }) => (error ? "#ff0000" : "#0099ff")};
    outline: none;
  }
`;

// Select
const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border: 2px solid ${({ error }) => (error ? "#ff0000" : "#0066ff")};
  border-radius: 4px;
  background-color: #001122;
  color: #fff;

  &:focus {
    border-color: ${({ error }) => (error ? "#ff0000" : "#0099ff")};
    outline: none;
  }
`;

// Textarea
const Textarea = styled.textarea`
  padding: 10px;
  font-size: 14px;
  border: 2px solid ${({ error }) => (error ? "#ff0000" : "#0066ff")};
  border-radius: 4px;
  background-color: #001122;
  color: #fff;
  resize: none;

  &:focus {
    border-color: ${({ error }) => (error ? "#ff0000" : "#0099ff")};
    outline: none;
  }
`;

// Mensaje de error
const ErrorMessage = styled.span`
  color: #ff0000;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
`;

// Botones
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  background-color: ${({ $primary }) => ($primary ? "#0066ff" : "transparent")};
  color: ${({ $primary }) => ($primary ? "#fff" : "#0066ff")};
  border: 2px solid #0066ff;

  &:hover {
    background-color: ${({ $primary }) => ($primary ? "#0050cc" : "#002244")};
    color: #fff;
  }
`;

function EditModal({ isOpen, onClose, onSubmit, initialValues }) {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    category: "",
    image: "",
    video: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // Actualiza el estado del formulario al abrir el modal
  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({
        ...prev,
        ...initialValues,
        title: initialValues.title || "",
        category: initialValues.category || "",
        image: initialValues.image || "",
        video: initialValues.video || "",
        description: initialValues.description || "",
      }));
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     
      if (!formData.id) {
        throw new Error("El ID del video no está definido.");
      }

      await api.put(`/videos/${formData.id}`, formData); // Solicitud PUT
      onSubmit(formData); // Actualiza datos en Home
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al actualizar el video:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <img src={closeIcon} alt="Cerrar modal" />
        </CloseButton>
        <ModalTitle>Editar Card:</ModalTitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título"
          />
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Seleccionar Categoría</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="innovation">Innovación y Gestión</option>
          </Select>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="URL de la imagen"
          />
          <Input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleChange}
            placeholder="URL del video"
          />
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Descripción"
          />
          <ButtonContainer>
            <Button $primary type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
            <Button
              type="reset"
              onClick={() =>
                setFormData({
                  id: "",
                  title: "",
                  category: "",
                  image: "",
                  video: "",
                  description: "",
                })
              }
            >
              Limpiar
            </Button>
          </ButtonContainer>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default EditModal;
