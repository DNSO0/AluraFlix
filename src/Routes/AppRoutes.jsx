import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'; // Importa la página Home
import NuevoVideo from '../pages/NuevoVideo'; // Importa la página Nuevo Video
import Header from '../Components/Header'; // Header común
//import Footer from '../Components/Footer'; // Footer común

function AppRoutes() {
  return (
    <Router>
      <Header /> {/* Header fijo para todas las páginas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nuevo-video" element={<NuevoVideo />} />
      </Routes>
      
    </Router>
  );
}

export default AppRoutes;
