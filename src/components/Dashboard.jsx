import { React, useEffect, useState } from 'react'
import RegistroComida from './RegistroComida'
import ObtenerRegistros from './ObtenerRegistros'
import Grafica1 from './Grafica1'
import Grafica2 from './Grafica2'
import InfoCalorias from './InfoCalorias'
import MapaUsuarios from './MapaUsuarios'
import DiasRestantes from './DiasRestantes'

const Dashboard = () => {
    
    const [reloadList, setReloadList] = useState(false)

    const nuevoRegistro = () => {
        setReloadList(!reloadList)
    }
    useEffect(() => {

    }, [reloadList])


    return (

        <div className="container">
            <div className="row" style={{ backgroundColor: 'rgba(14, 1, 35, 0.1)' }}>
                <div className="col-md-3 mt-3">
                    <div>
                        <RegistroComida nuevoRegistro={nuevoRegistro} />
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="card mt-3">
                        <div className="card-body p-3" >
                            <ObtenerRegistros nuevoRegistro={nuevoRegistro} />
                        </div>
                    </div>
                </div>
                <div className="col-md-2 mt-3">
                    <div>
                        <InfoCalorias />
                    </div>
                    <div>
                        <DiasRestantes />
                    </div>
                </div>

            </div>

            <div className="row mt-3" style={{ backgroundColor: 'rgba(14, 1, 35, 0.1)', maxHeight: '400px', overflowY: 'hidden' }}>
                <div className="col-md-4">
                    <h4>Grafica Cantidad por alimentos</h4>
                    <Grafica1 />
                </div>
                <div className="col-md-4">
                    <Grafica2 />
                </div>
                <div className="col-md-4">
                    <MapaUsuarios />
                </div>
            </div>
        </div >
    );
}

export default Dashboard
