import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {show_alert} from '../functions';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const iniciarSesion = async (e) => {
        e.preventDefault();

        try{
            const respuesta = await axios.post('https://calcount.develotion.com/login.php', {
                usuario,
                password
            },{ timeout: 20000 });
            console.log(respuesta.data);
            if(respuesta.status === 200){
                localStorage.setItem('apiKey', respuesta.data.apiKey);
                localStorage.setItem('idUsuario', respuesta.data.id);
                show_alert('Bienvenido nuevamente!', 'success')
                setRedirect(true);
            }
        } catch(error){
          if(error.response && error.response.status === 409){
            show_alert('Usuario o password incorrecta', 'warning');
            
          }else {
            show_alert('Error al iniciar sesion. Inténtelo de nuevo más tarde.', 'warning');
            console.log(error);
          }
            }
    }

    //Condicional para luego de logueado llevar al usuario al inicio
    if (redirect) {
        return navigate("/inicio");
    }

  return (
    <div className='container' style={{ maxWidth: '400px', margin: 'auto', background: '#100e10', color: '#fff', padding: '20px', borderRadius: '10px', marginTop: '50px' }}>
      <h1 className='text-center'>Iniciar Sesión</h1>
      <form onSubmit={iniciarSesion}>
          <div className="mb-3">
            <label htmlFor ="inputUsuario" className="form-label">Usuario</label>
            <input type="text" id="inputUsuario" className="form-control" placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor ="inputPassword" className="form-label">Contraseña</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="*****" onChange={(e) => setPassword(e.target.value)}/>
          </div>
        <button className="btn btn-success" type='submit' disabled={usuario.length<5 || password.length<5}>Enviar</button>
      </form>
    </div>
  )
}

export default Login;
