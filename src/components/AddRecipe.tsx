import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { RecipeForm } from "./RecipeForm";

const AddRecipe = () => {
  return (
    <Dialog>
      <DialogTrigger>Add Recipe</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader className=" flex items-center gap-4">
          <DialogTitle className="text-2xl">Add Recipe</DialogTitle>
          <DialogDescription>
            <RecipeForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecipe;
