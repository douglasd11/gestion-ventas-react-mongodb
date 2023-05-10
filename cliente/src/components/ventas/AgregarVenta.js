import React, { useState, useEffect } from 'react'
import uniquid from 'uniqid'
import clienteAxios from '../axios/ClienteAxios'
import MenuVentas from './menuVentas'
import Swal from 'sweetalert2'


function AgregarVenta(){

    //hooks
    const[factura, setFactura] = useState('')
    const[nombrec, setNombrec] = useState('')
    const[dnic, setDnic] = useState('')
    const[codigop, setCodigop] = useState('')
    const[cantidad, setCantidad] = useState('')
    const[subtotal, setSubtotal] = useState('')
    const[fechav, setFechav] = useState('')
    const[descuento, setDescuento] = useState('5')
    const[total, setTotal] = useState('')
    const[vendedor, setVendedor] = useState('')
    

    function agregarVenta(){
        var venta = {
            idventa: uniquid(),
            factura: factura,
            nombrec: nombrec,
            dnic: dnic,
            codigop: codigop,
            cantidad: cantidad,
            subtotal: subtotal,
            fechav: fechav,
            descuento: descuento,
            total: total,
            vendedor: vendedor
        }

        clienteAxios.post('venta/agregarVenta', venta)
        .then(err => {console.log(err)})

        Swal.fire({
            title: 'Venta',
            text: 'Agregada correctamente',
            confirmButtonText: 'Ok'
        })
        .then(response => {
            window.location = '/listaVentas';
        })
    }

    const[dataproducto, setDataproducto] = useState([])
    useEffect(() => {
        clienteAxios.get('producto/obtenerProductos').then(res => {
            setDataproducto(res.data)
            setCodigop(res.data[0].codigop)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    
    const opcionesProductos = dataproducto.map(producto => {
        return(
            <option key={producto._id}>{producto.codigop}</option>
        )
    })

    function cargarTotal(cantid, cod, desc){
        if(cantid != ''){
            dataproducto.map(producto => {
                if(producto.codigop == cod){
                    let subt = producto.precio * cantid
                    desc = subt*(desc/100)
                    setSubtotal(subt)
                    setTotal(subt-desc)
                }
            })
        }
    }

    const[datausuario, setDatausuario] = useState([])
    useEffect(() => {
        clienteAxios.get('usuario/obtenerusuarios').then(res => {
            setVendedor(res.data[0].idusuario)
            setDatausuario(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const listaVendedores = datausuario.map(usuario => {
        return <option key={usuario.idusuario} value={usuario.idusuario}>{usuario.nombre}</option>
    })

    
    
    /*
    function valVendedor(perfil){
        datarol.map(rol => {
            if(rol.nombre == perfil){
                return rol.perm1 
            }
        })
        return false
    }*/


    return(
        <div className='container col-8 mt-4'>
            
            <MenuVentas></MenuVentas>
            
            <div className='container mt-5'>
                <h3>Agregar nueva venta</h3>
                <p>Para crear una nueva venta asegure de llenar todos los campos.</p>
                <div className='row mt-4'>
                    <div className='col-6'>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Factura No</label>
                            <input type="number" className="form-control" placeholder='Factura No' value={factura} onChange={(e)=>{setFactura(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Dni de cliente</label>
                            <input type="number" className="form-control" placeholder='Dni de cliente' value={dnic} onChange={(e)=>{setDnic(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Cantidad a vender</label>
                            <input type="number" className="form-control" placeholder='Cantidad a vender' value={cantidad} onChange={(e)=>{setCantidad(e.target.value); cargarTotal(e.target.value, codigop, descuento)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Fecha de la venta</label>
                            <input type="date" className="form-control" placeholder='Fecha de la venta' value={fechav} onChange={(e)=>{setFechav(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Total</label>
                            <input type="number" className="form-control" placeholder='Total' value={total} onChange={(e)=>{setTotal(e.target.value)}} disabled/>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Nombre del cliente</label>
                            <input type="text" className="form-control" placeholder='Nombre del cliente' value={nombrec} onChange={(e)=>{setNombrec(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Codigo del producto</label>
                            <select className="form-select" value={codigop} onChange={(e)=>{setCodigop(e.target.value); cargarTotal(cantidad, e.target.value, descuento)}}>
                                {opcionesProductos}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Subtotal</label>
                            <input type="number" className="form-control" placeholder='Subtotal' value={subtotal} onChange={(e)=>{setSubtotal(e.target.value)}} disabled/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Seleccione valor del descuento</label>
                            <select className="form-select" value={descuento} onChange={(e)=>{setDescuento(e.target.value); cargarTotal(cantidad, codigop, e.target.value)}}>
                                <option value="5">5%</option>
                                <option value="10">10%</option>
                                <option value="15">15%</option>
                                <option value="20">20%</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Vendedor encargado</label>
                            <select className="form-select" value={vendedor} onChange={(e)=>{setVendedor(e.target.value)}}>
                                {listaVendedores}
                            </select>
                        </div>
                    </div>
                    <div className='col-12'>
                        <button onClick={agregarVenta} className="btn btn-primary mt-3">Agregar ventar</button>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default AgregarVenta