import RecipeList from "@/components/RecipeList";
import { Navbar } from "@/components/Navbar";
import { SearchField } from "@/components/SearchField";
import AddRecipe from "@/components/AddRecipe";
import RecipeFilter from "@/components/RecipeFilter";

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
