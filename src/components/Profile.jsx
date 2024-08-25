// src/components/Profile.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { fetchUserProfile } from '../services/api';
import '../styles/Profile.css';  // Si tienes un archivo CSS para los estilos

const Profile = () => {
  const { authToken } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile(authToken);
        setProfile(data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadProfile();
  }, [authToken]);

  if (error) {
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
