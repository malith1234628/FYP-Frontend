import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft, Star, Clock, TrendingUp, Send } from "lucide-react";
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
import { useState } from "react";

const agencies = [
  {
    id: 1,
    name: "Global Visa Experts",
    successRate: "94%",
    processingTime: "3-4 weeks",
    rating: 4.8,
    reviews: 1250,
  },
  {
    id: 2,
    name: "EduVisa Pro",
    successRate: "91%",
    processingTime: "4-5 weeks",
    rating: 4.7,
    reviews: 980,
  },
  {
    id: 3,
    name: "Student Visa Solutions",
    successRate: "89%",
    processingTime: "4-6 weeks",
    rating: 4.6,
    reviews: 750,
  },
];

export default function VisaAgencyRecommendationsPage() {
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<typeof agencies[0] | null>(null);

  const handleSendRequest = (agency: typeof agencies[0]) => {
    setSelectedAgency(agency);
    setShowConfirmDialog(true);
  };

  const confirmRequest = () => {
    setShowConfirmDialog(false);
    // Here you could add logic to actually send the request
    navigate("/application-form");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/university-recommendations")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <GraduationCap className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold">Visa Application</span>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Recommended Visa Agencies 🏢</h1>
          <p className="text-gray-600">Select a trusted agency to handle your visa application</p>
          <div className="mt-4">
            <Progress value={60} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">Step 3 of 5</p>
          </div>
        </div>

        <div className="space-y-6">
          {agencies.map((agency) => (
            <Card key={agency.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{agency.name}</span>
                  <Badge className="bg-green-600 hover:bg-green-700 text-white">✓ Verified</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Success Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{agency.successRate}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Processing Time</span>
                    </div>
                    <p className="text-lg font-semibold text-blue-600">{agency.processingTime}</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                      <span className="text-sm font-medium text-gray-700">Rating</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-700">
                      {agency.rating}
                      <span className="text-sm font-normal text-gray-600"> ({agency.reviews})</span>
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

        {/* Navigation Buttons */}
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
              Are you sure you want to send a request to <strong>{selectedAgency?.name}</strong>? 
              <br /><br />
              They will review your profile and contact you with next steps for your visa application process.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmRequest}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              Confirm & Send Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
