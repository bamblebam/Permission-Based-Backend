// Import Types
import { NextFunction, Request, Response } from "express";

import Employee from "../models/Employee.model";

// Create and Save a new Employee
async function createEmployee(req: Request, res: Response, next: NextFunction) {
  // Validate request
  if (!req.body.company || !req.body.salary) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Employee
  const employee = {
    company: req.body.company,
    salary: req.body.salary,
    userId: req.body.userId,
  };

  // Save Employee in the database
  try {
    const data = await Employee.create(employee);
    const response = data.toJSON() as Object;
    return res
      .status(200)
      .json({ message: "Employee created successfully", data: response });
  } catch (e: any) {
    res.status(500).send({
      message: e.message || "Some error occurred while creating the Employee.",
    });
  }
}

// Retrieve all Employees from the database.
async function getAllEmployees(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await Employee.findAll();
    const response = data.map((employee) => employee.toJSON()) as Object[];
    return res
      .status(200)
      .json({ message: "Employees retrieved successfully", data: response });
  } catch (e: any) {
    res.status(500).send({
      message: e.message || "Some error occurred while retrieving employees.",
    });
  }
}

// Retrieve employee by id
async function getEmployeeById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  try {
    const data = await Employee.findByPk(id);
    if (!data) {
      return res.status(404).json({
        message: `Cannot find Employee with id=${id}.`,
      });
    }
    const response = data.toJSON() as Object;
    return res
      .status(200)
      .json({ message: "Employee retrieved successfully", data: response });
  } catch (e: any) {
    res.status(500).send({
      message: "Error retrieving Employee with id=" + id,
    });
  }
}

//Delete employee by id
async function deleteEmployeeById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  try {
    const data = await Employee.destroy({
      where: { id: id },
    });
    if (!data) {
      return res.status(404).json({
        message: `Cannot delete Employee with id=${id}.`,
      });
    }
    return res.status(200).json({
      message: "Employee was deleted successfully!",
    });
  } catch (e: any) {
    res.status(500).send({
      message: "Could not delete Employee with id=" + id,
    });
  }
}

export { createEmployee, getAllEmployees, getEmployeeById, deleteEmployeeById };
