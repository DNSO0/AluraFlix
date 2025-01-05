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

@media (max-width: 1024px) {
  padding: 15px; /* Reduce el padding en tablet */
}
`;


const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Mantiene el comportamiento de desktop */
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 1024px) {
    flex-wrap: nowrap; /* Desactiva el wrap en tablet */
    overflow-x: auto; /* Activa el desplazamiento horizontal */
    padding-bottom: 10px; /* Espacio para la barra de scroll */

    /* Estilo de la barra de scroll */
    &::-webkit-scrollbar {
      height: 8px; /* Altura de la barra de scroll */
    }
    &::-webkit-scrollbar-thumb {
      background: #0066ff; /* Color del scroll */
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background: #222; /* Fondo del scroll */
    }
  }
`;


function Home() {
  const [videosByCategory, setVideosByCategory] = useState([]);
  const [latestVideo, setLatestVideo] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(false);


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get("/videos");
        const videos = response.data;

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
            videos: videos.filter((video) => video.category === "Innovación y Gestión"),
          },
        ];

        // Determinar el último video añadido
        if (videos.length > 0) {
          const lastVideo = videos[videos.length - 1];
          const categoryData = categorizedVideos.find(
            (category) => category.title.toLowerCase() === lastVideo.category.toLowerCase()
          );

          setLatestVideo({
            ...lastVideo,
            categoryColor: categoryData ? categoryData.color : "#ffffff", // Agrega color dinámico
          });
        }

        setVideosByCategory(categorizedVideos);
      } catch (error) {
        console.error("Error al obtener los videos:", error);
      }
    };

    fetchVideos();
  }, [refreshTrigger]);

  const handleVideoAdded = (newVideo) => {
    const categoryData = videosByCategory.find(
      (category) => category.title.toLowerCase() === newVideo.category
    );

    const videoWithColor = {
      ...newVideo,
      categoryColor: categoryData ? categoryData.color : "#ffffff", // Agrega color dinámico
    };

    setLatestVideo(videoWithColor); // Actualiza el último video

    // Actualizar videos por categoría
    setVideosByCategory((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        videos:
          category.title.toLowerCase() === newVideo.category
            ? [...category.videos, videoWithColor]
            : category.videos,
      }))
    );
  };

  const handleEdit = (video) => {
    setEditData(video);
    setModalOpen(true);
  };

  const handleSubmit = (updatedVideo) => {
    setVideosByCategory((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        videos: category.videos.map((video) =>
          video.id === updatedVideo.id ? updatedVideo : video
        ),
      }))
    );
    setLatestVideo((prevLatest) =>
      prevLatest?.id === updatedVideo.id ? updatedVideo : prevLatest
    );
    setRefreshTrigger((prev) => !prev);
    setModalOpen(false);
  };

  const handleDelete = async (video) => {
    try {
      await api.delete(`/videos/${video.id}`);
      setRefreshTrigger((prev) => !prev);
     
      const updatedCategories = videosByCategory.map((category) => ({
        ...category,
        videos: category.videos.filter((v) => v.id !== video.id),
      }));
  
      setVideosByCategory(updatedCategories);
  
      // Obtener todos los videos restantes
      const allVideos = updatedCategories.flatMap((category) => category.videos);
  
      if (allVideos.length > 0) {
        // Asignar el nuevo último video si quedan videos
        const newLastVideo = allVideos[allVideos.length - 1];
        const categoryData = categorizedVideos.find(
          (category) => category.title.toLowerCase() === newLastVideo.category.toLowerCase()
        );
  
        setLatestVideo({
          ...newLastVideo,
          categoryColor: categoryData ? categoryData.color : "#ffffff",
        });
      } else {
        // Si no quedan videos, limpiar el banner
        setLatestVideo(null);
      }
  
      alert("¡Video eliminado con éxito!");
    } catch (error) {
      console.error("Error al eliminar el video:", error);
      alert("Hubo un error al eliminar el video.");
    }
  };
  

  return (
    <MainContent>
      <Banner latestVideo={latestVideo} /> 
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
                onDelete={() => handleDelete(video)}
                onEdit={() => handleEdit(video)}
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
