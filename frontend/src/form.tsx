import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useBlogs } from "@/store/blogstore";

function Form() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // get addBlog from Zustand store
  const { addBlog } = useBlogs();

  function handleAddBlog(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    const newBlog = {
      id: Date.now(),
      title,
      description,
      isCompleted: false,
    };

    addBlog(newBlog);

    toast.success("Blog added successfully!", {
      position: "top-right",
    });

    setTitle("");
    setDescription("");
  }

  return (
    <div>
      <form
        onSubmit={handleAddBlog}
        className="w-1/2 mx-auto flex flex-col gap-4 shadow p-5 rounded-md border"
      >
        <h2 className="uppercase text-2xl font-bold text-center">Add Blog</h2>

        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          className="bg-red-600 hover:bg-red-700 mt-4"
        >
          Add Blog
        </Button>
      </form>
    </div>
  );
}

export default Form;
