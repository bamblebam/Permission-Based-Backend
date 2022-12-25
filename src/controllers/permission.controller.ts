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

  // Create a Permission
  const permission = {
    key: req.body.key,
    value: req.body.value,
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

export { createPermission, getAllPermissions, getPermissionById };
