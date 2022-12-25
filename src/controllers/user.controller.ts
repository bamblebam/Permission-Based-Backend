// Import Types
import { NextFunction, Request, Response } from "express";

import User from "../models/User.model";

// Create and Save a new User
async function createUser(req: Request, res: Response, next: NextFunction) {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a User
  const user = {
    name: req.body.name,
  };

  // Save User in the database
  try {
    const data = await User.create(user);
    const response = data.toJSON() as Object;
    return res
      .status(200)
      .json({ message: "User created successfully", data: response });
  } catch (e: any) {
    res.status(500).send({
      message: e.message || "Some error occurred while creating the User.",
    });
  }
}

// Retrieve all Users from the database.
async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await User.findAll();
    const response = data.map((user) => user.toJSON()) as Object[];
    return res
      .status(200)
      .json({ message: "Users retrieved successfully", data: response });
  } catch (e: any) {
    res.status(500).send({
      message: e.message || "Some error occurred while retrieving users.",
    });
  }
}

// Retrieve user by id
async function getUserById(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  try {
    const data = await User.findByPk(id);
    if (!data) {
      return res.status(404).json({
        message: `Cannot find User with id=${id}.`,
      });
    }
    const response = data.toJSON() as Object;
    return res
      .status(200)
      .json({ message: "User retrieved successfully", data: response });
  } catch (e: any) {
    res.status(500).send({
      message: e.message || "Some error occurred while retrieving user.",
    });
  }
}

//Get all permissions for a user
async function getPermissionsByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  try {
    const data = await User.findByPk(id, {
      include: ["permissions"],
    });
    if (!data) {
      return res.status(404).json({
        message: `Cannot find User with id=${id}.`,
      });
    }
    const response = data.toJSON() as Object;
    return res
      .status(200)
      .json({ message: "User retrieved successfully", data: response });
  } catch (e: any) {
    res.status(500).send({
      message: e.message || "Some error occurred while retrieving user.",
    });
  }
}

export { createUser, getAllUsers, getUserById, getPermissionsByUserId };
