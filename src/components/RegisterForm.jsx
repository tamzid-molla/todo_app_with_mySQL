"use client";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthHeader } from "@/components/AuthHeader";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            toast.error("Passwords do not match");
            setLoading(false);
            return;
        }
        
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                toast.success(data.message);
                router.push("/login");
            } else {
                setError(data.message);
                toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            console.log(error);
            setError("An error occurred");
            toast.error("An error occurred");
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
              Register
            </CardTitle>
            <CardDescription className="transition-all duration-300 ease-in-out">
               Create a new account to get started
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
             
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : "Register"}
                </Button>
                <Link href="/login" className="w-full">
              <Button type="button" variant="outline" className="w-full">
              Already have an account? Login
                  </Button>
                  </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}

export default RegisterForm;