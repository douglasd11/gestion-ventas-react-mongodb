const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gestion_ventas_db');

const objetobd = mongoose.connection

objetobd.on('connected', ()=>{
    console.log('conexion correcta a MongoDB')
})

objetobd.on('error', ()=>{
    console.log('Error conexion a MongoDB')
})

module.exports = mongoose