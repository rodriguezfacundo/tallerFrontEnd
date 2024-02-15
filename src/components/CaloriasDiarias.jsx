import React from 'react'

const CaloriasDiarias = ({ diarias }) => {


    return (
        <>
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Calorias Diaras</h5>
                </div>
                <div class="card-body">
                    <h1 class="card-text">{`${diarias}`}</h1>
                </div>
            </div>
        </>

    )
}

export default CaloriasDiarias