// Import Types
import { NextFunction, Request, Response } from "express";

import Permission from "../models/Permission.model";
import User from "../models/User.model";

// Create and Save a new Permission
async function createPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Validate request
  if (!req.body.key || !req.body.value || !req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  //Check if permission exists beforehand
  try {
    const perm = await Permission.findOne({
      where: { userId: req.body.userId, key: req.body.key },
    });
    // console.log(perm);
    if (perm) {
      const value = perm.dataValues.value;
      if (!value.includes(req.body.value)) {
        perm.update({ value: [...value, req.body.value] });
        await perm.save();
        return res
          .status(200)
          .json({ message: "Permission updated successfully", data: perm });
      }
      return res
        .status(200)
        .json({ message: "Permission already exists", data: perm });
    }
  } catch (e: any) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while creating the Permission.",
    });
  }

  // Create a new Permission
  const permission = {
    key: req.body.key,
    value: [req.body.value],
    userId: req.body.userId,
  };

  // Save Permission in the database
  try {
    const data = await Permission.create(permission);
    const response = data.toJSON() as Object;
    return res
      .status(200)
      .json({ message: "Permission created successfully", data: response });
  } catch (e: any) {
    res.status(500).send({
      message:
        e.message || "Some error occurred while creating the Permission.",
    });
  }
}

// Retrieve all Permissions from the database.
async function getAllPermissions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await Permission.findAll();
    const response = data.map((permission) => permission.toJSON()) as Object[];
    return res
      .status(200)
      .json({ message: "Permissions retrieved successfully", data: response });
  } catch (e: any) {
    res.status(500).send({
      message: e.message || "Some error occurred while retrieving permissions.",
    });
  }
}

// Retrieve permission by id
async function getPermissionById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  try {
    const data = await Permission.findByPk(id);
    if (!data) {
      return res.status(404).json({
        message: `Cannot find Permission with id=${id}.`,
      });
    }
    const response = data.toJSON() as Object;
    return res
      .status(200)
      .json({ message: "Permission retrieved successfully", data: response });
  } catch (e: any) {
    res.status(500).send({
      message: "Error retrieving Permission with id=" + id,
    });
  }
}

//Update Permission by id
async function updatePermissionById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  const value = req.body.value;
  if (!value || value.length === 0) {
    return res.status(400).json({
      message: "Content can not be empty!",
    });
  }
  try {
    const data = await Permission.findByPk(id);
    if (!data) {
      return res.status(404).json({
        message: `Cannot find Permission with id=${id}.`,
      });
    }
    data.update({ value: value });
    await data.save();
    const response = data.toJSON() as Object;
    return res
      .status(200)
      .json({ message: "Permission updated successfully", data: response });
  } catch (e: any) {
    res.status(500).send({
      message: "Error retrieving Permission with id=" + id,
    });
  }
}

//Delete Permission by id
async function deletePermissionById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  try {
    const data = await Permission.destroy({
      where: { id: id },
    });
    if (!data) {
      return res.status(404).json({
        message: `Cannot delete Permission with id=${id}.`,
      });
    }
    return res
      .status(200)
      .json({ message: "Permission deleted successfully", data: data });
  } catch (e: any) {
    res.status(500).send({
      message: "Error deleting Permission with id=" + id,
    });
  }
}

export {
  createPermission,
  getAllPermissions,
  getPermissionById,
  deletePermissionById,
  updatePermissionById,
};
