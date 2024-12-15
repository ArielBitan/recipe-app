export interface Recipe {
  _id: string;
  title: string;
  user: string;
  image: string;
  ingredients: string[];
  instructions: string;
  category: string;
  averageRating: number;
  ratingsAmount: number;
}
