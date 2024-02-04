import React from 'react'

const Inicio = () => {
    const imagenes = [
        require('../img/clases-online-de-chef.jpg'),
        require('../img/comidas-gourmet.jpg'),
        require('../img/imagenComida.jpeg'),
    ];

  return (
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
  )
}

export default Inicio