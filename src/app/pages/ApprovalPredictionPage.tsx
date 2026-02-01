import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, TrendingUp, AlertTriangle, CheckCircle2, BarChart3, Info } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { Badge } from "@/app/components/ui/badge";

export default function ApprovalPredictionPage() {
  const navigate = useNavigate();
  
  // You can change this value to test different scenarios:
  // High Chance: >= 70 (Green)
  // Low Chance: < 70 (Red)
  const approvalChance = 88; // Try 45 for low chance scenario

  const isHighChance = approvalChance >= 70;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/document-verification")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-semibold">Visa Approval Prediction</span>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Visa Approval Prediction</h1>
          <p className="text-gray-600">AI-powered analysis based on your profile and documents</p>
          <div className="mt-4">
            <Progress value={95} className="h-3" />
            <p className="text-sm text-gray-600 mt-2">Step 5 of 6 - Almost there!</p>
          </div>
        </div>

        {/* Main Prediction Card */}
        <Card className="mb-6 border-0 shadow-xl bg-white overflow-hidden">
          <CardHeader className={`${isHighChance ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'} text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                <CardTitle className="text-2xl text-white">Your Approval Prediction</CardTitle>
              </div>
              <Badge className={`${isHighChance ? 'bg-white text-green-600' : 'bg-white text-red-600'} hover:bg-white`}>
                {isHighChance ? 'High Chance' : 'Low Chance'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-8 pb-8">
            {/* Circular Progress Indicator */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <svg className="w-64 h-64 transform -rotate-90">
                  {/* Background Circle */}
                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    stroke={isHighChance ? "#e5f5e9" : "#fee"}
                    strokeWidth="20"
                    fill="none"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    stroke={isHighChance ? "#16a34a" : "#dc2626"}
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 110 * (approvalChance / 100)} ${2 * Math.PI * 110}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className={`text-6xl font-bold ${isHighChance ? 'text-green-600' : 'text-red-600'}`}>
                    {approvalChance}%
                  </p>
                  <p className="text-gray-600 text-lg mt-2">Approval Chance</p>
                </div>
              </div>
            </div>

            {/* Status Alert */}
            {isHighChance ? (
              <Alert className="bg-green-50 border-green-200">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <AlertTitle className="text-green-800 font-semibold">High Chance of Approval!</AlertTitle>
                <AlertDescription className="text-green-700">
                  Excellent news! Your profile is strong with verified documents, good academic background, and sufficient financial proof. Your chosen university and agency have excellent track records.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-red-50 border-red-200">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <AlertTitle className="text-red-800 font-semibold">Low Chance of Approval</AlertTitle>
                <AlertDescription className="text-red-700">
                  Your application may need improvements. We strongly recommend consulting with your visa agency to strengthen your application. Consider adding supporting documents or improving specific areas highlighted below.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Contributing Factors */}
        <Card className="mb-6 border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              Factors Contributing to Your Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Document Quality</span>
                <span className="text-sm font-semibold text-green-600">95%</span>
              </div>
              <Progress value={95} className="h-3 bg-gray-200" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">University Acceptance Rate</span>
                <span className="text-sm font-semibold text-green-600">92%</span>
              </div>
              <Progress value={92} className="h-3 bg-gray-200" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Financial Documentation</span>
                <span className="text-sm font-semibold text-yellow-600">85%</span>
              </div>
              <Progress value={85} className="h-3 bg-gray-200" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Academic Background</span>
                <span className="text-sm font-semibold text-yellow-600">80%</span>
              </div>
              <Progress value={80} className="h-3 bg-gray-200" />
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mb-6 border-0 shadow-md bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-700">
                  <strong className="text-gray-900">Disclaimer:</strong> This prediction is an estimate based on historical data and should not be considered as a guarantee of approval. Actual visa decisions are made by immigration authorities and may vary based on additional factors.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/document-verification")} 
            className="flex-1 h-14 border-2"
          >
            Back to Verification
          </Button>
          <Button 
            onClick={() => navigate("/submit-application")} 
            className="flex-1 h-14 bg-green-600 hover:bg-green-700 text-lg font-semibold shadow-lg"
          >
            Continue to Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
}