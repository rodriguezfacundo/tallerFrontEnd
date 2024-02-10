import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { show_alert } from '../functions';
import { BsTrash } from 'react-icons/bs';

const ObtenerRegistrosComidas = ({ reload }) => {
  const [listaDeComidas, setListaDeComidas] = useState([]);
  const [alimentos, setAlimentos] = useState([]);
  const idUsuario = localStorage.getItem('idUsuario');
  const apiKey = localStorage.getItem('apiKey');
  const headers = {
    'content-type': 'application/json',
    'apiKey': apiKey,
    'idUser': idUsuario,
  };

  const getAlimentosRegistrados = async () => {
    try {
      const respuesta = await axios.get(`https://calcount.develotion.com/registros.php?idUsuario=${idUsuario}`, {
        headers: headers,
      });
      console.log('respuesta', respuesta)
      setListaDeComidas(respuesta.data.registros);
    } catch (error) {
      console.error('Error fetching alimentos registrados:', error);
    }
  };

  const getAlimentos = async () => {
    try {
      if (apiKey !== '' && (idUsuario !== '' || idUsuario !== 0)) {
        const respuesta = await axios.get('https://calcount.develotion.com/alimentos.php', {
          headers: headers
        });
        console.log(respuesta.data.alimentos);
        if (respuesta.status === 200) {
          setAlimentos(respuesta.data.alimentos);
        }
      }
    } catch (error) {
      console.log('catch error', error)
    }
  }

  const findAlimentoNameById = (id) => {
    const buscado = alimentos.find(item => item.id === id);
    return buscado ? buscado.nombre : 'Nombre de Alimento N/A';
  };

  const handleEliminar = async (id) => {
    try {
      if (apiKey !== '' && (idUsuario !== '' || idUsuario !== 0)) {
        const respuesta = await axios.delete(`https://calcount.develotion.com/registros.php?idRegistro=${id}`, {
          headers: headers
        });
        if (respuesta.status === 200) {
          show_alert('Se ha Eliminado el registro', 'success');
          setListaDeComidas((prevLista) => prevLista.filter(item => item.id !== id));
        }
      }
    } catch (error) {
      console.log('catch error', error)
      show_alert('Error al eliminar el registro', 'error');
    }
  }

  useEffect(() => {
    if (reload) {
      console.log('valor de reload', reload);
    }
    getAlimentos()
    getAlimentosRegistrados();
  }, [reload]);

  return (
    <div>
      {listaDeComidas.length > 0 ? (
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
            {listaDeComidas.map((comidas, index) => (
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
