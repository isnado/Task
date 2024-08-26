import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { fetchProjects, createProject, deleteProject } from '../services/api';
import '../styles/ProjectList.css';

/**
 * Componente para listar y gestionar 
 * Permite a los usuarios ver la lista, crear y eliminar proyectos existentes.
 * 
 * Utiliza el contexto de autenticación (`AuthContext`) para obtener el token y la información del usuario.
 * 
 * - `useEffect` se usa para cargar la lista de proyectos al montar el componente o al cambiar el token.
 * - `handleCreateProject` maneja la creación de nuevos proyectos.
 * - `handleDeleteProject` maneja la eliminación, verificando los permisos.
 * 
 * @component
 * @example
 * return (
 *   <ProjectList />
 * )
 */
const ProjectList = () => {
  // Obtiene el token de autenticación y la información del usuario
  const { authToken, user } = useContext(AuthContext);
  // Estado para almacenar la lista de proyectos
  const [projects, setProjects] = useState([]);
  // Maneja la entrada de nuevos proyectos y errores
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        // Intenta obtener la lista de proyectos usando `fetchProjects`
        const data = await fetchProjects(authToken);
        setProjects(data.results);
      } catch (error) {
        // Maneja errores al cargar de proyectos
        setError(`Error loading projects: ${error.message}`);
      }
    };

    loadProjects();
  }, [authToken]); // Vuelve a cargar los proyectos si cambia el token
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      // Datos del nuevo proyecto
      const projectData = {
        name: newProjectName,
        description: newProjectDescription,
      };
      // Intenta crear el nuevo proyecto usando  `createProject`
      const newProject = await createProject(authToken, projectData);
      setProjects([...projects, newProject]);
      setNewProjectName('');
      setNewProjectDescription('');
    } catch (error) {
      // Maneja errores al crear un nuevo proyecto
      setError(`Error creating project: ${error.message}`);
    }
  };

  const handleDeleteProject = async (projectId, ownerId) => {
    console.log('Deleting project:', projectId, 'Owner ID:', ownerId, 'User ID:', user?.id);
  
    if (!user) {
      alert('No estás autenticado.');
      return;
    }
  
    if (ownerId !== user.id) {
      alert('No tienes permiso para eliminar este proyecto.');
      return;
    }
  
    try {
      // Intenta eliminar el proyecto usando la función `deleteProject`
      await deleteProject(authToken, projectId);
      setProjects(projects.filter(project => project.id !== projectId));
    } catch (error) {
      // Maneja errores al eliminar un proyecto
      setError(`Error deleting project: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Proyectos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleCreateProject}>
        <input
          type="text"
          placeholder="Nombre del Proyecto"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
          required
        />
        <button type="submit">Crear Proyecto</button>
      </form>

      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <a href={`/projects/${project.id}`}>{project.name}</a>
            <span
              className="delete-link"
              onClick={() => handleDeleteProject(project.id, project.owner)} // Pasa el ID del autor
            >
              Borrar
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
