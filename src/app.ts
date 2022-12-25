import express from "express";
import { Application } from "express";

//Import Routes
import userRoutes from "./routes/user.routes";

//Initialize express
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Define Routes
app.use("/api/user", userRoutes);

export default app;
