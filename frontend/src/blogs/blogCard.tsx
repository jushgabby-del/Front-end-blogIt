import { Button } from "../components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBlogs } from "@/store/blogstore";

interface BlogCardProps {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

function BlogCard({ id, title, description, isCompleted }: BlogCardProps) {
  const { markBlogAsCompleted, markBlogAsIncomplete, deleteBlog } = useBlogs();

  return (
    <Card className="w-1/3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between">
        {!isCompleted && (
          <Button onClick={() => markBlogAsCompleted(id)}>
            Mark as Completed
          </Button>
        )}

        {isCompleted && (
          <Button onClick={() => markBlogAsIncomplete(id)}>
            Mark as Incomplete
          </Button>
        )}

        <Button
          className="bg-red-600 hover:bg-red-700"
          onClick={() => deleteBlog(id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default BlogCard;
