import React, { useEffect, useState } from 'react'
import clienteAxios from '../axios/ClienteAxios'
import MenuVentas from './menuVentas'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'


function EditarVenta(){

    const params = useParams()

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
    const[vendedor, setVendedor] = useState('0')


    useEffect(() => {
        clienteAxios.post('venta/obtenerVenta', {idventa: params.idventa}).then(res => {
            const dataventa = res.data[0]
            setNombrec(dataventa.nombrec)
            setFactura(dataventa.factura)
            setNombrec(dataventa.nombrec)
            setDnic(dataventa.dnic)
            setCodigop(dataventa.codigop)
            setCantidad(dataventa.cantidad)
            setSubtotal(dataventa.subtotal)
            setFechav(dataventa.fechav)
            setDescuento(dataventa.descuento)
            setTotal(dataventa.total)
            setVendedor(dataventa.vendedor)
        })
    }, [])
    
    function editarVenta(){
        var venta = {
            idventa: params.idventa,
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

        clienteAxios.post('venta/actualizarventa', venta)
        .then(err => {console.log(err)})

        Swal.fire({
            title: 'Venta',
            text: 'Actualizada correctamente',
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
            setDatausuario(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const listaVendedores = datausuario.map(usuario => {
        return <option key={usuario.idusuario} value={usuario.idusuario}>{usuario.nombre}</option>
    })

    return(
        <div className='container col-8 mt-4'>
            
            <MenuVentas></MenuVentas>
            
            <div className='container mt-5'>
                <h3>Editar venta</h3>
                
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
                        <button onClick={editarVenta} className="btn btn-primary mt-3">Editar ventar</button>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default EditarVenta