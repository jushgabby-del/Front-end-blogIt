import { type Request, type Response, type NextFunction } from 'express'; 
import jwt from 'jsonwebtoken';
import type { User } from '../user.js';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    //  implementation for token verification

    const { authToken } = req.cookies;
    
    if (!authToken) {

        return res.status(401).send('Access Denied: No Token Provided!');
    }
    try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY!);
    req .user = decoded as User 
    next();                                         
res.send("verifying...");
} 
catch (error) {
     res.status(400).json('Invalid Token');
     } }

