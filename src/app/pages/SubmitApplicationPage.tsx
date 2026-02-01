import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  ArrowLeft, 
  CheckCircle2, 
  Building, 
  FileText, 
  User, 
  Calendar, 
  Globe, 
  Mail,
  Phone,
  MapPin,
  Award,
  Send
} from "lucide-react";
import { Progress } from "@/app/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { Separator } from "@/app/components/ui/separator";

export default function SubmitApplicationPage() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/approval-prediction")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-semibold">Submit Application</span>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Application Summary</h1>
          <p className="text-gray-600">Review your complete application details before final submission</p>
          <div className="mt-4">
            <Progress value={100} className="h-3 bg-green-100" />
            <p className="text-sm text-green-600 font-medium mt-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Step 6 of 6 - Final Review
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Personal Information */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name:
                </span>
                <span className="font-semibold">Alex Johnson</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email:
                </span>
                <span className="font-semibold">alex.j@email.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone:
                </span>
                <span className="font-semibold">+1 (555) 123-4567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date of Birth:
                </span>
                <span className="font-semibold">March 15, 1998</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Nationality:
                </span>
                <span className="font-semibold">Indian</span>
              </div>
            </CardContent>
          </Card>

          {/* Selected University */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-green-600" />
                Selected University
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  University:
                </span>
                <span className="font-semibold">Stanford University</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Country:
                </span>
                <span className="font-semibold">United States</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Program:
                </span>
                <span className="font-semibold">Computer Science</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Level:</span>
                <span className="font-semibold">Master's Degree</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">2 Years</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Visa Agency */}
        <Card className="mb-6 border-0 shadow-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-green-600" />
              Selected Visa Agency
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building className="w-10 h-10 text-green-600" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Global Visa Experts</h3>
                    <p className="text-sm text-gray-600">Specializing in US Student Visas</p>
                  </div>
                  <Badge className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <Separator />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-lg font-bold text-green-600">94%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Processing Time</p>
                    <p className="text-lg font-bold text-gray-900">3-4 weeks</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="text-lg font-bold text-gray-900">4.8/5.0 ⭐</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Applications</p>
                    <p className="text-lg font-bold text-gray-900">2,500+</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Documents */}
        <Card className="mb-6 border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              Uploaded Documents (All Verified)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Valid Passport", 
                "CV/Resume", 
                "Academic Transcripts", 
                "Statement of Purpose", 
                "IELTS Certificate", 
                "Birth Certificate", 
                "Proof of Funds",
                "Recommendation Letters"
              ].map((doc) => (
                <div key={doc} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-100">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-medium text-gray-900">{doc}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Terms and Disclaimer */}
        <Card className="mb-6 border-0 shadow-md bg-blue-50">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <p className="text-sm text-gray-700 flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Declaration:</strong> I confirm that all information provided in this application is accurate, complete, and true to the best of my knowledge.
                </span>
              </p>
              <p className="text-sm text-gray-700 flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Processing:</strong> Your application will be processed by Global Visa Experts. You will receive regular updates via email and SMS.
                </span>
              </p>
              <p className="text-sm text-gray-700 flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Timeline:</strong> Expected processing time is 3-4 weeks from submission date. You will be notified of any additional requirements.
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/approval-prediction")} 
            className="flex-1 h-14 border-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Prediction
          </Button>
          <Button 
            onClick={handleSubmit} 
            className="flex-1 h-14 bg-green-600 hover:bg-green-700 text-lg font-semibold shadow-lg"
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Application
          </Button>
        </div>
      </div>

      {/* Success Dialog */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <AlertDialogTitle className="text-center text-2xl text-gray-900">
              Application Submitted Successfully!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-3">
              <p className="text-gray-700">
                Your visa application has been submitted to <strong>Global Visa Experts</strong>.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Reference Number:</strong>
                </p>
                <p className="text-xl font-bold text-blue-600">VAM-2026-001234</p>
              </div>
              <p className="text-sm text-gray-600">
                You will receive a confirmation email shortly with detailed instructions and tracking information.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => navigate("/dashboard")} 
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-lg"
            >
              Go to Dashboard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}