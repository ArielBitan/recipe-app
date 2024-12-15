import RecipeList from "@/components/recipe/RecipeList";
import Navbar from "@/components/layout/Navbar";
import { SearchField } from "@/components/search/SearchField";
import AddRecipe from "@/components/recipe/AddRecipe";
import RecipeFilter from "@/components/recipe/RecipeFilter";

const Recipes = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <Navbar />
      <div className="flex gap-6 items-center">
        <RecipeFilter />
        <SearchField />
        <AddRecipe />
      </div>
      <RecipeList />
    </div>
  );
};

export default Recipes;
