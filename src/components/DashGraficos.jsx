import React from 'react'
import Grafica1 from './Grafica1'
import Grafica2 from './Grafica2'


const DashGraficos = () => {

    return (
        <>
            <div>
                <h2>Grafica Cantidad por alimentos</h2>
                <Grafica1 />
            </div>
            <div>
                <h2>Grafica calorias por fecha</h2>
                <Grafica2 />
            </div>
        </>

    )
}
export default DashGraficos