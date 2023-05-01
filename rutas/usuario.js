const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const schema = mongoose.Schema

const schemausuario = new schema({
    idusuario: String,
    correo: String,
    documento: String,
    nombre: String,
    apellido: String,
    clave: String,
    perfil: String
})

const ModeloUsuario = mongoose.model('usuarios', schemausuario)
module.exports = router

router.post('/agregarUsuario', (req, res) => {
    
    const nuevousuario = new ModeloUsuario({
        idusuario: req.body.idusuario,
        correo: req.body.correo,
        documento: req.body.documento,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        clave: req.body.clave,
        perfil: req.body.perfil
    })

    nuevousuario.save()
    res.send('guardado correctamente')
})

router.get('/obtenerUsuarios', async (req, res) => {

    const doc = await ModeloUsuario.find()
    res.send(doc)
})

router.post('/obtenerUsuario', async (req, res) => {

    const doc = await ModeloUsuario.find({idusuario: req.body.idusuario})
    res.send(doc)
})

router.post('/actualizarUsuario', async (req, res) => {
    
    await ModeloUsuario.findOneAndUpdate({idusuario: req.body.idusuario}, {
        correo: req.body.correo,
        documento: req.body.documento,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        clave: req.body.clave,
        perfil: req.body.perfil
    })
    
    res.send('actualizado correctamente')
})

router.post('/borrarUsuario', async (req, res) => {
    
    await ModeloUsuario.findOneAndDelete({idusuario: req.body.idusuario})
    res.send('Eliminado correctamente')
})



