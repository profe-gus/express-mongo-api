import mongoose from "mongoose";

export interface StudentInput{
        name:string;
        age: number;
        isActive: boolean;
        avg: number;
        email: string;
}

export interface StudentDocument extends StudentInput, mongoose.Document{}

const studentSchema = new mongoose.Schema({
    name:{ type: String, required: true },
    age:{ type: Number, required: true },
    isActive: {type: Boolean, required:true},
    avg: { type: Number, required: false },
    email: { type: String, requiered: true, unique: true }
});

export const StudentModel = mongoose.model<StudentDocument>("Student", studentSchema);