import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PageProvider } from './Context/PageContext';
import GlobalStyles from './styles/globalStyles'; // Importar estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageProvider>
      <GlobalStyles /> 
      <App />
    </PageProvider>
  </React.StrictMode>
);
