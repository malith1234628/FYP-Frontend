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
  const [extractedData, setExtractedData] = useState<{
    passport: Record<string, any> | null;
    cv: Record<string, any> | null;
  } | null>(null);

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

      // Show extracted-data summary; user clicks through to dashboard
      setExtractedData(data.extracted || { passport: null, cv: null });
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
            <span className="text-sm font-medium">
              {extractedData ? "Step 2 of 3" : "Step 1 of 3"}
            </span>
            <span className="text-sm text-gray-600">
              {extractedData ? "Review Extracted Data" : "Document Upload"}
            </span>
          </div>
          <Progress value={extractedData ? 66 : 33} className="h-2" />
        </div>

        {/* ─── UPLOAD FORM (shown before extraction) ─── */}
        {!extractedData && (
          <>
            <Card className="mb-6 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Upload Your Documents</CardTitle>
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
                          <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
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
                          <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
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
              {isUploading ? "Uploading & Extracting..." : "Upload & Extract"}
            </Button>

            {(!passportFile || !cvFile) && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Both documents are required to continue
              </p>
            )}
          </>
        )}

        {/* ─── EXTRACTED DATA SUMMARY (shown after extraction) ─── */}
        {extractedData && (
          <>
            <div className="flex items-center justify-center gap-2 text-green-600 mb-6">
              <Check className="w-6 h-6" />
              <span className="text-lg font-semibold">Documents uploaded and data extracted</span>
            </div>

            {/* Passport extracted data */}
            <Card className="mb-4 shadow-lg border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Passport Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {extractedData.passport ? (
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    {(() => {
                      const p = extractedData.passport;
                      const fullName = p.name
                        ? (p.name.surname && p.name.given_names
                            ? `${p.name.given_names} ${p.name.surname}`
                            : p.name.full_name || null)
                        : null;
                      const fields = [
                        { label: "Full Name",     value: fullName },
                        { label: "Passport No",   value: p.passport_number },
                        { label: "Date of Birth", value: p.date_of_birth },
                        { label: "Nationality",   value: p.nationality },
                        { label: "Expiry Date",   value: p.expiry_date },
                        { label: "Gender",        value: p.gender },
                      ];
                      return fields.map(({ label, value }) => (
                        <div key={label}>
                          <dt className="text-gray-500">{label}</dt>
                          <dd className="font-medium text-gray-900">{value || <span className="italic text-gray-400">not detected</span>}</dd>
                        </div>
                      ));
                    })()}
                  </dl>
                ) : (
                  <p className="text-sm text-gray-500 italic">Passport extraction was not available. The file has still been saved.</p>
                )}
              </CardContent>
            </Card>

            {/* CV extracted data */}
            <Card className="mb-6 shadow-lg border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  CV / Resume Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                {extractedData.cv ? (
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    {(() => {
                      const c = extractedData.cv;
                      const fields = [
                        { label: "Name",            value: c.name },
                        { label: "Email",           value: c.email },
                        { label: "Phone",           value: c.phone },
                        { label: "GPA",             value: c.gpa },
                        { label: "Has Experience",  value: c.has_experience ? "Yes" : "No" },
                      ];
                      return fields.map(({ label, value }) => (
                        <div key={label}>
                          <dt className="text-gray-500">{label}</dt>
                          <dd className="font-medium text-gray-900">{value || <span className="italic text-gray-400">not detected</span>}</dd>
                        </div>
                      ));
                    })()}
                    {extractedData.cv.education && (
                      <div className="col-span-2">
                        <dt className="text-gray-500">Education</dt>
                        <dd className="font-medium text-gray-900">{extractedData.cv.education}</dd>
                      </div>
                    )}
                    {extractedData.cv.skills && (
                      <div className="col-span-2">
                        <dt className="text-gray-500">Skills</dt>
                        <dd className="font-medium text-gray-900">{extractedData.cv.skills}</dd>
                      </div>
                    )}
                  </dl>
                ) : (
                  <p className="text-sm text-gray-500 italic">CV extraction was not available. The file has still been saved.</p>
                )}
              </CardContent>
            </Card>

            <Button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 h-12"
            >
              Continue to Dashboard
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
