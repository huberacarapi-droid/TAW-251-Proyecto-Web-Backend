import { Link, useNavigate } from "react-router-dom";
import { logout, isAuthenticated, getUser, getUserRole, isAdmin } from "../services/authService";
import { useState, useEffect } from "react";

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('guest');

    useEffect(() => {
        // Actualizar estado cuando cambia la autenticación
        const updateUser = () => {
            setAuthenticated(isAuthenticated());
            setUser(getUser());
            setUserRole(getUserRole());
        };

        updateUser();

        // Escuchar cambios en localStorage (para cuando se actualiza desde otro componente)
        const handleStorageChange = (e) => {
            if (e.key === 'user' || e.key === 'token') {
                updateUser();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogout = () => {
        logout();
        setAuthenticated(false);
        setUser(null);
        setUserRole('guest');
        navigate("/login");
    };

    // Función para obtener el badge de rol
    const getRoleBadge = (role) => {
        switch(role) {
            case 'admin':
                return <span className="badge bg-danger ms-2">Admin</span>;
            case 'user':
                return <span className="badge bg-info ms-2">Usuario</span>;
            default:
                return null;
        }
    };

    // Función para obtener el ícono del rol
    const getRoleIcon = (role) => {
        switch(role) {
            case 'admin':
                return 'fa-user-shield';
            case 'user':
                return 'fa-user';
            default:
                return 'fa-user';
        }
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

                        {
                            authenticated && isAdmin() && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">
                                        Dashboard
                                    </Link>
                                </li>
                            )
                        }
                        
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

                        {/* Admin Panel - solo visible para admin */}
                        {/*isAdmin() && (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="adminDropdown" role="button" data-bs-toggle="dropdown">
                                    <i className="fas fa-cog me-1"></i>
                                    Admin Panel
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/admin/usuarios">
                                        <i className="fas fa-users me-2"></i>Gestionar Usuarios
                                    </Link></li>
                                    <li><Link className="dropdown-item" to="/admin/productos">
                                        <i className="fas fa-boxes me-2"></i>Gestionar Productos
                                    </Link></li>
                                    <li><Link className="dropdown-item" to="/admin/configuracion">
                                        <i className="fas fa-cogs me-2"></i>Configuración
                                    </Link></li>
                                </ul>
                            </li>
                        )*/}
                    </ul>

                    <ul className="navbar-nav">
                        {authenticated && user ? (
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className={`fas ${getRoleIcon(userRole)} me-1`}></i>
                                    <span>{user.paterno} {user.materno}, {user.nombre || "Usuario"}</span>
                                    {getRoleBadge(userRole)}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style={{ minWidth: "300px" }}>
                                    {/* Información del usuario */}
                                    <li className="dropdown-item-text">
                                        <small className="text-muted">
                                            <i className="fas fa-envelope me-1"></i>
                                            {user.email}
                                        </small>
                                    </li>
                                    <li className="dropdown-item-text">
                                        <small className="text-muted">
                                            <i className="fas fa-id-badge me-1"></i>
                                            Rol: <span className="fw-bold">{userRole}</span>
                                        </small>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    
                                    {/* Opciones según el rol */}
                                    {isAdmin() && (
                                        <>
                                            <li><Link className="dropdown-item" to="/admin">
                                                <i className="fas fa-users-cog me-2"></i>Admin Panel
                                            </Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                        </>
                                    )}
                                    
                                    <li><Link className="dropdown-item" to="/perfil">
                                        <i className="fas fa-user-edit me-2"></i>Mi Perfil
                                    </Link></li>
                                    <li><Link className="dropdown-item" to="/configuracion">
                                        <i className="fas fa-cog me-2"></i>Configuración
                                    </Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                                            <i className="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link btn btn-outline-light btn-sm ms-2" to="/login">
                                    <i className="fas fa-sign-in-alt me-1"></i> Iniciar Sesión
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;