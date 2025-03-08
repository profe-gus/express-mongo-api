import { StudentDocument, StudentModel } from '../models/student.model';
class StudentService{

    async getAll():Promise<StudentDocument[]>{
        try{
            const students: StudentDocument[] = await StudentModel.find();
            return students;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

}
export const studentService = new StudentService();