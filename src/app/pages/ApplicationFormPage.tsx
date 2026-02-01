import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { Progress } from "@/app/components/ui/progress";

export default function ApplicationFormPage() {
  const navigate = useNavigate();

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Application Details</h1>
          <p className="text-gray-600">Review and complete your application</p>
          <div className="mt-4">
            <Progress value={70} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">Step 4 of 5</p>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Auto-filled Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input value="John Doe" disabled className="bg-gray-50" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value="john.doe@example.com" disabled className="bg-gray-50" />
              </div>
            </div>
            <div>
              <Label>Selected University</Label>
              <Input value="Massachusetts Institute of Technology" disabled className="bg-gray-50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Course</Label>
                <Input value="Computer Science" disabled className="bg-gray-50" />
              </div>
              <div>
                <Label>Course Level</Label>
                <Input value="Master's Degree" disabled className="bg-gray-50" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Current Address</Label>
              <Input id="address" placeholder="Enter your current address" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <Label htmlFor="emergency">Emergency Contact</Label>
                <Input id="emergency" placeholder="+1 (555) 000-0000" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => navigate("/visa-agency-recommendations")} className="flex-1">
            Back
          </Button>
          <Button onClick={() => navigate("/document-upload")} className="flex-1">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
