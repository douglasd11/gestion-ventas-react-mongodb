const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const schema = mongoose.Schema

const schemarol = new schema({
    idproducto: String,
    codigop: Number,
    nombre: String,
    descripcion: String,
    color: String,
    talla: String,
    categoria: String,
    precio: Number,
    inventario: Number
})

const ModeloProducto = mongoose.model('productos', schemarol)
module.exports = router

router.post('/agregarProducto', (req, res) => {
    
    const nuevoproducto = new ModeloProducto({
        idproducto: req.body.idproducto,
        codigop: req.body.codigop,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        color: req.body.color,
        talla: req.body.talla,
        categoria: req.body.categoria,
        precio: req.body.precio,
        inventario: req.body.inventario
    })

    nuevoproducto.save()
    res.send('guardado correctamente')
})


router.get('/obtenerProductos', async (req, res) => {

    const doc = await ModeloProducto.find()
    res.send(doc)
})

router.post('/obtenerProducto', async (req, res) => {

    const doc = await ModeloProducto.find({idproducto: req.body.idproducto})
    res.send(doc)
})

router.post('/actualizarProducto', async (req, res) => {
    
    await ModeloProducto.findOneAndUpdate({idproducto: req.body.idproducto}, {
        codigop: req.body.codigop,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        color: req.body.color,
        talla: req.body.talla,
        categoria: req.body.categoria,
        precio: req.body.precio,
        inventario: req.body.inventario
    })
    
    res.send('actualizado correctamente')
})

router.post('/borrarProducto', async (req, res) => {
    
    await ModeloProducto.findOneAndDelete({idproducto: req.body.idproducto})
    res.send('Eliminado correctamente')
})



