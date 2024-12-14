import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Recipes from "@/pages/Recipes";
import RecipeDetails from "@/pages/RecipeDetails";
import Profile from "@/pages/Profile";

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
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;
