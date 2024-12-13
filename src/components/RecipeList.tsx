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
  const [searchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      const { data } = await api.get("recipes");
      setRecipes(data);
      setFilteredRecipes(data);
    })();
  }, []);

  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";

    let filtered = [...recipes];

    if (category !== "all") {
      filtered = filtered.filter(
        (recipe) => recipe.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredRecipes(filtered);
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
