import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { show_alert } from '../functions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {comidaRegister} from '../Store/RegisterComidaSlice';
import {obtenerAlimentos} from '../Store/ObtenerAlimentosSlice';
import { obtenerRegistrosComida } from '../Store/ObtenerRegistrosComidasSlice';


const RegistroComida = ({ nuevoRegistro }) => {
  const apiKey = localStorage.getItem('apiKey');
  const idUsuario = localStorage.getItem('idUsuario');


  const {loading, error} = useSelector((state)=> state.registerComida);
  const alimentos = useSelector((state) => state.alimentos);

  const [idAlimento, setIdAlimento] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();


  //Funcion que valida que la fecha ingresada sea HOY, o un dia antes que HOY
  const validarFecha = () => {
    let isValid = false;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    console.log('hoy', hoy);

    const fechaIngresada = new Date(fecha);
    fechaIngresada.setHours(0, 0, 0, 0);
    fechaIngresada.setDate(fechaIngresada.getDate() + 1);
    console.log('fechaIngresada', fechaIngresada)

    const fechaAnterior = new Date(hoy);
    fechaAnterior.setDate(hoy.getDate() - 1);
    console.log('ayer', fechaAnterior)

    if (fechaIngresada.getDate() === hoy.getDate() || fechaIngresada.getDate() === fechaAnterior.getDate()) {
      isValid = true;
    }
    return isValid;
  };

  //Funcion que valida que este logueado el usuario al entrar a la pagina, en caso de que no se avisa y dirije al registro
  const validarLogin = (apiKeyParam) => {
    if (apiKeyParam === null) {
      show_alert('Debes iniciar sesión', 'warning');
      navigate('/registroUsuario');
      return false;
    }
    return true;
  };

  useEffect(() => {
    const isValid = validarLogin(apiKey);
    if (isValid) {
      let credenciales = {apiKey, idUsuario}
      dispatch(obtenerAlimentos(credenciales));
    }
  }, [apiKey, idUsuario]);


  const registrarComida = async (e) => {
    e.preventDefault()

    if (!validarFecha()) {
      show_alert('La fecha debe ser hoy o anterior.', 'warning');
      return
    }

    let credenciales = {idAlimento, idUsuario, cantidad, fecha,apiKey };
    console.log('credenciales antes de dispatch', credenciales);
    dispatch(comidaRegister(credenciales)).then((result) =>{
      if(result.payload){
        setCantidad('');
        setFecha('');
        setIdAlimento('');
        show_alert('Comida registrada con exito', 'success')
        dispatch(obtenerRegistrosComida(credenciales));
        
      }
    })
  };

  return (
    <>
      <div className='container' style={{ maxWidth: '400px', margin: 'auto', background: '#100e10', color: '#fff', padding: '20px', borderRadius: '10px', marginTop: '50px' }}>
        <h1 className='text-center'>Registrar Comida</h1>
        <form onSubmit={registrarComida}>
          <div className="mb-3">
            <label htmlFor="select" className="form-label">Pais</label>
            <select id="select" className="form-select" onChange={(e) => setIdAlimento(e.target.value)}>
              <option value={0}>{alimentos.loading ? 'Cargando alimentos...' : 'Seleccione un Alimento'}</option>
              {
                alimentos.alimentos.map(alimento => (
                  <option key={alimento.id} value={alimento.id}>{alimento.nombre}</option>
                ))
              }
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="inputCantidad" className="form-label">Cantidad</label>
            <input type="number" id="inputCantidad" className="form-control" placeholder="0" onChange={(e) => setCantidad(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="inputFecha" className="form-label">Fecha</label>
            <input type="date" id="inputFecha" className="form-control" placeholder="Calorias por dia" onChange={(e) => setFecha(e.target.value)} />
          </div>
          {/* Validamos que se puede submitear cuando se cumplan con los requisitos del disabled */}
          <button className="btn btn-success" disabled={idAlimento<=0 || cantidad<=0} type='submit'>{loading?'Registrando comida...': 'Registrar comida'}</button>
        </form>
        {error &&(
          <div className='alert alert-danger' style={{ marginTop: '20px'}} role='alert'>{error}</div>
        )}
      </div>

    </>
  )
}

export default RegistroComida