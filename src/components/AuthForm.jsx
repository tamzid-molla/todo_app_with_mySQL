"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthHeader } from "@/components/AuthHeader";
import { redirect } from "next/navigation";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
      console.log(isLogin ? "Logging in" : "Registering", { email, password, rememberMe });
      isLogin? redirect("/home") : setIsLogin(!isLogin)
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AuthHeader />
      <Card>
        <CardHeader>
          <CardTitle className="transition-all duration-300 ease-in-out">
            {isLogin ? "Login" : "Register"}
          </CardTitle>
          <CardDescription className="transition-all duration-300 ease-in-out">
            {isLogin 
              ? "Enter your credentials to login to your account" 
              : "Create a new account to get started"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={setRememberMe}
                  />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button variant="link" className="p-0 h-auto font-normal cursor-pointer text-sm">
                  Forgot password?
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 mt-6">
            <Button type="submit" className="w-full cursor-pointer">
              {isLogin ? "Login" : "Register"}
            </Button>
            <Button type="button" variant="outline" className="w-full cursor-pointer" onClick={toggleAuthMode}>
              {isLogin ? "Need an account? Register" : "Already have an account? Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}