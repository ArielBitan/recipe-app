import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RecipeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnChange = (value: string) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      category: value,
    });
  };

  return (
    <Select onValueChange={handleOnChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="breakfast">Breakfast</SelectItem>
        <SelectItem value="lunch">Lunch</SelectItem>
        <SelectItem value="dinner">Dinner</SelectItem>
        <SelectItem value="dessert">Dessert</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RecipeFilter;
