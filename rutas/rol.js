const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const schema = mongoose.Schema

const schemarol = new schema({
    idrol: String,
    nombre: String,
    perm1: Boolean,
    perm2: Boolean,
    perm3: Boolean
})

const ModeloRol = mongoose.model('roles', schemarol)
module.exports = router

router.post('/agregarRol', (req, res) => {
    
    const nuevorol = new ModeloRol({
        idrol: req.body.idrol,
        nombre: req.body.nombre,
        perm1: req.body.perm1,
        perm2: req.body.perm2,
        perm3: req.body.perm3
    })
    
    nuevorol.save()
    res.send('guardado correctamente')
})


router.get('/obtenerRoles', async (req, res) => {

    const doc = await ModeloRol.find()
    res.send(doc)
})

router.post('/obtenerRol', async (req, res) => {

    const doc = await ModeloRol.find({idrol: req.body.idrol})
    res.send(doc)
})

router.post('/actualizarRol', async (req, res) => {
    
    await ModeloRol.findOneAndUpdate({idrol: req.body.idrol}, {
        nombre: req.body.nombre,
        perm1: req.body.perm1,
        perm2: req.body.perm2,
        perm3: req.body.perm3
    })
    res.send('actualizado correctamente')
})

router.post('/borrarRol', async (req, res) => {
    
    await ModeloRol.findOneAndDelete({idrol: req.body.idrol})
    res.send('Eliminado correctamente')
})



