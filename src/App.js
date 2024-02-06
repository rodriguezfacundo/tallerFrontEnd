import {BrowserRouter as Router, Switch, Route, BrowserRouter,Routes} from 'react-router-dom'
import React from 'react';
import RegistroUsuario from './components/RegistroUsuario';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Login  from './components/Login';
import ObtenerRegistros from './components/ObtenerRegistros';
import RegistroComida from './components/RegistroComida';

function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/registroUsuario" element={<RegistroUsuario />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrarComida" element={<RegistroComida />} />
        <Route path="/obtenerRegistros" element={<ObtenerRegistros />} />


      </Routes>
    </div>
  </Router>
    
  );
}

export default App;
