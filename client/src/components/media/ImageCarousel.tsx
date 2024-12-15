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

interface CarouselItemType {
  title: string;
  _id: string;
  description: string;
  image: string;
}

export const ImageCarousel = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItemType[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("recipes", { withCredentials: true });
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
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index}>
            <Image
              image={item.image}
              name={item.title}
              _id={item._id}
              description={item.description}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 " />
    </Carousel>
  );
};
