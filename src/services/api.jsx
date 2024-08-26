const BASE_URL = 'https://sandbox.academiadevelopers.com';

// Genera los encabezados de autorización para las solicitudes a la API.
const getAuthHeaders = (token) => ({
  'Authorization': `Token ${token}`,
  'Content-Type': 'application/json',
});

/**
 * Obtiene la lista de proyectos.
 * 
 * Realiza una solicitud GET a la API para obtener todos los proyectos.
 * 
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<object>} - Promesa con la lista de proyectos.
 */
export const fetchProjects = async (token) => {
  const response = await fetch(`${BASE_URL}/taskmanager/projects/`, {
    method: 'GET',
    headers: getAuthHeaders(token),
  });
  return response.json();
};

/**
 * Obtiene los detalles de un proyecto.
 * 
 * Realiza una solicitud GET a la API para obtener la información de un proyecto.
 * 
 * @param {string} token - Token de autenticación.
 * @param {string} projectId - ID del proyecto a obtener.
 * @returns {Promise<object>} - Promesa que resuelve con los detalles del proyecto.
 */
export const fetchProject = async (token, projectId) => {
  const response = await fetch(`${BASE_URL}/taskmanager/projects/${projectId}/`, {
    method: 'GET',
    headers: getAuthHeaders(token),
  });
  return response.json();
};

/**
 * Crea un nuevo proyecto.
 * 
 * Realiza una solicitud POST a la API para crear un proyecto.
 * 
 * @param {string} token - Token de autenticación.
 * @param {object} projectData - Datos del nuevo proyecto a crear.
 * @returns {Promise<object>} - Promesa que resuelve con los datos del proyecto creado.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const createProject = async (token, projectData) => {
  const response = await fetch(`${BASE_URL}/taskmanager/projects/`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error('Error creating project');
  }

  return response.json();
};

/**
 * Elimina un proyecto existente.
 * 
 * Realiza una solicitud DELETE a la API para eliminar un proyecto.
 * 
 * @param {string} token - Token de autenticación del usuario.
 * @param {string} projectId - ID del proyecto a eliminar.
 * @returns {Promise<void>} - Promesa que se resuelve cuando el proyecto ha sido eliminado.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const deleteProject = async (token, projectId) => {
  const url = `${BASE_URL}/taskmanager/projects/${projectId}/`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    const errorText = await response.text(); // Obtener el texto de error
    throw new Error(`Error deleting project: ${response.statusText} - ${errorText}`);
  }

  // Respuesta vacía o `null` si la eliminación fue exitosa
  return response.status === 204 ? null : response.json();
};

/**
 * Obtiene el perfil del usuario.
 * 
 * Realiza una solicitud GET a la API para obtener los datos.
 * 
 * @param {string} token - Token de autenticación del usuario.
 * @returns {Promise<object>} - Promesa que resuelve con los datos del perfil.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const fetchUserProfile = async (token) => {
  const response = await fetch(`${BASE_URL}/users/profiles/profile_data/`, {
    method: 'GET',
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    throw new Error('Error fetching profile data');
  }

  const data = await response.json();
  return data;
};
