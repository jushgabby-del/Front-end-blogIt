import {type Request, type Response ,type NextFunction}    from 'express';
import zxcvbn from 'zxcvbn'

export async function checkPasswordStrength (req: Request, res: Response, next: NextFunction) {

    const {password} = req.body
    const result = zxcvbn(password)
 if ( result.score<3){
    res.status(400).json({message: " we suggest you use a  stronger password for better experience"})
     return;
 }
 next();
}
