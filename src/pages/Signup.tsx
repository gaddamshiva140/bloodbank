import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // For demo purposes, show success and redirect
    toast.success("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 p-4">
      <Card className="w-full max-w-md p-8 space-y-6 animate-fadeIn">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
          <p className="text-sm text-gray-500">Sign up to join NCC Blood Donation</p>
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
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
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Sign Up
          </Button>
        </form>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Button
            variant="link"
            className="text-primary p-0 h-auto"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Signup;