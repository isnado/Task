import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { fetchUserProfile } from '../services/api';
import '../styles/Profile.css'; 

/**
 * Componente de perfil de usuario.
 * 
 * Muestra la información del perfil del usuario autenticado.
 * 
 * - Utiliza el contexto de autenticación (`AuthContext`) para obtener el token 
 * - Carga la información del perfilmediante la llamada a la API `fetchUserProfile`.
 * - Muestra los detalles del perfil del usuario
 *   
 * Si hay un error al cargar el perfil, se muestra un mensaje de error. Mientras se carga el 
 * perfil, se muestra un mensaje de "Loading...".
 * 
 * @component
 * @example
 * return (
 *   <Profile />
 * )
 */
const Profile = () => {
  // Obtiene el token de autenticación del contexto de autenticación
  const { authToken } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      // Verifica si el usuario está autenticado
      if (!authToken) {
        setError('No estás autenticado.');
        return;
      }
      try {
        // Intenta obtener los datos del perfil 
        const data = await fetchUserProfile(authToken);
        setProfile(data);
      } catch (error) {
        // Maneja errores al obtener los datos del perfil
        setError(error.message);
      }
    };

    loadProfile();
  }, [authToken]); // Vuelve a cargar el perfil si cambia el token

  if (error) {
    // Muestra un mensaje de error 
    return <p>Error: {error}</p>;
  }

  return (
    <div className="profile-container">
      {profile ? (
        <div className="profile-info">
          <h1>{profile.username}</h1>
          <p><strong>Nombre:</strong> {profile.first_name}</p>
          <p><strong>Apellido:</strong> {profile.last_name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {profile.dob && <p><strong>Date of Birth:</strong> {profile.dob}</p>}
          {profile.bio && <p><strong>Bio:</strong> {profile.bio}</p>}
          {profile.image && <img src={profile.image} alt="Profile" />}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
