import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { show_alert } from '../functions';
import { BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {obtenerAlimentos} from '../Store/ObtenerAlimentosSlice';
import { obtenerRegistrosComida } from '../Store/ObtenerRegistrosComidasSlice';



const ObtenerRegistrosComidas = ({ reload }) => {
  //const [listaDeComidas, setListaDeComidas] = useState([]);
  //const [alimentos, setAlimentos] = useState([]);
  const idUsuario = localStorage.getItem('idUsuario');
  const apiKey = localStorage.getItem('apiKey');

  const alimentos = useSelector((state) => state.alimentos);
  const registros = useSelector((state) => state.registros);
  const dispatch = useDispatch();

  let credenciales = {apiKey, idUsuario};

  const findAlimentoNameById = (id) => {
    const buscado = alimentos.alimentos.find(item => item.id === id);
    return buscado ? buscado.nombre : 'Nombre de Alimento N/A';
  };

  const handleEliminar = async (id) => {
    try {
      if (apiKey !== '' && (idUsuario !== '' || idUsuario !== 0)) {
        const respuesta = await axios.delete(`https://calcount.develotion.com/registros.php?idRegistro=${id}`, {
          headers: {
              'Content-Type': 'application/json',
                'apikey': credenciales.apiKey,
                'iduser': credenciales.idUsuario,
          }
        });
        if (respuesta.status === 200) {
          show_alert('Se ha Eliminado el registro', 'success');
        }
      }
    } catch (error) {
      //console.log('catch error', error)
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
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Alimento</th>
              <th scope="col">Cant</th>
              <th scope="col">Fecha</th>
              <th scope="col">Eliminar</th>

            </tr>
          </thead>
          <tbody>
            {registros.registros.map((comidas, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{findAlimentoNameById(comidas.idAlimento)}</td>
                <td>{comidas.cantidad}</td>
                <td>{comidas.fecha}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleEliminar(comidas.id)}
                  >
                    <BsTrash />
                  </button>
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
