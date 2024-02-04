import {BrowserRouter as Router, Switch, Route, BrowserRouter,Routes} from 'react-router-dom'
import React from 'react';
import RegistroUsuario from './components/RegistroUsuario';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';

function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/registroUsuario" element={<RegistroUsuario />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </div>
  </Router>
    
  );
}

export default App;
