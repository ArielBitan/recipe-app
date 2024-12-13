import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  title: string;
  image: string;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ title, image }) => {
  return (
    <Card className="flex flex-col items-center text-center rounded">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <img src={image} alt="image" className=" max-h-40 rounded-2xl m-4" />
        </CardDescription>
      </CardHeader>
      <Link to={`/recipe/${title}`}>
        <CardFooter>
          <p>To Recipe</p>
        </CardFooter>
      </Link>
    </Card>
  );
};
