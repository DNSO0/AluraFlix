import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './Routes/AppRoutes'; // Importa las rutas
import GlobalStyles from './styles/globalStyles'; // Estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles />
    <AppRoutes />
  </React.StrictMode>
);
