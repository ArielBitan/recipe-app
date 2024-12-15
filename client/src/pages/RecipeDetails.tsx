import { useParams } from "react-router-dom";
import { useRecipes } from "@/components/context/RecipeContext";
import Navbar from "@/components/layout/Navbar";
import RecipeImage from "@/components/recipe/RecipeImage";
import RecipeRating from "@/components/recipe/RecipeRatings";
import RecipeIngredients from "@/components/recipe/RecipeIngredients";
import RecipeInstructions from "@/components/recipe/RecipeInstructions";
import RecipeBreadcrumb from "@/components/layout/RecipeBreadcrumb";
import { useEffect, useState } from "react";
import { Recipe } from "@/types";
import { api } from "@/api";

const RecipeDetails = () => {
  const { _id } = useParams<{ _id: string }>();
  const { recipes } = useRecipes();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    let foundRecipe = recipes.find((recipe) => recipe._id.toString() === _id);

    if (!foundRecipe) {
      const fetchRecipe = async () => {
        try {
          const { data } = await api.get(`/recipes/${_id}`, {
            withCredentials: true,
          });
          setRecipe(data);
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      };
      fetchRecipe();
    } else {
      setRecipe(foundRecipe);
    }
  }, [_id, recipes]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center mx-4">
        <RecipeBreadcrumb name={recipe?.title} />
        {recipe ? (
          <div className="flex flex-col items-center w-full">
            <h1 className="text-4xl font-bold text-center my-4">
              {recipe.title}
            </h1>
            <RecipeImage image={recipe.image} name={recipe.title} />
            <RecipeRating />
            <RecipeIngredients
              ingredients={recipe.ingredients}
              name={recipe.title}
            />
            <RecipeInstructions instructions={recipe.instructions} />
          </div>
        ) : (
          <p className="text-xl font-semibold">Recipe not found.</p>
        )}
      </div>
    </>
  );
};

export default RecipeDetails;
