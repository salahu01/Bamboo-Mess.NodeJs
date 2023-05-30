import express from "express";
import employeeController from "../controller/employee_controller";

const router = express.Router();

router
    .route("/")
    .get(employeeController.getAllEmployees)
    .post(employeeController.createEmployee)
    .delete(employeeController.deleteEmployees)

router
    .route("/:id")
    .delete(employeeController.deleteEmployee);

export = router;
