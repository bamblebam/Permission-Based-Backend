//Import Package
import express from "express";

//Import Types
import { Router } from "express";

//Import Controllers
import {
  createPermission,
  getAllPermissions,
  getPermissionById,
} from "../controllers/permission.controller";

//Create Router
const router: Router = express.Router();

//Create Permission
router.post("/create", createPermission);

//Get All Permissions
router.get("/all", getAllPermissions);

//Get Permission By Id
router.get("/:id", getPermissionById);

export default router;
