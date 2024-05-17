import { Router } from "express";
import cartsModel from "../dao/models/carts.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    let carts = await cartsModel.find();
    res.send({ result: "success", payload: carts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error', message: "Error al cargar el carrito" })
  }
});

router.post("/", async (req, res) => {
  let { id, products_id } = req.body;
  if (!id || !products_id) {
    res.send({ status: "error", error: "Faltan parametros" });
  }
  let result = await cartsModel.create({ id, products_id });
  res.send({ result: "success", payload: result });
});

router.put("/:uid", async (req, res) => {
    let {uid} = req.params
    let cartToReplace = req.body

    if(!cartToReplace.id || !cartToReplace.products_id){
        res.send({ status: "error", error: "Parametros no definidos"})
    }

    let result = await cartsModel.updateOne({_id:uid}, cartToReplace)

    res.send({result: "success", payload: result})
}); 

router.delete("/:uid", async (req, res) => {
    let {uid} = req.params
    let result = await cartsModel.deleteOne({_id:uid})
    res.send({result: "success", payload: result})
});

export default router;
