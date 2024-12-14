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
      <Card className="flex flex-col items-center text-left motion-preset-expand hover:-translate-y-4">
        <CardHeader>
          <CardDescription>
            <div className="w-80">
              <img
                src={image}
                alt="image"
                className="w-full h-56 rounded-xl mb-2 object-cover"
              />
            </div>
          </CardDescription>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardFooter>
          <div className="flex items-center justify-start gap-2">
            <ReactStars
              count={5}
              size={25}
              value={3}
              activeColor="#ffd700"
              edit={false}
            />
            <span className="font-light font-primary mt-1">300 Ratings</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
