import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm";

const LoginPage = () => {
  const [incorrectUser, setIncorrectUser] = useState("");
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
