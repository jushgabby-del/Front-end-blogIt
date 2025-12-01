import express, {  type Request, type Response, type  NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

// AUTH CONTROLLERS
import { register, login, logout } from './controllers/auth.ts';

// MIDDLEWARES
import { checkDetails } from './middlewares/checkDetails.ts';
import  checkUsernameAndEmail  from './middlewares/checkUsernameandEmail.ts';
import { checkPasswordStrength } from './middlewares/checkPasswordStrength.ts';
import { verifyToken } from './middlewares/verifyToken.ts';

// BLOG CONTROLLERS
import {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  restoreBlog,
  getTrashedBlogs,
  completeBlog,
  incompleteBlog
} from './controllers/blogs.ts';

import  validateBlogDetails from './middlewares/validateBlogDetails.ts';

// USER CONTROLLERS
import {
  changeUserPassword,
  deleteUserProfile,
  getUserProfile,
  updateUserProfile
} from './controllers/user.ts';

// CORS FIXED
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  })
);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello, World!');
});

/* AUTH ROUTES */
app.post('/auth/register', checkDetails, checkUsernameAndEmail, checkPasswordStrength, register);
app.post('/auth/login', login);
app.post('/auth/logout', logout);

/* BLOG ROUTES */
app.post('/blogs', verifyToken, validateBlogDetails, createBlog);
app.get('/blogs', verifyToken, getBlogs);
app.get('/blogs/trash', verifyToken, getTrashedBlogs);
app.get('/blogs/:id', verifyToken, getSingleBlog);
app.patch('/blogs/complete/:id', verifyToken, completeBlog);
app.patch('/blogs/incomplete/:id', verifyToken, incompleteBlog);
app.patch('/blogs/update/:id', verifyToken, validateBlogDetails, updateBlog);
app.patch('/blogs/restore/:id', verifyToken, restoreBlog);
app.delete('/blogs/:id', verifyToken, deleteBlog);

/* USER ROUTES */
app.get('/user/profile', verifyToken, getUserProfile);
app.patch('/user/profile', verifyToken, updateUserProfile);
app.delete('/user/profile', verifyToken, deleteUserProfile);
app.patch('/user/change-password', verifyToken, changeUserPassword);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
