import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './adminNavbar';
import '../../styles/Admin.css';

function AdminLayout() {
  return (
    <div className="admin-wrapper2">
      <AdminSidebar />
      <div className="admin-main">
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;