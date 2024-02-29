import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const Grafica2 = () => {
  const registros = useSelector((state) => state.registros.registros);
  const alimentos = useSelector((state) => state.alimentos.alimentos);
  const hoy = new Date();

  if (!registros || registros.length === 0 || !alimentos) {
    return (<div className="card p-4">
      <p className="lead">No hay datos disponibles para el gráfico.</p>
    </div>);
  }
  const CaloriasXCantidad = (idAlimento, cantidad) => {
    const alimento = alimentos.find(a => a.id === idAlimento);
    const porcionStr = alimento.porcion
    const porcion = porcionStr.replace(/[^0-9]/g, '');

    const porcionNum = parseInt(porcion, 10);

    const retorno = (cantidad / porcionNum) * (alimento.calorias)
    return retorno

  }

  const fechasUltimos7Dias = Array.from({ length: 7 }, (_, index) => {
    const fec = new Date(hoy);
    fec.setDate(hoy.getDate() - index);

    const formattedDate = fec.toISOString().split('T')[0];

    return formattedDate;

  }).reverse();

  const datos = fechasUltimos7Dias.reduce((acumulador, fecha) => {

    const registrosComidas = registros.filter((registro) => {
      const registroDate = new Date(registro.fecha).toISOString().split('T')[0];
      return (
        (registroDate === fecha) ? registroDate : null
      );
    })

    const totCalorias = registrosComidas.reduce((acc, registro) => {
      const alimento = alimentos[registro.idAlimento - 1]

      acc += CaloriasXCantidad(alimento.id, registro.cantidad)

      return parseFloat(acc.toFixed(0))
    }, 0
    );

    acumulador[fecha] = totCalorias;
    return acumulador;
  }, {});

  const fechas = Object.keys(datos);
  const calorias = Object.values(datos);

  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: fechas,
    },

    yaxis: {
      title: {
        text: 'Calorías',
      },
    },
  };

  const series = [
    {
      name: 'Calorías',
      data: calorias,
    },
  ];

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">Consumo Calórico Diario</div>
        <div className="card-body">

          <ReactApexChart options={options} series={series} type="line" height={275} />
        </div>
      </div>
    </div>);
};

export default Grafica2;
