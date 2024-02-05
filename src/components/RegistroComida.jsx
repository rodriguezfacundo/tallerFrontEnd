import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {show_alert} from '../functions';

    const RegistroComida = () => {
      const apiKey = localStorage.getItem('apiKey');
      const idUsuario = localStorage.getItem('idUsuario');
      
      const [alimentos, setAlimentos] = useState([]);
      const [idAlimento, setIdAlimento] = useState('');
      const [cantidad, setCantidad] = useState('');
      const [fecha, setFecha] = useState('');

      const getAlimentos = async () =>{
        try{
          if(apiKey !== '' && (idUsuario !== '' || idUsuario !== 0)){
            console.log('entro al get Alimentos');
            console.log('apiKey antes de hacer la llamada get a alimentos', apiKey);
            console.log('userId antes de hacer la llamada get a alimentos', idUsuario);
            
            const respuesta = await axios.get('https://calcount.develotion.com/alimentos.php', {
              headers: {
                'Content-Type': 'application/json',
                'apikey' : apiKey,
                'idUser': idUsuario
              }
            });
            console.log(respuesta.data.alimentos);
            if(respuesta.status === 200){
              setAlimentos(respuesta.data.alimentos);
            }
          }
        } catch(error){
          console.log('catch error',error)
        }
      }

      useEffect(() =>{
        getAlimentos();
      }, []);

      

    
    const registrarComida = async (e) =>{
        e.preventDefault()
        
        try {
          if(apiKey !== '' && (idUsuario !== '' || idUsuario !== 0)){
            const respuesta = await axios.post('https://calcount.develotion.com/registros.php',{
              headers:{
                'Content-Type': 'application/json',
                'apikey' : apiKey,
                'idUser': idUsuario
              },
              body:{
                idAlimento,
                idUsuario,
                cantidad,
                fecha
              }
            })
            console.log(respuesta.data);
            if(respuesta.status === 200){
              show_alert('Tu nuevo registro se ha realizado con éxito', 'success');
            }
          }
        } catch (error) {
            console.log('error en post de registro alimento', error);
        }
    };

  return (
    <div className='container' style={{ maxWidth: '400px', margin: 'auto', background: '#100e10', color: '#fff', padding: '20px', borderRadius: '10px', marginTop: '50px' }}>
      <h1 className='text-center'>Registrar Comida</h1>
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