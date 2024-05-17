import { Router } from "express";
import productModel from "../dao/models/products.model.js"

const router = Router();

router.get("/", async (req, res) => {
  try {
    let product = await productModel.find();
    res.send({ result: "success", payload: product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error', message: "Error al cargar los productos" })
  }
});

router.post("/", async (req, res) => {
  let { title, description, code, price, status, stock, category, thumbnails } = req.body;
  if (!title || !description || !code || !price || !status || !stock || !category ) {
    res.status(400).send({ status: "error", error: "Faltan parametros" });
  }
  let result = await productModel.create({ title, description, code, price, status, stock, category, thumbnails });
  res.send({ result: "success", payload: result });
});

router.put("/:uid", async (req, res) => {
    let {uid} = req.params
    let productToReplace = req.body

    if(!productToReplace.title || !productToReplace.description || !productToReplace.code || !productToReplace.price || !productToReplace.status || !productToReplace.stock || !productToReplace.category || !productToReplace.thumbnails){
        res.send({ status: "error", error: "Parametros no definidos"})
    }

    let result = await productModel.updateOne({_id:uid}, productToReplace)
    res.send({result: "success", payload: result})
}); 

router.delete("/:uid", async (req, res) => {
    let {uid} = req.params
    let result = await productModel.deleteOne({_id:uid})
    res.send({result: "success", payload: result})

});

export default router;
