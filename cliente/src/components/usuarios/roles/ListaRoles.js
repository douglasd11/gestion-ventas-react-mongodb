import React, { useEffect, useState } from 'react'
import MenuUsuario from '../menuUsuario';
import RolInd from './RolInd';
import clienteAxios from '../../axios/ClienteAxios';


function ListaRoles(){
    
    const[datarol, setDatarol] = useState([])

    useEffect(() => {
        clienteAxios.get('rol/obtenerRoles').then(res => {
            setDatarol(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    
    const listaRol = datarol.map(rol => {
        return(
            <RolInd key={rol._id} rol={rol}/>
        )
    })

    return(
        <div className='container col-8 mt-4'>
            
            <MenuUsuario></MenuUsuario>
            
            <h2>Lista de roles</h2>

            <table className="table table-striped table-hover bg-light">
                <thead>
                    <tr>
                        <th scope="col">Nombre del rol</th>    
                        <th scope="col">Permisos del usuario</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaRol}
                </tbody>
            </table>
            
        </div>
    )
}

export default ListaRoles