import '../styles/Home.css';

/**
 * Componente funcional `Home` que representa la página de inicio de la aplicación Task To Do.
 * 
 * @returns {JSX.Element} Elemento JSX que representa la página de inicio.
 * 
 * El componente `Home` muestra un mensaje de bienvenida y una breve descripción de la aplicación
 * Task To Do.
 */
const Home = () => {
  return (
    <div className="home-container">
      <h1>Task TO DO</h1>
      <div className="home-text-container">
        <p>
          <br /><br />  
          ¡Bienvenido a Task To Do!
          <br /><br />
          Nos complace presentarte esta aplicación, diseñada para ayudarte a gestionar tus tareas de manera eficiente y organizada. En Task To Do, podrás crear, editar y rastrear tus tareas, organizar proyectos y colaborar con otros usuarios, todo en un entorno intuitivo y fácil de usar.
          <br /><br />
          Agradecimientos
          <br /><br />
          Quiero expresar mi agradecimiento a UPATECO y a Academia CIMNE IBER por su apoyo durante el desarrollo de este proyecto. Su respaldo y recursos han sido fundamentales para el éxito de esta aplicación.
          <br /><br />
          También queremos agradecer a nuestros profesores y compañeros por su ayuda y colaboración. Sus aportes, y sugerencias han sido esenciales para llevar a cabo este trabajo.
          <br /><br />
          Estamos entusiasmados de que pruebes Task To Do y esperamos que te resulte útil y productivo en tu día a día. Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros.
          <br /><br />
          ¡Gracias por tu apoyo y disfruta de la experiencia de Task To Do!
        </p>
      </div>
    </div>
  );
};

export default Home;
