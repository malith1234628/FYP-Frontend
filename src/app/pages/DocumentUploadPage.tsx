import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, Upload, Check, FileText } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";

export default function DocumentUploadPage() {
  const navigate = useNavigate();

  const [files, setFiles] = useState<Record<string, File | null>>({
    sop: null,
    ielts: null,
    birthCert: null,
    funds: null,
    olCert: null,
    alCert: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (doc: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFiles((prev) => ({ ...prev, [doc]: file }));
  };

  const allUploaded = Object.values(files).every(Boolean);

  const documents = [
    { id: "sop",       name: "Statement of Purpose (SOP)" },
    { id: "ielts",     name: "IELTS Certificate" },
    { id: "birthCert", name: "Birth Certificate" },
    { id: "funds",     name: "Proof of Funds" },
    { id: "olCert",    name: "G.C.E. Ordinary Level (O/L) Certificate" },
    { id: "alCert",    name: "G.C.E. Advanced Level (A/L) Certificate" },
  ];

  const handleVerify = async () => {
    setError(null);
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Session expired. Please log in again.");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      for (const [field, file] of Object.entries(files)) {
        if (file) formData.append(field, file);
      }

      const response = await fetch("http://localhost:5003/api/students/visa-documents", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Failed to upload documents.");
        setIsSubmitting(false);
        return;
      }

      navigate("/document-verification");
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/application-form")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <GraduationCap className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold">Document Upload</span>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Required Documents</h1>
          <p className="text-gray-600">Upload all necessary documents for your visa application</p>
          <div className="mt-4">
            <Progress value={80} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">Step 4 of 5</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">
            {error}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Required Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.map((doc) => {
              const selected = files[doc.id];
              return (
                <div key={doc.id} className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {doc.name}
                  </Label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${selected ? "border-green-400 bg-green-50" : "border-gray-300 hover:border-primary"}`}>
                    <input
                      type="file"
                      id={doc.id}
                      className="hidden"
                      onChange={(e) => handleFileSelect(doc.id, e)}
                    />
                    <label htmlFor={doc.id} className="cursor-pointer">
                      {selected ? (
                        <div className="flex items-center justify-center gap-2 text-green-700">
                          <Check className="w-5 h-5" />
                          <span className="text-sm font-medium">{selected.name}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="w-6 h-6 text-gray-400" />
                          <p className="text-sm text-gray-600">Click to upload</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => navigate("/application-form")} className="flex-1">
            Back
          </Button>
          <Button
            onClick={handleVerify}
            disabled={!allUploaded || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Uploading..." : "Verify Documents"}
          </Button>
        </div>
      </div>
    </div>
  );
}
