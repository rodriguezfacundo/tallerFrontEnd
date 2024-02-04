import React from 'react'
import {Link} from 'react-router-dom'
import { CgLogIn } from "react-icons/cg";
import { CiHome } from "react-icons/ci";
import { MdFastfood } from "react-icons/md";

const Navbar = () => {

    const iconStyle = {
        fontSize: '2.5rem',
        marginRight: '10px',
      };
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/registroUsuario'><CgLogIn style={iconStyle}/></Link>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to='/inicio'><CiHome style={iconStyle}/></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/registrarComida'><MdFastfood style={iconStyle}/></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar