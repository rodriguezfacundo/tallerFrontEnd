import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {show_alert} from '../functions';

const Usuarios = () => {

  //Creamos los states que se usaran luego
  const [paises, setPaises] = useState([]);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [idPais, setIdPais] = useState('');
  const [calorias, setCalorias] = useState('');

  //Cremamos un useEffect Para cargar los paises cuando se recarga la pagina
  useEffect(() =>{
    getPaises();
  }, []);

  //Obtenemos paises para luego mostrar en el select (luego hay que cambiarlo a un componente de tipo Paises)
  const getPaises = async () =>{
    const respuesta = await axios.get('https://calcount.develotion.com/paises.php');
    //Los seteamos para luego acceder a ellos llamando a paises.
    setPaises(respuesta.data.paises)
  }

  //Se hace el POST a la api pasando todos los valores ya validados
  const registrarUsuario = async(e) =>{
    e.preventDefault()

    //Puse un timeout de 20 segundos pero seguramente lo bajemos
    //Use axios que es tipo el fetch, no es muy distinto pero estuve investigando y se usa bastante mas que el fetch
    //Basicamente te permite interactuar con la API
    try {
      console.log('datos a enviar', usuario, password, idPais, calorias);
      const respuesta = await axios.post('https://calcount.develotion.com/usuarios.php', {
        usuario, 
        password, 
        idPais, 
        calorias
      },{ timeout: 20000 }
    );
    //Mostramos la data recibida de la API con el registro, y en caso de que sea exitoso avisamos con un alert
    console.log(respuesta.data);
    if (respuesta.status === 200) {
      show_alert('Registrado con éxito', 'success');
    }
    } catch (error) {
      //Validamos que el error tenga respuesta y si el status es 409 es porque ya se registro
      if(error.response && error.response.status === 409){
        show_alert('El usuario ya existe. Por favor, elija otro nombre de usuario.', 'warning');
        
      }else {
        //Este alert queda para avisar al usuario que no se pudo registrar, y en el console log tenemos el error para verlo y corregirlo
        show_alert('Error al registrar usuario. Inténtelo de nuevo más tarde.', 'warning');
        console.log(error);
      }
    }

  }

  return (
    <div className='container'>
      <h1 className='text-center'>Registro Usuario</h1>
      {/* Llamamos a la funcion de registrarUsuario cuando se hace submit al formulario */}
      {/* En cada input cada vez que se escucha el evento onChange vamos seteandolo a sus states */}
      <form onSubmit={registrarUsuario}>
          <div className="mb-3">
            <label htmlFor ="inputUsuario" className="form-label">Usuario</label>
            <input type="text" id="inputUsuario" className="form-control" placeholder="Usuario" onChange={(e) => setUsuario(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor ="inputPassword" className="form-label">Contraseña</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="*****" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor ="inputCalorias" className="form-label">Calorías Diarias</label>
            <input type="number" id="inputCalorias" className="form-control" placeholder="Calorias por dia" onChange={(e) => setCalorias(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor ="select" className="form-label">Pais</label>
            <select id="select" className="form-select" onChange={(e) => setIdPais(e.target.value)}>
            <option>Paises</option>
            {/* En este map lo que se hace es ir por cada pais e ir agregandolo a los options */}
              {
                paises.map(pais =>(
                  <option key={pais.id} value={pais.id}>{pais.name}</option>
                ))
              }
            </select>
          </div>
          {/* Validamos que se puede submitear cuando se cumplan con los requisitos del disabled */}
        <button className="btn btn-success" type='submit' disabled={usuario.length<5 || password.length<5 || calorias<=0 || idPais <=0}>Enviar</button>
      </form>
    </div>
  )
}

export default Usuarios;