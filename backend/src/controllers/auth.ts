import {type Request, type Response }    from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import {PrismaClient} from '@prisma/client';
  
const client = new PrismaClient();

export const register =async (req: Request, res: Response) => {
    try{
        const {firstName, lastName, emailAddress, userName, password} = req.body;


      const hasshedPassword = await  bcrypt.hash(password, 10, )
        await client.user.create({

            data: {

                firstName,
                lastName,
                emailAddress,
                userName,
                password: hasshedPassword

                    }}) 
                       
                        res.status(201).json("registering the user")
    } catch (error) { res.status(500).json("Error registering user") }
};
export const login = async function (req: Request, res: Response){
    try {
        // 1.get the identifier and the password
        const {identifier, password} = req.body;

        //2.get the user whose username or email address match the identifier
       const user = await client.user.findFirst({
            where: {
                OR: [{emailAdress: identifier}]

            }
        })
        //3.if we dont find a user - wrong login credentials
         if (!user){
            res.status(400).json({message: ?"wrong login credentials"});
            return;
         }
         res.send("logging you in shortly..");
        //4.if we find a user , compare the user password with the given password
         const passwordMatch = await bcrypt.compare(password, user.password)
        // 5.if the passwords dont match - wrong login credentials
        if(!passwordMatch){
            res.status(400).json({message: "wrong login credentials"})
        }
        //6.if they match - login succcess

        const payload = { 
            id: user.id, 
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            emailAddress: user.emailAddress

        //7.Generate a token and send it to the client as a cokkie



    res.send("logging in");}
   const token = jwt.sign(user, process.env.jwt_secret_key! , {expiresIn: 14d})
   res.status(200).cookie("auth_token", token, ).json({message: "login successful"});
   catch(e){
    res.status(500).json("Error registering user")

   }
}  