import React, { useState, useEffect } from 'react'
import uniquid from 'uniqid'
import MenuUsuario from './menuUsuario'
import clienteAxios from '../axios/ClienteAxios'
import Swal from 'sweetalert2'


function AgregarUsuario(){

    //hooks
    const[correo, setCorreo] = useState('')
    const[nombre, setNombre] = useState('')
    const[apellido, setApellido] = useState('')
    const[documento, setDocumento] = useState('')
    const[clave, setClave] = useState('')
    const[perfil, setPerfil] = useState('')
    

    function agregarUsuario(){
        var usuario = {
            idusuario: uniquid(),
            correo: correo,
            nombre: nombre,
            apellido: apellido,
            documento: documento,
            clave: clave,
            perfil: perfil
        }

        clienteAxios.post('usuario/agregarusuario', usuario)
        .then(err => {console.log(err)})

        Swal.fire({
            title: 'Usuario',
            text: 'Agregado correctamente',
            confirmButtonText: 'Ok'
        })
        .then(response => {
            window.location = '/listaUsuarios';
        })
    }

    const[datarol, setDatarol] = useState([])

    useEffect(() => {
        clienteAxios.get('rol/obtenerroles').then(res => {
            setDatarol(res.data)
            setPerfil(res.data[0].nombre)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    
    //mapear lista de roles
    const opcionesRoles = datarol.map(rol => {
        return(
            <option key={rol._id} value={rol.nombre}>{rol.nombre}</option>
        )
    })

    return(
        <div className='container col-8 mt-4'>
            <MenuUsuario></MenuUsuario>
            
            <div className='container mt-5'>
                <h3>Agregar nuevo usuario</h3>
                <p>Para crear un nuevo usuario asegure de llenar todos los campos.</p>
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
                        <button onClick={agregarUsuario} className="btn btn-primary mt-3">Agregar usuario</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgregarUsuario