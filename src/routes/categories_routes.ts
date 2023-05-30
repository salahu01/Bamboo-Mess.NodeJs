import express from "express";
import categoryController from "../controller/categories_controller";

const router = express.Router();

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

router
  .route("/:id")
  .get(categoryController.getOneCategory)
  .delete(categoryController.deleteCategory);

export = router;
