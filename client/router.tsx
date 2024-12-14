import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Recipes from "@/pages/Recipes";
import RecipeDetails from "@/pages/RecipeDetails";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";

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
    path: "/recipes/:_id",
    element: <RecipeDetails />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
