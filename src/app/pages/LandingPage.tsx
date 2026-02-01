import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  Shield, 
  CheckCircle, 
  Building2, 
  Users, 
  FileCheck, 
  Globe, 
  TrendingUp,
  Star,
  Quote,
  ArrowRight,
  Award,
  Clock,
  BarChart,
  Zap,
  Target,
  HeadphonesIcon,
  Briefcase // Added for agency icon
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import Header from "@/app/components/Header";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header showAuth={true} />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-blue-900">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="container mx-auto px-6 py-24 text-center relative max-w-6xl">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
              🎓 Trusted by 15,000+ Students & 250+ Agencies Worldwide
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            A Smarter Visa Platform for<br />Students and Visa Agencies
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Students apply for visas with confidence. Visa agencies manage applications, 
            agents, and approvals in one unified platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/register")} 
              className="text-lg px-8 h-14 bg-white text-blue-900 hover:bg-gray-100 font-semibold shadow-xl w-full sm:w-auto"
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              I'm a Student – Get Started
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate("/agency-registration")} 
              className="text-lg px-8 h-14 bg-green-600 text-white hover:bg-green-700 font-semibold shadow-xl w-full sm:w-auto"
            >
              <Building2 className="w-5 h-5 mr-2" />
              I'm a Visa Agency – Join as Agency
            </Button>
          </div>
        </div>
      </div>

      {/* Who Is This For Section */}
      {/* ... remove this code ... */}

      {/* Statistics Section */}
      <div className="bg-gray-50 py-20 border-b">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">250+</div>
              <div className="text-gray-600">Verified Agencies</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">15,000+</div>
              <div className="text-gray-600">Students Helped</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">12,450</div>
              <div className="text-gray-600">Visas Approved</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">94%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 border-b">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and support for both students and agencies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Verified Agencies Trusted by Students</h3>
                <p className="text-gray-600 leading-relaxed">
                  Pre-vetted visa agencies with high success rates and excellent track records, trusted by students worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">AI-Powered Matching</h3>
                <p className="text-gray-600 leading-relaxed">
                  Students get matched with suitable agencies, agencies receive relevant student cases based on expertise.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Simple Process</h3>
                <p className="text-gray-600 leading-relaxed">
                  Clear workflows for both students and agencies, from application to approval.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Global Reach</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access visa services for universities in USA, UK, Canada, Australia, and 50+ countries.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Fast Processing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Average processing time reduced by 40% with our streamlined digital workflow.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white group">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-blue-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Performance Analytics</h3>
                <p className="text-gray-600 leading-relaxed">
                  Students track applications, agencies monitor success rates and agent performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-20 border-b">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A simple 3-step process for both students and agencies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <Card className="border-0 shadow-lg bg-white h-full">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">Get Started</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                      <p className="text-sm font-semibold text-blue-900 mb-1">For Students</p>
                      <p className="text-sm text-gray-700">Submit visa request and upload documents</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                      <p className="text-sm font-semibold text-green-900 mb-1">For Agencies</p>
                      <p className="text-sm text-gray-700">Register and configure your services</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <Card className="border-0 shadow-lg bg-white h-full">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">Connect</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                      <p className="text-sm font-semibold text-blue-900 mb-1">For Students</p>
                      <p className="text-sm text-gray-700">Choose from verified agencies</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                      <p className="text-sm font-semibold text-green-900 mb-1">For Agencies</p>
                      <p className="text-sm text-gray-700">Receive and assign student cases</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <Card className="border-0 shadow-lg bg-white h-full">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">Track & Succeed</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                      <p className="text-sm font-semibold text-blue-900 mb-1">For Students</p>
                      <p className="text-sm text-gray-700">Track visa progress in real-time</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                      <p className="text-sm font-semibold text-green-900 mb-1">For Agencies</p>
                      <p className="text-sm text-gray-700">Process visas and track performance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Students Worldwide</h2>
            <p className="text-xl text-gray-600">Real experiences from students who achieved their dreams</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "The platform made my UK student visa application so easy! I got matched with an excellent agency and my visa was approved in just 3 weeks."
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-800 text-white font-semibold">
                      SP
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-900">Sarah Patel</p>
                    <p className="text-sm text-gray-600">Oxford University, UK</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "Outstanding service! The university recommendations were spot-on, and the document verification process saved me from making costly mistakes."
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-800 text-white font-semibold">
                      MC
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-900">Michael Chen</p>
                    <p className="text-sm text-gray-600">Stanford University, USA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "The approval prediction feature gave me confidence before applying. The entire process was transparent and stress-free. Highly recommended!"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-800 text-white font-semibold">
                      AR
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-900">Aisha Rahman</p>
                    <p className="text-sm text-gray-600">University of Toronto, Canada</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden bg-blue-900 py-20">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        <div className="container mx-auto px-6 text-center relative max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Whether you're applying for a visa or managing applications, this platform is built for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/register")} 
              className="text-lg px-10 h-14 bg-white text-blue-900 hover:bg-gray-100 font-semibold shadow-xl w-full sm:w-auto"
            >
              <GraduationCap className="w-5 h-5 mr-2" />
              Start as Student
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate("/agency-registration")} 
              className="text-lg px-10 h-14 bg-green-600 text-white hover:bg-green-700 font-semibold shadow-xl w-full sm:w-auto"
            >
              <Building2 className="w-5 h-5 mr-2" />
              Register as Visa Agency
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-semibold text-white">Visa Dreams</span>
              </div>
              <p className="text-gray-400 text-sm">
                Helping international students achieve their dreams with verified visa agencies and expert guidance.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">For Students</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigate("/role-selection")} className="text-gray-400 hover:text-white text-sm">Create Account</button></li>
                <li><button onClick={() => navigate("/login-type-selection")} className="text-gray-400 hover:text-white text-sm">Student Login</button></li>
                <li><button className="text-gray-400 hover:text-white text-sm">How It Works</button></li>
                <li><button className="text-gray-400 hover:text-white text-sm">Success Stories</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">For Agencies</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigate("/agency-registration")} 
                    className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-1"
                  >
                    Register Your Agency
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </li>
                <li><button className="text-gray-400 hover:text-white text-sm">Agency Login</button></li>
                <li><button className="text-gray-400 hover:text-white text-sm">Partner Benefits</button></li>
                <li><button className="text-gray-400 hover:text-white text-sm">Contact Us</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2026 Visa Dreams. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}