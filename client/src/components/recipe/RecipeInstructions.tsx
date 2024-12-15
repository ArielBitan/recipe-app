interface RecipeInstructionsProps {
  instructions: string;
}

const RecipeInstructions = ({ instructions }: RecipeInstructionsProps) => (
  <div>
    <h2 className="my-4 text-3xl font-medium">Instructions:</h2>
    <p className="text-2xl font-thin mb-40 mx-32 ">{instructions}</p>
  </div>
);

export default RecipeInstructions;
