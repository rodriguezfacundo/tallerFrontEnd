import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {show_alert} from '../functions';

const RegistroComida = () => {
    const [alimentos, setAlimentos] = useState([]);
    const [idUsuario, setIdUsuario] = useState('');
    const [idAlimento, setIdAlimento] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fecha, setFecha] = useState('');

    useEffect(() => {
        getAlimentos();
    }, [])

    const getAlimentos = async () =>{
        const respuesta = await axios.get('https://calcount.develotion.com/registros.php');
        console.log(respuesta.data.alimentos);
        setAlimentos(respuesta.data.paises);
    };
    
    const registrarComida = async (e) =>{
        e.preventDefault()
        
    };

  return (
    <div className='container' style={{ maxWidth: '400px', margin: 'auto', background: '#100e10', color: '#fff', padding: '20px', borderRadius: '10px', marginTop: '50px' }}>
      <h1 className='text-center'>Registro Usuario</h1>
      <form onSubmit={registrarComida}>
        <div className="mb-3">
                <label htmlFor ="select" className="form-label">Pais</label>
                <select id="select" className="form-select" onChange={(e) => setIdAlimento(e.target.value)}>
                <option>Alimentos</option>
                {
                    alimentos.map(alimento =>(
                    <option key={alimento.id} value={alimento.id}>{alimento.nombre}</option>
                    ))
                }
                </select>
            </div>
          <div className="mb-3">
            <label htmlFor ="inputCantidad" className="form-label">Cantidad</label>
            <input type="number" id="inputCantidad" className="form-control" placeholder="0" onChange={(e) => setCantidad(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor ="inputFecha" className="form-label">Fecha</label>
            <input type="date" id="inputFecha" className="form-control" placeholder="Calorias por dia" onChange={(e) => setFecha(e.target.value)}/>
          </div>
          {/* Validamos que se puede submitear cuando se cumplan con los requisitos del disabled */}
        <button className="btn btn-success" type='submit'>Registrar</button>
      </form>
    </div>
  )
}

export default RegistroComida