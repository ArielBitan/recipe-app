import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { RecipesProvider } from "./components/context/RecipeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RecipesProvider>
        <App />
      </RecipesProvider>
    </Provider>
  </StrictMode>
);
