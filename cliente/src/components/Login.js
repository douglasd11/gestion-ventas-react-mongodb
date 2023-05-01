import React from 'react'

function Login(){
    return(
        <div className='container row col-12 mt-5'>
            <div className='col-5 me-5'>
                <h2 className='text-center mt-5'>Iniciar Sesion</h2>
                <div className='mt-5'>
                    <div className="mb-3">
                        <label className="form-label">Correo electronico</label>
                        <input type="email" className="form-control" placeholder='Correo electronico' id="exampleInputEmail1"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control" placeholder='Contraseña' id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">Recordarme</label>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Iniciar sesion</button>
                </div>
            </div>
            <div className='col-6'>
                <img className='w-100' src='/portada.png'></img>
            </div>
        </div>
    )
}

export default Login