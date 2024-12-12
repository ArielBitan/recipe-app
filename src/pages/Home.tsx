import { ImageCarousel } from "@/components/ImageCarousel";
import { Navbar } from "@/components/NavBar";
import { faker } from "@faker-js/faker";
import { api } from "@/api";
const Home = () => {
  function generateHeroData(count = 6) {
    const heroArray = [];
    for (let i = 0; i < count; i++) {
      const title = faker.food.dish();
      heroArray.push({
        title: title,
        subtitle: faker.food.description(),
        image: faker.image.urlPicsumPhotos({ width: 800, height: 500 }),
        cta: {
          text: "Go to recipe",
          link: `/recipes/${title.toLowerCase().replace(/\s+/g, "-")}`,
        },
      });
    }
    return heroArray;
  }

  async function populateData() {
    await api.post("hero", { ...generateHeroData() });
  }

  populateData();

  return (
    <div className="w-full flex items-center justify-center flex-col">
      <Navbar />
      <div className="bg-secondary w-max">
        <ImageCarousel />
      </div>
    </div>
  );
};

export default Home;
