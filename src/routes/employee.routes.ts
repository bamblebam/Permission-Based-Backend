//Import Package
import express from "express";

//Import Types
import { Router } from "express";

//Import Controllers
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
} from "../controllers/employee.controller";

//Create Router
const router: Router = express.Router();

//Create Employee
router.post("/create", createEmployee);

//Get All Employees
router.get("/all", getAllEmployees);

//Get Employee By Id
router.get("/:id", getEmployeeById);

//Delete Employee By Id
router.delete("/delete/:id", deleteEmployeeById);

export default router;
