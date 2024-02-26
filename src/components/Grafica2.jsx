import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const Grafica2 = () => {
  const registros = useSelector((state) => state.registros.registros);
  const alimentos = useSelector((state) => state.alimentos.alimentos);
  const hoy = new Date();

  if (!registros || registros.length === 0 || !alimentos) {
    return <p>No hay datos disponibles para el gráfico.</p>;
  }

  const fechasUltimos7Dias = Array.from({ length: 7 }, (_, index) => {
    const ahora = new Date(hoy);
    ahora.setDate(hoy.getDate() - index);
    const formattedDate = ahora.toISOString().split('T')[0];
    return formattedDate;
  }).reverse();

  const datos = fechasUltimos7Dias.reduce((acumulador, fecha) => {

    const registrosComidas = registros.filter((registro) => {
      const registroDate = new Date(registro.fecha).toISOString().split('T')[0];
      return (
        (registroDate === fecha) ? registroDate : null
      );
    })

    console.log('registrosComidas', registrosComidas)

    const totCalorias = registrosComidas.reduce((acc, registro) => {

      const sum = acc + (alimentos[registro.idAlimento - 1]?.calorias || 0) * registro.cantidad;

      return sum
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
    title: {
      text: 'Consumo Calórico Diario',
      align: 'center',
      style: {
        fontSize: '18px',
      },
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

  return <ReactApexChart options={options} series={series} type="line" height={350} />;
};

export default Grafica2;
