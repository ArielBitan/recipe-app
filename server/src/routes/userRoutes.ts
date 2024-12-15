import express from "express";
import { auth } from "../middleware/auth";

import * as userController from "../controllers/userController";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/validate-token", auth, userController.validateToken);
router.get("/recipes", auth, userController.getUserRecipes);

export default router;
