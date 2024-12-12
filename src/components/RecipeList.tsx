import { useState, useEffect } from "react";
import { api } from "@/api";
import { RecipeCard } from "./RecipeCard";

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

  useEffect(() => {
    (async () => {
      const { data } = await api.get("recipes");
      setRecipes(data);
      console.log(recipes);
    })();
  }, []);

  return (
    <ul className="grid grid-cols-4 gap-6">
      {recipes.map((recipe) => {
        return <RecipeCard title={recipe.title} image={recipe.image} />;
      })}
    </ul>
  );
};

export default RecipeList;
