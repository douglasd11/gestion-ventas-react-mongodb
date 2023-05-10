import React, { useEffect, useState } from 'react'
import MenuUsuario from './menuUsuario';
import UsuarioInd from './UsuarioInd';
import clienteAxios from '../axios/ClienteAxios';

function ListaUsuarios(){
    
    const[busqueda, setBusqueda] = useState('')
    const[datausuario, setDatausuario] = useState([])

    useEffect(() => {
        clienteAxios.get('usuario/obtenerUsuarios').then(res => {
            setDatausuario(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    let listausuarios = datausuario.map(usuario => {
        return(
            <UsuarioInd key={usuario._id} usuario={usuario}/>
        )
    })

    useEffect(() => {
        listausuarios = datausuario.map(usuario => {
            return(
                <UsuarioInd key={usuario._id} usuario={usuario}/>
            )
        })    
    }, [datausuario])

    function buscarUsuario(){

        clienteAxios.get('usuario/obtenerUsuarios').then(res => {
            setDatausuario(res.data.filter(user => user.nombre.includes(busqueda)))
            
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <div className='container col-8 mt-4'>
            
            <MenuUsuario></MenuUsuario>
            
            <h2>Lista de usuarios</h2>

            <div className='container-fluider d-flex col-5 my-5'>
                <input type="text" className="form-control me-3" placeholder='busqueda' value={busqueda} onChange={(e)=>{setBusqueda(e.target.value)}}/>
                <button onClick={buscarUsuario} className='btn btn-primary'>Buscar</button>
            </div>

            <table className="table table-striped table-hover bg-light">
                <thead>
                    <tr>
                        <th scope="col">Documento</th>    
                        <th scope="col">Correo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Perfil</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listausuarios}
                </tbody>
            </table>
            
        </div>
    )
}

export default ListaUsuarios