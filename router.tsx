import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Recipes from "@/pages/Recipes";
import RecipeDetails from "@/pages/RecipeDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recipes",
    element: <Recipes />,
  },
  {
    path: "/recipes/:id",
    element: <RecipeDetails />,
  },
]);

export default router;
