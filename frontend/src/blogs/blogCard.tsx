import {Button} from "../components/ui/button"
import { Card , 
    CardDescription, 
    
     CardFooter, 
     CardHeader,
      CardTitle,
       
    } from "@/components/ui/card" 


function blogCard({title, description, isCompleted}: {title:string,
     description:string, isCompleted: boolean}){
        return (<>
<Card className="w-1/3">
<CardHeader>
    <CardTitle> {title} </CardTitle>
    <CardDescription> {description} </CardDescription>
</CardHeader>

<CardFooter className="flex justify-between">
    {!isCompleted && <Button>Complete</Button>}
    {isCompleted && <Button> Incomplete</Button>}
    <Button className= "bg-red-600 hover:bg-red-700">Delete</Button>
</CardFooter>



</Card>
        </>)}
        
  

export default blogCard