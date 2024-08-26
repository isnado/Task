import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; 

/**
 * Componente de inicio de sesión.
 * 
 * Permite a los usuarios ingresar su nombre de usuario y contraseña para autenticarse. 
 * Si la autenticación es exitosa, el usuario es redirigido a perfil. 
 * En caso de error, se muestra un mensaje de error.
 * 
 * @component
 * @example
 * return (
 *   <Login />
 * )
 */
const Login = () => {
  // Estado para almacenar el nombre de usuario
  const [username, setUsername] = useState('');
  // Estado para almacenar la contraseña 
  const [password, setPassword] = useState('');
  // Estado para almacenar y mostrar mensajes de error
  const [error, setError] = useState('');

  // Obtiene la función de login 
  const { login } = useContext(AuthContext);
  // Hook para manejar la navegación
  const navigate = useNavigate();

  /**
   * Envío del formulario de inicio de sesión.
   * 
   * Previene el comportamiento por defecto del formulario, intenta autenticar al usuario 
   * con el nombre de usuario y la contraseña. Si la autenticación es exitosa,
   * redirige al usuario al perfil. En caso de error, muestra un mensaje.
   * 
   * @param {Object} e - El evento de envía formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Intenta autenticar al usuario
      await login(username, password);
      // Redirige al usuario a la página de perfil si la autenticación es exitosa
      navigate('/profile');
    } catch (error) {
      // Mensaje de error si la autenticación falla
      setError('Usuario y/o contraseña incorrecto');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>} {/* Muestra el mensaje de error */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
