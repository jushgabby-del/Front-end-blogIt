import { type Request, type Response, type NextFunction } from 'express';


function validateBlogDetails(req: Request, res: Response, next: NextFunction) {
    const { title, description } = req.body;
    if(!title || !description) {
        return res.status(400).send('Title and Description are required');
    }
    next(); 
}

export default validateBlogDetails ;