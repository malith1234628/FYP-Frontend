import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, CheckCircle2, FileCheck } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

export default function DocumentVerificationPage() {
  const navigate = useNavigate();

  const documents = [
    { name: "Valid Passport", status: "verified", uploadDate: "Jan 15, 2026" },
    { name: "Academic Transcripts", status: "verified", uploadDate: "Jan 15, 2026" },
    { name: "Statement of Purpose", status: "verified", uploadDate: "Jan 16, 2026" },
    { name: "IELTS Certificate", status: "verified", uploadDate: "Jan 16, 2026" },
    { name: "Birth Certificate", status: "verified", uploadDate: "Jan 16, 2026" },
    { name: "Proof of Funds", status: "verified", uploadDate: "Jan 17, 2026" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/document-upload")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <GraduationCap className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-semibold">Document Verification</span>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Success Alert */}
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertDescription className="text-green-800 font-medium">
            All documents have been successfully verified! You're ready to proceed to the next step.
          </AlertDescription>
        </Alert>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Document Verification Complete</h1>
          <p className="text-gray-600">All your documents have been reviewed and approved</p>
          <div className="mt-4">
            <Progress value={100} className="h-3 bg-green-100" />
            <p className="text-sm text-green-600 font-medium mt-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Verification Complete - 6/6 documents verified
            </p>
          </div>
        </div>

        {/* Verified Documents Card */}
        <Card className="border-0 shadow-lg bg-white mb-6">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-center gap-2">
              <FileCheck className="w-6 h-6 text-green-600" />
              <CardTitle className="text-2xl">Verified Documents</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-green-100 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-600">Uploaded on {doc.uploadDate}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-0 shadow-md bg-blue-50 mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">What's Next?</h3>
                <p className="text-sm text-gray-700">
                  Your documents have been verified successfully. Click "Continue to Approval Prediction" to see your estimated visa approval chances based on your profile and documents.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/document-upload")} 
            className="flex-1 h-14 border-2"
          >
            Back to Documents
          </Button>
          <Button
            onClick={() => navigate("/approval-prediction")}
            className="flex-1 h-14 bg-green-600 hover:bg-green-700 text-lg font-semibold shadow-lg"
          >
            Continue to Approval Prediction
          </Button>
        </div>
      </div>
    </div>
  );
}