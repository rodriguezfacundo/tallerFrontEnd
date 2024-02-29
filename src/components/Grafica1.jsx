import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const Grafica1 = () => {

  const alimentosReg = useSelector((state) => state.registros.registros);
  const alimentos = useSelector((state) => state.alimentos.alimentos);

  if (!alimentosReg || alimentosReg.length === 0 || !alimentosReg) {
    return (<div className="card p-4">
      <p className="lead">No hay datos disponibles para el gráfico.</p>
    </div>);
  }


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
    const alimento = alimentos.find(a => a.id === parseInt(idDato));
    return alimento ? alimento.nombre : '';
  });


  const options = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
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
    <div className="container">
      <div className="card">
        <div className="card-header">Gráf cantidad de Alimentos</div>
        <div className="card-body">
          <ReactApexChart options={options} series={series} type="bar" height={275} />
        </div>
      </div>
    </div>
  );
};

export default Grafica1;