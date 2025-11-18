import express from 'express'
import {Product, ProductManager} from './ejercicio-clase-4.js'

//Creo mi app servidor
const app = express()

const PORT = 8080

//Levantamos el servidor
const server = app.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
})

server.on('error', error => {
    console.log (`error on server ${error}`)
}) //Manejo de errores


let products = new ProductManager('./productos.json')

console.log(products.getProducts())

//Peticiones get
app.get('/products', (req, res) => {

    res.send(products.getProducts())

})

//app.get()