import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUpSubmit = async () => {
    try {
      await api.post("/user/register", signUpData);
      setError("Successfully created user");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          "Already used email/username, please log in";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="p-4">Register</CardTitle>
        <CardDescription className="p-4">
          Please enter email, username, and password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={signUpData.email}
            onChange={(e) =>
              setSignUpData({ ...signUpData, email: e.target.value })
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={signUpData.username}
            onChange={(e) =>
              setSignUpData({ ...signUpData, username: e.target.value })
            }
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={signUpData.password}
            onChange={(e) =>
              setSignUpData({ ...signUpData, password: e.target.value })
            }
          />
        </div>
      </CardContent>
      <div className="text-red-600 pb-4">{error}</div>
      <CardFooter>
        <Button onClick={handleSignUpSubmit}>Sign Up</Button>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
