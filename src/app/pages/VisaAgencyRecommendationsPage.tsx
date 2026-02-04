import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { saveApplicationProgress } from "@/app/utils/applicationProgress";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, Star, Clock, TrendingUp, Send, Loader2 } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";

interface Agency {
  agency_id: string;
  agency_name: string;
  contact_phone: string;
  head_office_address: string;
  total_students_handled: number;
  total_visas_approved: number;
  approval_rate: number;
  country: string;
  processing_time: string;
}

export default function VisaAgencyRecommendationsPage() {
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<string>("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [sendingRequest, setSendingRequest] = useState(false);

  // Save progress when entering this page
  useEffect(() => {
    saveApplicationProgress('visa-agency-recommendations');
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("visa_application");
    if (!stored) {
      setError("No application data found. Please go back and complete the previous steps.");
      setLoading(false);
      return;
    }

    let app: { selected_university?: string };
    try {
      app = JSON.parse(stored);
    } catch {
      setError("Invalid application data. Please go back and re-submit.");
      setLoading(false);
      return;
    }

    if (!app.selected_university) {
      setError("No university selected. Please go back and select a university.");
      setLoading(false);
      return;
    }

    setSelectedUniversity(app.selected_university);

    const token = localStorage.getItem("token");

    fetch(
      `http://localhost:5003/api/students/applications/agencies-by-university?university=${encodeURIComponent(app.selected_university)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) =>
        res.json().then((body) => {
          if (!res.ok) {
            throw new Error(body.message || `Failed to fetch agencies (${res.status})`);
          }
          return body;
        })
      )
      .then((data) => {
        setAgencies(data.agencies || []);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(`Failed to load agencies: ${err.message}`);
        setLoading(false);
      });
  }, []);

  const handleSendRequest = (agency: Agency) => {
    setSelectedAgency(agency);
    setShowConfirmDialog(true);
  };

  const confirmRequest = async () => {
    if (!selectedAgency) return;
    setSendingRequest(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5003/api/students/applications/send-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ agency_name: selectedAgency.agency_name }),
        }
      );

      if (!response.ok) {
        const body = await response.json();
        setError(body.message || "Failed to send request.");
        setSendingRequest(false);
        setShowConfirmDialog(false);
        return;
      }

      // Persist selected agency and university so later steps can read it
      localStorage.setItem("selected_university", selectedUniversity);
      localStorage.setItem("selected_agency", JSON.stringify(selectedAgency));
      
      const stored = localStorage.getItem("visa_application");
      if (stored) {
        const app = JSON.parse(stored);
        app.selected_agency = selectedAgency.agency_name;
        localStorage.setItem("visa_application", JSON.stringify(app));
      }
      
      saveApplicationProgress('application-form', { selected_agency: selectedAgency });

      setShowConfirmDialog(false);
      navigate("/application-form");
    } catch {
      setError("Network error. Please try again.");
      setSendingRequest(false);
      setShowConfirmDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/university-recommendations")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">Visa Application</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Recommended Visa Agencies</h1>
          <p className="text-gray-600">Select a trusted agency to handle your visa application</p>
          <div className="mt-4">
            <Progress value={60} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">Step 3 of 5</p>
          </div>
        </div>

        {/* Selected university banner */}
        {selectedUniversity && (
          <div className="mb-6 flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-800">
              Showing agencies that service <strong>{selectedUniversity}</strong>
            </span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-gray-600">Finding agencies for your university...</p>
          </div>
        )}

        {/* No agencies found */}
        {!loading && !error && agencies.length === 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-6 py-8 text-center">
            <p className="text-amber-800 font-medium mb-1">No agencies currently registered for {selectedUniversity}</p>
            <p className="text-amber-700 text-sm">Please check back later or go back to choose a different university.</p>
          </div>
        )}

        {/* Agency cards */}
        {!loading && agencies.length > 0 && (
          <div className="space-y-6">
            {agencies.map((agency, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{agency.agency_name}</span>
                    <Badge className="bg-green-600 hover:bg-green-700 text-white">Verified</Badge>
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{agency.head_office_address}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-gray-700">Success Rate</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        {agency.approval_rate > 0 ? `${agency.approval_rate}%` : "N/A"}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">Processing Time</span>
                      </div>
                      <p className="text-lg font-semibold text-blue-600">{agency.processing_time}</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                        <span className="text-sm font-medium text-gray-700">Students Handled</span>
                      </div>
                      <p className="text-2xl font-bold text-yellow-700">
                        {agency.total_students_handled}
                        <span className="text-sm font-normal text-gray-600"> ({agency.total_visas_approved} approved)</span>
                      </p>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    onClick={() => handleSendRequest(agency)}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send a Request
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => navigate("/university-recommendations")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to send a request to <strong>{selectedAgency?.agency_name}</strong>?
              <br /><br />
              They will review your profile and contact you at <strong>{selectedAgency?.contact_phone}</strong> with next steps for your visa application process.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRequest}
              disabled={sendingRequest}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              {sendingRequest ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </span>
              ) : (
                "Confirm & Send Request"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
