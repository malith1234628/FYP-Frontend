import { Card, CardContent } from "@/app/components/ui/card";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, ArrowRight } from "lucide-react";
import Header from "@/app/components/Header";

export default function LoginTypeSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showAuth={false} />
      
      <div className="container mx-auto px-6 py-20 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome Back!
          </h1>
          <p className="text-xl text-gray-600">
            Choose your account type to login
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card 
            className="border-2 border-blue-200 hover:border-blue-600 hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => navigate("/login")}
          >
            <CardContent className="p-10 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                <GraduationCap className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Student Login</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Access your student dashboard and applications
              </p>
              <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700 font-semibold">
                Login as Student
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-2 border-purple-200 hover:border-purple-600 hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => navigate("/agent-login")}
          >
            <CardContent className="p-10 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 transition-colors">
                <Users className="w-10 h-10 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Agent Login</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Access your agency dashboard and manage cases
              </p>
              <div className="flex items-center justify-center text-purple-600 group-hover:text-purple-700 font-semibold">
                Login as Agent
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button 
              onClick={() => navigate("/role-selection")}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}