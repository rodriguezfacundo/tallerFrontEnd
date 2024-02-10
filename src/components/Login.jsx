import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import {loginUser} from '../Store/UserSlice';

export const Login = () => {

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    //Redux state
    const {loading, error} = useSelector((state)=> state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const iniciarSesion = (e) => {
        e.preventDefault();

        let userCredenciales = {
          usuario, password
        };

        dispatch(loginUser(userCredenciales)).then((result) =>{
          if(result.payload){
            setUsuario('');
            setPassword('');
            navigate('/inicio')
          }
        })

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
        <button className="btn btn-success" type='submit' disabled={usuario.length<5 || password.length<5}>{loading? 'Iniciando sesion...': 'Iniciar Sesion'}</button>
      </form>
      {error &&(
          <div className='alert alert-danger' style={{ marginTop: '20px'}} role='alert'>{error}</div>
        )}
    </div>
  )
}

export default Login;
