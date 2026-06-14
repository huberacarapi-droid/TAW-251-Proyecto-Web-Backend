import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Soluciones from "./components/Soluciones";
import Servicios from "./components/Servicios";
import Productos from "./components/Productos";
import About from "./components/About";
import Home from "./components/Home";

import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>      

        {/* Login sin navbar */}
        <Route path="/login" element={<Login />} />

        {/* Rutas con navbar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/soluciones" element={<Soluciones />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;