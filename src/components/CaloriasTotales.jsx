import React from 'react'

const CaloriasTotales = ({ totales }) => {
    return (
        <>
            <div className="card mt-2" >
                <div className="card-header text-center ">
                    <h5>Total de Calorías</h5>
                </div>
                <div className="card-body text-center">
                    <h3 className="card-text">{`${totales}`}</h3>
                </div>
            </div>
        </>
    )
}

export default CaloriasTotales