import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "../utils/errors.util";
import * as userServices from "../services/user.service";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const foundUser = await userServices.login(req.body);

    if (!foundUser) {
      throw new Error("Login failed: No user found.");
    }

    res
      .cookie("jwt", foundUser.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
      })

      .status(200)
      .json({
        message: `User ${foundUser.user.username} logged in successfully.`,
      });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(errorMessage);
    res.status(400).json({
      message: "Login failed",
      error: getErrorMessage(error),
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    await userServices.register(req.body);
    res.status(200).send("Inserted successfully");
  } catch (error) {
    console.log(error);
    getErrorMessage(error);
  }
};
