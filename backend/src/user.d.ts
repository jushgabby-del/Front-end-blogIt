import * as express from "express";
import { User as PrismaUser } from "@prisma/client";

interface User {
  id: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  username: string;

}       
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}