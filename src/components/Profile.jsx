// src/components/Profile.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
  const { authToken } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // Implement API call to fetch user profile
    };
    fetchProfile();
  }, [authToken]);

  return (
    <div>
      {profile ? (
        <div>
          <h1>{profile.username}</h1>
          <p>{profile.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
