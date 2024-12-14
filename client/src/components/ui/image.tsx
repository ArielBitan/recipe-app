import React from "react";
import { Link } from "react-router-dom";

interface ImageProps {
  _id: string;
  name: string;
  image: string;
  subtitle: string;
}

export const Image: React.FC<ImageProps> = ({ image, _id, subtitle, name }) => {
  return (
    <Link to={`/recipes/${_id}`}>
      <div className="relative">
        <img
          src={image}
          alt="missing-image"
          className="w-full object-cover rounded-2xl max-h-96"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-2xl ">
          <div className="flex flex-col justify-between">
            <p className="text-lg ">{name}</p>
            <p>{subtitle}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
