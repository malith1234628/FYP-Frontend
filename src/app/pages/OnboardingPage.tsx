import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Upload,
  FileText,
  Check,
  AlertCircle
} from "lucide-react";
import { Progress } from "@/app/components/ui/progress";

export default function OnboardingPage() {
  const navigate = useNavigate();

  // Document uploads
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // Get user ID from token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      // Decode JWT token to get user ID
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserId(payload.id);
    } catch (err) {
      console.error("Failed to decode token:", err);
      navigate("/login");
    }
  }, [navigate]);

  const handlePassportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("Passport file size must be less than 10MB");
        return;
      }
      setPassportFile(file);
      setError("");
    }
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("CV file size must be less than 10MB");
        return;
      }
      setCvFile(file);
      setError("");
    }
  };

  const handleUploadAndContinue = async () => {
    if (!passportFile || !cvFile) {
      setError("Please upload both passport and CV to continue");
      return;
    }

    if (!userId) {
      setError("User ID not found. Please login again.");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("passport", passportFile);
      formData.append("cv", cvFile);

      const response = await fetch("http://localhost:5003/api/students/documents/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload documents");
      }

      // Navigate to dashboard on success
      navigate("/dashboard");
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload documents");
    } finally {
      setIsUploading(false);
    }
  };

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
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {/* Passport */}
            <div className="space-y-2">
              <Label htmlFor="passport" className="flex items-center gap-2 text-base">
                <FileText className="w-4 h-4" />
                Passport <span className="text-red-500">*</span>
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  id="passport"
                  className="hidden"
                  onChange={handlePassportChange}
                  accept=".pdf,.jpg,.jpeg,.png,.gif,image/jpeg,image/jpg,image/png,image/gif,application/pdf"
                />
                <label htmlFor="passport" className="cursor-pointer">
                  {passportFile ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">{passportFile.name}</span>
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
                CV / Resume <span className="text-red-500">*</span>
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  id="cv"
                  className="hidden"
                  onChange={handleCvChange}
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
                <label htmlFor="cv" className="cursor-pointer">
                  {cvFile ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">{cvFile.name}</span>
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
          onClick={handleUploadAndContinue}
          disabled={!passportFile || !cvFile || isUploading}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 h-12"
        >
          {isUploading ? "Uploading Documents..." : "Upload & Continue to Dashboard"}
        </Button>

        {(!passportFile || !cvFile) && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Both documents are required to continue
          </p>
        )}
      </div>
    </div>
  );
}
