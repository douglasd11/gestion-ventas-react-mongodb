import React, { useEffect, useState } from 'react'
import uniquid from 'uniqid'
import MenuUsuario from '../menuUsuario'
import clienteAxios from '../../axios/ClienteAxios';
import Swal from 'sweetalert2'


function AgregarRol(){

    //hooks
    const[nombre, setNombre] = useState('')
    const[perm1, setPerm1] = useState(false)
    const[perm2, setPerm2] = useState(false)
    const[perm3, setPerm3] = useState(false)


    function agregarRol(){
        var rol = {
            idrol: uniquid(),
            nombre: nombre,
            perm1: perm1,
            perm2: perm2,
            perm3: perm3
        }

        clienteAxios.post('rol/agregarRol', rol)
        .then(err => {console.log(err)})

        Swal.fire({
            title: 'Rol',
            text: 'Agregado correctamente',
            confirmButtonText: 'Ok'
        })
        .then(response => {
            window.location = '/listaRoles';
        })
    }

    return(
        <div className='container col-8 mt-4'>
            <MenuUsuario></MenuUsuario>
            
            <div className='container mt-5'>
                <h3>Agregar nuevo rol</h3>
                <p>Para crear un nuevo rol asegure de llenar todos los campos.</p>
                <div className='row mt-4'>
                    <div className='col-6'>
                        <div className="mb-3">
                            <label className="form-label">Nombre del rol</label>
                            <input type="text" className="form-control" placeholder='Nombre del rol' value={nombre} onChange={(e)=>{setNombre(e.target.value)}}/>
                        </div>
                        <p className='mt-4'>Seleccione los modulos asociados al rol:</p>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" onChange={(e)=>{setPerm1(!perm1)}} checked={perm1}/>
                            <label className="form-check-label">Acceso al modulo de ventas</label>
                        </div>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" onChange={(e)=>{setPerm2(!perm2)}} checked={perm2}/>
                            <label className="form-check-label">Acceso al modulo de productos</label>
                        </div>
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" onChange={(e)=>{setPerm3(!perm3)}} checked={perm3}/>
                            <label className="form-check-label">Acceso al modulo de usuario</label>
                        </div>
                    </div>
                    
                    <div className='col-12'>
                        <button onClick={agregarRol} className="btn btn-primary mt-3">Agregar rol</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgregarRol