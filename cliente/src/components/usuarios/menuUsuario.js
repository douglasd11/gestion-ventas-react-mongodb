import React from 'react'
import { NavLink } from 'react-router-dom'
 
function MenuUsuario(props){
    return(

        <div>
            <h1>Interfaz de usuarios</h1>
            <div className='container-fluider rounded d-flex bg-dark mb-5 px-2'>
                <div className="p-3">
                    <NavLink to={'/inicio'}><span className='text-menu'>Inicio</span></NavLink>
                </div>
                <div className="p-3">
                    <NavLink to={'/listaUsuarios'}><span className='text-menu'>Usuarios registrados</span></NavLink>
                </div>
                <div className="p-3">
                    <NavLink to={'/agregarUsuario'}><span className='text-menu'>Agregar usuarios</span></NavLink>
                </div>
                <div className="p-3">
                    <NavLink to={'/listaRoles'}><span className='text-menu'>Roles registrados</span></NavLink>    
                </div>
                <div className="p-3">
                    <NavLink to={'/agregarRol'}><span className='text-menu'>Agregar rol</span></NavLink>
                </div>
                <div className="p-3">
                    <NavLink to={'/'}><span className='text-menu'>Salir</span></NavLink>
                </div>
            </div>
        </div>
    )
}

export default MenuUsuario