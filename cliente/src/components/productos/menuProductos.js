import React from 'react'
import { NavLink } from 'react-router-dom'
 
function MenuProductos(){
    return(
        <div>
            <h1>Interfaz de productos</h1>
            <div className='container-fluider rounded d-flex bg-dark mb-5 px-2'>
                <div className="p-3">
                    <NavLink to={'/inicio'}><span className='text-menu'>Inicio</span></NavLink>
                </div>
                <div className="p-3">
                    <NavLink to={'/listaProductos'}><span className='text-menu'>Productos registrados</span></NavLink>
                </div>
                <div className="p-3">
                    <NavLink to={'/agregarProducto'}><span className='text-menu'>Agregar producto</span></NavLink>
                </div>
                <div className="p-3">
                    <NavLink to={'/'}><span className='text-menu'>Salir</span></NavLink>
                </div>
            </div>
        </div>
    )
}

export default MenuProductos