import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "../router";
import { RecipesProvider } from "./components/context/RecipeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecipesProvider>
      <RouterProvider router={router} />
    </RecipesProvider>
  </StrictMode>
);
