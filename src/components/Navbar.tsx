import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const Navbar = () => {
  return (
    <NavigationMenu className="mb-6">
      <NavigationMenuLink
        asChild
        className="text-3xl font-bold m-2 pt-4 text-primary px-4"
      >
        <Link to="/">Recipes-App</Link>
      </NavigationMenuLink>
      <NavigationMenuList className="flex gap-4 m-2 text-xl pt-4 px-4">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/recipes">Recipes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className="focus:underline">
            <Link to="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className="focus:underline">
            <Link to="/profile">Profile</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
