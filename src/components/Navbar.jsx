import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CgLogIn } from "react-icons/cg";
import { CiHome } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Limpiar los datos de inicio de sesión almacenados
        localStorage.clear();
        navigate('/Login');
    };

    const iconStyle = {
        fontSize: '2.5rem',
        marginRight: '10px',
    };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to='/inicio'><CiHome style={iconStyle} />Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/dashboard'><CiCircleList style={iconStyle} />Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {localStorage.getItem('apiKey') ?
                    <>
                        <div>
                            <button onClick={handleLogout} className="btn btn-danger me-3">Logout</button>
                        </div>
                    </>
                    : <Link className="navbar-brand" to='/Login'><CgLogIn style={iconStyle} />Iniciar</Link>
                }


            </nav>
        </div>
    )
}

export default Navbar