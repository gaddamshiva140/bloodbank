import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, allow any login
    toast.success("Welcome back!");
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
      <Card className="w-full max-w-md p-8 space-y-6 animate-fadeIn">
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center space-x-3">
            <img 
              src="/lovable-uploads/81669374-3c99-4537-943d-3a8c64e29c5d.png" 
              alt="NCC Logo" 
              className="w-12 h-12 object-contain"
            />
            <h1 className="text-3xl font-bold tracking-tight">NCC Blood Donation</h1>
          </div>
          <p className="text-sm text-gray-500">Enter your credentials to continue</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Sign In
          </Button>
        </form>
        <div className="space-y-4 text-center text-sm">
          <div>
            <a href="#" className="text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <div>
            Don't have an account?{" "}
            <Button
              variant="link"
              className="text-primary p-0 h-auto"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;