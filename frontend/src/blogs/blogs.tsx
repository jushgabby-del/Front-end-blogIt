import BlogCard from "./blogCard"
import { useBlogs } from "@/store/blogstore"  

function Blogs() {
  const { blogs } = useBlogs();
  return (
   <div className="flex flex-col min-h-screen justify-center items-center gap-6 mt-8" >
    
    {/* map through blogs and render BlogCard for each blog */} 

    {blogs.map(function(blog) {
        return <BlogCard title={blog.title} description={blog.description}
        isCompleted={blog.isCompleted} key={blog.id} id={blog.id}/>
    })}
       
   </div>
  )
}

export default Blogs
