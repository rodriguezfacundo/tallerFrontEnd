import React, { useEffect, useState } from 'react';
import { show_alert } from '../functions';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {obtenerAlimentos} from '../Store/ObtenerAlimentosSlice';
import { obtenerRegistrosComida } from '../Store/ObtenerRegistrosComidasSlice';
import { eliminarRegistro } from '../Store/EliminarRegistroSlice';
import { useNavigate } from 'react-router-dom';




const ObtenerRegistrosComidas = ({ reload }) => {
  const idUsuario = localStorage.getItem('idUsuario');
  const apiKey = localStorage.getItem('apiKey');


  const alimentos = useSelector((state) => state.alimentos);
  const registros = useSelector((state) => state.registros);
  const eliminado = useSelector((state) => state.eliminarRegistro)
  const dispatch = useDispatch();

  let imgComida = "https://calcount.develotion.com/imgs/"

  let credenciales = {apiKey, idUsuario};

  const findAlimentoNameById = (id) => {
    const buscado = alimentos.alimentos.find(item => item.id === id);
    return buscado ? buscado.nombre : 'Nombre de Alimento N/A';
  };

  const handleEliminar = async (idRegistro) => {
    try {
      if (apiKey !== '' && (idUsuario !== '' || idUsuario !== 0)) {
        const credencialesEliminar = {apiKey, idUsuario, idRegistro}
        dispatch(eliminarRegistro(credencialesEliminar)).then((result) =>{
          if(result.payload.codigo){
            show_alert(result.payload.mensaje, 'success');
            dispatch(obtenerRegistrosComida(credenciales));
          }
        })
      }
    } catch (error) {
      show_alert('Error al eliminar el registro', 'error');
    }
  }

  useEffect(() => {
    dispatch(obtenerAlimentos(credenciales));
    dispatch(obtenerRegistrosComida(credenciales));
  }, []);

  return (
    <div>
      <h4>{registros.loading ? "Cargando registros... " : 'Registros'}</h4>
      {registros.registros.length > 0 ? (
        <table className="table table-dark rounded">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">#</th>
              <th scope="col">Alimento</th>
              <th scope="col">Cant</th>
              <th scope="col">Fecha</th>
              <th scope="col">Eliminar</th>

            </tr>
          </thead>
          <tbody>
            {registros.registros.map((registro, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td><img src={imgComida + registro.idAlimento + '.png'} alt="Icono comida" /></td>
                <td>{findAlimentoNameById(registro.idAlimento)}</td>
                <td>{registro.cantidad}</td>
                <td>{registro.fecha}</td>
                <td>
                  {
                      eliminado.loading ? 'Eliminando...' : 
                      <button className="btn btn-danger" onClick={() => handleEliminar(registro.id)}><BsTrash /></button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay alimentos registrados.</p>
      )}
    </div>
  );
};


export default ObtenerRegistrosComidas;
