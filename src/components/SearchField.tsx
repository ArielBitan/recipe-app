import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";

export function SearchField() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    const updatedParams = {
      ...Object.fromEntries(searchParams.entries()),
      search: query,
    };

    setSearchParams(updatedParams);
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        onChange={handleSearchChange}
        placeholder="Find recipe..."
      />
      <Button type="submit">Search</Button>
    </div>
  );
}
