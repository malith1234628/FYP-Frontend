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
  ChevronRight
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

const recentRequests = [
  { id: 1, studentName: "Kamal Perera", country: "United Kingdom", university: "University of Oxford", status: "New", date: "2 hours ago" },
  { id: 2, studentName: "Nimali Silva", country: "Canada", university: "University of Toronto", status: "New", date: "5 hours ago" },
  { id: 3, studentName: "Ravindu Fernando", country: "Australia", university: "University of Melbourne", status: "Under Review", date: "1 day ago" },
  { id: 4, studentName: "Tharindu Jayasinghe", country: "United States", university: "MIT", status: "Accepted", date: "2 days ago" },
];

const activeApplications = [
  { id: 1, studentName: "Sahan Wickramasinghe", country: "United Kingdom", agent: "Sarah Johnson", status: "Documents Received", progress: 40 },
  { id: 2, studentName: "Dilini Rajapaksa", country: "Canada", agent: "John Smith", status: "Verification in Progress", progress: 60 },
  { id: 3, studentName: "Chamod Bandara", country: "Australia", agent: "Emma Wilson", status: "Application Submitted", progress: 80 },
];

const assignedAgents = [
  { id: 1, name: "Sarah Johnson", role: "Senior Agent", activeCases: 12, approvalRate: "95%", status: "Active" },
  { id: 2, name: "John Smith", role: "Agent", activeCases: 8, approvalRate: "92%", status: "Active" },
  { id: 3, name: "Emma Wilson", role: "Agent", activeCases: 10, approvalRate: "94%", status: "Active" },
  { id: 4, name: "Michael Brown", role: "Junior Agent", activeCases: 5, approvalRate: "88%", status: "Active" },
];

export default function AgencyDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-primary" />
            <div>
              <h1 className="font-semibold">Global Visa Solutions</h1>
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
            <Badge className="ml-auto bg-red-100 text-red-700 hover:bg-red-100">4</Badge>
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
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Active</Badge>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">28</h3>
                <p className="text-sm text-gray-600">Active Applications</p>
                <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
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
                <h3 className="text-3xl font-bold text-gray-900 mb-1">475</h3>
                <p className="text-sm text-gray-600">Total Visas Approved</p>
                <p className="text-xs text-green-600 mt-2">↑ 8% from last month</p>
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
                <h3 className="text-3xl font-bold text-gray-900 mb-1">95.0%</h3>
                <p className="text-sm text-gray-600">Approval Success Rate</p>
                <p className="text-xs text-green-600 mt-2">↑ 2% from last month</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Average</Badge>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">4-6</h3>
                <p className="text-sm text-gray-600">Avg. Processing Time (weeks)</p>
                <p className="text-xs text-gray-500 mt-2">Across all countries</p>
              </CardContent>
            </Card>
          </div>

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
                <div className="space-y-3">
                  {recentRequests.map(request => (
                    <div 
                      key={request.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate("/agency-requests")}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{request.studentName}</h4>
                          <p className="text-sm text-gray-600">{request.university}</p>
                          <p className="text-xs text-gray-500">{request.country}</p>
                        </div>
                        <Badge className={
                          request.status === "New" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                          request.status === "Under Review" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" :
                          "bg-green-100 text-green-700 hover:bg-green-100"
                        }>
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">{request.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Applications */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-xl">⚡ Active Applications</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate("/agency-applications")}
                  className="text-blue-600 hover:text-blue-700"
                >
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeApplications.map(app => (
                    <div 
                      key={app.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{app.studentName}</h4>
                          <p className="text-sm text-gray-600">{app.country}</p>
                          <p className="text-xs text-gray-500">Agent: {app.agent}</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          {app.progress}%
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-gray-600">{app.status}</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${app.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Agent Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Active Cases</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Approval Rate</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedAgents.map(agent => (
                      <tr key={agent.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                                {agent.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-gray-900">{agent.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{agent.role}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="font-semibold">
                            {agent.activeCases} cases
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-green-600">{agent.approvalRate}</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            {agent.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigate("/agency-case-assignment")}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}