import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reinicio básico */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Configuración de body */
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
    margin: 0;
    padding: 0;
  }

  /* Configuración del contenedor principal */
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`;

export default GlobalStyles;
