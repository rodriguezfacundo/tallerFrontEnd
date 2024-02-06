import React from 'react'
import {Link} from 'react-router-dom'
import { CgLogIn } from "react-icons/cg";
import { CiHome } from "react-icons/ci";
import { MdFastfood } from "react-icons/md";
import { CiCircleList } from "react-icons/ci";

const Navbar = () => {

    const apiKey = localStorage.getItem('apiKey');

    const iconStyle = {
        fontSize: '2.5rem',
        marginRight: '10px',
      };
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/registroUsuario'><CgLogIn style={iconStyle}/>Iniciar</Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to='/inicio'><CiHome style={iconStyle}/>Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/registrarComida'><MdFastfood style={iconStyle}/>Registrar Comida</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/obtenerRegistros'><CiCircleList style={iconStyle}/>Listar Registros</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar