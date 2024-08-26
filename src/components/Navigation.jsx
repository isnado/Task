import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Navigation.css'; 

/**
 * Componente de navegación.
 * 
 * Muestra enlaces de navegación y un botón de cierre de sesión basado en el estado de autenticación.
 * 
 * - Si el usuario está autenticado (es decir, `authToken` está presente), muestra enlaces a las 
 *   páginas de inicio, perfil y proyectos, así como un botón cerrar sesión.
 * - Si el usuario no está autenticado, muestra un enlace a la página de inicio de sesión.
 * 
 * @component
 * @example
 * return (
 *   <Navigation />
 * )
 */
const Navigation = () => {
  // Obtiene el token de autenticación y la función de cierre de sesión 
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
