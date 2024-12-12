import { ImageCarousel } from "@/components/ImageCarousel";
import { Navbar } from "@/components/NavBar";
import RecipeList from "@/components/RecipeList";

const Home = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <Navbar />
      <ImageCarousel />
      <section className="py-8 text-center">
        <h2 className="text-3xl font-semibold text-primary">
          Welcome to my website
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-4xl">
          Discover delicious recipes, cook like a pro, and satisfy your
          cravings! Explore a variety of meals from all around the world. Start
          cooking now!
        </p>
      </section>
      <section className="mb-8">
        <RecipeList />
      </section>
    </div>
  );
};

export default Home;
