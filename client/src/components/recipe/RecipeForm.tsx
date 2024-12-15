import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const newRecipeSchema = z.object({
  title: z.string().min(3).max(30),
  image: z.string().url(),
  ingredients: z.array(z.string()).min(1), // Ensure it's an array of strings
  instructions: z.string().min(10),
  category: z.string().min(3).max(20),
});

export function RecipeForm() {
  const form = useForm<z.infer<typeof newRecipeSchema>>({
    resolver: zodResolver(newRecipeSchema),
    defaultValues: {
      ingredients: [], // Set default value for ingredients to an empty array
    },
  });

  const { setValue } = form;

  // Handle change in ingredients input (split comma-separated values)
  const handleIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Split by commas and remove empty values
    const ingredients = value
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter(Boolean);
    setValue("ingredients", ingredients); // Update the ingredients field in form
  };

  function onSubmit(values: z.infer<typeof newRecipeSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter recipe title" {...field} />
              </FormControl>
              <FormDescription>Title of your recipe</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} />
              </FormControl>
              <FormDescription>
                Provide a link to an image for your recipe
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter ingredients, separated by commas"
                  onChange={handleIngredientsChange}
                />
              </FormControl>
              <FormDescription>List your recipe ingredients</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter recipe instructions" {...field} />
              </FormControl>
              <FormDescription>
                Step-by-step instructions for preparing the recipe
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter recipe category" {...field} />
              </FormControl>
              <FormDescription>
                Category of the recipe (e.g., Dessert, Main Course)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Recipe</Button>
      </form>
    </Form>
  );
}
