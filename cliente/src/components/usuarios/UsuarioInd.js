import React from "react"
import {Link} from 'react-router-dom'
import clienteAxios from "../axios/ClienteAxios"
import Swal from 'sweetalert2'


function UsuarioInd({usuario}) {

    function borrarusuario(idusuario){

        clienteAxios.post('usuario/borrarUsuario', {idusuario: idusuario})
        .then(err => {console.log(err)})

        Swal.fire({
            title: 'Usuario',
            text: 'Eliminado correctamente',
            confirmButtonText: 'Ok'
        })
        .then(response => {
            window.location = '/listaUsuarios';
        })
    }

    return (
        <tr>
        <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{usuario.documento}</p></td>
        <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{usuario.correo}</p></td>
        <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{usuario.nombre}</p></td>
        <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{usuario.apellido}</p></td>
        <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{usuario.perfil}</p></td>
        <td>
            <Link to={`/editarUsuario/${usuario.idusuario}`}><li className="btn btn-primary me-2">Editar</li></Link>
            <button className="btn btn-danger" onClick={()=>{borrarusuario(usuario.idusuario)}}>Eliminar</button>
        </td>
        </tr>
    );
}

export default UsuarioInd;
