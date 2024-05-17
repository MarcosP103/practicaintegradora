import express from "express";
import mongoose from "mongoose";
import userRouter from './routes/users.router.js'
import cartsRouter from "./routes/carts.router.js";
import productRouter from "./routes/products.router.js";
import chatRouter from "./routes/chat.router.js"

import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import viewsRouter from "./routes/views.router.js"
import { Server } from "socket.io"

import dotenv from 'dotenv'
dotenv.config()
console.log(process.env.MONGO_URL)

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`))
const socketServer = new Server(httpServer)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use('/', viewsRouter)

//Conexion MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {console.log("Conectado a la base de datos")})
  .catch((error) => console.error("Error en la conexion", error));

//Routes
app.use('/api/users', userRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/products', productRouter)
app.use('/api/chat', chatRouter)

//Socket.io

let messages = []

socketServer.on("connection", socket => {
  console.log("Nuevo cliente conectado")

  socket.on("message", data => {
    messages.push(data)
    socketServer.emit("messageLogs", messages)
  })
})

