//Import Package
import express from "express";

//Import Types
import { Router } from "express";

//Import Controllers
import {
  createPermission,
  getAllPermissions,
  getPermissionById,
  deletePermissionById,
  updatePermissionById,
} from "../controllers/permission.controller";

//Create Router
const router: Router = express.Router();

//Create Permission
router.post("/create", createPermission);

//Get All Permissions
router.get("/all", getAllPermissions);

//Get Permission By Id
router.get("/:id", getPermissionById);

//Delete Permission By Id
router.delete("/delete/:id", deletePermissionById);

//Update Permission By Id
router.put("/update/:id", updatePermissionById);

export default router;
