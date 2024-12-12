import React from "react";

interface ImageProps {
  imageUrl: string;
}

export const Image: React.FC<ImageProps> = ({ imageUrl }) => {
  return (
    <div>
      <img
        src={imageUrl}
        alt="missing-image"
        className="w-full object-cover rounded-2xl max-h-96 "
      />
    </div>
  );
};
