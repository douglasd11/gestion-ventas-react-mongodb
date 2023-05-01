import React from "react"
import { Link } from 'react-router-dom'
import clienteAxios from '../axios/ClienteAxios'
import Swal from 'sweetalert2'

function ProductoInd({producto}) {

    function borrarProducto(idproducto){
        clienteAxios.post('producto/borrarProducto', {idproducto: idproducto})
        .then(err => {console.log(err)})

        Swal.fire({
            title: 'Producto',
            text: 'Eliminado correctamente',
            confirmButtonText: 'Ok'
        })
        .then(response => {
            window.location = '/listaProductos';
        })
    }

    return (
        <tr>
        <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{producto.codigop}</p></td>
        <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{producto.nombre}</p></td>
        <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{producto.descripcion}</p></td>
        <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{producto.color}</p></td>
        <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{producto.talla}</p></td>
        <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{producto.categoria}</p></td>
        <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{producto.precio}</p></td>
        <td style={{padding: "8px 0.5rem"}}><p style={{padding: "8.2px 0"}}>{producto.inventario}</p></td>
        <td>
            <Link to={`/editarProducto/${producto.idproducto}`}><li className="btn btn-primary me-2">Editar</li></Link>
            <button className="btn btn-danger" onClick={()=>{borrarProducto(producto.idproducto)}}>Eliminar</button>
        </td>
        </tr>
    );
}

export default ProductoInd;
