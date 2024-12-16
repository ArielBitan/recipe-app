import { useParams } from "react-router-dom";
import { useRecipes } from "@/components/context/RecipeContext";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/user/hooks";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import Navbar from "@/components/layout/Navbar";
import RecipeImage from "@/components/recipe/RecipeImage";
import RecipeRating from "@/components/recipe/RecipeRatings";
import RecipeIngredients from "@/components/recipe/RecipeIngredients";
import RecipeInstructions from "@/components/recipe/RecipeInstructions";
import RecipeBreadcrumb from "@/components/layout/RecipeBreadcrumb";
import { Button } from "@/components/ui/button";

import { Recipe } from "@/types";
import { api } from "@/api";
import { selectUser } from "@/store/user/userSlice";

const RecipeDetails = () => {
  const navigate = useNavigate();
  const { _id } = useParams<{ _id: string }>();
  const { recipes } = useRecipes();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isRecipeAuthor, setIsRecipeAuthor] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const user = useAppSelector(selectUser);
  const { toast } = useToast();

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
        } finally {
          setLoading(false);
        }
      };
      fetchRecipe();
    } else {
      setRecipe(foundRecipe);
      setLoading(false);
    }
  }, [_id, recipes]);

  useEffect(() => {
    if (recipe?.user === user._id) {
      setIsRecipeAuthor(true);
    }
  }, [recipe, user._id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  const handleDeletePost = async () => {
    try {
      await api.delete(`/recipes/${_id}`, {
        withCredentials: true,
      });
      toast({
        title: "Recipe deleted successfully",
        description: `Recipe ${recipe?.title} was deleted successfully`,
      });
      navigate(-1);
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

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
            {isRecipeAuthor && (
              <Button
                className="bg-red-600 rounded-xl font-secondary text-lg items-center mr-auto hover:bg-red-700"
                onClick={handleDeletePost}
              >
                DELETE RECIPE
              </Button>
            )}
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
