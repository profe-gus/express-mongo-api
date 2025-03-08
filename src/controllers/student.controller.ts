import { Request, Response } from "express";
import { studentService } from "../services";
import { StudentDocument } from "../models";

class StudentController{

    async findAll(req: Request, res: Response){
        try{
            const students: StudentDocument[] = await studentService.getAll();
            res.json(students);
        }catch(error){
            console.log(error);
            throw error;
        }
    }

}
export const studentController = new StudentController();