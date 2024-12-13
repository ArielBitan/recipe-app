import { useParams } from "react-router-dom";
import { useRecipes } from "@/components/context/ThemeContext";
import { Navbar } from "@/components/Navbar";
import ReactStars from "react-rating-stars-component";

const RecipeDetails = () => {
  const { id } = useParams();
  const { recipes } = useRecipes();

  const recipe = recipes.find((recipe) => recipe.id === id);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        {recipe ? (
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-center ">{recipe.title}</h1>
            <ReactStars
              count={5}
              size={25}
              value={3}
              activeColor="#ffd700"
              edit={false}
            />
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full object-cover rounded-2xl max-h-96 min-h-96 mb-6"
            />
            <ul className="custom-list">
              <h2 className="text-2xl mb-4 font-medium">{`${recipe.title} ingredients:`}</h2>
              {recipe.ingredients.map((ingredient, index) => (
                <li className="font-thin" key={index}>
                  {ingredient}
                </li>
              ))}
            </ul>
            <h2 className="my-4 text-2xl font-medium">Instructions:</h2>
            <p className="text-lg font-thin">{recipe.instructions}</p>
          </div>
        ) : (
          <p className="text-xl font-semibold">Recipe not found.</p>
        )}
      </div>
    </>
  );
};

export default RecipeDetails;
