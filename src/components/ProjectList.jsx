// src/components/ProjectList.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { fetchProjects } from '../services/api';

const ProjectList = () => {
  const { authToken } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects(authToken);
      setProjects(data.results);
    };
    loadProjects();
  }, [authToken]);

  return (
    <div>
      <h1>Proyectos</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <a href={`/projects/${project.id}`}>{project.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
