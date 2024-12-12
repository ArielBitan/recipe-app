import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Image } from "@/components/ui/image";
import Autoplay from "embla-carousel-autoplay";
import { api } from "@/api";
import { useEffect, useState } from "react";

export const ImageCarousel = () => {
  const imageArr = [
    "/images/burger-with-melted-cheese.webp",
    "/images/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg",
    "/images/images.jpg",
  ];
  const [carouselItems, setCarouselItems] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get("hero");
      setCarouselItems(data);
    })();
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-4xl"
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {imageArr.map((image, index) => (
          <CarouselItem key={index}>
            <Image imageUrl={image} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 " />
    </Carousel>
  );
};
