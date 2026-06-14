import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
            <div className="container">
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
                    <i className="fas fa-industry me-2"></i>
                    TISKOSOLUTIONS S.R.L.
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/soluciones">Soluciones</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/servicios">Servicios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/productos">Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">Nosotros</Link>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fas fa-user me-1"></i> Usuario
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#"><i className="fas fa-user-edit me-2"></i>Perfil</a></li>
                                <li><a className="dropdown-item" href="#"><i className="fas fa-cog me-2"></i>Configuración</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item" onClick={handleLogout}><i className="fas fa-sign-out-alt me-2"></i>Cerrar Sesión</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;