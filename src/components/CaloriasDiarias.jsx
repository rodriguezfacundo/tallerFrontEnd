import { React } from 'react';


const CaloriasDiarias = ({ diarias }) => {

    const color = (diarias, objetivo) => {

        const diariasNum = parseInt(diarias);
        const objetivoNum = parseInt(objetivo);

        const porcentajeConsumido = (100 * diariasNum) / objetivoNum

        if (porcentajeConsumido < 10) {
            return 'text-success';
        } else if (porcentajeConsumido > 100) {
            return 'text-danger';
        } else {
            return 'text-warning';
        }
    }

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Calorias Diarias</h5>
                </div>
                <div className={`card-body ${color(diarias, localStorage.getItem('caloriasDiarias'))}`}>
                    <h1 className="card-text">{`${diarias}`}</h1>
                </div>
            </div>
        </>
    );
}

export default CaloriasDiarias;
