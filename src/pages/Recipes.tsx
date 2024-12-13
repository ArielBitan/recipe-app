import RecipeList from "@/components/RecipeList";
import { Navbar } from "@/components/NavBar";
import { SearchField } from "@/components/SearchField";
import AddRecipe from "@/components/AddRecipe";
import { Link } from "react-router-dom";

const Recipes = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <Navbar />
      <div className="flex gap-6 justify-between">
        <SearchField />
        <Link to="add-recipe">
          <AddRecipe />
        </Link>
      </div>
      <RecipeList />
    </div>
  );
};

export default Recipes;
