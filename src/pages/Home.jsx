import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Banner from "../Components/Banner";
import CategorySection from "../Components/CategorySection";
import VideoCard from "../Components/VideoCard";
import EditModal from "../Components/EditModal";
import api from "../services/api";

const MainContent = styled.main`
  padding: 20px;
  background-color: #121212;
  padding-top: 70px;
  min-height: calc(100vh - 70px);
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

function Home() {
  const [videosByCategory, setVideosByCategory] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({});

  // Cargar los videos al montar el componente
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get("/videos");
        const videos = response.data;

        // Organizar videos por categoría
        const categorizedVideos = [
          {
            title: "Frontend",
            color: "#0066ff",
            videos: videos.filter((video) => video.category === "frontend"),
          },
          {
            title: "Backend",
            color: "#33cc33",
            videos: videos.filter((video) => video.category === "backend"),
          },
          {
            title: "Innovación y Gestión",
            color: "#ff9900",
            videos: videos.filter((video) => video.category === "innovation"),
          },
        ];

        setVideosByCategory(categorizedVideos);
      } catch (error) {
        console.error("Error al obtener los videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Manejar la edición de un video
  const handleEdit = (video) => {
    setEditData(video);
    setModalOpen(true);
  };

  // Guardar los cambios realizados en el modal
  const handleSubmit = (updatedVideo) => {
    setVideosByCategory((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        videos: category.videos.map((video) =>
          video.id === updatedVideo.id ? updatedVideo : video
        ),
      }))
    );
    setModalOpen(false); // Cerrar el modal
  };

  // Manejar la eliminación de un video
  const handleDelete = async (video) => {
    try {
      await api.delete(`/videos/${video.id}`); // Realizar la solicitud DELETE
      setVideosByCategory((prevCategories) =>
        prevCategories.map((category) => ({
          ...category,
          videos: category.videos.filter((v) => v.id !== video.id),
        }))
      );
      alert("¡Video eliminado con éxito!");
    } catch (error) {
      console.error("Error al eliminar el video:", error);
      alert("Hubo un error al eliminar el video.");
    }
  };

  return (
    <MainContent>
      <Banner />
      {videosByCategory.map((category, index) => (
        <div key={index}>
          <CategorySection title={category.title} color={category.color} />
          <CardContainer>
            {category.videos.map((video, videoIndex) => (
              <VideoCard
                key={videoIndex}
                title={video.title}
                image={video.image}
                categoryColor={category.color}
                onDelete={() => handleDelete(video)} // Llama a la función de eliminación
                onEdit={() => handleEdit(video)} // Llama a la función de edición
              />
            ))}
          </CardContainer>
        </div>
      ))}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValues={editData}
      />
    </MainContent>
  );
}

export default Home;
