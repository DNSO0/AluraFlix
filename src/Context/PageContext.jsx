import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const PageContext = createContext();

// Proveedor del contexto
export const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('HOME'); // Estado global para la página activa

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const usePage = () => {
  return useContext(PageContext);
};
