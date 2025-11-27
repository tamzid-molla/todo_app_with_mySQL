"use client";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthHeader } from "@/components/AuthHeader";
import axios from "axios";


const LoginForm = () => {
     const [email, setEmail] = useState("");
         const [password, setPassword] = useState("");
           const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
      const res = await axios.post('/api/login', { email, password });
      toast.success(res.data.message);
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
               Login
            </CardTitle>
            <CardDescription className="transition-all duration-300 ease-in-out">
              Enter your credentials to login to your account
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
                <div className="flex items-center justify-between">
                  <Button variant="link" className="p-0 h-auto font-normal text-sm">
                    Forgot password?
                  </Button>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Login" }
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Need an account? Register
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
        </>
    );
};

export default LoginForm;