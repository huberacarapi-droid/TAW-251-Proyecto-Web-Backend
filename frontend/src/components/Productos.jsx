function Productos() {
    return (
        <div className="container mt-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold">Productos</h2>
                <p className="text-muted mx-auto" style={{ maxWidth: "720px" }}>
                    Descubre nuestras categorías de productos diseñadas para conectar, medir y automatizar procesos industriales.
                    Ofrecemos soluciones completas con hardware y software pensados para cada etapa de tu operación.
                </p>
            </div>

            <div className="row g-4">
                <div className="col-sm-6 col-xl-3">
                    <div className="card h-100 shadow-sm border-0 rounded-4">
                        <div className="card-body p-4">
                            <div className="mb-3 d-flex align-items-center justify-content-between">
                                <span className="badge bg-primary py-2 px-3 rounded-pill">Categoria</span>
                                <i className="fas fa-thermometer-half fa-2x text-primary"></i>
                            </div>
                            <h5 className="card-title fw-semibold">Sensores de temperatura y humedad</h5>
                            <p className="card-text text-secondary">
                                Lecturas precisas para ambientes críticos, con sensores robustos y calibrados para controlar condiciones de procesos y almacenes.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                    <div className="card h-100 shadow-sm border-0 rounded-4">
                        <div className="card-body p-4">
                            <div className="mb-3 d-flex align-items-center justify-content-between">
                                <span className="badge bg-success py-2 px-3 rounded-pill">Categoria</span>
                                <i className="fas fa-wifi fa-2x text-success"></i>
                            </div>
                            <h5 className="card-title fw-semibold">Equipos IoT</h5>
                            <p className="card-text text-secondary">
                                Dispositivos conectados listos para transmitir datos en tiempo real y permitir decisiones inteligentes en tu operación.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                    <div className="card h-100 shadow-sm border-0 rounded-4">
                        <div className="card-body p-4">
                            <div className="mb-3 d-flex align-items-center justify-content-between">
                                <span className="badge bg-warning text-dark py-2 px-3 rounded-pill">Categoria</span>
                                <i className="fas fa-chart-line fa-2x text-warning"></i>
                            </div>
                            <h5 className="card-title fw-semibold">Sistemas de monitoreo</h5>
                            <p className="card-text text-secondary">
                                Plataformas visuales y alertas automáticas para supervisar variables clave y evitar fallas antes de que ocurran.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                    <div className="card h-100 shadow-sm border-0 rounded-4">
                        <div className="card-body p-4">
                            <div className="mb-3 d-flex align-items-center justify-content-between">
                                <span className="badge bg-info text-dark py-2 px-3 rounded-pill">Categoria</span>
                                <i className="fas fa-industry fa-2x text-info"></i>
                            </div>
                            <h5 className="card-title fw-semibold">Instrumentación industrial</h5>
                            <p className="card-text text-secondary">
                                Equipos robustos para medición y control de presión, flujo, niveles y procesos industriales exigentes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Productos;