import { type Request, type Response } from 'express';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();


export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    await client.blog.create({
      data: {
        title,
        description,
        userId: req.user.id,
      },
    });

    res.send(`${req.user.username} created a blog`);
  } catch (error) {
    res.status(500).send('Error creating blog');
  }
};


export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await client.blog.findMany({
      where: {
        userId: req.user.id,
        isDeleted: false,
      },
    });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).send('Error retrieving blogs');
  }
};


export const getBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const blog = await client.blog.findFirst({
      where: { id: Number(id) },
    });

    if (!blog || blog.isDeleted || blog.userId !== req.user.id) {
      return res.status(404).send('Blog not found');
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).send('Error retrieving blog');
  }
};


export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description } = req.body;

    const blog = await client.blog.updateMany({
      where: {
        id: Number(id),
        userId,
        isDeleted: false,
      },
      data: {
        title: title || undefined,
        description: description || undefined,
        isCompleted: false,
      },
    });

    if (blog.count === 0) {
      return res.status(404).send('Blog not found or not authorized');
    }

    res.status(200).json({ message: 'Blog updated successfully' });
  } catch (error) {
    res.status(500).send('Error updating blog');
  }
};


export const completeBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const blog = await client.blog.updateMany({
      where: {
        id: Number(id),
        userId: req.user.id,
        isDeleted: false,
      },
      data: {
        isCompleted: true,
      },
    });

    if (blog.count === 0) {
      return res.status(404).send('Blog not found or not authorized');
    }

    res
      .status(200)
      .json({ message: 'Blog marked as completed successfully' });
  } catch (error) {
    res.status(500).send('Error marking blog as completed');
  }
};


export const incompleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const blog = await client.blog.updateMany({
      where: {
        id: Number(id),
        userId: req.user.id,
        isDeleted: false,
      },
      data: {
        isCompleted: false,
      },
    });

    if (blog.count === 0) {
      return res.status(404).send('Blog not found or not authorized');
    }

    res
      .status(200)
      .json({ message: 'Blog marked as incomplete successfully' });
  } catch (error) {
    res.status(500).send('Error marking blog as incomplete');
  }
};


export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const blog = await client.blog.updateMany({
      where: {
        id: Number(id),
        userId: req.user.id,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });

    if (blog.count === 0) {
      return res.status(404).send('Blog not found or not authorized');
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).send('Error deleting blog');
  }
};


export const getTrashedBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await client.blog.findMany({
      where: {
        userId: req.user.id,
        isDeleted: true,
      },
    });

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).send('Error retrieving trashed blogs');
  }
};

export const restoreBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;      

    const blog = await client.blog.updateMany({
      where: {
        id: Number(id), 
        userId: req.user.id,
        isDeleted: true,
      },    

        data: { 
        isDeleted: false,
      },
    });     
    if (blog.count === 0) {
      return res.status(404).send('Blog not found or not authorized');
    }   
    res.status(200).json({ message: 'Blog restored successfully' });
  } catch (error) {         

    res.status(500).send('Error restoring blog');
    }
};  
    export const getSingleBlog = getBlog;   
