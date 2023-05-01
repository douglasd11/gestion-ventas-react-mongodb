import React from "react"
import {Link} from 'react-router-dom'
import clienteAxios from "../../axios/ClienteAxios"
import Swal from 'sweetalert2'


function RolInd({rol}) {

    function borrarRol(idrol){

        clienteAxios.post('rol/borrarRol', {idrol: idrol})
        .then(err => {console.log(err)})

        Swal.fire({
            title: 'Rol',
            text: 'Eliminado correctamente',
            confirmButtonText: 'Ok'
        })
        .then(response => {
            window.location = '/listaRoles';
        })
    }

    function permisos(){
        return (rol.perm1 ? "Ventas " : "") + (rol.perm2 ? "Productos " : "") + (rol.perm3 ? "Usuarios " : "")
    }

    return (
        <tr>
            <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{rol.nombre}</p></td>
            <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{permisos()}</p></td>
            <td>
                <Link to={`/editarRol/${rol.idrol}`}><li className="btn btn-primary me-2">Editar</li></Link>
                <button className="btn btn-danger" onClick={()=>{borrarRol(rol.idrol)}}>Eliminar</button>
            </td>
        </tr>
    );
}

export default RolInd;
