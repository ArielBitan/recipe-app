import React, { createContext, useContext, useState, useMemo } from "react";
import { api } from "@/api";
import { Recipe } from "@/types";

interface RecipesContextType {
  recipes: Recipe[];
  addRecipe: (newRecipe: Recipe) => Promise<void>;
  updateRecipe: (updatedRecipe: Recipe) => Promise<void>;
  deleteRecipe: (recipeId: string) => Promise<void>;
  fetchRecipes: () => Promise<void>;
  setContextRecipes: (contextRecipes: Recipe[]) => void;
  filterRecipes: (search: string, category: string) => Recipe[];
  isLoading: boolean;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

interface RecipeProviderProps {
  children: React.ReactNode;
}

export const RecipesProvider = ({ children }: RecipeProviderProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRecipes = async (limit?: Number) => {
    setIsLoading(true);
    try {
      const { data } = await api.get<Recipe[]>(`/recipes?limit=${limit}`, {
        withCredentials: true,
      });
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching Recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addRecipe = async (newRecipe: Recipe) => {
    setIsLoading(true);
    try {
      const { data } = await api.post<Recipe>("recipes", newRecipe);
      setRecipes((prevRecipes) => [...prevRecipes, data]);
    } catch (error) {
      console.error("Error adding Recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecipe = async (updatedRecipe: Recipe) => {
    setIsLoading(true);
    try {
      const { data } = await api.put<Recipe>(
        `recipes/${updatedRecipe._id}`,
        updatedRecipe
      );
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe._id === updatedRecipe._id ? { ...recipe, ...data } : recipe
        )
      );
    } catch (error) {
      console.error("Error updating Recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRecipe = async (recipeId: string) => {
    setIsLoading(true);
    try {
      await api.delete(`recipes/${recipeId}`);
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeId)
      );
    } catch (error) {
      console.error("Error deleting Recipe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setContextRecipes = (contextRecipes: Recipe[]) => {
    setRecipes(contextRecipes);
  };

  const filterRecipes = (search: string, category: string): Recipe[] => {
    const normalizedSearch = search?.toLowerCase();
    const normalizedCategory = category?.toLowerCase();

    return recipes.filter((recipe) => {
      const matchesCategory =
        normalizedCategory === "all" ||
        recipe.category.toLowerCase() === normalizedCategory;
      const matchesSearch = recipe.title
        .toLowerCase()
        .includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });
  };

  const value = useMemo(
    () => ({
      recipes,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      fetchRecipes,
      setContextRecipes,
      filterRecipes,
      isLoading,
    }),
    [recipes, isLoading]
  );

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
};

export const useRecipes = (): RecipesContextType => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipesProvider");
  }
  return context;
};
