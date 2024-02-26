import React from 'react'

const CaloriasTotales = ({ totales }) => {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Total de Calorías</h5>
                </div>
                <div className="card-body">
                    <h1 className="card-text">{`${totales}`}</h1>
                </div>
            </div>
        </>
    )
}

export default CaloriasTotales