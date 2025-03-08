import { Router } from "express";
import { studentController } from "../controllers";

export const studentRouter = Router();

studentRouter.get("/", studentController.findAll);