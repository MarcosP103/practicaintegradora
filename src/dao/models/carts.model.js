import mongoose from "mongoose";

//crear coleccion
const cartsCollection = "Carrito"

const cartsSchema = new mongoose.Schema({
    id: {type: Number, required: true, max: 100},
    products_id: {type: String, required: true}
})

const cartsModel = mongoose.model(cartsCollection, cartsSchema)

export default cartsModel


