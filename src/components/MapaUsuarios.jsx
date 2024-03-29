import React from 'react'
import Mapa from './Mapa'
import { useState, useEffect } from 'react';
import axios from 'axios';

const MapaUsuarios = () => {

  const [markersData, setMarkersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        'Content-Type': 'application/json',
        'apikey': localStorage.getItem('apiKey'),
        'iduser': localStorage.getItem('idUsuario')
      };

      try {
        const usuariosPorPaisResponse = await axios.get('https://calcount.develotion.com/usuariosPorPais.php', { headers });
        const paisesResponse = await axios.get('https://calcount.develotion.com/paises.php');

        const paises = paisesResponse.data.paises.map(pais => ({
          name: pais.name,
          latitude: pais.latitude,
          longitude: pais.longitude,
          cantidadDeUsuarios: 0
        }));

        const markersData = usuariosPorPaisResponse.data.paises.reduce((acc, pais) => {
          const paisIndex = paises.findIndex(p => p.name === pais.name);
          if (paisIndex > -1) {
            paises[paisIndex].cantidadDeUsuarios = pais.cantidadDeUsuarios;
            acc.push(paises[paisIndex]);
          }
          return acc;
        }, []);
        setMarkersData(markersData);
        console.log('datos a usar en el mapa', markersData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <div className="container">
        <div className="card">
          <div className='card-header'>Cantidad de Usuarios</div>
          <Mapa markersData={markersData} />
        </div>
      </div>
    </>
  )
}

export default MapaUsuarios
