import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

//  REGISTER User
export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, emailAddress, userName, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await client.user.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        userName,
        password: hashedPassword,
      },
    });

    res.status(201).json("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error registering user");
  }
};

//  LOGIN IN USER
export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;        
    const user = await client.user.findUnique({
        where: { userName },

    });

    if (!user) {
      return res.status(404).json("User not found");
    }   
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json("Invalid password");
    }
    const token = jwt.sign(
      { id: user.id, userName: user.userName },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
    } catch (error) {
    console.error(error);
    res.status(500).json("Error logging in user");
  }
};  
// LOGOUT USER
export const logout = async (req: Request, res: Response) => {
  try {     

    res.status(200).json("User logged out successfully");
    } catch (error) {
    console.error(error);
    res.status(500).json("Error logging out user");
  }
};  
