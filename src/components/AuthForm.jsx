"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthHeader } from "@/components/AuthHeader";
import axios from "axios";
import { useRouter } from "next/navigation";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (!isLogin) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }

      const res = await axios.post('/api/register', { email, password });
      toast.success(res.data.message);
      setIsLogin(true);
    } else {
      const res = await axios.post('/api/login', { email, password });
      toast.success(res.data.message);
      router.push("/home");
    }

    setError("");
  } catch (err) {
    console.log(err);
    setError(err.response?.data?.message || "An error occurred");
    toast.error(err.response?.data?.message || "An error occurred");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Toaster position="top-right" />
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
                  <Button variant="link" className="p-0 h-auto font-normal text-sm">
                    Forgot password?
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : (isLogin ? "Login" : "Register")}
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={toggleAuthMode}>
                {isLogin ? "Need an account? Register" : "Already have an account? Login"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}