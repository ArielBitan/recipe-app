import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.util";

import Recipe from "../models/Recipe";

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const newRecipe = await Recipe.create({ ...req.body, user: req.user?._id });

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({
      message: "Creating a recipe failed.",
      error: getErrorMessage(error),
    });
  }
};

// Get all recipes
export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 16;
    const offset = parseInt(req.query.offset as string) || 0;

    const recipes = await Recipe.find()
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(recipes);
  } catch (error) {
    res.status(400).json({
      message: "Getting all recipes failed",
      error: getErrorMessage(error),
    });
  }
};

// Get a single recipe by ID
export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({
      message: "Getting recipe by id failed.",
      error: getErrorMessage(error),
    });
  }
};

// Update a recipe by ID
export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecipe) {
      res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(400).json({
      message: "Updating recipe failed",
      error: getErrorMessage(error),
    });
  }
};

// Delete a recipe by ID
export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Deleting recipe failed",
      error: getErrorMessage(error),
    });
  }
};

// Rate a recipe
export const rateRecipe = async (req: Request, res: Response) => {
  try {
    const { userId, rating } = req.body;
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
    }

    const existingRating = recipe?.ratings.find(
      (rating) => rating.user.toString() === userId
    );

    if (existingRating) {
      existingRating.rating = rating;
    } else {
      recipe?.ratings.push({ user: userId, rating });
    }

    await recipe?.save();
    res.status(200).json({ message: "Rating added/updated", recipe });
  } catch (error) {
    res.status(400).json({
      message: "Rating recipe failed.",
      error: getErrorMessage(error),
    });
  }
};
