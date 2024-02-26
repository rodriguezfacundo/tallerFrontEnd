import React from 'react';
import CaloriasDiarias from './CaloriasDiarias';
import CaloriasTotales from './CaloriasTotales';
import { useSelector } from 'react-redux';

const InfoCalorias = () => {
    const alimentos = useSelector((state) => state.alimentos.alimentos);
    const registros = useSelector((state) => state.registros.registros);

    const CaloriasTot = () => {
        let sumaCalorias = 0;
        registros.map((registro) => {
            alimentos.map((alimento) => {
                if (registro.idAlimento === alimento.id) {
                    sumaCalorias += alimento.calorias * registro.cantidad
                }
            });
        });
        return sumaCalorias;
    }

    const CaloriasDia = () => {
        let sumaCalorias = 0;

        const fechaActual = new Date();
        const año = fechaActual.getFullYear();
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const día = fechaActual.getDate().toString().padStart(2, '0');
        const hoy = `${año}-${mes}-${día}`;

        registros.map((registro) => {
            alimentos.map((alimento) => {
                if (registro.idAlimento === alimento.id && registro.fecha === hoy) {
                    sumaCalorias += (alimento.calorias * registro.cantidad)
                    console.log('sumaCal', sumaCalorias)
                }
            });
        });
        return sumaCalorias;
    }


    return (
        <>
            <CaloriasTotales totales={CaloriasTot()}></CaloriasTotales>
            <CaloriasDiarias diarias={CaloriasDia()}></CaloriasDiarias>
        </>
    )
}

export default InfoCalorias;
