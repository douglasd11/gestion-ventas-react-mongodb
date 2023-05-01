import React from 'react'
import { NavLink } from 'react-router-dom'
 
function MenuVentas(props){
    return(
        <div>
            <h1>Interfaz de ventas</h1>
            <div className='container-fluider rounded d-flex bg-dark mb-5 px-2'>
                <div className="p-3">
                    <NavLink to={'/inicio'}><span className='text-menu'>Inicio</span></NavLink>
                </div>
                <div className="p-3">
                    <NavLink to={'/listaVentas'}><span className='text-menu'>Ventas registradas</span></NavLink>
                </div>
                <div className="p-3">
                    <NavLink to={'/agregarVenta'}><span className='text-menu'>Agregar venta</span></NavLink>
                </div>
                <div className="p-3">
                    <NavLink to={'/'}><span className='text-menu'>Salir</span></NavLink>
                </div>
            </div>
        </div>
    )
}

export default MenuVentas