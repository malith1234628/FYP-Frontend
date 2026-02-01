import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  Upload, 
  FileText, 
  Check
} from "lucide-react";
import { Progress } from "@/app/components/ui/progress";

export default function OnboardingPage() {
  const navigate = useNavigate();
  
  // Document uploads
  const [passportUploaded, setPassportUploaded] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold">Visa Dreams</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-6 py-8 max-w-5xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step 1 of 3</span>
            <span className="text-sm text-gray-600">Document Upload</span>
          </div>
          <Progress value={33} className="h-2" />
        </div>

        {/* Upload Your Documents Card */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Upload Your Documents 📄</CardTitle>
            <CardDescription>
              Please upload the following required documents to continue with your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Passport */}
            <div className="space-y-2">
              <Label htmlFor="passport" className="flex items-center gap-2 text-base">
                <FileText className="w-4 h-4" />
                Passport
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  id="passport"
                  className="hidden"
                  onChange={() => setPassportUploaded(true)}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <label htmlFor="passport" className="cursor-pointer">
                  {passportUploaded ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Passport uploaded successfully</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <p className="text-sm text-gray-600 font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* CV */}
            <div className="space-y-2">
              <Label htmlFor="cv" className="flex items-center gap-2 text-base">
                <FileText className="w-4 h-4" />
                CV / Resume
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  id="cv"
                  className="hidden"
                  onChange={() => setCvUploaded(true)}
                  accept=".pdf,.doc,.docx"
                />
                <label htmlFor="cv" className="cursor-pointer">
                  {cvUploaded ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">CV uploaded successfully</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-gray-400" />
                      <p className="text-sm text-gray-600 font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 10MB)</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 h-12"
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
}
