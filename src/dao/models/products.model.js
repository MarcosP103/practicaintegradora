import mongoose from "mongoose";

//crear coleccion
const productCollection = "Producto"

const productSchema = new mongoose.Schema({
    title: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 100},
    code: {type: Number, required: true, min: 1},
    price: {type: Number, required: true, min: 1},
    status: {type: Boolean, required: true},
    stock: {type: Number, required: true, min: 1},
    category: {type: String, required: true, max: 30},
    thumbnail: {type: String, required: true}
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel


