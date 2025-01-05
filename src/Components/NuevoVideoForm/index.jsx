import React, { useState } from 'react';
import styled from 'styled-components';
import api from "../../services/api"; 

// Contenedor principal del formulario
const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #000;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

// Título principal
const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`;

// Subtítulo
const Subtitle = styled.p`
  font-size: 16px;
  color: #aaa;
  text-align: center;
  margin-bottom: 30px;
`;

// Título de la sección
const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
`;

// Formulario
const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Campo con error
const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? '1 / -1' : 'auto')};
`;

// Input básico
const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid ${({ error }) => (error ? '#FF0000' : '#333')};
  border-radius: 8px;
  background-color: #111;
  color: #fff;
  outline: none;

  &:focus {
    border-color: ${({ error }) => (error ? '#FF0000' : '#0066ff')};
    box-shadow: 0 0 5px ${({ error }) => (error ? '#FF0000' : '#0066ff')};
  }
`;

// Select básico
const Select = styled.select`
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid ${({ error }) => (error ? '#FF0000' : '#333')};
  border-radius: 8px;
  background-color: #111;
  color: #fff;
  outline: none;

  &:focus {
    border-color: #0066ff;
    box-shadow: 0 0 5px #0066ff;
  }
`;

// Textarea
const Textarea = styled.textarea`
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid ${({ error }) => (error ? '#FF0000' : '#333')};
  border-radius: 8px;
  background-color: #111;
  color: #fff;
  outline: none;
  resize: none;

  &:focus {
    border-color: #0066ff;
    box-shadow: 0 0 5px #0066ff;
  }
`;

// Mensaje de error
const ErrorMessage = styled.span`
  color: #ff0000;
  font-size: 14px;
`;

// Contenedor de botones
const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  grid-column: 1 / -1;
`;

// Botón estilizado
const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ $primary }) => ($primary ? '#fff' : '#0066ff')};
  background-color: ${({ $primary }) => ($primary ? '#0066ff' : 'transparent')};
  border: ${({ $primary }) => ($primary ? 'none' : '2px solid #0066ff')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ $primary }) => ($primary ? '#0050cc' : '#003f99')};
    color: #fff;
  }
`;

function NuevoVideoForm({ onVideoAdded }) {
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    imagen: "",
    video: "",
    descripcion: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Estado para manejar la solicitud

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Limpia errores al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    if (!formData.titulo) newErrors.titulo = "El título es obligatorio";
    if (!formData.categoria) newErrors.categoria = "Seleccione una categoría";
    if (!formData.imagen) newErrors.imagen = "El enlace de la imagen es obligatorio";
    if (!formData.video) newErrors.video = "El enlace del video es obligatorio";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setLoading(true); // Inicia el estado de carga
      try {
        // Realiza la solicitud POST
        const response = await api.post("/videos", {
          title: formData.titulo,
          category: formData.categoria,
          image: formData.imagen,
          video: formData.video,
          description: formData.descripcion,
        });
  
        alert("¡Video creado con éxito!");
  
        // Notifica al componente padre que se añadió un nuevo video
        if (onVideoAdded) {
          onVideoAdded(response.data);
        }
  
        // Limpia el formulario después de guardar
        setFormData({
          titulo: "",
          categoria: "",
          imagen: "",
          video: "",
          descripcion: "",
        });
      } catch (error) {
        console.error("Error al crear el video:", error);
        alert("Hubo un error al crear el video.");
      } finally {
        setLoading(false); // Termina el estado de carga
      }
    }
  };
  

  return (
    <FormContainer>
      <Title>Nuevo Video</Title>
      <Subtitle>Complete el formulario para crear una nueva tarjeta de video</Subtitle>
      <SectionTitle>Crear Tarjeta</SectionTitle>
      <Form onSubmit={handleSubmit}>
        <FieldContainer>
          <Input
            type="text"
            name="titulo"
            placeholder="Ingrese el título"
            value={formData.titulo}
            onChange={handleChange}
            $error={!!errors.titulo}
          />
          {errors.titulo && <ErrorMessage>{errors.titulo}</ErrorMessage>}
        </FieldContainer>
        <FieldContainer>
          <Select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            $error={!!errors.categoria}
          >
            <option value="">Seleccione una categoría</option>
            <option value="frontend">Front End</option>
            <option value="backend">Back End</option>
            <option value="innovation">Innovación y Gestión</option>
          </Select>
          {errors.categoria && <ErrorMessage>{errors.categoria}</ErrorMessage>}
        </FieldContainer>
        <FieldContainer>
          <Input
            type="text"
            name="imagen"
            placeholder="Ingrese el enlace de la imagen"
            value={formData.imagen}
            onChange={handleChange}
            $error={!!errors.imagen}
          />
          {errors.imagen && <ErrorMessage>{errors.imagen}</ErrorMessage>}
        </FieldContainer>
        <FieldContainer>
          <Input
            type="text"
            name="video"
            placeholder="Ingrese el enlace del video"
            value={formData.video}
            onChange={handleChange}
            $error={!!errors.video}
          />
          {errors.video && <ErrorMessage>{errors.video}</ErrorMessage>}
        </FieldContainer>
        <FieldContainer $fullWidth>
          <Textarea
            name="descripcion"
            rows="4"
            placeholder="¿De qué se trata este video?"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </FieldContainer>
        <ButtonContainer>
          <Button $primary type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
          <Button
            type="reset"
            onClick={() =>
              setFormData({
                titulo: "",
                categoria: "",
                imagen: "",
                video: "",
                descripcion: "",
              })
            }
          >
            Limpiar
          </Button>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
}

export default NuevoVideoForm;