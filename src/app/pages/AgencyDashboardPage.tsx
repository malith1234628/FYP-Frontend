import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  UserPlus,
  FileText,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";

interface StudentRequest {
  id: string;
  status: string;
  country: string;
  university: string;
  student_name: string;
  email: string;
  phone: string;
  program: string;
  course_level: string;
  submitted_date: string;
}

// Map DB status values to display labels
const statusDisplayMap: Record<string, string> = {
  open: "New",
  reviewing_offers: "Under Review",
  in_progress: "Under Review",
  agency_selected: "Accepted",
  completed: "Accepted",
  cancelled: "Rejected",
};

function formatDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHrs < 1) return "Just now";
  if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

export default function AgencyDashboardPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<StudentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [agencyStats, setAgencyStats] = useState<{
    total_students_handled: number;
    total_visas_approved: number;
    approval_rate: number;
    agency_name: string;
  }>({ total_students_handled: 0, total_visas_approved: 0, approval_rate: 0, agency_name: "Agency" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    // Redirect to agency login if not logged in as an agency
    if (!token || user.user_type !== "agency") {
      navigate("/agent-login");
      return;
    }

    const headers: Record<string, string> = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch("http://localhost:5003/api/agency/requests", { headers }).then((r) => r.json()),
      fetch("http://localhost:5003/auth/profile", { headers }).then((r) => r.json()),
    ])
      .then(([reqData, profileData]) => {
        setRequests(reqData.requests || []);
        if (profileData.user) {
          setAgencyStats({
            total_students_handled: profileData.user.total_students_handled || 0,
            total_visas_approved: profileData.user.total_visas_approved || 0,
            approval_rate: profileData.user.approval_rate || 0,
            agency_name: profileData.user.agency_name || "Agency",
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [navigate]);

  const newRequestsCount = requests.filter((r) => r.status === "open").length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-semibold">{agencyStats.agency_name}</h1>
              <p className="text-xs text-gray-500">Agency Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Button 
            variant="default" 
            className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <BarChart3 className="w-5 h-5" />
            Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            onClick={() => navigate("/agency-requests")}
          >
            <FileText className="w-5 h-5" />
            Student Requests
            {newRequestsCount > 0 && <Badge className="ml-auto bg-red-100 text-red-700 hover:bg-red-100">{newRequestsCount}</Badge>}
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            onClick={() => navigate("/agency-applications")}
          >
            <Clock className="w-5 h-5" />
            Active Applications
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            onClick={() => navigate("/agency-agents")}
          >
            <Users className="w-5 h-5" />
            Agent Management
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            onClick={() => navigate("/agency-case-assignment")}
          >
            <UserPlus className="w-5 h-5" />
            Case Assignment
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            onClick={() => navigate("/agency-analytics")}
          >
            <TrendingUp className="w-5 h-5" />
            Analytics
          </Button>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="w-5 h-5" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="w-5 h-5" />
            Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Agency Dashboard 📊</h1>
              <p className="text-sm text-gray-600">Welcome back! Here's what's happening today</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        AD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-auto">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">New</Badge>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{newRequestsCount}</h3>
                <p className="text-sm text-gray-600">New Requests</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Total</Badge>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{agencyStats.total_visas_approved}</h3>
                <p className="text-sm text-gray-600">Total Visas Approved</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">Rate</Badge>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{agencyStats.approval_rate}%</h3>
                <p className="text-sm text-gray-600">Approval Success Rate</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Total</Badge>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{agencyStats.total_students_handled}</h3>
                <p className="text-sm text-gray-600">Students Handled</p>
              </CardContent>
            </Card>
          </div>

          {/* Loading overlay */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="text-gray-600">Loading dashboard data...</p>
            </div>
          )}

          {!loading && (
          <>
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Incoming Student Requests */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-xl">📥 Incoming Student Requests</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/agency-requests")}
                  className="text-blue-600 hover:text-blue-700"
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                {requests.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-6">No incoming requests yet</p>
                ) : (
                  <div className="space-y-3">
                    {requests.slice(0, 4).map((request) => {
                      const displayStatus = statusDisplayMap[request.status] || request.status;
                      return (
                        <div
                          key={request.id}
                          className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => navigate("/agency-requests")}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{request.student_name}</h4>
                              <p className="text-sm text-gray-600">{request.university}</p>
                              <p className="text-xs text-gray-500">{request.country}</p>
                            </div>
                            <Badge className={
                              displayStatus === "New" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                              displayStatus === "Under Review" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" :
                              "bg-green-100 text-green-700 hover:bg-green-100"
                            }>
                              {displayStatus}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">{formatDate(request.submitted_date)}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Requests (all statuses) */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-xl">⚡ All Requests</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/agency-requests")}
                  className="text-blue-600 hover:text-blue-700"
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                {requests.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-6">No requests yet</p>
                ) : (
                  <div className="space-y-3">
                    {requests.slice(0, 3).map((req) => {
                      const displayStatus = statusDisplayMap[req.status] || req.status;
                      return (
                        <div
                          key={req.id}
                          className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => navigate("/agency-requests")}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{req.student_name}</h4>
                              <p className="text-sm text-gray-600">{req.country}</p>
                              <p className="text-xs text-gray-500">{req.university}</p>
                            </div>
                            <Badge className={
                              displayStatus === "New" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                              displayStatus === "Under Review" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" :
                              "bg-green-100 text-green-700 hover:bg-green-100"
                            }>
                              {displayStatus}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500">{formatDate(req.submitted_date)}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          </>
          )}

          {/* Assigned Agents */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-xl">👥 Assigned Agents</CardTitle>
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate("/agency-agents")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Agent
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">No agents assigned yet</p>
                <p className="text-xs text-gray-400 mt-1">Invite agents to start managing cases</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}