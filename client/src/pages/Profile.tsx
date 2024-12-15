import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/layout/Navbar";
import { useAppSelector } from "@/store/user/hooks";
import { selectUser } from "@/store/user/userSlice";
import { api } from "@/api";
import { useEffect, useState } from "react";
import { Recipe } from "@/types";
import { RecipeCard } from "@/components/recipe/RecipeCard";

const Profile = () => {
  const user = useAppSelector(selectUser);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    (async () => {
      const response = await api.get("/user/recipes", {
        withCredentials: true,
      });
      setUserRecipes(response.data);
    })();
  });
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center  mt-20 h-96 ">
        <h1 className="text-3xl mb-4">My Profile</h1>
        <div className="flex flex-col gap-6 p-6 bg-secondary w-96 h-96 rounded-xl">
          <Avatar>
            <AvatarImage src={user.profilePic} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="font-secondary">
            <h2 className="font-bold text-xl mb-4">My basic info : </h2>
            <div>Username: {user.username}</div>
            <h4>Email : {user.email}</h4>
          </div>
        </div>
        <h2 className="mt-4 text-3xl font-semibold">Your Recipes : </h2>
        <ul className="grid grid-cols-6 gap-20 p-10">
          {userRecipes.map((recipe) => {
            return (
              <RecipeCard
                key={recipe._id}
                _id={recipe._id}
                name={recipe.title}
                image={recipe.image}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Profile;
