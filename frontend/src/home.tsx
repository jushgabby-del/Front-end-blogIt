import { Button } from "./components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/ui/accordion";
import { Card } from "./components/ui/card";

import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'



function Home() {
    const navigate = useNavigate(); 

  return (
    <div className="flex flex-col min-h-screen">

      {/* Header / Navbar */}
      <header className="bg-green-700 text-white">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-2xl font-bold">The Wazee on the Block</div>
          <ul className="flex space-x-4">
            <li><a href="#Home" className="hover:text-gray-200">Home</a></li>
            <li><a href="#About us" className="hover:text-gray-200">About</a></li>
            <Link to="/form" className="hover:text-gray-200">Blogs</Link>
          </ul>
          <Button onClick={() => navigate("/register")} className="bg-red-500 hover:bg-red-600 text-white">Sign Up</Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-green-100 flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4 text-green-900">Welcome to The Wazee on the Block Blog</h1>
        <p className="text-xl mb-8 text-gray-700">
          Join a community of respected elders, share wisdom, preserve culture, and connect socially.
        </p>
        <Button onClick={() => navigate("/register")} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3">Get Started</Button>
      </section>

      {/* Cards / Features Section */}
      <section id="features" className="flex flex-wrap justify-center gap-6 py-12 px-4 bg-white">
        <Card className="w-64 h-64 flex flex-col p-6 border border-green-200 shadow-md">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">Wisdom Sharing</h2>
          <p className="text-gray-700 flex-grow">Access valuable insights and advice from experienced elders.</p>
        </Card>
        <Card className="w-64 h-64 flex flex-col p-6 border border-green-200 shadow-md">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">Cultural Preservation</h2>
          <p className="text-gray-700 flex-grow">Learn about and preserve cultural heritage together.</p>
        </Card>
        <Card className="w-64 h-64 flex flex-col p-6 border border-green-200 shadow-md">
          <h2 className="text-2xl font-semibold mb-2 text-green-800">Social Connections</h2>
          <p className="text-gray-700 flex-grow">Build relationships with like-minded community members.</p>
        </Card>
      </section>


          


      {/*  Info Section */}
      <section id="join" className="container mx-auto px-6 py-12">
  <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">Join Our Community</h2>

  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger
        className="w-full text-left px-1 py-4 font-medium text-green-800 bg-green-100 border border-green-300 rounded-t-lg hover:bg-green-200 focus:outline-none"
      >
        Who is a Mzee ?
      </AccordionTrigger>
      <AccordionContent
        className="px-10 py-4 border border-green-300 border-t-0 bg-white rounded-b-lg text-gray-700"
      >
        A Mzee is a respected elder in the community, often seen as a source of wisdom and guidance.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="item-2">
      <AccordionTrigger
        className="w-full text-left px-10 py-4 font-medium text-green-800 bg-green-100 border border-green-300 rounded-t-lg hover:bg-green-200 focus:outline-none mt-2"
      >
        Why Join Our Community?
      </AccordionTrigger>
      <AccordionContent
        className="px-10 py-4 border border-green-300 border-t-0 bg-white rounded-b-lg text-gray-700"
      >
        Joining our community allows you to connect with others, share knowledge, and preserve cultural heritage.
      </AccordionContent>
    </AccordionItem>
  </Accordion>

  <div className="mt-8 text-center">
    <Button  onClick={() => navigate("/register")} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg">
      Join Now
    </Button>
  </div>
</section>
 


    </div>
  );
}

export default Home;         