import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [incorrectUser, setIncorrectUser] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await api.get("/user/validate-token", {
  //         withCredentials: true,
  //       });
  //       if (response.status === 200) {
  //         navigate("/");
  //       }
  //     } catch (error) {
  //       console.log("User is not logged in or session expired.");
  //     }
  //   };
  //   checkAuth();
  // }, [navigate]);

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
            <LoginForm setError={setIncorrectUser} />
          </TabsContent>
          <TabsContent value="signUp">
            <SignUpForm setError={setIncorrectUser} />
          </TabsContent>
        </Tabs>
        {incorrectUser && (
          <div className="text-red-500 mt-4">{incorrectUser}</div>
        )}
      </div>
    </>
  );
};

export default LoginPage;
