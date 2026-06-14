import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Bienvenido 👋</p>

            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
}

export default Dashboard;