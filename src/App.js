import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React from 'react';
import RegistroUsuario from './components/RegistroUsuario';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Login from './components/Login';
import ObtenerRegistrosComidas from './components/ObtenerRegistros';
import RegistroComida from './components/RegistroComida';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/registroUsuario" element={<RegistroUsuario />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registrarComida" element={<RegistroComida />} />
          <Route path="/obtenerRegistrosComidas" element={<ObtenerRegistrosComidas />} />

        </Routes>
      </div>
    </Router>

  );
}

export default App;
