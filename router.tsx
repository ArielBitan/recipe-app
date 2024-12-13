import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Recipes from "@/pages/Recipes";
import AddRecipe from "@/components/AddRecipe"; // Import AddRecipe component

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recipes",
    element: <Recipes />,
    children: [
      {
        path: "add-recipe", // Nested route
        element: <AddRecipe />, // AddRecipe dialog will be rendered here
      },
    ],
  },
]);

export default router;
