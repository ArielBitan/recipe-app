import { useParams } from "react-router-dom";
import { useRecipes } from "@/components/context/RecipeContext";
import { Navbar } from "@/components/Navbar";
import ReactStars from "react-rating-stars-component";
import RecipeBreadcrumb from "@/components/RecipeBreadcrumb";

const RecipeDetails = () => {
  const { _id } = useParams();
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
            <div className="w-full h-96">
              <img
                src={recipe.image}
                alt={recipe.name}
                className=" rounded-2xl w-full h-full object-cover"
              />
            </div>
            <div className="flex w-full justify-end">
              <ReactStars
                count={5}
                size={25}
                value={3}
                activeColor="#ffd700"
                edit={false}
              />
            </div>
            <ul className="custom-list mt-4">
              <h2 className="text-3xl mb-4 font-medium">{`${recipe.name} ingredients:`}</h2>
              {recipe.ingredients.map((ingredient, index) => (
                <li className="font-thin text-2xl" key={index}>
                  {ingredient}
                </li>
              ))}
            </ul>
            <h2 className="my-4 text-3xl font-medium">Instructions:</h2>
            <p className="text-2xl font-thin mb-40">{recipe.instructions}</p>
          </div>
        ) : (
          <p className="text-xl font-semibold">Recipe not found.</p>
        )}
      </div>
    </>
  );
};

export default RecipeDetails;
