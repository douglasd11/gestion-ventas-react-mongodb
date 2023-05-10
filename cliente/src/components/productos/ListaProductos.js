import React, { useEffect, useState } from 'react'
import clienteAxios from '../axios/ClienteAxios'
import MenuProductos from './menuProductos';
import ProductoInd from './ProductoInd';


function ListaProductos(){

    const[busqueda, setBusqueda] = useState('')
    const[dataproducto, setDataproducto] = useState([])
    
    useEffect(() => {
        clienteAxios.get('producto/obtenerproductos').then(res => {
            setDataproducto(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    
    let listaProductos = dataproducto.map(producto => {
        return(
            <ProductoInd key={producto._id} producto={producto}/>
        )
    })

    useEffect(() => {
        listaProductos = dataproducto.map(producto => {
            return(
                <ProductoInd key={producto._id} producto={producto}/>
            )
        })
    }, [dataproducto])
    

    function buscarProducto(){

        clienteAxios.get('producto/obtenerProductos').then(res => {
            setDataproducto(res.data.filter(prod => prod.nombre.includes(busqueda)))
            
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <div className='container col-8 mt-4'>
            
            <MenuProductos></MenuProductos>
            
            <h2>Lista de productos</h2>

            <div className='container-fluider d-flex col-5 my-4'>
                <input type="text" className="form-control me-3" placeholder='busqueda' value={busqueda} onChange={(e)=>{setBusqueda(e.target.value)}}/>
                <button onClick={buscarProducto} className='btn btn-primary'>Buscar</button>
            </div>

            <table className="table table-striped table-hover bg-light">
                <thead>
                    <tr>
                        <th scope="col">Codigo del producto</th>    
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Color</th>
                        <th scope="col">Talla</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Inventario</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProductos}
                </tbody>
            </table>
            
        </div>
    )
}

export default ListaProductos