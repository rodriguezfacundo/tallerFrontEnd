import React, { useState } from 'react';
import {useSelector } from 'react-redux';


const RegistrosPorFiltros = () => {
    const registros = useSelector((state) => state.registros.registros);
    const alimentos = useSelector((state) => state.alimentos.alimentos);
    const [registrosFiltrados, setRegistrosFiltrados] = useState([]);

    let imgComida = "https://calcount.develotion.com/imgs/"

    const registrosUltimaSemana = () => {
        const unaSemanaEnMS = 7 * 24 * 60 * 60 * 1000;
        const hoy = new Date();
        const registrosUltimaSemana = registros.filter(registro => {
            const fechaRegistro = new Date(registro.fecha);
            return (hoy - fechaRegistro) < unaSemanaEnMS;
        });
        console.log("Registros de la última semana:", registrosUltimaSemana);
        setRegistrosFiltrados(registrosUltimaSemana);
    };

    const registrosUltimoMes = () => {
        const hoy = new Date();
        const mesAnterior = new Date(hoy.getFullYear(), hoy.getMonth() - 1, hoy.getDate());
        const registrosUltimoMes = registros.filter(registro => {
            const fechaRegistro = new Date(registro.fecha);
            return fechaRegistro > mesAnterior;
        });
        console.log("Registros del último mes:", registrosUltimoMes);
        setRegistrosFiltrados(registrosUltimoMes);
    };

    const registrosHistoricos = () => {
        console.log("Registros históricos:", registros);
        setRegistrosFiltrados(registros);
    };

    const findAlimentoNameById = (id) => {
        const buscado = alimentos.find(item => item.id === id);
        return buscado ? buscado.nombre : 'Nombre de Alimento N/A';
      };



  return (
    <div>
        <button className="btn btn-info" onClick={() => registrosUltimaSemana()} style={{margin:'5px'}}>Ultima Semana</button>
        <button className='btn btn-success' onClick={() => registrosUltimoMes()} style={{margin:'5px'}}>Ultimo Mes</button>
        <button className='btn btn-warning'  onClick={() => registrosHistoricos()} style={{margin:'5px'}}>Historico</button>
        {registrosFiltrados.length > 0 && (
            <table className="table table-dark rounded">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">#</th>
                        <th scope="col">Alimento</th>
                        <th scope="col">Cant</th>
                        <th scope="col">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {registrosFiltrados.map((registro, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                                <td><img src={imgComida + registro.idAlimento + '.png'} alt="Icono comida" /></td>
                                <td>{findAlimentoNameById(registro.idAlimento)}</td>
                                <td>{registro.cantidad}</td>
                                <td>{registro.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
    </div>
  )
}

export default RegistrosPorFiltros