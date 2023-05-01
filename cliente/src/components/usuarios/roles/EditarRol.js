import React, { useEffect, useState } from 'react'
import clienteAxios from '../../axios/ClienteAxios';
import MenuUsuario from '../menuUsuario'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'


function EditarRol(){

    const params = useParams()

    //hooks
    const[nombre, setNombre] = useState('')
    const[perm1, setPerm1] = useState(false)
    const[perm2, setPerm2] = useState(false)
    const[perm3, setPerm3] = useState(false)

    useEffect(() => {
        clienteAxios.post('rol/obtenerRol', {idrol: params.idrol}).then(res => {
            const datarol = res.data[0]
            setNombre(datarol.nombre)
            setPerm1(datarol.perm1)
            setPerm2(datarol.perm2)
            setPerm3(datarol.perm3)
        })
    }, [])


    function editarRol(){
        const rol = {
            idrol: params.idrol,
            nombre: nombre,
            perm1: perm1,
            perm2: perm2,
            perm3: perm3
        }

        clienteAxios.post('rol/actualizarRol', rol)
        .then(err => {console.log(err)})

        Swal.fire({
            title: 'Rol',
            text: 'Actualizado correctamente',
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
                <h3>Editar rol</h3>
                
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
                        <button onClick={editarRol} className="btn btn-primary mt-3">Editar rol</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarRol