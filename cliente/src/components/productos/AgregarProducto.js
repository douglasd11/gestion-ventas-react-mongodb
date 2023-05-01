import React, { useState } from 'react'
import uniquid from 'uniqid'
import clienteAxios from '../axios/ClienteAxios'
import MenuProductos from './menuProductos'
import Swal from 'sweetalert2'

function AgregarProducto(){

    //hooks
    const[codigop, setCodigop] = useState('')
    const[nombre, setNombre] = useState('')
    const[descripcion, setDescripcion] = useState('')
    const[color, setColor] = useState('Blanco')
    const[talla, setTalla] = useState('m')
    const[categoria, setCategoria] = useState('')
    const[precio, setPrecio] = useState('')
    const[inventario, setInventario] = useState('')


    function agregarProducto(){
        var producto = {
            idproducto: uniquid(),
            codigop: codigop,
            nombre: nombre,
            descripcion: descripcion,
            color: color,
            talla: talla,
            categoria: categoria,
            precio: precio,
            inventario: inventario
        }

        clienteAxios.post('producto/agregarproducto', producto)
        .then(err => {console.log(err)})

        Swal.fire({
            title: 'Producto',
            text: 'Agregado correctamente',
            confirmButtonText: 'Ok'
        })
        .then(response => {
            window.location = '/listaProductos';
        })
    }

    return(
        <div className='container col-8 mt-4'>
            <MenuProductos></MenuProductos>
            
            <div className='container mt-5'>
                <h3>Agregar nuevo producto</h3>
                <p>Para crear un nuevo producto asegure de llenar todos los campos.</p>
                <div className='row mt-5'>
                    <div className='col-6'>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Codigo del producto</label>
                            <input type="number" className="form-control" placeholder='Codigo del producto' value={codigop} onChange={(e)=>{setCodigop(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Descripcion</label>
                            <input type="text" className="form-control" placeholder='Descripcion' value={descripcion} onChange={(e)=>{setDescripcion(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Talla</label>
                            <select className="form-select" value={talla} onChange={(e)=>{setTalla(e.target.value)}}>
                                <option value="s">S</option>
                                <option value="m">M</option>
                                <option value="l">L</option>
                                <option value="xl">XL</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Precio COP</label>
                            <input type="number" className="form-control" placeholder='Precio' value={precio} onChange={(e)=>{setPrecio(e.target.value)}}/>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Nombre del producto</label>
                            <input type="text" className="form-control" placeholder='Nombre del producto' value={nombre} onChange={(e)=>{setNombre(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Color</label>
                            <select className="form-select" value={color} onChange={(e)=>{setColor(e.target.value)}}>
                                <option value="Blanco">Blanco</option>
                                <option value="Rojo">Rojo</option>
                                <option value="Morado">Morado</option>
                                <option value="Negro">Negro</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Categoria</label>
                            <input type="text" className="form-control" placeholder='Categoria' value={categoria} onChange={(e)=>{setCategoria(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Inventario</label>
                            <input type="number" className="form-control" placeholder='Categoria' value={inventario} onChange={(e)=>{setInventario(e.target.value)}}/>
                        </div>
                    </div>
                    <div className='col-12'>
                        <button onClick={agregarProducto} className="btn btn-primary mt-3">Agregar producto</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgregarProducto