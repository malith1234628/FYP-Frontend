import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useNavigate } from "react-router-dom";
import { GraduationCap, AlertCircle, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import Header from "@/app/components/Header";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const payload = {
        email,
        password,
      };

      const response = await fetch("http://localhost:5003/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message || data.error || "Login failed";
        throw new Error(errorMessage);
      }

      // Store token in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Navigate to dashboard on success
      navigate("/dashboard");
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <Header showAuth={true} />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mb-4 shadow-lg shadow-blue-500/50">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">Welcome Back!</h1>
            <p className="text-blue-200 text-lg">Continue your visa application journey</p>
          </div>

          {/* Login Card */}
          <Card className="border border-blue-500/30 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-blue-500/20 transition-all duration-300">
            <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            
            <CardHeader className="space-y-1 pb-8 pt-8">
              <CardTitle className="text-3xl text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Sign In</CardTitle>
              <CardDescription className="text-center text-gray-600 text-base">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                  <Alert className="bg-red-50 border-red-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800 font-medium">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
                
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-900 font-semibold text-sm">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="alex.johnson@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className="pl-12 h-12 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-900 font-semibold text-sm">Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      className="pl-12 h-12 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                </div>
                
                {/* Forgot Password */}
                <div className="text-right pt-2">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                    onClick={() => alert("Password reset feature coming soon")}
                  >
                    Forgot Password?
                  </button>
                </div>
                
                {/* Sign In Button */}
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-bold text-lg text-white rounded-lg shadow-lg hover:shadow-blue-500/40 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                  {!isLoading && <ArrowRight className="w-5 h-5" />}
                </Button>
                
                {/* Divider */}
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>
                
                {/* Additional Links */}
                <div className="space-y-3">
                  <div className="text-center text-sm text-gray-700">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/role-selection")}
                      className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-colors"
                    >
                      Create Account
                    </button>
                  </div>
                  <div className="text-center text-sm text-gray-700">
                    Logging in as an agent?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/agent-login")}
                      className="text-cyan-600 hover:text-cyan-700 font-bold hover:underline transition-colors"
                    >
                      Agent Login
                    </button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="text-center text-sm text-blue-200/80 mt-8">
            By signing in, you agree to our{" "}
            <a href="#" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">Privacy Policy</a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}