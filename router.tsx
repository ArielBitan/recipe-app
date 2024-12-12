import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Recipes from "@/pages/Recipes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/recipes",
    element: <Recipes />,
  },
]);

export default router;
