import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Banner from '../Components/Banner';
import CategorySection from '../Components/CategorySection';
import VideoCard from '../Components/VideoCard';
import EditModal from '../Components/EditModal';
import api from '../services/api';

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

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/videos');
        const videos = response.data;

        const categorizedVideos = [
          {
            title: 'Frontend',
            color: '#0066ff',
            videos: videos.filter((video) => video.category === 'frontend'),
          },
          {
            title: 'Backend',
            color: '#33cc33',
            videos: videos.filter((video) => video.category === 'backend'),
          },
          {
            title: 'Innovación y Gestión',
            color: '#ff9900',
            videos: videos.filter((video) => video.category === 'innovation'),
          },
        ];

        setVideosByCategory(categorizedVideos);
      } catch (error) {
        console.error('Error al obtener los videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleEdit = (video) => {
    setEditData(video); 
    setModalOpen(true); 
  };

  const handleSubmit = (updatedVideo) => {
  
    // Actualiza los datos locales después de guardar
    setVideosByCategory((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        videos: category.videos.map((video) =>
          video.id === updatedVideo.id ? updatedVideo : video
        ),
      }))
    );
  };

  return (
    <MainContent>
      <Banner />
      {videosByCategory.map((category, index) => (
        <div key={index}>
          <CategorySection title={category.title} color={category.color} />
          <CardContainer>
  {category.videos.map((video, videoIndex) => {
    
    return (
      <VideoCard
        key={videoIndex}
        title={video.title}
        image={video.image} // Se pasa aquí
        categoryColor={category.color}
        onDelete={() => handleDelete(video)}
        onEdit={() => handleEdit(video)}
      />
    );
  })}
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