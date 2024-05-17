import mongoose from "mongoose";

//crear coleccion
const userCollection = "Usuarios"

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 30},
    email: {type: String, required: true, max: 200}
})

const userModel = mongoose.model(userCollection, userSchema)

export default userModel


