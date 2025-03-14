import mongoose from "mongoose";

export type UserRole  = 'admin' | 'student' | 'teacher';
export interface StudentInput{
        name:string;
        age: number;
        isActive: boolean;
        avg: number;
        email: string;
        password:string;
        role:UserRole;
}

export interface StudentDocument extends StudentInput, mongoose.Document{}

const studentSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    age:{ type: Number, required: true },
    isActive: {type: Boolean, required:true},
    avg: { type: Number, required: false },
    email: { type: String, requiered: true, unique: true },
    password:{ type: String, required: true },
    role:{ type: String, required: true },

});

export const StudentModel = mongoose.model<StudentDocument>("Student", studentSchema);