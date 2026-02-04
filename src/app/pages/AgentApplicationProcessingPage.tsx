import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Upload,
  MessageCircle,
  Eye,
  Download,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Loader2
} from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Textarea } from "@/app/components/ui/textarea";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

// DB statuses that count as "active"
const ACTIVE_STATUSES = ["agency_selected", "in_progress"];

const statusLabelMap: Record<string, string> = {
  agency_selected: "Accepted",
  in_progress: "In Progress",
  completed: "Completed",
};

const documents = [
  { id: 1, name: "Passport", status: "Pending Review", uploadDate: "—", verifiedBy: null, verificationDate: null },
  { id: 2, name: "Academic Transcripts", status: "Pending Review", uploadDate: "—", verifiedBy: null, verificationDate: null },
  { id: 3, name: "IELTS Certificate", status: "Pending Review", uploadDate: "—", verifiedBy: null, verificationDate: null },
  { id: 4, name: "Bank Statement", status: "Pending Review", uploadDate: "—", verifiedBy: null, verificationDate: null },
];

const timelineSteps = [
  { id: 1, title: "New Request", status: "completed", date: null, description: "Student submitted visa application request" },
  { id: 2, title: "Agency Accepted", status: "completed", date: null, description: "Agency accepted the request" },
  { id: 3, title: "Documents Review", status: "active", date: null, description: "Agent reviewing and verifying documents" },
  { id: 4, title: "Application Submitted", status: "pending", date: null, description: "Application to be submitted to university" },
  { id: 5, title: "Embassy Review", status: "pending", date: null, description: "Embassy reviewing visa application" },
  { id: 6, title: "Approved / Rejected", status: "pending", date: null, description: "Final decision from embassy" },
];

export default function AgentApplicationProcessingPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || user.user_type !== "agency") {
      navigate("/agent-login");
      return;
    }

    fetch("http://localhost:5003/api/agency/requests", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        const active = (data.requests || []).filter((r: any) => ACTIVE_STATUSES.includes(r.status));
        setRequests(active);
        if (active.length > 0) setSelectedStudentId(active[0].id);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [navigate]);

  const selected = requests.find((r) => r.id === selectedStudentId) || null;

  const getInitials = (name: string) => {
    if (!name) return "ST";
    return name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-600";
      case "active":    return "bg-blue-600";
      default:          return "bg-gray-300";
    }
  };

  const getDocStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">✓ Verified</Badge>;
      case "Pending Review":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">⏳ Pending Review</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-gray-600">Loading active applications...</p>
      </div>
    );
  }

  // ── Empty state ──
  if (requests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/agency-dashboard")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Building2 className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-xl font-semibold">Active Applications</h1>
                  <p className="text-sm text-gray-500">No active applications yet</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container mx-auto px-6 py-24 max-w-7xl text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Applications</h3>
          <p className="text-gray-600 mb-6">Accept a student request first to see it here.</p>
          <Button onClick={() => navigate("/agency-requests")} className="bg-blue-600 hover:bg-blue-700">
            Go to Student Requests
          </Button>
        </div>
      </div>
    );
  }

  // ── Main page ──
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/agency-dashboard")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Building2 className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-xl font-semibold">Application Processing</h1>
                  <p className="text-sm text-gray-500">{requests.length} active application{requests.length !== 1 ? "s" : ""}</p>
                </div>
              </div>
            </div>
            {selected && (
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-base px-4 py-2">
                {statusLabelMap[selected.status] || selected.status}
              </Badge>
            )}
          </div>

          {/* Student Selector Dropdown */}
          <div className="mt-4 max-w-md">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Select Student</label>
            <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a student..." />
              </SelectTrigger>
              <SelectContent>
                {requests.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.student_name} — {r.target_university}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {selected && (
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Student Profile Summary */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">👤 Student Profile Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-xl">
                        {getInitials(selected.student_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{selected.student_name}</h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {selected.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {selected.phone || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                        <div>
                          <p className="text-xs text-gray-500">Target Country</p>
                          <p className="font-medium text-gray-900 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {selected.country}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">University</p>
                          <p className="font-medium text-gray-900 flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" />
                            {selected.university}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Course</p>
                          <p className="font-medium text-gray-900">
                            {selected.program ? `${selected.program} (${selected.course_level || selected.program_level})` : selected.program_level || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="font-medium text-gray-900 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {selected.intake_period || (selected.duration_years ? `${selected.duration_years} years` : "N/A")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs: Documents / Chat / Notes */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <Tabs defaultValue="documents" className="w-full">
                    <div className="border-b px-6 pt-6">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="documents">📄 Documents</TabsTrigger>
                        <TabsTrigger value="chat">💬 Chat</TabsTrigger>
                        <TabsTrigger value="notes">📝 Internal Notes</TabsTrigger>
                      </TabsList>
                    </div>

                    {/* Documents Tab */}
                    <TabsContent value="documents" className="p-6 space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900">Uploaded Documents ({documents.length})</h3>
                        <Button size="sm" variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Document
                        </Button>
                      </div>
                      {documents.map((doc) => (
                        <div key={doc.id} className="p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <FileText className="w-8 h-8 text-gray-400" />
                              <div>
                                <h4 className="font-medium text-gray-900">{doc.name}</h4>
                                <p className="text-sm text-gray-500">Uploaded: {doc.uploadDate}</p>
                              </div>
                            </div>
                            {getDocStatusBadge(doc.status)}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="w-4 h-4 mr-2" />View
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Download className="w-4 h-4 mr-2" />Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    {/* Chat Tab */}
                    <TabsContent value="chat" className="p-6">
                      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                        <p className="text-sm text-gray-500 text-center py-4">No messages yet. Start a conversation with the student.</p>
                      </div>
                      <div className="flex gap-2 pt-4 border-t">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button onClick={() => setNewMessage("")} className="bg-blue-600 hover:bg-blue-700">
                          <MessageCircle className="w-4 h-4 mr-2" />Send
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Internal Notes Tab */}
                    <TabsContent value="notes" className="p-6 space-y-4">
                      <p className="text-sm text-gray-500">No internal notes yet.</p>
                      <div className="pt-4 border-t">
                        <p className="text-sm font-medium text-gray-700 mb-2">Add Internal Note</p>
                        <Textarea
                          placeholder="Add a note (visible only to agency staff)..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          rows={3}
                        />
                        <Button onClick={() => setNewNote("")} className="mt-2 bg-yellow-600 hover:bg-yellow-700">
                          Add Note
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Timeline */}
            <div>
              <Card className="border-0 shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl">🗓️ Visa Processing Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timelineSteps.map((step, index) => (
                      <div key={step.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}>
                            {step.status === "completed" ? (
                              <CheckCircle2 className="w-6 h-6 text-white" />
                            ) : step.status === "active" ? (
                              <Clock className="w-6 h-6 text-white animate-pulse" />
                            ) : (
                              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                            )}
                          </div>
                          {index < timelineSteps.length - 1 && (
                            <div className={`w-0.5 h-16 ${step.status === "completed" ? "bg-green-600" : "bg-gray-300"}`}></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <h4 className={`font-semibold ${step.status === "pending" ? "text-gray-500" : "text-gray-900"}`}>
                            {step.title}
                          </h4>
                          <p className={`text-xs ${step.status === "pending" ? "text-gray-400" : "text-gray-600"} mt-1`}>
                            {step.description}
                          </p>
                          {step.status === "active" && (
                            <Badge className="mt-2 bg-blue-100 text-blue-700 hover:bg-blue-100">Current Step</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
