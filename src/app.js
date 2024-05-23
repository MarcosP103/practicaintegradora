import express from "express";
import { Server } from "socket.io"
import handlebars from "express-handlebars"
import dotenv from 'dotenv'
import connectDB from "./config/db.js";
import userRouter from './routes/users.router.js'
import cartsRouter from "./routes/carts.router.js";
import productRouter from "./routes/products.router.js";
import chatRouter from "./routes/chat.router.js"
import viewsRouter from "./routes/views.router.js"
import __dirname from "./utils.js"

//Cargar variables de entorno y conectar a MongoDB
dotenv.config()
connectDB()

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

