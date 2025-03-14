import { StudentDocument, StudentInput, StudentModel } from '../models/student.model';
class StudentService{

    async create(data: StudentDocument){
        try{
            const student = await StudentModel.create(data);
            return student;
        }catch(error){
            throw error;
        }
    }

    async findByEmail(email:string){
        try{
            const student = await StudentModel.findOne({ email : email});
            return student;
        }catch(error){
            throw error;
        }
    }

    async getAll():Promise<StudentDocument[]>{
        try{
            const students: StudentDocument[] = await StudentModel.find();
            return students;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async updateStudent(email:string, student: StudentInput){
        try{
            const updatedStudent: StudentDocument | null = await StudentModel.findOneAndUpdate( { email: email}, student, {returnOriginal: false} );
            if(updatedStudent){
                updatedStudent.password = "";
            }
            return updatedStudent;
        }catch(error){
            throw error;
        }
    }

}
export const studentService = new StudentService();