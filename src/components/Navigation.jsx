// src/components/Navigation.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Navigation.css'; // Asegúrate de importar el archivo CSS

const Navigation = () => {
  const { authToken, logout } = useContext(AuthContext);

  return (
    <nav className="navigation">
      <Link to="/" className="nav-link">Home</Link>
      {authToken ? (
        <>
          <Link to="/profile" className="nav-link">Perfil</Link>
          <Link to="/projects" className="nav-link">Proyectos</Link>
          <button className="logout-button" onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login" className="nav-link">Login</Link>
      )}
    </nav>
  );
};

export default Navigation;
