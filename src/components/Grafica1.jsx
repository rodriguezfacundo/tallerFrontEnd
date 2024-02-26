import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const Grafica1 = () => {

  const alimentosReg = useSelector((state) => state.registros.registros);
  const alimentos = useSelector((state) => state.alimentos.alimentos);

  const callback = (acc, ali) => {
    if (acc[ali.idAlimento]) {
      acc[ali.idAlimento] = acc[ali.idAlimento] + 1;
    } else {
      acc[ali.idAlimento] = 1;
    }
    return acc
  }

  const datos = alimentosReg.reduce(callback, {})
  const ejey = Object.values(datos)
  const ejex = Object.keys(datos).map(idDato => {
    // eslint-disable-next-line eqeqeq
    const alimento = alimentos.find(a => a.id == idDato);
    return alimento ? alimento.nombre : '';
  });


  const options = {
    chart: {
      type: 'bar'
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
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  );
};

export default Grafica1;
