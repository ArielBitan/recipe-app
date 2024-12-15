interface RecipeImageProps {
  image: string;
  name: string;
}

const RecipeImage = ({ image, name }: RecipeImageProps) => (
  <div className="w-full h-96">
    <img
      src={image}
      alt={name}
      className="rounded-2xl w-full h-full object-cover"
    />
  </div>
);

export default RecipeImage;
