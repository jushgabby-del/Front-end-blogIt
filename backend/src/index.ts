import express, {
    type Request,
    type Response,
    type NextFunction } 
    from 'express';
 import dotenv from 'dotenv';
import {register, login, logout} from './controllers/auth.ts'
import {checkdetails} from '/middlewares/checkDetails.ts'
import {checkUsernameandEmail} from '/middlewares/checkUsernameandEmail.ts'
import {checkPasswordStrength} from /middlewares/checkPasswordStrength.ts'
import {verifyToken} from './middlewares/verifyToken.ts'
import {createTask, getTasks, recoverTask, updateTask} from './controllers/tasks.ts'
import {validateTaskDetails} from './middlewares/validateTaskDetails.ts';      

import { PrismaClient } from '@prisma/client';
import { changeUserPassword, deleteUserProfile, getUserProfile, updateUserProfile } from './controllers/user.ts';

const prisma = new PrismaClient();


const app = express();
dotenv.config();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
});


app.post('/auth/register',
     checkdetails, 
     checkUsernameandEmail, 
     checkPasswordStrength,
      register,
    ); 
    app.post("auth/login", login)
    app.post("auth/logout", logout)

    // Task endpoints   
    app.post('/tasks', verifyToken, validateTaskDetails, createTask);
   app.get('/tasks', verifyToken, getTasks);
   app.get('/tasks/trash', verifyToken, trash);
   app.get('/tasks/:id', verifyToken, getTasks);
   
   app.patch('/tasks/completed:id', verifyToken, completeTask);
   app.patch('/tasks/:incomplete:id', verifyToken, validateTaskDetails, inCompleteTask);
   app.patch('/tasks/:id', verifyToken, validateTaskDetails, updateTask);
   app.patch('/tasks/restore/:id', verifyToken, recoverTask);
   
   app.delete('/tasks/:id', verifyToken, deleteTask);
             

// user profile endpoints
   app.get('/user/profile', verifyToken, getUserProfile);
   app.patch('/user/profile', verifyToken, updateUserProfile);
   app.delete('/user/profile', verifyToken, deleteUserProfile);
   app.patch('/user/change-password', verifyToken, changeUserPassword);
   
    const PORT = 5000; 
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });