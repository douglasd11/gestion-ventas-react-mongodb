import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import clienteAxios from '../axios/ClienteAxios'
import Swal from 'sweetalert2'

function VentaInd({venta}) {

    const[datausuario, setDatausuario] = useState([])

    useEffect(() => {
        clienteAxios.get('usuario/obtenerUsuarios').then(res => {
            setDatausuario(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    datausuario.map(usuario => {
        if(usuario.idusuario == venta.vendedor){
            venta.vendedor = usuario.nombre
        }
    })

    function borrarVenta(idventa){
        
        clienteAxios.post('venta/borrarVenta', {idventa: idventa})
        .then(err => {console.log(err)})

        Swal.fire({
            title: 'Venta',
            text: 'Eliminada correctamente',
            confirmButtonText: 'Ok'
        })
        .then(response => {
            window.location = '/listaVentas';
        })
    }

    return (
        <tr>
        <td className="align-middle"><p>{venta.factura}</p></td>
        <td className="align-middle"><p>{venta.nombrec}</p></td>
        <td className="align-middle"><p>{venta.dnic}</p></td>
        <td className="align-middle"><p>{venta.fechav}</p></td>
        <td className="align-middle"><p>{venta.codigop}</p></td>
        <td className="align-middle"><p>{venta.cantidad}</p></td>
        <td className="align-middle"><p>{venta.total}</p></td>
        <td className="align-middle"><p>{venta.descuento}</p></td>
        <td className="align-middle"><p>{venta.vendedor}</p></td>
        <td>
            <Link to={`/editarventa/${venta.idventa}`}><li className="btn btn-primary me-2 w-100">Editar</li></Link>
            <button className="btn btn-danger w-100" onClick={()=>{borrarVenta(venta.idventa)}}>Eliminar</button>
        </td>
        </tr>
    );
}

export default VentaInd;
