import Home from "./home";
import { Route, Routes } from "react-router-dom";
import register from "./register";    
import Blogs from "./blogs/blogs";
import Form from "./form";
export function App() {
  return (

    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      
        <Route path="/register" element={register()} />

        <Route path="/blogs" element={<Blogs />} />
        
        <Route path="/form" element={<Form />} />
        
      </Routes>
  
    </div>
  );
}

export default App;