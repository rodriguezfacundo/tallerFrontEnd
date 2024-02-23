import React, { useEffect } from 'react';

const DiasRestantes = () => {
  const calcularDiasRestantes = () => {
    // Fecha límite (31 de marzo de 2024)
    const deadline = new Date('2024-03-31T23:59:59');
    const now = new Date();

    const differenceInMs = deadline - now;

    const diasRestantes = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    return diasRestantes;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Dias restantes:', calcularDiasRestantes());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
        <hr></hr>
        <h4>Dias restantes para el 31 de Marzo del 2024</h4>
        <p>{calcularDiasRestantes()} días</p>
    </div>
  );
};

export default DiasRestantes;
