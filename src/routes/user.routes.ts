//Import Package
import express from "express";

//Import Types
import { Router } from "express";

//Import Controllers
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller";

//Create Router
const router: Router = express.Router();

//Create User
router.post("/create", createUser);

//Get All Users
router.get("/all", getAllUsers);

//Get User By Id
router.get("/:id", getUserById);

export default router;
