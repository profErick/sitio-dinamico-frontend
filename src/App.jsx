import { Outlet, Link, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-briefcase me-2"></i>
            Gestión de Servicios
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/servicios' || location.pathname === '/' ? 'active' : ''}`}
                  to="/servicios"
                >
                  <i className="bi bi-list-ul me-1"></i>
                  Servicios
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/servicios/crear' ? 'active' : ''}`}
                  to="/servicios/crear"
                >
                  <i className="bi bi-plus-circle me-1"></i>
                  Crear Servicio
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1 bg-light">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light py-3 mt-auto">
        <div className="container-fluid text-center">
          <p className="mb-0">
            <small>© 2024 Gestión de Servicios - Desarrollado con React + Vite</small>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;


