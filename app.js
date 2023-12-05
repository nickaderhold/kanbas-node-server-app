// const express = require("express");
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

Lab5(app);
app.use(express.json());
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
HelloRoutes(app);
// app.listen(4000);
app.listen(process.env.PORT || 4000);
