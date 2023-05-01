const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const schema = mongoose.Schema

const schemaventa = new schema({
    idventa: String,
    factura: Number,
    nombrec: String,
    dnic: Number,
    codigop: Number,
    cantidad: Number,
    subtotal: Number,
    fechav: String,
    descuento: Number,
    total: Number,
    vendedor: String
})

const ModeloVenta = mongoose.model('ventas', schemaventa)
module.exports = router

router.post('/agregarVenta', (req, res) => {
    
    const nuevaventa = new ModeloVenta({
        idventa: req.body.idventa,
        factura: req.body.factura,
        nombrec: req.body.nombrec,
        dnic: req.body.dnic,
        codigop: req.body.codigop,
        cantidad: req.body.cantidad,
        subtotal: req.body.subtotal,
        fechav: req.body.fechav,
        descuento: req.body.descuento,
        total: req.body.total,
        vendedor: req.body.vendedor
    })

    nuevaventa.save()
    res.send('guardado correctamente')
})


router.get('/obtenerVentas', async (req, res) => {

    const doc = await ModeloVenta.find()
    res.send(doc)
})

router.post('/obtenerVenta', async (req, res) => {

    const doc = await ModeloVenta.find({idventa: req.body.idventa})
    res.send(doc)
})

router.post('/actualizarVenta', async (req, res) => {
    
    await ModeloVenta.findOneAndUpdate({idventa: req.body.idventa}, {
        factura: req.body.factura,
        nombrec: req.body.nombrec,
        dnic: req.body.dnic,
        codigop: req.body.codigop,
        cantidad: req.body.cantidad,
        subtotal: req.body.subtotal,
        fechav: req.body.fechav,
        descuento: req.body.descuento,
        total: req.body.total,
        vendedor: req.body.vendedor
    })
    
    res.send('actualizado correctamente')
})

router.post('/borrarVenta', async (req, res) => {
    
    await ModeloVenta.findOneAndDelete({idventa: req.body.idventa})
    res.send('Eliminado correctamente')
})



