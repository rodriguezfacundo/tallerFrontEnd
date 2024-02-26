import React, { useEffect } from 'react'
import { BsTrash } from 'react-icons/bs';

const Tabla = ({ handleEliminar, findAlimentoNameById, lista }) => {
    let imgComida = "https://calcount.develotion.com/imgs/"

    useEffect(() => {

    }, [lista])


    return (
        <div style={{ backgroundColor: 'rgba(24, 1, 35, 0.1)', maxHeight: '300px', overflowY: 'auto' }}>
            {lista.length > 0 ? (
                <table className="table table-dark rounded">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">#</th>
                            <th scope="col">Alimento</th>
                            <th scope="col">Cant</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lista.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td><img src={imgComida + item.idAlimento + '.png'} alt="Icono comida" /></td>
                                <td>{findAlimentoNameById(item.idAlimento)}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.fecha}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleEliminar(item.id)}>
                                        <BsTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay alimentos registrados.</p>
            )}
        </div>
    )
}
export default Tabla