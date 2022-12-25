import express from "express";
import { Application } from "express";

//Import Routes
import userRoutes from "./routes/user.routes";
import permissionRoutes from "./routes/permission.routes";

//Initialize express
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Define Routes
app.use("/api/user", userRoutes);
app.use("/api/permission", permissionRoutes);

export default app;
