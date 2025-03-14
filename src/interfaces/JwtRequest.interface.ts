import {Request} from 'express';
import { UserRole } from '../models';

export interface JwtRequest extends Request{
    user?:{
        email:string,
        role: UserRole
    }
}