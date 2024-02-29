import { React } from 'react';


const CaloriasDiarias = ({ diarias }) => {

    const color = (diarias, objetivo) => {

        const diariasNum = parseInt(diarias);
        const objetivoNum = parseInt(objetivo);

        const porcentajeConsumido = (100 * diariasNum) / objetivoNum

        if (porcentajeConsumido < 10) {
            return 'text-success text-center';
        } else if (porcentajeConsumido > 100) {
            return 'text-danger text-center';
        } else {
            return 'text-warning text-center';
        }
    }

    return (
        <>
            <div className="card mt-2">
                <div className="card-header text-center">
                    <h5>Calorias Diarias</h5>
                </div>
                <div className={`card-body ${color(diarias, localStorage.getItem('caloriasDiarias'))}`}>
                    <h3 className="card-text">{`${diarias}`}</h3>
                </div>
            </div>
        </>
    );
}

export default CaloriasDiarias;
