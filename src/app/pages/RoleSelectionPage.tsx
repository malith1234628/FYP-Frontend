import { Card, CardContent } from "@/app/components/ui/card";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Building2, ArrowRight } from "lucide-react";
import Header from "@/app/components/Header";

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showAuth={false} />
      
      <div className="container mx-auto px-6 py-20 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Create Your Account
          </h1>
          <p className="text-xl text-gray-600">
            Choose your account type to get started
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card 
            className="border-2 border-blue-200 hover:border-blue-600 hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => navigate("/register")}
          >
            <CardContent className="p-10 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors">
                <GraduationCap className="w-10 h-10 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">I'm a Student</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Apply for student visas and get help from verified agencies
              </p>
              <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700 font-semibold">
                Continue as Student
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>

          <Card 
            className="border-2 border-green-200 hover:border-green-600 hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => navigate("/agency-registration")}
          >
            <CardContent className="p-10 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors">
                <Building2 className="w-10 h-10 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">I'm a Visa Agency</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Receive student requests and manage visa applications
              </p>
              <div className="flex items-center justify-center text-green-600 group-hover:text-green-700 font-semibold">
                Continue as Agency
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button 
              onClick={() => navigate("/login-type-selection")}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
