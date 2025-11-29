import Home from "./home";
import { Route, Routes } from "react-router-dom";
import register from "./register";    
import Blogs from "./blogs/blogs";

export function App() {
  return (

    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      
        <Route path="/register" element={register()} />
        <Route path="/blogs" element={<Blogs />} />
        
      </Routes>
  
    </div>
  );
}

export default App;