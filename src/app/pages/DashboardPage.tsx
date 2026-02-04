import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  FileText, 
  Bell,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  CreditCard,
  MessageCircle,
  Lock,
  Circle,
  Play
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { 
  hasActiveApplication, 
  getCurrentStepRoute, 
  getApplicationProgress,
  getStepName,
  getProgressPercentage 
} from "@/app/utils/applicationProgress";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [hasInProgressApp, setHasInProgressApp] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    // Check if there's an application in progress
    const activeApp = hasActiveApplication();
    setHasInProgressApp(activeApp);
    
    if (activeApp) {
      const progress = getApplicationProgress();
      if (progress) {
        setCurrentStep(getStepName(progress.currentStep));
        setProgressPercentage(getProgressPercentage());
      }
    }
  }, []);

  const handleContinueApplication = () => {
    const route = getCurrentStepRoute();
    navigate(route);
  };

  const documents = [
    { name: "Passport", status: "Verified", date: "Jan 10, 2026" },
    { name: "CV / Resume", status: "Verified", date: "Jan 10, 2026" },
    { name: "O/L Certificate", status: "Verified", date: "Jan 11, 2026" },
    { name: "A/L Certificate", status: "Verified", date: "Jan 11, 2026" },
    { name: "IELTS Certificate", status: "Pending", date: "Jan 12, 2026" },
    { name: "Bank Statement", status: "Verified", date: "Jan 13, 2026" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">Visa Agency Marketplace</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">
                      A
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Alex Johnson</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex! 👋</h1>
          <p className="text-gray-600">Track your visa application progress and take next actions</p>
        </div>

        {/* Start/Continue Application Buttons */}
        <div className="mb-6">
          {hasInProgressApp ? (
            <div className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200">
                <Clock className="h-5 w-5 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <span className="font-semibold">Application in Progress</span>
                  <br />
                  You have an unfinished application. Current step: <span className="font-semibold">{currentStep}</span> ({progressPercentage}% complete)
                </AlertDescription>
              </Alert>
              
              <div className="flex gap-4">
                <Button 
                  onClick={handleContinueApplication}
                  className="h-14 px-8 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 font-semibold text-lg"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Continue Application
                </Button>
                
                <Button 
                  onClick={() => navigate("/apply-visa")}
                  variant="outline"
                  className="h-14 px-8 font-semibold text-lg"
                >
                  <GraduationCap className="w-6 h-6 mr-2" />
                  Start New Application
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              onClick={() => navigate("/apply-visa")}
              className="h-14 px-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 font-semibold text-lg"
            >
              <GraduationCap className="w-6 h-6 mr-2" />
              Start New Application
            </Button>
          )}
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN - PRIMARY CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Application Card */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">📄 Your Active Application</CardTitle>
                    <p className="text-sm text-gray-600">
                      UK Student Visa — Application ID: <span className="font-semibold">VAM-2024-001</span>
                    </p>
                  </div>
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                    In Progress
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Application Progress Summary */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">🔍 Application Progress Summary</h3>
                  
                  {/* Completed Steps */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-green-700 mb-3">✅ Completed Steps</h4>
                    <div className="space-y-2 pl-4 border-l-2 border-green-500">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Application Form</p>
                          <p className="text-xs text-gray-500">Completed on Jan 15, 2026</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Documents Uploaded</p>
                          <p className="text-xs text-gray-500">6 documents verified</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900">Profile Verification</p>
                          <p className="text-xs text-gray-500">Completed on Jan 16, 2026</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Step */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-blue-700 mb-3">⏳ Current Step</h4>
                    <div className="pl-4 border-l-2 border-blue-500">
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0 animate-pulse" />
                        <div>
                          <p className="font-semibold text-gray-900">Under Review</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Waiting for agency review
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* What is Holding the Process */}
                  <Alert className="border-orange-200 bg-orange-50">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <AlertDescription className="text-sm text-orange-800 ml-2">
                      <span className="font-semibold">🚫 What Is Holding the Process:</span><br />
                      Your application is currently delayed due to pending agency review of financial documents.
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Primary Action Button */}
                <Button 
                  onClick={() => navigate("/apply-visa")}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 font-semibold text-base"
                >
                  ➡️ Continue From Where You Stopped
                  <span className="block text-xs font-normal mt-0.5 opacity-90">
                    Resume your application process
                  </span>
                </Button>

                {/* Documents Section */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">📄 Documents Submitted</h3>
                  <p className="text-sm text-gray-600 mb-4">View-only documents already uploaded</p>
                  
                  <div className="space-y-2">
                    {documents.map((doc, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <FileText className="w-5 h-5 text-gray-600" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {doc.status === "Verified" ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border border-green-300">
                              ✓ {doc.status}
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border border-yellow-300">
                              ⏳ {doc.status}
                            </Badge>
                          )}
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    ℹ️ Documents cannot be modified after submission
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <Button 
                    onClick={() => navigate("/payment")}
                    className="h-12 bg-green-600 hover:bg-green-700 font-semibold text-base"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    💰 Pay Agency Fee
                  </Button>
                  
                  <Button 
                    onClick={() => navigate("/chat")}
                    variant="outline"
                    className="h-12 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-base"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    💬 Chat With Agency
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN - VERTICAL PROGRESS TRACKER */}
          <div>
            <Card className="border-0 shadow-lg bg-white sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">🧭 Application Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Step 1 - Completed */}
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="w-0.5 h-12 bg-green-600"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold text-gray-900">Profile Creation</p>
                      <p className="text-xs text-green-600">✅ Completed</p>
                    </div>
                  </div>

                  {/* Step 2 - Completed */}
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="w-0.5 h-12 bg-green-600"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold text-gray-900">Application Form Submission</p>
                      <p className="text-xs text-green-600">✅ Completed</p>
                    </div>
                  </div>

                  {/* Step 3 - Completed */}
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="w-0.5 h-12 bg-green-600"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold text-gray-900">Document Upload</p>
                      <p className="text-xs text-green-600">✅ Completed</p>
                    </div>
                  </div>

                  {/* Step 4 - Completed */}
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="w-0.5 h-12 bg-blue-600"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold text-gray-900">Document Verification</p>
                      <p className="text-xs text-green-600">✅ Completed</p>
                    </div>
                  </div>

                  {/* Step 5 - In Progress */}
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div className="w-0.5 h-12 bg-gray-300"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold text-gray-900">Agency Review</p>
                      <p className="text-xs text-blue-600">⏳ In Progress</p>
                    </div>
                  </div>

                  {/* Step 6 - Pending */}
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="w-0.5 h-12 bg-gray-300"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold text-gray-500">Payment to Agency</p>
                      <p className="text-xs text-gray-400">🔒 Locked / Pending</p>
                    </div>
                  </div>

                  {/* Step 7 - Pending */}
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="w-0.5 h-12 bg-gray-300"></div>
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-semibold text-gray-500">Visa Submission</p>
                      <p className="text-xs text-gray-400">🔒 Locked</p>
                    </div>
                  </div>

                  {/* Step 8 - Pending */}
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Circle className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-500">Final Decision</p>
                      <p className="text-xs text-gray-400">⏳ Pending</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}