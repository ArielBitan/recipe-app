import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/user/hooks";
import { isLoggedUser, selectUser } from "@/store/user/userSlice";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage, AvatarFallback } from "../ui/avatar";
import { useEffect } from "react";
import { api } from "@/api";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/store/user/hooks";
import { setLoggedUser, logoutUser } from "@/store/user/userSlice";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface DecodedToken {
  _id: string;
  username: string;
  email: string;
  profilePic: string;
}

const UserMenu = ({ user }: { user: any }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(isLoggedUser);
  const { toast } = useToast();

  const handleLogout = async () => {
    const response = await api.get("/user/logout", { withCredentials: true });
    toast({
      title: "Logged out successfully",
      description: response.data.message,
    });
    dispatch(logoutUser());
    console.log(isLoggedIn);
    navigate("/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer mt-4">
          <AvatarImage
            className="rounded-full w-10 h-10"
            src={user.profilePic}
            alt="user-avatar"
          />
          <AvatarFallback className="rounded-full">CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-1">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navbar = () => {
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(isLoggedUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await api.get("/user/validate-token", {
          withCredentials: true,
        });
        if (response.status === 200) {
          const token = response.data.user;
          if (token) {
            const decodedToken = jwtDecode<DecodedToken>(token);
            const { _id, username, email, profilePic } = decodedToken;
            dispatch(
              setLoggedUser({
                _id: _id.toString(),
                username,
                email,
                profilePic,
              })
            );
          } else {
            console.log("No token in response data");
          }
        } else {
          console.log("Invalid token or response not 200", response.status);
        }
      } catch (error) {
        console.error("Error validating token:", error);
      }
    };

    validateToken();
  }, [user]);

  return (
    <NavigationMenu className="mb-6 font-primary">
      <NavigationMenuLink
        asChild
        className="text-3xl font-bold m-2 pt-4 text-primary px-4"
      >
        <Link to="/">Recipes-App</Link>
      </NavigationMenuLink>
      <NavigationMenuList className="flex gap-4 m-2 text-xl pt-4 px-4">
        <NavigationMenuItem className="hover:underline">
          <NavigationMenuLink asChild>
            <Link to="/recipes">Recipes</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className="hover:underline">
            <Link to="/about">About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className="hover:underline">
            {isLoggedIn ? (
              <UserMenu user={user} />
            ) : (
              <Link to="/login">Login</Link>
            )}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
