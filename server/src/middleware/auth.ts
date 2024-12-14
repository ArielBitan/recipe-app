import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as cookie from "cookie";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY environment variable is required");
}

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookies = cookie.parse(req.headers.cookie as string);
    const token = cookies.jwt;

    if (!token) {
      res
        .status(401)
        .json({ message: "Session expired. Please log in again." });
    }

    try {
      const decoded = jwt.verify(
        token as string,
        SECRET_KEY as Secret
      ) as JwtPayload;
      (req as CustomRequest).token = decoded;
      console.log(decoded);
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res
          .status(401)
          .json({ message: "Token expired. Please log in again." });
      }
      res.status(401).json({ message: "Invalid token. Please log in again." });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send("Please authenticate");
  }
};
