import React from 'react'

const CaloriasTotales = ({ totales }) => {
    return (
        <>
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Total de Calorías</h5>
                </div>
                <div class="card-body">
                    <h1 class="card-text">{`${totales}`}</h1>
                </div>
            </div>
        </>
    )
}

export default CaloriasTotales