import { ImageCarousel } from "@/components/media/ImageCarousel";
import Navbar from "@/components/layout/Navbar";
import RecipeList from "@/components/recipe/RecipeList";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <Navbar />
      <ImageCarousel />
      <section className="py-8 text-center">
        <h2 className="text-3xl font-semibold text-primary">
          Countless of recipes at your disposal
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-4xl">
          Discover delicious recipes, cook like a pro, and satisfy your
          cravings! Explore a variety of meals from all around the world. Start
          cooking now!
        </p>
      </section>
      <section className="mb-8">
        <RecipeList limit={8} />
      </section>
      <Link
        className="p-4 text-2xl flex items-center gap-4 hover:underline"
        to={"/recipes"}
      >
        View more recipes
        <ArrowRight className="mt-2" />
      </Link>
    </div>
  );
};

export default Home;
