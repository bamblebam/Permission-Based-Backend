import express from "express";
import { Application } from "express";

//Initialize express
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
