import React from 'react';
import Header from './Components/Header';
import NuevoVideo from './Components/NuevoVideo';
//import Footer from './Components/Footer'; // Suponiendo que el Footer ya está creado

function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: '20px', backgroundColor: '#121212', minHeight: 'calc(100vh - 150px)' }}>
        <NuevoVideo />
      </main>
      
    </div>
  );
}

export default App;
