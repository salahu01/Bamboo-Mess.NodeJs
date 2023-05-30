import express from "express";
import recieptsController from "../controller/reciepts_controller";

const router = express.Router();

router
  .route("/")
  .get(recieptsController.getAllReciepts)
  .post(recieptsController.createReciepts)
  .delete(recieptsController.deleteReciepts);

export = router;
