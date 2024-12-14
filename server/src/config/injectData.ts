import User from "../models/User";
import { faker } from "@faker-js/faker";
import Recipe from "../models/Recipe";

export const injectData = async () => {
  try {
    console.log("injecting data");
    const users = await User.insertMany(
      await Promise.all(
        Array.from({ length: 10 }).map(async () => {
          return {
            email: faker.internet.email(),
            password: faker.internet.password({ length: 6 }),
            username: faker.internet.username().substring(0, 8),
            profilePic: faker.image.url({ width: 500, height: 500 }),
            recipes: [],
          };
        })
      )
    );
    const recipes = await Recipe.insertMany(
      Array.from({ length: 50 }).map(() => {
        return {
          name: faker.food.dish(),
          description: faker.food.description(),
          image: faker.image.urlLoremFlickr({
            width: 800,
            height: 500,
            category: "food",
          }),
          ingredients: Array.from({ length: 5 }).map(() =>
            faker.food.ingredient()
          ),
          instructions: faker.lorem.paragraph(5),
          user: faker.helpers.arrayElement(users)._id,
        };
      })
    );
  } catch (error) {
    console.error("Error injecting data:", error);
  }
};
