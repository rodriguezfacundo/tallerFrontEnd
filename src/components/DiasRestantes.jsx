import React, { useState, useEffect } from 'react';

const DiasRestantes = () => {
  const [tiempoRestante, setTiempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  });

  const calcularTiempoRestante = () => {
    const deadline = new Date('2024-03-31T23:59:59');
    const now = new Date();

    const diferenciaEnMs = deadline - now;

    const diasRestantes = Math.floor(diferenciaEnMs / (1000 * 60 * 60 * 24));
    const horasRestantes = Math.floor((diferenciaEnMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutosRestantes = Math.floor((diferenciaEnMs % (1000 * 60 * 60)) / (1000 * 60));
    const segundosRestantes = Math.floor((diferenciaEnMs % (1000 * 60)) / 1000);

    return {
      dias: diasRestantes,
      horas: horasRestantes,
      minutos: minutosRestantes,
      segundos: segundosRestantes
    };
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const tiempo = calcularTiempoRestante();
      setTiempoRestante(tiempo);
      //console.log('Dias restantes:', tiempo);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="card" style={{ maxWidth: '300px' }}>
      <div className="card-body">
        <h6 className="card-title">Tiempo Restante</h6>
        <p className="card-text">{tiempoRestante.dias} días, {tiempoRestante.horas} horas, {tiempoRestante.minutos} minutos, {tiempoRestante.segundos} segundos</p>
      </div>
    </div>
  );
};

export default DiasRestantes;
