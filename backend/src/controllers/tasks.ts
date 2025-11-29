import { type Request, type Response } from 'express';    
import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();

export const createTask =    async (req: Request, res: Response) => { 
    try { 

        const { title, description } = req.body;
        await client.task.create({ 
            data: { 
                title: title, 
                description: description,
                userId: req.user.id,
                }
            });
        res.send(`${req.user.username} wants to create a task`); 
    } catch (error) { 
        res.status(500).send('Error creating task'); 
    }
}   
export const getTasks = async (req: Request, res: Response) => { 
    try { 
        const tasks = await client.task.findFirst({  
            where: { 
                userId: req.user.id,
                AND:[{ userId: req.user.id }, { isDeleted: false } ]
            }
        }); 
        res.status(200).json(tasks); 
    } catch (error) { 
        res.status(500).send('Error retrieving tasks'); 
    }
}

export const getTask = async (req: Request, res: Response) => { 
    try { 
        const { id } = req.params;          }
        const task = await client.task.findFirst({  
            where: { 
                id: Number(id),     }
        }); 
        if (!task || task.isDeleted || task.userId !== req.user.id) { 
            return  res.status(404).send('Task not found'); 
        }
        res.status(200).json(task);
    } catch (error) { 
        res.status(500).send('Error retrieving task'); 

    }   

    export const updateTask = async (req: Request, res: Response) => { 
    try { 
        const { id } = req.params;          
        const userId = req.user.id;
        const { title, description } = req.body;        
        const task = await client.task.updateMany({  
            where: { 
                id: Number(id), 
                userId: userId,
                isDeleted: false
            },      
            data: { 
                title: title && title , 
                description: description && description,
                isCompleted: false,          
            }
        });     
        if (task.count === 0) {
            return res.status(404).send('Task not found or not authorized');
        }
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).send('Error updating task');
    }
}
export const completeTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
         const userId = req.user.id;
        const task = await client.task.updateMany({
            where: {  
                id: Number(id), 
                userId: userId,
                isDeleted: false
            },
            data : {
                isCompleted: true,
            }
        });     
        if (task.count === 0) {
            return res.status(404).send('Task not found or not authorized');
        }
        res.status(200).json({ message: 'Task marked as completed successfully' }); 
    } catch (error) {
        res.status(500).send('Error marking task as completed');
    }       
    
}
export const inCompleteTask = async (req: Request, res: Response) => {
    try {   
        const { id } = req.params;      
        const userId = req.user.id; 
        const task = await client.task.updateMany({
            where: {  
                id: Number(id), 
                userId: userId,
                isDeleted: false
            },
            data : {
                isInCompleted: false,
            }
        });         

        if (task.count === 0) {
            return res.status(404).send('Task not found or not authorized');
        }
        res.status(200).json({ message: 'Task marked as incomplete successfully' });
    } catch (error) {
        res.status(500).send('Error marking task as incomplete');
    }       
}   
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;  
        const userId = req.user.id;
        const task = await client.task.updateMany({
            where: {  
                id: Number(id), 
                userId: userId,
                isDeleted: false
            },      
            data: { 
                isDeleted: true,
            }
        });
        if (task.count === 0) {
            return res.status(404).send('Task not found or not authorized');
        }       
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).send('Error deleting task');
    }
}       
  export const trash = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const tasks = await client.task.findMany({          
            where: { 
                userId: userId,
                isDeleted: true,        
            }
        }); 
        res.status(200).json("deleted tasks"); 
    }       
    catch (error) { 
        res.status(500).send('Error retrieving trashed tasks'); 
    }
}
//recover a deleted task
export const recoverTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const task = await client.task.updateMany({
            where: {
                id: Number(id),
                userId: userId,
                isDeleted: true 
            },
            data: {
                isDeleted: false,
            }
        });     
        if (task.count === 0) {
            return res.status(404).send('Task not found or not authorized');
        }   
        res.status(200).json({ message: 'Task recovered successfully' });
    } catch (error) {
        res.status(500).send('Error recovering task');
    }
}   