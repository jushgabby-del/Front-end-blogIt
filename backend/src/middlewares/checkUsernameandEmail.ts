import { type Request, type Response, type NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

// Middleware to check email + username uniqueness
async function checkUsernameAndEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { emailAddress, userName } = req.body;

    // 1. Check email
    const userWithEmail = await client.user.findUnique({
      where: { emailAddress },
    });

    if (userWithEmail) {
      return res.status(400).json({
        message: "Email address already associated with another account",
      });
    }

    // 2. Check username (Prisma field is 'username', not 'userName')
    const userWithUsername = await client.user.findUnique({
      where: { username: userName },
    });

    if (userWithUsername) {
      return res.status(400).json({
        message: "Username already associated with another account",
      });
    }

    // 3. Everything is OK — continue
    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Oops! Something went wrong",
    });
  }
}

export default checkUsernameAndEmail;
