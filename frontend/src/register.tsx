import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Alert } from "./components/ui/alert";

import axios from "axios";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

function register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationError, setRegistrationError] = useState("");

  interface UserInfo {
    firstName: string;
    lastName: string;
    emailAddress: string;
    userName: string;
    password: string;
  }

  // ✅ React Query Mutation to Register User
  const registerMutation = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: async (userInfo: UserInfo) => {
      const response = await axios({
        method: "POST",
        url: "/auth/register",
        headers: { "Content-Type": "application/json" },
        data: userInfo,
      });

      return response.data;
    },

    onError: (error: any) => {
      setRegistrationError(
        error.response?.data?.message ||
          error.message ||
          "Registration failed"
      );
    },

    onSuccess: (data) => {
      console.log("Registration successful:", data);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setRegistrationError("Passwords do not match");
      return;
    }

    const userData: UserInfo = {
      firstName,
      lastName,
      emailAddress,
      userName,
      password,
    };

    registerMutation.mutate(userData);
  }

  return (
    <section id="about" className="bg-green-50 py-12 px-6">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-green-900 text-center">
          Create Your Profile
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {registrationError && (
            <Alert variant="destructive">{registrationError}</Alert>
          )}

          <div>
            <Label htmlFor="firstName" className="block mb-2">
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="lastName" className="block mb-2">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="emailAddress" className="block mb-2">
              Email Address
            </Label>
            <Input
              id="emailAddress"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="userName" className="block mb-2">
              Username
            </Label>
            <Input
              id="userName"
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password" className="block mb-2">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="block mb-2">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
           
          </Button>
        </form>
      </div>
    </section>
  );
}

export default register