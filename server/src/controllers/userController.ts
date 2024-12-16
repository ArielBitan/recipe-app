import { Request, Response, NextFunction } from "express";
import { getErrorMessage } from "../utils/errors.util";
import * as userServices from "../services/user.service";
import Recipe from "../models/Recipe";

export const login = async (req: Request, res: Response) => {
  try {
    const foundUser = await userServices.login(req.body);

    if (!foundUser) {
      throw new Error("Login failed: No user found.");
    }

    res.cookie("jwt", foundUser.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      _id: foundUser.user._id,
      username: foundUser.user.username,
      email: foundUser.user.email,
      profilePic: foundUser.user.profilePic,
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

export const logout = (req: Request, res: Response) => {
  try {
    res
      .clearCookie("jwt", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({ message: "User logged out successfully." });
  } catch (error) {
    console.error("Error during logout:", error);

    res.status(500).json({
      message: "Logout failed due to a server error.",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const validateToken = (req: Request, res: Response) => {
  res.status(200).json({ message: "token is valid", user: req.headers.cookie });
};

export const register = async (req: Request, res: Response) => {
  try {
    await userServices.register(req.body);
    res.status(200).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(errorMessage);
    res.status(400).json({
      message: "Registration failed",
      error: errorMessage,
    });
  }
};

export const getUserRecipes = async (req: Request, res: Response) => {
  try {
    const _id = req.user?._id;
    const userRecipes = await Recipe.find({ user: _id });
    res.status(200).json(userRecipes);
  } catch (error) {
    res.status(400).json({ message: "Error getting user posts", error });
  }
};
