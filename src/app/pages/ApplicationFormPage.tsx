import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/app/components/ui/button";
import { saveApplicationProgress } from "@/app/utils/applicationProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Checkbox } from "@/app/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, Upload, Loader2, Clock, XCircle, RefreshCw } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";

type QuestionType = 'short-answer' | 'paragraph' | 'multiple-choice' | 'checkboxes' | 'dropdown' | 'date' | 'file-upload';

type FormQuestion = {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
};

type UniversityForm = {
  id: string;
  formTitle: string;
  formDescription: string;
  questions: FormQuestion[];
};

export default function ApplicationFormPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<UniversityForm | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [formAnswers, setFormAnswers] = useState<{[key: string]: any}>({});
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedAgency, setSelectedAgency] = useState<any>(null);

  // Request-status gate
  const [requestStatus, setRequestStatus] = useState<string | null>(null);
  const [agencyName, setAgencyName] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkRequestStatus = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5003/api/students/applications/request-status", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.success && data.request) {
        setRequestStatus(data.request.status);
        setAgencyName(data.request.agency_name || "");
      }
    } catch { /* silent – retries on next poll */ }
  }, []);

  // On mount: save progress, kick off status polling
  useEffect(() => {
    saveApplicationProgress('application-form');
    checkRequestStatus();
    pollRef.current = setInterval(checkRequestStatus, 5000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [checkRequestStatus]);

  // Once the agency has accepted, stop polling and load the form
  useEffect(() => {
    if (requestStatus !== "agency_selected" && requestStatus !== "in_progress") return;

    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }

    const storedUniversity = localStorage.getItem("selected_university");
    const storedAgency = localStorage.getItem("selected_agency");

    if (storedUniversity) setSelectedUniversity(storedUniversity);

    if (storedAgency) {
      try {
        const agency = JSON.parse(storedAgency);
        setSelectedAgency(agency);
        if (storedUniversity && agency.agency_id) {
          fetchUniversityForm(agency.agency_id, storedUniversity);
        } else {
          setError("Missing data. Please go back and select again.");
          setIsLoading(false);
        }
      } catch {
        setError("Invalid agency data. Please go back and select again.");
        setIsLoading(false);
      }
    } else {
      setError("No agency selected. Please go back.");
      setIsLoading(false);
    }
  }, [requestStatus]);

  const fetchUniversityForm = async (agencyId: string, universityName: string) => {
    setIsLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required. Please log in.");

      const url = `http://localhost:5003/auth/agency/forms?agency_id=${encodeURIComponent(agencyId)}&university_name=${encodeURIComponent(universityName)}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch application form");
      setForm(data.form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load application form");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setFormAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    setFormAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentAnswers, option]
        };
      } else {
        return {
          ...prev,
          [questionId]: currentAnswers.filter((item: string) => item !== option)
        };
      }
    });
  };

  const handleSubmit = () => {
    // Validate required fields
    if (form) {
      const missingRequired = form.questions
        .filter(q => q.required)
        .some(q => !formAnswers[q.id] || (Array.isArray(formAnswers[q.id]) && formAnswers[q.id].length === 0));

      if (missingRequired) {
        setError("Please fill in all required fields");
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    // Save form answers and proceed
    localStorage.setItem("application_form_answers", JSON.stringify(formAnswers));
    saveApplicationProgress('document-upload', { form_answers: formAnswers });
    navigate("/document-upload");
  };

  // ── Waiting for agency approval ──
  if (requestStatus === null || requestStatus === "open") {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white">
          <div className="container mx-auto px-6 py-4 flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/visa-agency-recommendations")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">Application Form</span>
          </div>
        </header>
        <div className="container mx-auto px-6 py-8 max-w-3xl">
          <div className="mb-6">
            <Progress value={65} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">Step 4 of 5 — Waiting for agency</p>
          </div>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-10 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-amber-50 border-4 border-amber-300 flex items-center justify-center">
                  <Clock className="w-10 h-10 text-amber-500 animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Waiting for Agency Approval</h2>
              <p className="text-gray-600 mb-1">
                Your request has been sent to <strong>{agencyName || "the agency"}</strong>.
              </p>
              <p className="text-gray-500 text-sm mb-6">
                You can proceed with the application form once the agency accepts your request. This page refreshes automatically every 5 seconds.
              </p>
              <Button
                variant="outline"
                onClick={checkRequestStatus}
                className="inline-flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Status
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ── Request was rejected ──
  if (requestStatus === "cancelled") {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white">
          <div className="container mx-auto px-6 py-4 flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/visa-agency-recommendations")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">Application Form</span>
          </div>
        </header>
        <div className="container mx-auto px-6 py-8 max-w-3xl">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-10 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-10 h-10 text-red-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-red-700 mb-2">Request Rejected</h2>
              <p className="text-red-600 mb-6">
                <strong>{agencyName || "The agency"}</strong> has rejected your request. You can go back and send a request to a different agency.
              </p>
              <Button onClick={() => navigate("/visa-agency-recommendations")} className="bg-blue-600 hover:bg-blue-700">
                Go Back & Choose Another Agency
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // ── Form loading (after approval) ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading application form...</p>
        </div>
      </div>
    );
  }

  if (error && !form) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white">
          <div className="container mx-auto px-6 py-4 flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/visa-agency-recommendations")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">Application Form</span>
          </div>
        </header>
        <div className="container mx-auto px-6 py-8 max-w-3xl">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Form</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => navigate("/visa-agency-recommendations")}>
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/visa-agency-recommendations")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">Application Form</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-3xl">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{form?.formTitle || "Application Form"}</h1>
          <p className="text-gray-600">{form?.formDescription || "Complete your application"}</p>
          {selectedUniversity && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900">Selected University</p>
              <p className="text-blue-700">{selectedUniversity}</p>
              {selectedAgency && (
                <>
                  <p className="text-sm font-semibold text-blue-900 mt-2">Selected Agency</p>
                  <p className="text-blue-700">{selectedAgency.agency_name}</p>
                </>
              )}
            </div>
          )}
          <div className="mt-4">
            <Progress value={70} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">Step 4 of 5</p>
          </div>
        </div>

        {form && form.questions.length > 0 ? (
          <div className="space-y-6">
            {form.questions.map((question, index) => (
              <Card key={question.id}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-900">
                      {index + 1}. {question.title}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {question.description && (
                      <p className="text-sm text-gray-600">{question.description}</p>
                    )}
                    
                    {/* Short Answer */}
                    {question.type === 'short-answer' && (
                      <Input 
                        placeholder={question.placeholder || "Your answer"}
                        value={formAnswers[question.id] || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      />
                    )}
                    
                    {/* Paragraph */}
                    {question.type === 'paragraph' && (
                      <Textarea 
                        placeholder={question.placeholder || "Your answer"}
                        rows={4}
                        value={formAnswers[question.id] || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      />
                    )}
                    
                    {/* Multiple Choice */}
                    {question.type === 'multiple-choice' && question.options && (
                      <div className="space-y-2">
                        {question.options.map((option, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <input 
                              type="radio" 
                              name={question.id} 
                              id={`${question.id}-${idx}`}
                              className="w-4 h-4"
                              checked={formAnswers[question.id] === option}
                              onChange={() => handleAnswerChange(question.id, option)}
                            />
                            <label htmlFor={`${question.id}-${idx}`} className="text-sm cursor-pointer">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Checkboxes */}
                    {question.type === 'checkboxes' && question.options && (
                      <div className="space-y-2">
                        {question.options.map((option, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`${question.id}-${idx}`}
                              checked={(formAnswers[question.id] || []).includes(option)}
                              onCheckedChange={(checked) => handleCheckboxChange(question.id, option, !!checked)}
                            />
                            <label htmlFor={`${question.id}-${idx}`} className="text-sm cursor-pointer">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Dropdown */}
                    {question.type === 'dropdown' && question.options && (
                      <select 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={formAnswers[question.id] || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      >
                        <option value="">Choose an option</option>
                        {question.options.map((option, idx) => (
                          <option key={idx} value={option}>{option}</option>
                        ))}
                      </select>
                    )}
                    
                    {/* Date */}
                    {question.type === 'date' && (
                      <Input 
                        type="date"
                        value={formAnswers[question.id] || ""}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      />
                    )}
                    
                    {/* File Upload */}
                    {question.type === 'file-upload' && (
                      <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                        <input
                          type="file"
                          id={question.id}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleAnswerChange(question.id, file);
                            }
                          }}
                        />
                        <label htmlFor={question.id} className="cursor-pointer">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            {formAnswers[question.id]?.name || "Click to upload or drag and drop"}
                          </p>
                          {formAnswers[question.id]?.name && (
                            <p className="text-xs text-green-600 mt-2">✓ {formAnswers[question.id].name}</p>
                          )}
                        </label>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-600">No questions available for this form.</p>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => navigate("/visa-agency-recommendations")} className="flex-1">
            Back
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            Continue to Documents
          </Button>
        </div>
      </div>
    </div>
  );
}
