import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

    
        navigate("/");
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center">
            <div className="row w-100">
                {/* Lado izquierdo: Logotipo */}
                <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
                    <div className="text-center">
                        <img 
                            src={logo} 
                            alt="Tisko Solutions" 
                            className="img-fluid mb-4" 
                            style={{ maxWidth: "500px" }} 
                        />
                    </div>
                </div>

                {/* Lado derecho: Formulario de login */}
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
                        <h4 className="mb-4 text-center">Iniciar Sesión</h4>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label>Correo</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="ejemplo@email.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label>Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="********"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Ingresar
                            </button>
                        </form>

                        <div className="mt-3 text-center">
                            <small className="text-muted">
                                © 2026 TISKOSOLUTIONS S.R.L.
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;