import React, { useEffect, useState } from 'react';
import { show_alert } from '../functions';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerAlimentos } from '../Store/ObtenerAlimentosSlice';
import { obtenerRegistrosComida } from '../Store/ObtenerRegistrosComidasSlice';
import { eliminarRegistro } from '../Store/EliminarRegistroSlice';
import Tabla from './Tabla';

const ObtenerRegistrosComidas = ({ nuevoRegistro }) => {
  const idUsuario = localStorage.getItem('idUsuario');
  const apiKey = localStorage.getItem('apiKey');

  const alimentos = useSelector((state) => state.alimentos);
  const registros = useSelector((state) => state.registros.registros);
  const eliminado = useSelector((state) => state.eliminarRegistro)
  const dispatch = useDispatch();
  const [filtroSelect, setFiltroSelect] = useState(0);
  const [lista, setLista] = useState([]);

  let credenciales = { apiKey, idUsuario };

  useEffect(() => {

    dispatch(obtenerAlimentos(credenciales));
    dispatch(obtenerRegistrosComida(credenciales));
    Filtro(filtroSelect)
  }, [eliminado, filtroSelect, nuevoRegistro]);
  console.log('lista', lista)

  const findAlimentoNameById = (id) => {
    const buscado = alimentos.alimentos.find(item => item.id === id);
    return buscado ? buscado.nombre : 'Nombre de Alimento N/A';
  };

  const handleEliminar = async (idRegistro) => {
    try {
      if (apiKey && idUsuario) {
        const credencialesEliminar = { apiKey, idUsuario, idRegistro };
        const result = await dispatch(eliminarRegistro(credencialesEliminar));

        if (result.payload.codigo) {
          show_alert(result.payload.mensaje, 'success');
        }
      }
    } catch (error) {
      show_alert('Error al eliminar el registro', error);
    }
  };



  const registrosUltimaSemana = async () => {
    const unaSemanaEnMS = 7 * 24 * 60 * 60 * 1000;
    const hoy = new Date();
    const registrosAux = await dispatch(obtenerRegistrosComida(credenciales))

    const registrosUltimaSemana = registrosAux.payload.filter(registro => {
      const fechaRegistro = new Date(registro.fecha);
      return (hoy - fechaRegistro) < unaSemanaEnMS;
    });
    setLista(registrosUltimaSemana);
  };

  const registrosUltimoMes = async () => {
    const registrosAux = await dispatch(obtenerRegistrosComida(credenciales))
    const hoy = new Date();
    const mesAnterior = new Date(hoy.getFullYear(), hoy.getMonth() - 1, hoy.getDate());
    const registrosUltimoMes = registrosAux.payload.filter(registro => {
      const fechaRegistro = new Date(registro.fecha);
      return fechaRegistro > mesAnterior;
    });
    setLista(registrosUltimoMes);
  };


  const Filtro = async (e) => {
    setFiltroSelect(e)
    if (e === '1') {
      registrosUltimoMes()
    } else if (e === '2') {
      registrosUltimaSemana()
    } else {
      const registrosAux = await dispatch(obtenerRegistrosComida(credenciales))
      
      setLista(registrosAux.payload)
    };
  }

  return (
    <div>
      <h6>
        {registros.loading ? "Cargando registros..." :
          <select name="filtro" id="filtro" onChange={(e) => Filtro(e.target.value)}>
            <option value="0">Registros historicos</option>
            <option value="1">Ultimo Mes</option>
            <option value="2">Ultima Semana</option>
          </select>
        }
      </h6>
      <Tabla filtro={Filtro} handleEliminar={handleEliminar} findAlimentoNameById={findAlimentoNameById} lista={lista}></Tabla>
    </div>
  );
};


export default ObtenerRegistrosComidas;