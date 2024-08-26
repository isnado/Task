import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

/**
 * Punto de entrada principal para la aplicación React.
 * 
 * Utiliza `ReactDOM.createRoot` para renderizar el componente raíz `App` en el elemento
 * del DOM con el ID 'root'. Envuelve el componente `App` con `React.StrictMode` para
 * habilitar la verificación de prácticas recomendadas durante el desarrollo.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
