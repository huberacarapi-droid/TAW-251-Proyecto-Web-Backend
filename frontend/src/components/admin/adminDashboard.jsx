// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/adminServices';
import '../../styles/Admin.css';

function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    users: 0,
    admins: 0,
    totalStock: 0,
    totalValue: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadDashboardData();
    // Actualizar reloj cada minuto
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [categories, products, users] = await Promise.all([
        api.getCategories(),
        api.getProducts(),
        api.getUsers()
      ]);

      // Calcular estadísticas avanzadas
      const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
      const totalValue = products.reduce((sum, p) => sum + (parseFloat(p.precio) * (p.stock || 0)), 0);
      const admins = users.filter(u => u.rol === 'admin').length;

      setStats({
        categories: categories.length,
        products: products.length,
        users: users.length,
        admins: admins,
        totalStock: totalStock,
        totalValue: totalValue
      });

      // Obtener productos recientes (últimos 5)
      const sortedProducts = [...products].sort((a, b) => 
        new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setRecentProducts(sortedProducts.slice(0, 5));

      // Obtener usuarios recientes (últimos 5)
      const sortedUsers = [...users].sort((a, b) => 
        new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
      );
      setRecentUsers(sortedUsers.slice(0, 5));

      setError(null);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setError('Error al cargar los datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRolBadge = (rol) => {
    const roles = {
      admin: { color: 'danger', icon: 'fa-user-shield' },
      user: { color: 'primary', icon: 'fa-user' },
      guest: { color: 'secondary', icon: 'fa-user-clock' }
    };
    const rolInfo = roles[rol] || roles.guest;
    return (
      <span className={`badge bg-${rolInfo.color}`}>
        <i className={`fas ${rolInfo.icon} me-1`}></i>
        {rol}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando dashboard...</span>
        </div>
        <p className="mt-3 text-muted">Cargando estadísticas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error}
        <button className="btn btn-link" onClick={loadDashboardData}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header con saludo y fecha */}
      <div className="dashboard-header">
        <div>
          <h2 className="fw-bold mb-1">Dashboard</h2>
          <p className="text-muted">
            <i className="far fa-calendar-alt me-2"></i>
            {currentTime.toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div>
          <button 
            className="btn btn-outline-secondary me-2"
            onClick={loadDashboardData}
          >
            <i className="fas fa-sync-alt me-1"></i>
            Actualizar
          </button>
          <span className="text-muted">
            <i className="far fa-clock me-1"></i>
            {currentTime.toLocaleTimeString('es-ES')}
          </span>
        </div>
      </div>

      {/* Tarjetas de estadísticas principales */}
      <div className="row g-4 mb-4">
        <div className="col-xl-3 col-lg-6 col-md-6">
          <div className="dashboard-card stat-card-primary">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="card-label">Productos</div>
                  <div className="card-number">{stats.products}</div>
                </div>
                <div className="card-icon-wrapper">
                  <i className="fas fa-box"></i>
                </div>
              </div>
              <div className="card-footer-link">
                <Link to="/admin/productos" className="stretched-link">
                  Ver todos <i className="fas fa-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6 col-md-6">
          <div className="dashboard-card stat-card-success">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="card-label">Categorías</div>
                  <div className="card-number">{stats.categories}</div>
                </div>
                <div className="card-icon-wrapper">
                  <i className="fas fa-tags"></i>
                </div>
              </div>
              <div className="card-footer-link">
                <Link to="/admin/categorias" className="stretched-link">
                  Ver todas <i className="fas fa-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6 col-md-6">
          <div className="dashboard-card stat-card-info">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="card-label">Usuarios</div>
                  <div className="card-number">{stats.users}</div>
                  <small className="text-muted">
                    <i className="fas fa-user-shield me-1"></i>
                    {stats.admins} admin
                  </small>
                </div>
                <div className="card-icon-wrapper">
                  <i className="fas fa-users"></i>
                </div>
              </div>
              <div className="card-footer-link">
                <Link to="/admin/usuarios" className="stretched-link">
                  Ver todos <i className="fas fa-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6 col-md-6">
          <div className="dashboard-card stat-card-warning">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="card-label">Valor del Inventario</div>
                  <div className="card-number text-success">
                    ${stats.totalValue.toFixed(2)}
                  </div>
                  <small className="text-muted">
                    <i className="fas fa-boxes me-1"></i>
                    {stats.totalStock} unidades
                  </small>
                </div>
                <div className="card-icon-wrapper">
                  <i className="fas fa-chart-line"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actividad Reciente */}
      <div className="row g-4">
        {/* Productos recientes */}
        <div className="col-lg-6">
          <div className="dashboard-card">
            <div className="card-header-custom">
              <h5 className="mb-0">
                <i className="fas fa-box me-2 text-primary"></i>
                Productos Recientes
              </h5>
              <Link to="/admin/productos" className="btn btn-sm btn-outline-primary">
                Ver todos
              </Link>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {recentProducts.length === 0 ? (
                  <div className="list-group-item text-center text-muted py-4">
                    <i className="fas fa-inbox fa-2x d-block mb-2"></i>
                    No hay productos registrados
                  </div>
                ) : (
                  recentProducts.map(product => (
                    <div key={product.id} className="list-group-item recent-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          {product.images && product.images.length > 0 ? (
                            <img 
                              src={product.images[0].url} 
                              alt={product.nombre}
                              className="recent-thumbnail"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/40';
                              }}
                            />
                          ) : (
                            <div className="recent-thumbnail placeholder-bg">
                              <i className="fas fa-image text-muted"></i>
                            </div>
                          )}
                          <div className="ms-3">
                            <div className="fw-semibold">{product.nombre}</div>
                            <small className="text-muted">
                              {product.category?.nombre || 'Sin categoría'}
                            </small>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold text-primary">${product.precio}</div>
                          <small className="text-muted">
                            Stock: {product.stock}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Usuarios recientes */}
        <div className="col-lg-6">
          <div className="dashboard-card">
            <div className="card-header-custom">
              <h5 className="mb-0">
                <i className="fas fa-users me-2 text-info"></i>
                Usuarios Recientes
              </h5>
              <Link to="/admin/usuarios" className="btn btn-sm btn-outline-primary">
                Ver todos
              </Link>
            </div>
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {recentUsers.length === 0 ? (
                  <div className="list-group-item text-center text-muted py-4">
                    <i className="fas fa-inbox fa-2x d-block mb-2"></i>
                    No hay usuarios registrados
                  </div>
                ) : (
                  recentUsers.map(user => (
                    <div key={user.id} className="list-group-item recent-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="recent-avatar">
                            <i className="fas fa-user-circle fa-2x text-secondary"></i>
                          </div>
                          <div className="ms-3">
                            <div className="fw-semibold">
                              {user.nombre} {user.paterno}
                            </div>
                            <small className="text-muted d-block">
                              {user.email}
                            </small>
                          </div>
                        </div>
                        <div className="text-end">
                          {getRolBadge(user.rol)}
                          <div>
                            <small className="text-muted">
                              {formatDate(user.updatedAt || user.createdAt)}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="dashboard-card">
            <h5 className="mb-3">
              <i className="fas fa-bolt me-2 text-warning"></i>
              Acciones Rápidas
            </h5>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/admin/productos" className="btn btn-outline-primary">
                <i className="fas fa-plus me-1"></i>
                Nuevo Producto
              </Link>
              <Link to="/admin/categorias" className="btn btn-outline-success">
                <i className="fas fa-plus me-1"></i>
                Nueva Categoría
              </Link>
              <Link to="/admin/usuarios" className="btn btn-outline-info">
                <i className="fas fa-user-plus me-1"></i>
                Nuevo Usuario
              </Link>
              <Link to="/productos" className="btn btn-outline-secondary">
                <i className="fas fa-store me-1"></i>
                Ver Tienda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;