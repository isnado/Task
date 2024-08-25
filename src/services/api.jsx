// src/services/api.js
const BASE_URL = 'https://sandbox.academiadevelopers.com';

const getAuthHeaders = (token) => ({
  'Authorization': `Token ${token}`,
  'Content-Type': 'application/json',
});

export const fetchProjects = async (token) => {
  const response = await fetch(`${BASE_URL}/taskmanager/projects/`, {
    method: 'GET',
    headers: getAuthHeaders(token),
  });
  return response.json();
};

export const fetchProject = async (token, projectId) => {
  const response = await fetch(`${BASE_URL}/taskmanager/projects/${projectId}/`, {
    method: 'GET',
    headers: getAuthHeaders(token),
  });
  return response.json();
};

export const createProject = async (token, projectData) => {
  const response = await fetch(`${BASE_URL}/taskmanager/projects/`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(projectData),
  });
  return response.json();
};

export const deleteProject = async (token, projectId) => {
  const response = await fetch(`${BASE_URL}/taskmanager/projects/${projectId}/`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  });
  return response.status;
};
export const fetchUserProfile = async (token) => {
  const response = await fetch(`${BASE_URL}/users/profiles/profile_data/`, {  // URL actualizada
    method: 'GET',
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    throw new Error('Error fetching profile data');
  }

  const data = await response.json();
  return data;
};
