import {type Request, type Response ,type NextFunction}    from 'express';


export function checkDetails (req: Request, res: Response, next: NextFunction) {
     const {firstName, lastName, emailAddress, userName, password} = req.body;
     if (!firstName){
        res.status(400).json({message: "First name is required"})
        return;
     }
      if (!lastName){
        res.status(400).json({message: "Last name is required"})
        return;
     }
      if (!emailAddress){
        res.status(400).json({message: "A valid email address is required"})
        return;
     }
      if (!userName){
        res.status(400).json({message: "A valid user name is required"})
        return;
     }
        if (!password){
           res.status(400).json({message: "A valid password and  matching credentials are required"})
           return;
        }
        next();
   }