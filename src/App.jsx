import React from 'react';
import Header from './Components/Header';
import { usePage } from './Context/PageContext';

function App() {
  const { currentPage } = usePage(); // Accede al contexto

  return (
    <div>
      <Header />
      <main style={{ padding: '20px' }}>
        {currentPage === 'HOME' && <h1>Bienvenido a la página Home</h1>}
        {currentPage === 'NUEVO VIDEO' && <h1>Formulario para Nuevo Video</h1>}
      </main>
    </div>
  );
}

export default App;
