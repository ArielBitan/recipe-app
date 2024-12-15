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
import { api } from "@/api";

const newRecipeSchema = z.object({
  title: z.string().min(3).max(30),
  image: z.string().url(),
  ingredients: z.array(z.string()).min(1),
  instructions: z.string().min(10),
  category: z.string().min(3).max(20),
});

export function RecipeForm() {
  const form = useForm<z.infer<typeof newRecipeSchema>>({
    resolver: zodResolver(newRecipeSchema),
    defaultValues: {
      ingredients: [],
    },
  });

  const { setValue } = form;

  const handleIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const ingredients = value
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter(Boolean);
    setValue("ingredients", ingredients);
  };

  async function onSubmit(values: z.infer<typeof newRecipeSchema>) {
    const { data } = await api.post("/recipes", values, {
      withCredentials: true,
    });
    console.log(data);
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
              <div className="grid grid-cols-2 gap-2 mt-2">
                {form.getValues("ingredients").map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-2 rounded-lg shadow-sm"
                    style={{ wordWrap: "break-word" }}
                  >
                    {ingredient}
                  </div>
                ))}
              </div>
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
