import express from "express";
import * as recipeController from "../controllers/recipeController";
import { auth } from "../middleware/auth";

const router = express.Router();

// Get all recipes
router.get("/", recipeController.getAllRecipes);

// Get a single recipe by ID
router.get("/:id", recipeController.getRecipeById);

// Create a new recipe
router.post("/", auth, recipeController.createRecipe);

// Update a recipe by ID
router.put("/:id", auth, recipeController.updateRecipe);

// Delete a recipe by ID
router.delete("/:id", auth, recipeController.deleteRecipe);

// Rate a recipe
router.post("/:id/rate", auth, recipeController.rateRecipe);

export default router;
