import React, { useState } from 'react'
import RegistroComida from './RegistroComida'
import ObtenerRegistros from './ObtenerRegistros'
import RegistrosPorFiltros from './RegistrosPorFiltros'

const Dashboard = () => {
    const [reloadList, setReloadList] = useState(false)

    const imagenes = [
        require('../img/clases-online-de-chef.jpg'),
        require('../img/comidas-gourmet.jpg'),
        require('../img/imagenComida.jpeg'),
    ];

    const nuevoRegistro = () => {
        setReloadList(!reloadList)
    }
    return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ marginTop: '20px', marginBottom: '10px' }}>¡Bienvenido a tu Dashboard!</h2>
                <div>
                    <RegistroComida nuevoRegistro={nuevoRegistro} />
                </div>
                <div style={{ maxWidth: '600px', margin: '20px', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', borderRadius: '10px', backgroundColor:'0px 0px 5px rgba(14, 1, 35, 0.1)'}}>
                    <ObtenerRegistros reload={reloadList} />
                </div>
                <div id="carouselExample" className="carousel slide" style={{ maxWidth: '1000px', margin: 'auto',marginTop: '50px' }}>
                    <div className="carousel-inner">
                        {/* Recorro las imagenes con el map y las voy mostrando en el carousel */}
                        {imagenes.map((imagen, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img src={imagen} className="d-block w-100"  />
                            </div>
                        ))}
                    </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div>
                <RegistrosPorFiltros/>
            </div>
        </div>
    );
}

export default Dashboard