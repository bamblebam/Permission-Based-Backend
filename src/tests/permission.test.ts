import sequelize from "../db";
var supertest = require("supertest");
import app from "../app";
import User from "../models/User.model";
import Permission from "../models/Permission.model";

beforeEach(async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
});

describe("Permission", () => {
  describe("Get all permissions", () => {
    it("should return all permissions", async () => {
      const { body, statusCode } = await supertest(app).get(
        "/api/permission/all"
      );
      expect(statusCode).toBe(200);
      expect(body.data).toEqual([]);
      expect(body.message).toEqual("Permissions retrieved successfully");
    });
  });

  describe("Get permission by id", () => {
    describe("Given permission exists", () => {
      it("should return permission", async () => {
        const user = await User.create({
          name: "Test User 1",
        });
        const permission = await Permission.create({
          key: "employee.company.get",
          value: ["Amazon"],
          userId: user.dataValues.id,
        });
        const { body, statusCode } = await supertest(app).get(
          "/api/permission/1"
        );
        expect(statusCode).toBe(200);
        expect(body.data).toEqual({
          key: "employee.company.get",
          value: ["Amazon"],
          userId: user.dataValues.id,
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
        expect(body.message).toEqual("Permission retrieved successfully");
      });
    });

    describe("Given permission does not exist", () => {
      it("should return error", async () => {
        const { body, statusCode } = await supertest(app).get(
          "/api/permission/1"
        );
        expect(statusCode).toBe(404);
        expect(body.message).toEqual("Cannot find Permission with id=1.");
      });
    });
  });

  describe("Create permission", () => {
    describe("Permission being created and the key userId pair doesn't exist", () => {
      it("should create permission", async () => {
        const user = await User.create({
          name: "Test User 1",
        });
        const { body, statusCode } = await supertest(app)
          .post("/api/permission/create")
          .send({
            key: "employee.company.get",
            value: "Amazon",
            userId: user.dataValues.id,
          });
        expect(statusCode).toBe(200);
        expect(body.data).toEqual({
          key: "employee.company.get",
          value: ["Amazon"],
          userId: user.dataValues.id,
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
        expect(body.message).toEqual("Permission created successfully");
      });
    });

    describe("Permission being created and the key userId pair exists with different value", () => {
      it("should update permission scope", async () => {
        const user = await User.create({
          name: "Test User 1",
        });
        await supertest(app).post("/api/permission/create").send({
          key: "employee.company.get",
          value: "Google",
          userId: user.dataValues.id,
        });
        const { body, statusCode } = await supertest(app)
          .post("/api/permission/create")
          .send({
            key: "employee.company.get",
            value: "Amazon",
            userId: user.dataValues.id,
          });
        expect(statusCode).toBe(200);
        expect(body.data.value.length).toEqual(2);
        expect(body.message).toEqual("Permission updated successfully");
      });
    });

    describe("Permission being created and the key userId pair exists with same value", () => {
      it("should not update permission scope", async () => {
        const user = await User.create({
          name: "Test User 1",
        });
        await supertest(app).post("/api/permission/create").send({
          key: "employee.company.get",
          value: "Google",
          userId: user.dataValues.id,
        });
        const { body, statusCode } = await supertest(app)
          .post("/api/permission/create")
          .send({
            key: "employee.company.get",
            value: "Google",
            userId: user.dataValues.id,
          });
        expect(statusCode).toBe(200);
        expect(body.data.value.length).toEqual(1);
        expect(body.message).toEqual("Permission already exists");
      });
    });

    describe("Request body does not have all params", () => {
      it("should return error", async () => {
        const { body, statusCode } = await supertest(app)
          .post("/api/permission/create")
          .send({
            key: "employee.company.get",
            value: "Google",
          });
        expect(statusCode).toBe(400);
        expect(body.message).toEqual("Content can not be empty!");
      });
    });
  });

  describe("Update Permission", () => {
    describe("Given permission exists", () => {
      it("should update permission", async () => {
        const user = await User.create({
          name: "Test User 1",
        });
        const permission = await supertest(app)
          .post("/api/permission/create")
          .send({
            key: "employee.company.get",
            value: "Google",
            userId: user.dataValues.id,
          });
        // console.log(permission.body.data);
        const { body, statusCode } = await supertest(app)
          .put("/api/permission/update/1")
          .send({
            value: ["Amazon"],
          });
        expect(statusCode).toBe(200);
        expect(body.data).toEqual({
          key: "employee.company.get",
          value: ["Amazon"],
          userId: user.dataValues.id,
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
        expect(body.message).toEqual("Permission updated successfully");
      });
    });

    describe("Given permission does not exist", () => {
      it("it should create new permission", async () => {
        const user = await User.create({
          name: "Test User 1",
        });
        const { body, statusCode } = await supertest(app)
          .put("/api/permission/update/1")
          .send({
            key: "employee.company.get",
            value: "Amazon",
            userId: user.dataValues.id,
          });
        expect(statusCode).toBe(200);
        expect(body.data).toEqual({
          key: "employee.company.get",
          value: ["Amazon"],
          userId: user.dataValues.id,
          id: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
        expect(body.message).toEqual("Permission created successfully");
      });
    });

    describe("Request body does not have all params", () => {
      it("should return error", async () => {
        const { body, statusCode } = await supertest(app)
          .put("/api/permission/update/1")
          .send({
            key: "employee.company.get",
          });
        expect(statusCode).toBe(400);
        expect(body.message).toEqual("Content can not be empty!");
      });
    });
  });

  describe("Delete Permission", () => {
    describe("Given permission exists", () => {
      it("should delete permission", async () => {
        const user = await User.create({
          name: "Test User 1",
        });
        const permission = await supertest(app)
          .post("/api/permission/create")
          .send({
            key: "employee.company.get",
            value: "Google",
            userId: user.dataValues.id,
          });
        const { body, statusCode } = await supertest(app).delete(
          "/api/permission/delete/1"
        );
        expect(statusCode).toBe(200);
        expect(body.data).toEqual(1);
        expect(body.message).toEqual("Permission deleted successfully");
      });
    });
    describe("Given permission does not exist", () => {
      it("should return error", async () => {
        const { body, statusCode } = await supertest(app).delete(
          "/api/permission/delete/1"
        );
        expect(statusCode).toBe(404);
        expect(body.message).toEqual("Cannot delete Permission with id=1.");
      });
    });
  });
});
