import React, { useEffect, useState } from 'react'
import clienteAxios from '../axios/ClienteAxios'
import MenuVentas from './menuVentas';
import VentaInd from './VentaInd';


function ListaVentas(){
    
    const[busqueda, setBusqueda] = useState('')
    const[dataventa, setDataventa] = useState([])
    
    useEffect(() => {
        clienteAxios.get('venta/obtenerVentas').then(res => {
            setDataventa(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    let listaVentas = dataventa.map(venta => {
        return(
            <VentaInd key={venta._id} venta={venta}/>
        )
    })

    useEffect(() => {
        listaVentas = dataventa.map(venta => {
            return(
                <VentaInd key={venta._id} venta={venta}/>
            )
        })
    }, [dataventa])

    function buscarVenta(){

        clienteAxios.get('venta/obtenerVentas').then(res => {
            setDataventa(res.data.filter(vent => vent.factura.toString().includes(busqueda)))
            
        }).catch(err => {
            console.log(err)
        })
    }
    

    return(
        <div className='container col-8 mt-4'>
            
            <MenuVentas></MenuVentas>
            <h2>Lista de ventas</h2>

            <div className='container-fluider d-flex col-5 my-4'>
                <input type="text" className="form-control me-3" placeholder='busqueda' value={busqueda} onChange={(e)=>{setBusqueda(e.target.value)}}/>
                <button onClick={buscarVenta} className='btn btn-primary'>Buscar</button>
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