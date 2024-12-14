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
  name: string;
  image: string;
  _id: string;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ name, image, _id }) => {
  return (
    <Link to={`/recipes/${_id}`}>
      <Card className="flex flex-col items-center text-left motion-preset-expand hover:-translate-y-4">
        <CardHeader className="w-full flex flex-col items-center">
          <CardDescription>
            <div>
              <img
                src={image}
                alt="image"
                className="h-56 rounded-xl mb-2 object-cover"
              />
            </div>
          </CardDescription>
          <CardTitle className="mt-2">{name}</CardTitle>
        </CardHeader>
        <CardFooter className="w-full flex flex-col items-center">
          <ReactStars
            count={5}
            size={25}
            value={3}
            activeColor="#ffd700"
            edit={false}
          />
          <span className="font-light font-primary mt-1">300 Ratings</span>
        </CardFooter>
      </Card>
    </Link>
  );
};
