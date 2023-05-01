import React, { useEffect, useState } from 'react'
import MenuUsuario from './menuUsuario'
import { useParams } from 'react-router-dom'
import clienteAxios from '../axios/ClienteAxios'
import Swal from 'sweetalert2'


function EditarUsuario(){

    const params = useParams()

    //hooks
    const[correo, setCorreo] = useState('')
    const[nombre, setNombre] = useState('')
    const[apellido, setApellido] = useState('')
    const[documento, setDocumento] = useState('')
    const[clave, setClave] = useState('')
    const[perfil, setPerfil] = useState('admin')

    useEffect(() => {
        clienteAxios.post('usuario/obtenerUsuario', {idusuario: params.idusuario}).then(res => {
            
            const datausuario = res.data[0]
            setCorreo(datausuario.correo)
            setNombre(datausuario.nombre)
            setApellido(datausuario.apellido)
            setDocumento(datausuario.documento)
            setClave(datausuario.clave)
            setPerfil(datausuario.perfil)
        })
    }, [])

    function editarUsuario(){

        const usuario = {
            idusuario: params.idusuario,
            correo: correo,
            nombre: nombre,
            apellido: apellido,
            documento: documento,
            clave: clave,
            perfil: perfil
        }

        clienteAxios.post('usuario/actualizarUsuario', usuario)
        .then(err => {console.log(err)})

        Swal.fire({
            title: 'Usuario',
            text: 'Actualizado correctamente',
            confirmButtonText: 'Ok'
        })
        .then(response => {
            window.location = '/listaUsuarios';
        })
    }

    const[datarol, setDatarol] = useState([])

    useEffect(() => {
        clienteAxios.get('rol/obtenerRoles').then(res => {
            setDatarol(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    
    const opcionesRoles = datarol.map(rol => {
        return(
            <option key={rol._id} value={rol.nombre}>{rol.nombre}</option>
        )
    })

    return(
        <div className='container col-8 mt-4'>
            <MenuUsuario></MenuUsuario>
            
            <div className='container mt-5'>
                <h3>Editar usuario</h3>
                
                <div className='row mt-5'>
                    <div className='col-6'>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Correo electronico</label>
                            <input type="email" className="form-control" placeholder='Correo electronico' value={correo} onChange={(e)=>{setCorreo(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Nombres</label>
                            <input type="text" className="form-control" placeholder='Nombres' value={nombre} onChange={(e)=>{setNombre(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" placeholder='Contraseña' value={clave} onChange={(e)=>{setClave(e.target.value)}}/>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Documento de identidad</label>
                            <input type="number" className="form-control" placeholder='Documento de identidad' value={documento} onChange={(e)=>{setDocumento(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Apellidos</label>
                            <input type="text" className="form-control" placeholder='Apellidos' value={apellido} onChange={(e)=>{setApellido(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Perfil</label>
                            <select className="form-select" value={perfil} onChange={(e)=>{setPerfil(e.target.value)}}>
                                {opcionesRoles}
                            </select>
                        </div>
                    </div>
                    <div className='col-12'>
                        <button onClick={editarUsuario} className="btn btn-primary mt-3">Editar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarUsuario