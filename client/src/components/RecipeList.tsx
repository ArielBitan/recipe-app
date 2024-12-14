import { useState, useEffect } from "react";
import { RecipeCard } from "./RecipeCard";
import { useSearchParams } from "react-router-dom";
import { Recipe } from "./context/ThemeContext";
import { useRecipes } from "./context/ThemeContext";

const RecipeList = () => {
  const { recipes, fetchRecipes, filterRecipes } = useRecipes();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";
    const filtered = filterRecipes(search, category);
    setFilteredRecipes(filtered);
  }, [searchParams, recipes, filterRecipes]);

  return (
    <ul className="grid grid-cols-4 gap-10">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipeId={recipe.id}
            title={recipe.title}
            image={recipe.image}
          />
        ))
      ) : (
        <p className="col-span-4 text-center text-gray-500">
          No recipes found.
        </p>
      )}
    </ul>
  );
};

export default RecipeList;
