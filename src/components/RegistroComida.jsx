import React, { useEffect, useState } from 'react';
import { show_alert } from '../functions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { comidaRegister } from '../Store/RegisterComidaSlice';
import { obtenerAlimentos } from '../Store/ObtenerAlimentosSlice';
import { obtenerRegistrosComida } from '../Store/ObtenerRegistrosComidasSlice';


const RegistroComida = ({ nuevoRegistro }) => {
  const apiKey = localStorage.getItem('apiKey');
  const idUsuario = localStorage.getItem('idUsuario');


  const { loading, error } = useSelector((state) => state.registerComida);
  const alimentos = useSelector((state) => state.alimentos.alimentos);
  const [idAlimento, setIdAlimento] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [unidad, setUnidad] = useState('')
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
      let credenciales = { apiKey, idUsuario }
      dispatch(obtenerAlimentos(credenciales));
    }
  }, [apiKey, idUsuario]);

  const PorcionCantidad = (idAlimento, cantidad) => {
    const alimento = alimentos.find(a => a.id == idAlimento);
    const porcion = alimento.porcion
    const soloNumeros = porcion.replace(/[^0-9]/g, '');
    const valorNumerico = parseInt(soloNumeros, 10);
    return (cantidad / valorNumerico)
  }

  const handleChangeAlimento = (e) => {
    const alimento = alimentos.find(a => a.id === parseInt(e))
    const unidadAux = (alimento !== undefined) ? alimento.porcion.slice(-1) : '';
    const unidadFinal = (unidadAux === 'g') ? 'gramos' : (unidadAux === 'm') ? 'mililitros' : (unidadAux === 'u') ? 'unidad' : '';
    setUnidad(unidadFinal)
    setIdAlimento(e)
  }

  const registrarComida = async (e) => {
    e.preventDefault()

    if (!validarFecha()) {
      show_alert('La fecha debe ser hoy o anterior.', 'warning');
      return
    }

    PorcionCantidad(idAlimento, cantidad)

    let credenciales = { idAlimento, idUsuario, cantidad, fecha, apiKey };
    credenciales.cantidad = PorcionCantidad(idAlimento, cantidad) //se transforman las cantidades en porciones

    dispatch(comidaRegister(credenciales)).then((result) => {
      if (result.payload) {
        e.target.reset();
        setCantidad('');
        setFecha('');
        setIdAlimento('');
        nuevoRegistro();
        show_alert('Comida registrada con exito', 'success')
        dispatch(obtenerRegistrosComida(credenciales));
      }

    })
  };

  return (
    <>
      <div className="container mt-1">
        <div className="card" style={{ maxWidth: '400px', margin: 'auto', borderRadius: '10px' }}>
          <div className="card-body">
            <h4 className="card-title text-center">Registrar Comida</h4>
            <form onSubmit={registrarComida}>
              <div className="mb-3">
                <label htmlFor="select" className="form-label">Pais</label>
                <select id="select" className="form-select" onChange={({ target: { value } }) => handleChangeAlimento(value)}>
                  <option value={0}>{alimentos.loading ? 'Cargando alimentos...' : 'Seleccione un Alimento'}</option>
                  {alimentos.map(alimento => (
                    <option key={alimento.id} value={alimento.id}>{alimento.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="inputCantidad" className="form-label">Cantidad</label>
                <div className="input-group">
                  <input type="number" id="inputCantidad" className="form-control" placeholder="0" value={cantidad} onChange={({ target: { value } }) => setCantidad(value)} />
                  <input className="form-control" value={unidad} readOnly />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="inputFecha" className="form-label">Fecha</label>
                <input type="date" id="inputFecha" className="form-control" placeholder="Calorias por dia" onChange={({ target: { value } }) => setFecha(value)} />
              </div>
              <button className="btn btn-success" disabled={idAlimento <= 0 || cantidad <= 0} type="submit">
                {loading ? 'Registrando comida...' : 'Registrar comida'}
              </button>
            </form>
            {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default RegistroComida