import { useState, useEffect } from "react";
import { api } from "@/api";
import { RecipeCard } from "./RecipeCard";
import { useSearchParams } from "react-router-dom";

interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string;
  category: string;
}

const RecipeList = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("recipes");
      setRecipes(data);
      setFilteredRecipes(data);
    })();
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    if (searchQuery) {
      const filtered = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery)
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchParams, recipes]);

  return (
    <ul className="grid grid-cols-4 gap-6">
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
          />
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </ul>
  );
};

export default RecipeList;
