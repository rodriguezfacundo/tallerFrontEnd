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

        <div className="container bg-secondary rounded p-3 ">
            <div className="row">
                <div className="col-md-3">
                    <div className="mt-2">
                        <RegistroComida nuevoRegistro={nuevoRegistro} />
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="card mt-1">
                        <div className="card-body">
                            <ObtenerRegistros nuevoRegistro={nuevoRegistro} />
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="mt-2">
                        <InfoCalorias />
                    </div>
                    <div>
                        <DiasRestantes />
                    </div>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col-md-4">
                    <Grafica1 />
                </div>
                <div className="col-md-4">
                    <Grafica2 />
                </div>
                <div className="col-md-4">
                    <MapaUsuarios />
                </div>
            </div>
        </div>

    );
}

export default Dashboard
