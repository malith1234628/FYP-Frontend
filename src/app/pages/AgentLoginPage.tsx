import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Users, Lock, Mail, Eye, EyeOff, Building2 } from "lucide-react";
import Header from "@/app/components/Header";

export default function AgentLoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add authentication logic
    navigate("/agent-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showAuth={false} />
      
      <div className="container mx-auto px-6 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl border-2">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold text-gray-900">Agent Login</CardTitle>
              <CardDescription className="text-base mt-2">
                Access your agency dashboard and manage cases
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="agent@agency.com"
                    className="pl-10 h-11"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-11"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button type="button" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Forgot password?
                </button>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-semibold"
              >
                <Users className="w-5 h-5 mr-2" />
                Login to Agent Dashboard
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-center text-sm text-gray-600">
                Logging in as a student?{" "}
                <button 
                  onClick={() => navigate("/login")}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Student Login
                </button>
              </p>
            </div>

            <div className="mt-4">
              <p className="text-center text-sm text-gray-600">
                Agency not registered yet?{" "}
                <button 
                  onClick={() => navigate("/agency-registration")}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Register Your Agency
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-6 pb-16 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-md bg-white">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Agency Dashboard</h3>
              <p className="text-sm text-gray-600">
                Manage all assigned cases and applications
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Case Management</h3>
              <p className="text-sm text-gray-600">
                Track student applications and progress
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure Access</h3>
              <p className="text-sm text-gray-600">
                Protected login for agency professionals
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
