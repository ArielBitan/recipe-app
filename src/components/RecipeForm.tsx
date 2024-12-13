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
import { Textarea } from "@/components/ui/textarea"; // Assuming you use a Textarea component for longer inputs

// Schema definition for the new recipe form
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
  });

  function onSubmit(values: z.infer<typeof newRecipeSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
                <Textarea
                  placeholder="Enter ingredients, separated by commas"
                  {...field}
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
