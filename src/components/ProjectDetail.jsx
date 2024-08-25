// src/components/ProjectDetail.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import { fetchProject } from '../services/api'; // Asegúrate de que esta importación sea correcta

const ProjectDetail = () => {
  const { authToken } = useContext(AuthContext);
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await fetchProject(authToken, id);
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    loadProject();
  }, [authToken, id]);

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
