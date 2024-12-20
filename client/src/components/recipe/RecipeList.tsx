import { useState, useEffect } from "react";
import { RecipeCard } from "./RecipeCard";
import { useSearchParams } from "react-router-dom";
import { Recipe } from "@/types";
import { useRecipes } from "../context/RecipeContext";

interface RecipeListProps {
  limit?: number;
}

const RecipeList: React.FC<RecipeListProps> = ({ limit }) => {
  const { recipes, fetchRecipes, filterRecipes } = useRecipes();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchRecipes(limit as number);
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
            key={recipe._id}
            _id={recipe._id}
            name={recipe.title}
            image={recipe.image}
            avgRating={recipe.averageRating}
            ratingsAmount={recipe.ratingsAmount}
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
