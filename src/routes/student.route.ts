import { Router } from "express";
import { studentController } from "../controllers";
import { auth, authorizeRoles } from "../middlewares/auth.middleware";

export const studentRouter = Router();

studentRouter.get("/", studentController.findAll);
studentRouter.post("/create", auth, authorizeRoles(['admin', 'teacher']),studentController.create);
studentRouter.post("/login", studentController.login);
studentRouter.put("/update/:email", studentController.update);

