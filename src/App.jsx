import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import Navigation from './components/Navigation';
import { AuthProvider } from './contexts/AuthContext';

/**
 * Componente principal.
 * 
 * Proporciona el contexto de autenticación a través del `AuthProvider`,
 * configura el enrutamiento con `react-router-dom` y renderiza los componentes
 * de navegación y las rutas.
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
