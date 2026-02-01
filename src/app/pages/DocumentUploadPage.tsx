import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, Upload, Check, FileText } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";

export default function DocumentUploadPage() {
  const navigate = useNavigate();
  const [uploads, setUploads] = useState({
    sop: false,
    ielts: false,
    birthCert: false,
    funds: false,
  });

  const handleUpload = (doc: keyof typeof uploads) => {
    setUploads({ ...uploads, [doc]: true });
  };

  const allUploaded = Object.values(uploads).every(Boolean);

  const documents = [
    { id: "sop", name: "Statement of Purpose (SOP)", uploaded: uploads.sop },
    { id: "ielts", name: "IELTS Certificate", uploaded: uploads.ielts },
    { id: "birthCert", name: "Birth Certificate", uploaded: uploads.birthCert },
    { id: "funds", name: "Proof of Funds", uploaded: uploads.funds },
  ];

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

        <Card>
          <CardHeader>
            <CardTitle>Required Documents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="space-y-2">
                <Label className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {doc.name}
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    id={doc.id}
                    className="hidden"
                    onChange={() => handleUpload(doc.id as keyof typeof uploads)}
                  />
                  <label htmlFor={doc.id} className="cursor-pointer">
                    {doc.uploaded ? (
                      <div className="flex items-center justify-center gap-2 text-secondary">
                        <Check className="w-5 h-5" />
                        <span>Uploaded successfully</span>
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
            ))}
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => navigate("/application-form")} className="flex-1">
            Back
          </Button>
          <Button
            onClick={() => navigate("/document-verification")}
            disabled={!allUploaded}
            className="flex-1"
          >
            Verify Documents
          </Button>
        </div>
      </div>
    </div>
  );
}
