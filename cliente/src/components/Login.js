import React, { useEffect, useState } from 'react'
import clienteAxios from './axios/ClienteAxios'
import Swal from 'sweetalert2'


function Login(){

    const[correo, setCorreo] = useState('')
    const[clave, setClave] = useState('')

    const[datausuario, setDatausuario] = useState([])

    useEffect(() => {
        clienteAxios.get('usuario/obtenerUsuarios').then(res => {
            setDatausuario(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])


    function logUsuario(){

        let status = true
        datausuario.map(usuario => {
            if(usuario.correo == correo && usuario.clave == clave){
                status = false
                window.location = '/inicio';
            }
        })

        if(status){
            Swal.fire({
                title: 'Usuario',
                text: 'Credenciales incorrectas',
                confirmButtonText: 'Ok'
            })
        }   
    }

    return(
        <div className='container-fluid justify-content-center row col-12 mt-5'>
            <div className='col-5 me-5'>
                <h2 className='text-center mt-5'>Iniciar Sesion</h2>
                <div className='mt-5'>
                    <div className="mb-3">
                        <label className="form-label">Correo electronico</label>
                        <input type="email" className="form-control" value={correo} onChange={(e)=>{setCorreo(e.target.value)}} placeholder='Correo electronico'/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control" value={clave} onChange={(e)=>{setClave(e.target.value)}}  placeholder='Contraseña'/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">Recordarme</label>
                    </div>
                    <button onClick={logUsuario} className="btn btn-primary mt-3">Iniciar sesion</button>
                </div>
            </div>
            <div className='col-6'>
                <img className='w-100' src='/portada.png'></img>
            </div>
        </div>
    )
}

export default Login