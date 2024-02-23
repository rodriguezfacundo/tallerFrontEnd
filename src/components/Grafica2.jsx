import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const Grafica2 = () => {

  const alimentosReg = useSelector((state) => state.registros.registros);
  const alimentos = useSelector((state) => state.alimentos.alimentos);

  const callback = (acc, ali) => {
    if (acc[ali.fecha]) {
      acc[ali.fecha] += alimentos[ali.idAlimento].calorias;
    } else {
      acc[ali.fecha] = alimentos[ali.idAlimento].calorias;
    }
    return acc
  }
  const datos = alimentosReg.reduce(callback, {})
  const ejey = Object.values(datos)
  const ejex = Object.keys(datos)


  const options = {
    chart: {
      type: 'line'
    },
    xaxis: {
      categories: ejex
    }
  };

  const series = [{
    name: 'Series 1',
    data: ejey
  }];

  return (
    <ReactApexChart options={options} series={series} type="line" height={350} />
  );
};

export default Grafica2;
