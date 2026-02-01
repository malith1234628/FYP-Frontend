import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  ArrowLeft,
  CheckCircle2,
  XCircle,
  FileText,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Search,
  Filter
} from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const studentRequests = [
  {
    id: 1,
    studentName: "Kamal Perera",
    email: "kamal.perera@email.com",
    phone: "+94 77 123 4567",
    country: "United Kingdom",
    university: "University of Oxford",
    course: "MSc Computer Science",
    status: "New",
    submittedDate: "Jan 25, 2026",
    gpa: "3.8",
    ielts: "7.5"
  },
  {
    id: 2,
    studentName: "Nimali Silva",
    email: "nimali.silva@email.com",
    phone: "+94 77 234 5678",
    country: "Canada",
    university: "University of Toronto",
    course: "MBA",
    status: "New",
    submittedDate: "Jan 25, 2026",
    gpa: "3.6",
    ielts: "7.0"
  },
  {
    id: 3,
    studentName: "Ravindu Fernando",
    email: "ravindu.fernando@email.com",
    phone: "+94 77 345 6789",
    country: "Australia",
    university: "University of Melbourne",
    course: "Master of Engineering",
    status: "Under Review",
    submittedDate: "Jan 24, 2026",
    gpa: "3.7",
    ielts: "7.0"
  },
  {
    id: 4,
    studentName: "Tharindu Jayasinghe",
    email: "tharindu.j@email.com",
    phone: "+94 77 456 7890",
    country: "United States",
    university: "MIT",
    course: "MS Data Science",
    status: "Accepted",
    submittedDate: "Jan 23, 2026",
    gpa: "3.9",
    ielts: "8.0"
  },
  {
    id: 5,
    studentName: "Dilini Rajapaksa",
    email: "dilini.r@email.com",
    phone: "+94 77 567 8901",
    country: "United Kingdom",
    university: "Imperial College London",
    course: "MSc Finance",
    status: "Rejected",
    submittedDate: "Jan 22, 2026",
    gpa: "3.3",
    ielts: "6.5",
    rejectionReason: "Insufficient IELTS score for the selected program"
  },
  {
    id: 6,
    studentName: "Sahan Wickramasinghe",
    email: "sahan.w@email.com",
    phone: "+94 77 678 9012",
    country: "Canada",
    university: "McGill University",
    course: "PhD Chemistry",
    status: "Under Review",
    submittedDate: "Jan 24, 2026",
    gpa: "3.8",
    ielts: "7.5"
  },
];

export default function AgencyRequestManagementPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showRequestDocsDialog, setShowRequestDocsDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [additionalDocsRequest, setAdditionalDocsRequest] = useState("");

  const filteredRequests = studentRequests.filter(request => {
    const matchesSearch = request.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAccept = () => {
    alert(`✅ Request from ${selectedRequest?.studentName} has been accepted!`);
    setShowAcceptDialog(false);
    setSelectedRequest(null);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }
    alert(`❌ Request from ${selectedRequest?.studentName} has been rejected.`);
    setShowRejectDialog(false);
    setSelectedRequest(null);
    setRejectionReason("");
  };

  const handleRequestDocs = () => {
    if (!additionalDocsRequest.trim()) {
      alert("Please specify which documents are needed");
      return;
    }
    alert(`📄 Additional documents requested from ${selectedRequest?.studentName}`);
    setShowRequestDocsDialog(false);
    setSelectedRequest(null);
    setAdditionalDocsRequest("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">🆕 New</Badge>;
      case "Under Review":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">⏳ Under Review</Badge>;
      case "Accepted":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">✅ Accepted</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">❌ Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const stats = {
    total: studentRequests.length,
    new: studentRequests.filter(r => r.status === "New").length,
    underReview: studentRequests.filter(r => r.status === "Under Review").length,
    accepted: studentRequests.filter(r => r.status === "Accepted").length,
    rejected: studentRequests.filter(r => r.status === "Rejected").length,
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
                  <h1 className="text-xl font-semibold">Student Request Management</h1>
                  <p className="text-sm text-gray-500">Review and manage incoming visa requests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Statistics Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Requests</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
              <p className="text-sm text-gray-600">New</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.underReview}</p>
              <p className="text-sm text-gray-600">Under Review</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
              <p className="text-sm text-gray-600">Accepted</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              <p className="text-sm text-gray-600">Rejected</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by student name, university, or country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="w-64">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Cards */}
        <div className="space-y-4">
          {filteredRequests.map(request => (
            <Card key={request.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  {/* Left: Student Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {request.studentName}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {request.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {request.phone}
                          </span>
                        </div>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>

                    {/* Application Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500">Target Country</p>
                            <p className="font-medium text-gray-900">{request.country}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <GraduationCap className="w-4 h-4 text-gray-500 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500">University</p>
                            <p className="font-medium text-gray-900">{request.university}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500">Course</p>
                            <p className="font-medium text-gray-900">{request.course}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500">Submitted</p>
                            <p className="font-medium text-gray-900">{request.submittedDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Academic Info */}
                    <div className="flex gap-4 p-3 bg-gray-50 rounded-lg mb-4">
                      <div>
                        <p className="text-xs text-gray-500">GPA</p>
                        <p className="font-semibold text-gray-900">{request.gpa}</p>
                      </div>
                      <div className="border-l pl-4">
                        <p className="text-xs text-gray-500">IELTS Score</p>
                        <p className="font-semibold text-gray-900">{request.ielts}</p>
                      </div>
                    </div>

                    {/* Rejection Reason (if rejected) */}
                    {request.status === "Rejected" && request.rejectionReason && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                        <p className="text-sm font-semibold text-red-800 mb-1">Rejection Reason:</p>
                        <p className="text-sm text-red-700">{request.rejectionReason}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {request.status === "New" || request.status === "Under Review" ? (
                      <div className="flex gap-3">
                        <Button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowAcceptDialog(true);
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Accept Request
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowRejectDialog(true);
                          }}
                          variant="destructive"
                          className="flex-1"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject Request
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowRequestDocsDialog(true);
                          }}
                          variant="outline"
                          className="flex-1"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Request Documents
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center p-3 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-600">
                          {request.status === "Accepted" ? "✅ This request has been accepted" : "❌ This request has been rejected"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No requests found</h3>
              <p className="text-gray-600">
                {searchQuery || statusFilter !== "All" 
                  ? "Try adjusting your search or filters" 
                  : "New student requests will appear here"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Accept Dialog */}
      <AlertDialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Accept Student Request?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to accept the visa application request from <strong>{selectedRequest?.studentName}</strong> for <strong>{selectedRequest?.university}</strong>.
              <br /><br />
              The student will be notified and the case will be moved to active applications.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAccept} className="bg-green-600 hover:bg-green-700">
              Confirm Accept
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Student Request</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for rejecting <strong>{selectedRequest?.studentName}</strong>'s application.
              This will be communicated to the student.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <Textarea
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject} className="bg-red-600 hover:bg-red-700">
              Confirm Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Request Documents Dialog */}
      <AlertDialog open={showRequestDocsDialog} onOpenChange={setShowRequestDocsDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Request Additional Documents</AlertDialogTitle>
            <AlertDialogDescription>
              Specify which additional documents you need from <strong>{selectedRequest?.studentName}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <Textarea
              placeholder="e.g., Updated bank statement, English proficiency certificate, etc."
              value={additionalDocsRequest}
              onChange={(e) => setAdditionalDocsRequest(e.target.value)}
              rows={4}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRequestDocs} className="bg-blue-600 hover:bg-blue-700">
              Send Request
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
