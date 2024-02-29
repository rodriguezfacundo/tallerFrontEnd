import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { BsTrash } from 'react-icons/bs';

const Tabla = ({ handleEliminar, findAlimentoNameById, lista }) => {
    let imgComida = "https://calcount.develotion.com/imgs/"
    const alimentos = useSelector((state) => state.alimentos.alimentos);

    const Unidad = (idAlimento) => {

        const alimento = alimentos.find(a => a.id === parseInt(idAlimento))
        const unidadAux = (alimento !== undefined) ? alimento.porcion.slice(-1) : '';
        const unidadFinal = (unidadAux === 'g') ? 'gramos' : (unidadAux === 'm') ? 'mililitros' : (unidadAux === 'u') ? 'unidad' : '';
        return unidadFinal
    }

    useEffect(() => {

    }, [lista])


    return (
        <div className="rounded-3" style={{ backgroundColor: 'rgba(24, 1, 35, 0.1)', maxHeight: '300px', minHeight: '300px', overflowY: 'auto' }}>
            {lista.length > 0 ? (
                <table className="table table-secondary rounded">
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
                                <td>{item.idAlimento ? (
                                    <img src={imgComida + item.idAlimento + '.png'} alt="Icono comida"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.onerror = null;
                                        }}
                                    />
                                ) : (
                                    <span>Imagen no disponible</span>
                                )}
                                </td>
                                <td>{findAlimentoNameById(item.idAlimento)}</td>
                                <td>{item.cantidad} {Unidad(item.idAlimento)}</td>
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
                <div className="card p-4">
                    <p className="lead">No hay alimentos Registrados.</p>
                </div>
            )}
        </div>
    )
}
export default Tabla