import ReactStars from "react-rating-stars-component";

const RecipeRating = () => (
  <div className="flex w-full justify-end">
    <ReactStars
      count={5}
      size={25}
      value={3}
      activeColor="#ffd700"
      edit={false}
    />
  </div>
);

export default RecipeRating;
