import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models';
import { JwtRequest } from '../interfaces/JwtRequest.interface';


export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let token = req.header('Authorization');
        if(!token){
            res.status(401).json({message: 'Unauthorized'});
            return;
        }
        token = token.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret' );
        req.body.user = decoded;
        next();
    }catch(error: any){
        res.status(500).json(error);
    }
}

export const authorizeRoles = (allowedRoles: UserRole[]) => {
    return (req: JwtRequest, res: Response, next: NextFunction) => {
        const user = req.body.user;

        if (user && !allowedRoles.includes(user.role)) {
            res.status(403).json({ message: `Forbidden, you are a ${user.role} and this service is only available for ${allowedRoles}` });
            return;
        }
        next();
    }
}