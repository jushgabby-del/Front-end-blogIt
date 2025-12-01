import { create } from "zustand";

interface Blog {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface BlogStoreType {
  blogs: Blog[];

  addBlog: (blog: Blog) => void;
  markBlogAsCompleted: (id: number) => void;
  markBlogAsIncomplete: (id: number) => void;
  deleteBlog: (id: number) => void;
}

export const useBlogs = create<BlogStoreType>((set) => ({
  blogs: [],

  addBlog: (blog) =>
    set((state) => ({
      blogs: [...state.blogs, blog],
    })),

  markBlogAsCompleted: (id) =>
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog.id === id ? { ...blog, isCompleted: true } : blog
      ),
    })),

  markBlogAsIncomplete: (id) =>
    set((state) => ({
      blogs: state.blogs.map((blog) =>
        blog.id === id ? { ...blog, isCompleted: false } : blog
      ),
    })),

  deleteBlog: (id) =>
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog.id !== id),
    })),
}));
export default useBlogs;    