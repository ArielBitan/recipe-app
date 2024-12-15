import { useParams } from "react-router-dom";
import { useRecipes } from "@/components/context/RecipeContext";
import Navbar from "@/components/layout/Navbar";
import RecipeImage from "@/components/recipe/RecipeImage";
import RecipeRating from "@/components/recipe/RecipeRatings";
import RecipeIngredients from "@/components/recipe/RecipeIngredients";
import RecipeInstructions from "@/components/recipe/RecipeInstructions";
import RecipeBreadcrumb from "@/components/layout/RecipeBreadcrumb";

const RecipeDetails = () => {
  const { _id } = useParams<{ _id: string }>();
  const { recipes } = useRecipes();
  const recipe = recipes.find((recipe) => recipe._id.toString() === _id);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center mx-4">
        <RecipeBreadcrumb name={recipe?.name} />
        {recipe ? (
          <div className="flex flex-col items-center w-full">
            <h1 className="text-4xl font-bold text-center my-4">
              {recipe.name}
            </h1>
            <RecipeImage image={recipe.image} name={recipe.name} />
            <RecipeRating />
            <RecipeIngredients
              ingredients={recipe.ingredients}
              name={recipe.name}
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
