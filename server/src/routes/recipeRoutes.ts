import express from "express";
import * as recipeController from "../controllers/recipeController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.use(auth);

// Create a new recipe
router.post("/", recipeController.createRecipe);

// Get all recipes
router.get("/", recipeController.getAllRecipes);

// Get a single recipe by ID
router.get("/:id", recipeController.getRecipeById);

// Update a recipe by ID
router.put("/:id", recipeController.updateRecipe);

// Delete a recipe by ID
router.delete("/:id", recipeController.deleteRecipe);

// Rate a recipe
router.post("/:id/rate", recipeController.rateRecipe);

export default router;
