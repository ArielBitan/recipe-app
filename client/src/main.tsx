import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "../router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { RecipesProvider } from "./components/context/RecipeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RecipesProvider>
        <RouterProvider router={router} />
      </RecipesProvider>
    </Provider>
  </StrictMode>
);
