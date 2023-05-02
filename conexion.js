const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dgdavid2:dg12345@gestionventas1.edum5w1.mongodb.net/?retryWrites=true&w=majority');


const objetobd = mongoose.connection

objetobd.on('connected', ()=>{
    console.log('conexion correcta a MongoDB')
})

objetobd.on('error', ()=>{
    console.log('Error conexion a MongoDB')
})

module.exports = mongoose