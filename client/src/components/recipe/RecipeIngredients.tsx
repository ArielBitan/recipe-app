interface RecipeIngredientsProps {
  ingredients: string[];
  name: string;
}

const RecipeIngredients = ({ ingredients, name }: RecipeIngredientsProps) => (
  <ul className="custom-list mt-4">
    <h2 className="text-3xl mb-4 font-medium">{`${name} ingredients:`}</h2>
    {ingredients.map((ingredient, index) => (
      <li className="font-thin text-2xl" key={index}>
        {ingredient}
      </li>
    ))}
  </ul>
);

export default RecipeIngredients;
