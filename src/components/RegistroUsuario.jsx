import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {userRegister} from '../Store/RegisterSlice';



const RegistroUsuario = () => {

  //Creamos los states que se usaran luego
  const [paises, setPaises] = useState([]);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [idPais, setIdPais] = useState('');
  const [calorias, setCalorias] = useState('');

  //Redux state
  const {loading, error} = useSelector((state)=> state.register);
  


  //Obtenemos paises para luego mostrar en el select (luego hay que cambiarlo a un componente de tipo Paises)
  const getPaises = async () => {
    const respuesta = await axios.get('https://calcount.develotion.com/paises.php');
    //Los seteamos para luego acceder a ellos llamando a paises.
    setPaises(respuesta.data.paises)
  }

  //Cremamos un useEffect Para cargar los paises cuando se recarga la pagina
  useEffect(() => {
    getPaises();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registrar = (e) => {
    e.preventDefault();

    let userRegisterCredenciales = {
      usuario, password, idPais, calorias
    };

    dispatch(userRegister(userRegisterCredenciales)).then((result) =>{
      if(result.payload){
        setUsuario('');
        setPassword('');
        setIdPais('');
        setCalorias('');
        navigate('/inicio')
      }
    })

  }


  return (
      <div className='container' style={{ maxWidth: '400px', margin: 'auto', background: '#100e10', color: '#fff', padding: '20px', borderRadius: '10px', marginTop: '50px' }}>
        <h1 className='text-center'>Registro Usuario</h1>
        {/* Llamamos a la funcion de registrarUsuario cuando se hace submit al formulario */}
        {/* En cada input cada vez que se escucha el evento onChange vamos seteandolo a sus states */}
        <form onSubmit={registrar}>
          <div className="mb-3">
            <label htmlFor="inputUsuario" className="form-label">Usuario</label>
            <input type="text" id="inputUsuario" className="form-control" placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Contraseña</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="*****" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="inputCalorias" className="form-label">Calorías Diarias</label>
            <input type="number" id="inputCalorias" className="form-control" placeholder="Calorias por dia" onChange={(e) => setCalorias(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="select" className="form-label">Pais</label>
            <select id="select" className="form-select" onChange={(e) => setIdPais(e.target.value)}>
              <option>Paises</option>
              {/* En este map lo que se hace es ir por cada pais e ir agregandolo a los options */}
              {
                paises.map(pais => (
                  <option key={pais.id} value={pais.id}>{pais.name}</option>
                ))
              }
            </select>
            <Link to='/login' style={{ color: 'white' }}>Ya estoy registrado</Link>
          </div>
          {/* Validamos que se puede submitear cuando se cumplan con los requisitos del disabled */}
          <button className="btn btn-success" type='submit' disabled={usuario.length < 5 || password.length < 5 || calorias <= 0 || idPais <= 0}>{loading?'Registrando...':'Registrar'}</button>
        </form>
        {error &&(
          <div className='alert alert-danger' style={{ marginTop: '20px'}} role='alert'>{error}</div>
        )}
      </div>
  )
}

export default RegistroUsuario;