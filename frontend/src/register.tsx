import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";        

function register() {   

{/* Profile Creation Section */} 
        return (
      <section id="about" className="bg-green-50 py-12 px-6">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-green-900 text-center">Create Your Profile</h2>
          <form className="space-y-4">

            <div>
              <Label htmlFor="name" className="block text-gray-700 mb-2">Full Name</Label>
              <Input id="name" type="text" placeholder="Enter your full name" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>

            <div>
              <Label htmlFor="email" className="block text-gray-700 mb-2">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
              </div>
            <div>
              <Label htmlFor="bio" className="block text-gray-700 mb-2">Short Bio</Label>
              <Input id="bio" type="text" placeholder="Tell us about yourself" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>

            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg mt-4">
              Create Profile
            </Button>

              </form>

        </div>
      </section>
        );
}       
      export default register;