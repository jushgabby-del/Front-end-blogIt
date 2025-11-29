//get user profile//
//updating user profile//
//deleting user profile//       
//changing user password//
import { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';  
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

export const getUserProfile = async (req: Request, res: Response) => {      
    try {

        const userId = req.user.id;
        const user = await prisma.user.findUnique({ 
            where: { id: userId },      
        select: {
            id: true,
            username: true,
            email: true, 
            createdAt: true,
            updatedAt: true,
        },
        });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Error retrieving user profile');
    }
};

export const updateUserProfile = async (req: Request, res: Response) => {   
    try {
        const userId = req.user.id;
        const { username, email } = req.body;   
        const updatedUser = await prisma.user.update({ 
            where: { id: userId }, 
            data: { username : username && username.trim() !== '' ? username : undefined, 
                    emailAddress: email && email.trim() !== '' ? email   : undefined,
                    firstName: firstName && firstName.trim() !== '' ? firstName : undefined,
                    lastName: lastName && lastName.trim() !== '' ? lastName : undefined,    

            }, 
        });
        res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).send('Error updating user profile');
    }
};  

export const deleteUserProfile = async (req: Request, res: Response) => {   
    try {
        const userId = req.user.id;     
        await prisma.user.delete({ 
            where: { id: userId }, 
        });
        res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
        res.status(500).send('Error deleting user profile');
    }   
};  
export const changeUserPassword = async (req: Request, res: Response) => {   
    try {
        const userId = req.user.id;
        const { previousPassword,   newPassword } = req.body;   
        const user = await prisma.user.findUnique({              
            where: { id: userId }, 
        }); 
        // Here you would normally hash the password before saving it
        //compare previous password
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        
        const isMatch = await bcrypt.compare(previousPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Previous password is incorrect' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);  
        await prisma.user.update({              
            where: { id: userId },


            data: { password: newPassword }, 
        });
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).send('Error changing password');
    }   
};          