import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [incorrectUser, setIncorrectUser] = useState("");

  //   useEffect(() => {
  //     const checkAuth = async () => {
  //       try {
  //         const response = await api.get("/user/validate-token", {
  //           withCredentials: true,
  //         });
  //         if (response.status === 200) {
  //           navigate("/");
  //         }
  //       } catch (error) {
  //         console.log("User is not logged in or session expired.");
  //       }
  //     };
  //     checkAuth();
  //   }, [navigate]);

  const handleLoginSubmit = async () => {
    if (!loginData.username || !loginData.password) {
      setIncorrectUser("Please fill in both username and password.");
    }

    try {
      const data = await api.post("/user/login", loginData, {
        withCredentials: true,
      });
      console.log(data);
      navigate("/");
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Incorrect username or password.";
        setIncorrectUser(errorMessage);
      } else {
        setIncorrectUser("An unexpected error occurred.");
      }
    }
  };

  const handleSignUpSubmit = async () => {
    try {
      await api.post("/user/register", signUpData);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          "Already used email/username , please log in";
        setIncorrectUser(errorMessage);
      } else {
        setIncorrectUser("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex w-full items-center h-full justify-center mt-28">
        <Tabs
          defaultValue="login"
          className="w-[400px] border-2 p-4 border-primary/20"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signUp">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="p-4">Welcome back !</CardTitle>
                <CardDescription className="p-4">
                  Please enter your username and password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={loginData.username}
                    onChange={(e) => {
                      setLoginData({ ...loginData, username: e.target.value });
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => {
                      setLoginData({ ...loginData, password: e.target.value });
                    }}
                  />
                </div>
              </CardContent>
              <div>{incorrectUser && incorrectUser}</div>
              <CardFooter>
                <Button onClick={handleLoginSubmit}>Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="signUp">
            <Card>
              <CardHeader>
                <CardTitle className="p-4">Register</CardTitle>
                <CardDescription className="p-4">
                  Please enter email , username and password
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
              <div>{incorrectUser && incorrectUser}</div>
              <CardFooter>
                <Button onClick={handleSignUpSubmit}>Sign Up</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default Login;
