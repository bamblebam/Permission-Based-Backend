// Import Types
import { NextFunction, Request, Response } from "express";

import Permission from "../models/Permission.model";
import Employee from "../models/Employee.model";

function checkPermission(table: string, column: String) {
  return async function (req: Request, res: Response, next: NextFunction) {
    //User Id
    const userId = req.headers.authorization?.replace(/^Bearer\s/, "");
    // console.log(userId);

    //Create permission key
    const permissionKey = `${table}.${column}.${req.method.toLowerCase()}`;
    // console.log(permissionKey);

    //Check if permission exists
    try {
      const permission = await Permission.findOne({
        where: { userId: userId, key: permissionKey },
      });
      //   console.log(permission?.dataValues);
      if (!permission) {
        return res.status(403).json({ message: "Permission denied" });
      }

      const resourceId = req.params.id;
      const employee = await Employee.findOne({ where: { id: resourceId } });
      if (!employee) {
        return res
          .status(404)
          .json({ message: "Employee not found from middleware" });
      }
      if (!permission.dataValues.value.includes(employee.dataValues.company)) {
        // console.log(employee.dataValues.column);
        return res.status(403).json({ message: "Permission denied" });
      }
      next();
    } catch (e: any) {
      res.status(500).send({
        message:
          e.message || "Some error occurred while retrieving permissions.",
      });
    }
  };
}

export default checkPermission;
