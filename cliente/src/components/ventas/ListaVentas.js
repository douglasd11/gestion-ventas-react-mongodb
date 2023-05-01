import React, { useEffect, useState } from 'react'
import clienteAxios from '../axios/ClienteAxios'
import MenuVentas from './menuVentas';
import VentaInd from './VentaInd';


function ListaVentas(){
    
    const[dataventa, setDataventa] = useState([])
    
    useEffect(() => {
        clienteAxios.get('venta/obtenerVentas').then(res => {
            setDataventa(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const listaVentas = dataventa.map(venta => {
        return(
            <VentaInd key={venta._id} venta={venta}/>
        )
    })
    

    return(
        <div className='container col-8 mt-4'>
            
            <MenuVentas></MenuVentas>
            <h2>Lista de ventas</h2>

            <div className='container-fluider d-flex col-5 my-4'>
                <input type="text" className="form-control me-3" id="busq" placeholder='busqueda' aria-describedby="busqueda"/>
                <button className='btn btn-primary'>Buscar</button>
            </div>

            <table className="table table-striped table-hover bg-light">
                <thead>
                    <tr>
                        <th scope="col">Factura no.</th>    
                        <th scope="col">Cliente</th>
                        <th scope="col">Identificacion</th>
                        <th scope="col">Fecha de venta</th>
                        <th scope="col">Codigo del producto</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Total de venta</th>
                        <th scope="col">Descuento aplicado</th>
                        <th scope="col">Vendedor</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaVentas}
                </tbody>
            </table>
            
        </div>
    )
}

export default ListaVentas