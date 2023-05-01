const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: "http://localhost:3000"
}))

//import conexion mongoDB
const archivoBD = require('./conexion')

// import bodyparser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: 'true'}))

//import routes
const rUsuario = require('./rutas/usuario')
const rRol = require('./rutas/rol')
const rVenta = require('./rutas/venta')
const rProducto = require('./rutas/producto')

app.use('/api/usuario', rUsuario)
app.use('/api/rol', rRol)
app.use('/api/venta', rVenta)
app.use('/api/producto', rProducto)


const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.end('Bienvenido al backend')
})

//configurando servidor
app.listen(PORT, (req, res) =>{
    console.log('server running: 3001')
})