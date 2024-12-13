import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

interface RecipeCardProps {
  title: string;
  image: string;
  recipeId: string;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  image,
  recipeId,
}) => {
  return (
    <Link to={`/recipes/${recipeId}`}>
      <Card className="flex flex-col items-center text-center rounded motion-preset-expand hover:-translate-y-4">
        <CardHeader>
          <CardDescription>
            <img
              src={image}
              alt="image"
              className=" max-h-40 rounded-2xl m-4"
            />
          </CardDescription>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardFooter>
          <ReactStars
            count={5}
            size={35}
            value={3}
            activeColor="#ffd700"
            edit={false}
          />
          300 Ratings
        </CardFooter>
      </Card>
    </Link>
  );
};
