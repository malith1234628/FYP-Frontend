import { useState } from "react";
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
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar
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

const documents = [
  { id: 1, name: "Passport", status: "Verified", uploadDate: "Jan 15, 2026", verifiedBy: "Agent", verificationDate: "Jan 16, 2026" },
  { id: 2, name: "Academic Transcripts", status: "Verified", uploadDate: "Jan 15, 2026", verifiedBy: "Agent", verificationDate: "Jan 16, 2026" },
  { id: 3, name: "IELTS Certificate", status: "Pending Review", uploadDate: "Jan 17, 2026", verifiedBy: null, verificationDate: null },
  { id: 4, name: "Bank Statement", status: "Verified", uploadDate: "Jan 16, 2026", verifiedBy: "Agent", verificationDate: "Jan 17, 2026" },
  { id: 5, name: "Letter of Recommendation", status: "Verified", uploadDate: "Jan 16, 2026", verifiedBy: "Agent", verificationDate: "Jan 17, 2026" },
  { id: 6, name: "Personal Statement", status: "Pending Review", uploadDate: "Jan 18, 2026", verifiedBy: null, verificationDate: null },
];

const timelineSteps = [
  { 
    id: 1, 
    title: "New Request", 
    status: "completed", 
    date: "Jan 15, 2026",
    description: "Student submitted visa application request"
  },
  { 
    id: 2, 
    title: "Documents Received", 
    status: "completed", 
    date: "Jan 16, 2026",
    description: "All required documents uploaded by student"
  },
  { 
    id: 3, 
    title: "Verification in Progress", 
    status: "active", 
    date: "Jan 17, 2026",
    description: "Agent reviewing and verifying documents"
  },
  { 
    id: 4, 
    title: "Application Submitted", 
    status: "pending", 
    date: null,
    description: "Application to be submitted to university"
  },
  { 
    id: 5, 
    title: "Embassy Review", 
    status: "pending", 
    date: null,
    description: "Embassy reviewing visa application"
  },
  { 
    id: 6, 
    title: "Approved / Rejected", 
    status: "pending", 
    date: null,
    description: "Final decision from embassy"
  },
];

const chatMessages = [
  { id: 1, sender: "student", name: "Kamal Perera", message: "Hello, I've uploaded my IELTS certificate. Can you please review it?", time: "10:30 AM" },
  { id: 2, sender: "agent", name: "You", message: "Thank you! I'll review it within the next hour.", time: "10:45 AM" },
  { id: 3, sender: "student", name: "Kamal Perera", message: "Great, thank you so much!", time: "10:46 AM" },
];

const internalNotes = [
  { id: 1, author: "Sarah Johnson", note: "Student has strong academic background. IELTS score is above requirement.", date: "Jan 16, 2026", time: "2:30 PM" },
  { id: 2, author: "Sarah Johnson", note: "Verified bank statement - funds are sufficient for tuition and living expenses.", date: "Jan 17, 2026", time: "11:15 AM" },
];

export default function AgentApplicationProcessingPage() {
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState("Verification in Progress");
  const [newNote, setNewNote] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const studentInfo = {
    name: "Kamal Perera",
    email: "kamal.perera@email.com",
    phone: "+94 77 123 4567",
    country: "United Kingdom",
    university: "University of Oxford",
    course: "MSc Computer Science",
    intake: "September 2026",
    gpa: "3.8",
    ielts: "7.5"
  };

  const handleStatusUpdate = () => {
    alert(`Status updated to: ${currentStatus}`);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    alert("Internal note added successfully");
    setNewNote("");
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    alert("Message sent to student");
    setNewMessage("");
  };

  const handleVerifyDocument = (docId: number) => {
    alert(`Document ${docId} marked as verified`);
  };

  const handleRequestRevision = (docId: number) => {
    const reason = prompt("Enter reason for requesting revision:");
    if (reason) {
      alert(`Revision requested for document ${docId}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600";
      case "active":
        return "bg-blue-600";
      case "pending":
        return "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  const getDocStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">✓ Verified</Badge>;
      case "Pending Review":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">⏳ Pending Review</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">✗ Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/agency-dashboard")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <Building2 className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-xl font-semibold">Application Processing</h1>
                  <p className="text-sm text-gray-500">Case ID: VAM-2026-047</p>
                </div>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-base px-4 py-2">
              In Progress
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
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
                      KP
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{studentInfo.name}</h3>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {studentInfo.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {studentInfo.phone}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                      <div>
                        <p className="text-xs text-gray-500">Target Country</p>
                        <p className="font-medium text-gray-900 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {studentInfo.country}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">University</p>
                        <p className="font-medium text-gray-900 flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          {studentInfo.university}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Course</p>
                        <p className="font-medium text-gray-900">{studentInfo.course}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Intake</p>
                        <p className="font-medium text-gray-900 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {studentInfo.intake}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-600">GPA</p>
                        <p className="text-lg font-bold text-blue-600">{studentInfo.gpa}</p>
                      </div>
                      <div className="border-l pl-4">
                        <p className="text-xs text-gray-600">IELTS Score</p>
                        <p className="text-lg font-bold text-blue-600">{studentInfo.ielts}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Documents and Communication */}
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

                    {documents.map(doc => (
                      <div key={doc.id} className="p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-gray-400" />
                            <div>
                              <h4 className="font-medium text-gray-900">{doc.name}</h4>
                              <p className="text-sm text-gray-500">Uploaded: {doc.uploadDate}</p>
                              {doc.verifiedBy && (
                                <p className="text-xs text-green-600">Verified by {doc.verifiedBy} on {doc.verificationDate}</p>
                              )}
                            </div>
                          </div>
                          {getDocStatusBadge(doc.status)}
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          {doc.status === "Pending Review" && (
                            <>
                              <Button 
                                size="sm" 
                                className="flex-1 bg-green-600 hover:bg-green-700"
                                onClick={() => handleVerifyDocument(doc.id)}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Verify
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                className="flex-1"
                                onClick={() => handleRequestRevision(doc.id)}
                              >
                                Request Revision
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  {/* Chat Tab */}
                  <TabsContent value="chat" className="p-6">
                    <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                      {chatMessages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-md ${msg.sender === "agent" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"} rounded-lg p-3`}>
                            <p className={`text-xs font-semibold mb-1 ${msg.sender === "agent" ? "text-blue-100" : "text-gray-600"}`}>
                              {msg.name}
                            </p>
                            <p className="text-sm">{msg.message}</p>
                            <p className={`text-xs mt-1 ${msg.sender === "agent" ? "text-blue-100" : "text-gray-500"}`}>
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Internal Notes Tab */}
                  <TabsContent value="notes" className="p-6 space-y-4">
                    <div className="space-y-3 mb-4">
                      {internalNotes.map(note => (
                        <div key={note.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-gray-900">{note.author}</p>
                            <p className="text-xs text-gray-500">{note.date} at {note.time}</p>
                          </div>
                          <p className="text-sm text-gray-700">{note.note}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium text-gray-700 mb-2">Add Internal Note</p>
                      <Textarea
                        placeholder="Add a note (visible only to agency staff)..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        rows={3}
                      />
                      <Button onClick={handleAddNote} className="mt-2 bg-yellow-600 hover:bg-yellow-700">
                        Add Note
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Status Update */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">🔄 Update Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Status</label>
                    <Select value={currentStatus} onValueChange={setCurrentStatus}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New Request">New Request</SelectItem>
                        <SelectItem value="Documents Received">Documents Received</SelectItem>
                        <SelectItem value="Verification in Progress">Verification in Progress</SelectItem>
                        <SelectItem value="Application Submitted">Application Submitted</SelectItem>
                        <SelectItem value="Embassy Review">Embassy Review</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleStatusUpdate} className="w-full bg-blue-600 hover:bg-blue-700">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Update Status
                  </Button>
                </div>
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
                        {step.date && (
                          <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                        )}
                        {step.status === "active" && (
                          <Badge className="mt-2 bg-blue-100 text-blue-700 hover:bg-blue-100">
                            Current Step
                          </Badge>
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
    </div>
  );
}
