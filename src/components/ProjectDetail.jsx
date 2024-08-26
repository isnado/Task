import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { fetchProject } from '../services/api'; 

/**
 * Componente de detalle del proyecto.
 * 
 * Muestra la información detallada de un proyecto específico.
 * 
 * - Utiliza el contexto de autenticación (`AuthContext`) para obtener el token
 * - Utiliza el hook `useParams` de `react-router-dom` para obtener el ID del proyecto de la URL.
 * - Carga los detalles  la llamada a la API `fetchProject`.
 * 
 * Si hay un error al obtener los detalles del proyecto, se muestra en la consola del navegador.
 * Mientras se cargan se muestra un mensaje de "Loading...".
 * 
 * @component
 * @example
 * return (
 *   <ProjectDetail />
 * )
 */
const ProjectDetail = () => {
  // Obtiene el token de autenticación 
  const { authToken } = useContext(AuthContext);
  // Obtiene el ID del proyecto desde la URL
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        // Intenta obtener los detalles del proyecto utilizando la función `fetchProject`
        const data = await fetchProject(authToken, id);
        setProject(data);
      } catch (error) {
        // Maneja errores al obtener los detalles del proyecto
        console.error('Error fetching project:', error);
      }
    };

    loadProject();
  }, [authToken, id]); // Vuelve a cargar el proyecto si cambia el token o el ID del proyecto

  return (
    <div>
      {project ? (
        <div>
          <h1>{project.name}</h1>
          <p>{project.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProjectDetail;
