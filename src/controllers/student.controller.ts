import { Request, Response } from "express";
import { securityService, studentService } from "../services";
import { StudentDocument, StudentInput } from "../models";

class StudentController{

    async create(req: Request, res: Response){
        try{
            const userExist : StudentDocument | null = await studentService.findByEmail(req.body.email);
            if(userExist){
                res.status(400).json({message: `the user ${req.body.email} already exist!`});
                return;
            }
            req.body.password = await securityService.encryptPassword(req.body.password);
            const user: StudentDocument = await studentService.create(req.body);
            res.status(201).json(user);

        }catch(error){
            res.status(500).json(`the user hasn't been created`)
            return;
        }
    }

    async findAll(req: Request, res: Response){
        try{
            const students: StudentDocument[] = await studentService.getAll();
            res.json(students);
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async login(req: Request, res: Response){
        /*
        recibir usuario y contraseña
        buscar que exista el usuario
        comparar las contraseñas (vieja y la actual)
        generar un token en caso de login exitoso. 
        */
       try{
            const student:StudentDocument | null = await studentService.findByEmail(req.body.email);
            if(!student){
                res.status(400).json({ message: `student ${req.body.email} not found.`});
                return;
            }
            const isMatch = await securityService.comparePasswords(req.body.password, student.password);

            if(!isMatch){
                res.status(400).json({
                    message: `User or password incorrect`
                });
            }
            const token = await securityService.generateToken(student.id, student.email, student.role);
            res.status(200).json({
                message: "login successfull",
                token: token
            })

       }catch(error){
        res.status(500).json({
            message: "Login incorrect"
        })
       }
    }

    async update(req: Request, res: Response){
        try{
            const email: string = req.params.email;
            const student: StudentDocument | null = await studentService.updateStudent(email, req.body as StudentInput);
            if(student === null){
                res.status(404).json({message: `User ${email} not found.`})
            }
            res.json(student);
        }catch(error){
            res.status(500).json({message: `The user ${req.body.email} cannot be updated.`})
        }
    }

}
export const studentController = new StudentController();