import express from "express";
import productController from "../controller/products_conroller";

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createOneProduct);[]

router
  .route("/:id")
  .get(productController.getOneProduct)
  .patch(productController.patchOneProduct)
  .delete(productController.deleteOneProduct);

export = router;
