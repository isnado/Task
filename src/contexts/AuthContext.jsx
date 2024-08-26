import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

/**
 * Proveedor de contexto para autenticación.
 * 
 * Maneja el estado de autenticación del usuario, incluyendo el token y la información del usuario.
 * 
 * - `authToken`: Token de autenticación almacenado en el estado y en `localStorage`.
 * - `user`: Información del usuario obtenida desde la API.
 * - `login`: Función para autenticar al usuario y almacenar el token
 * - `logout`: Función para cerrar sesión y eliminar el token
 * 
 * Utiliza `useEffect` para actualizar el token en `localStorage` y para obtener datos del usuario si hay un token presente.
 * 
 * @component
 * @example
 * return (
 *   <AuthProvider>
 *     <App />
 *   </AuthProvider>
 * )
 */
export const AuthProvider = ({ children }) => {
  // Estado para el token de autenticación y la información del usuario
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      // Guarda el token en localStorage
      localStorage.setItem('token', authToken);
      const fetchUserData = async () => {
        try {
          // Obtiene la información del usuario desde la API
          const response = await fetch('https://sandbox.academiadevelopers.com/users/profiles/profile_data/', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${authToken}`,
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUser(data);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    } else {
      // Elimina el token de localStorage si no hay token
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [authToken]); // Reejecuta el efecto si cambia el token de autenticación

  /**
   * Autenticar al usuario.
   * 
   * Envía una solicitud POST a la API  para obtener un token.
   * 
   * @param {string} username - Nombre de usuario.
   * @param {string} password - Contraseña del usuario.
   * @throws {Error} Si la autenticación falla, se lanza un error con el mensaje de detalle.
   */
  const login = async (username, password) => {
    const response = await fetch('https://sandbox.academiadevelopers.com/api-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      setAuthToken(data.token);
    } else {
      throw new Error(data.detail);
    }
  };

  /**
   * Función para cerrar sesión.
   * 
   * Elimina el token de autenticación y limpia el estado.
   */
  const logout = () => {
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
