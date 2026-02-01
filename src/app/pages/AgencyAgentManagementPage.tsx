import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  ArrowLeft,
  UserPlus,
  Mail,
  MoreVertical,
  User,
  Shield,
  Activity,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
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

const agents = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@agency.com",
    role: "Senior Agent",
    activeCases: 12,
    completedCases: 145,
    approvalRate: "95%",
    status: "Active",
    joinedDate: "Jan 2024"
  },
  {
    id: 2,
    name: "John Smith",
    email: "john.smith@agency.com",
    role: "Agent",
    activeCases: 8,
    completedCases: 98,
    approvalRate: "92%",
    status: "Active",
    joinedDate: "Mar 2024"
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.wilson@agency.com",
    role: "Agent",
    activeCases: 10,
    completedCases: 112,
    approvalRate: "94%",
    status: "Active",
    joinedDate: "Feb 2024"
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael.brown@agency.com",
    role: "Junior Agent",
    activeCases: 5,
    completedCases: 34,
    approvalRate: "88%",
    status: "Active",
    joinedDate: "Dec 2025"
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.anderson@agency.com",
    role: "Agent",
    activeCases: 0,
    completedCases: 67,
    approvalRate: "91%",
    status: "Inactive",
    joinedDate: "May 2024"
  },
];

export default function AgencyAgentManagementPage() {
  const navigate = useNavigate();
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("");

  const handleInviteAgent = () => {
    if (!inviteEmail || !inviteName || !inviteRole) {
      alert("Please fill in all fields");
      return;
    }
    alert(`✉️ Invitation sent to ${inviteEmail}`);
    setShowInviteDialog(false);
    setInviteEmail("");
    setInviteName("");
    setInviteRole("");
  };

  const handleDeactivate = () => {
    alert(`Agent ${selectedAgent?.name} has been deactivated`);
    setShowDeactivateDialog(false);
    setSelectedAgent(null);
  };

  const handleActivate = (agent: any) => {
    alert(`Agent ${agent.name} has been activated`);
  };

  const activeAgents = agents.filter(a => a.status === "Active");
  const inactiveAgents = agents.filter(a => a.status === "Inactive");

  const totalActiveCases = activeAgents.reduce((sum, agent) => sum + agent.activeCases, 0);
  const totalCompletedCases = agents.reduce((sum, agent) => sum + agent.completedCases, 0);

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
                  <h1 className="text-xl font-semibold">Agent Management</h1>
                  <p className="text-sm text-gray-500">Manage your agency's team members</p>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setShowInviteDialog(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Agent
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{activeAgents.length}</h3>
              <p className="text-sm text-gray-600">Active Agents</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{totalActiveCases}</h3>
              <p className="text-sm text-gray-600">Total Active Cases</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{totalCompletedCases}</h3>
              <p className="text-sm text-gray-600">Completed Cases</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {(agents.reduce((sum, a) => sum + parseFloat(a.approvalRate), 0) / agents.length).toFixed(1)}%
              </h3>
              <p className="text-sm text-gray-600">Average Approval Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Active Agents */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-xl">👥 Active Agents ({activeAgents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Agent</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Active Cases</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Completed</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Approval Rate</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Joined</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activeAgents.map(agent => (
                    <tr key={agent.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-blue-100 text-blue-700">
                              {agent.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{agent.name}</p>
                            <p className="text-sm text-gray-500">{agent.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="font-medium">
                          {agent.role}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                            <span className="text-lg font-bold text-blue-600">{agent.activeCases}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-gray-900">{agent.completedCases}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-green-600">{agent.approvalRate}</span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{agent.joinedDate}</td>
                      <td className="py-4 px-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          {agent.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate("/agency-case-assignment")}>
                              View Cases
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit Role</DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => {
                                setSelectedAgent(agent);
                                setShowDeactivateDialog(true);
                              }}
                            >
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Inactive Agents */}
        {inactiveAgents.length > 0 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">⏸️ Inactive Agents ({inactiveAgents.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inactiveAgents.map(agent => (
                  <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gray-300 text-gray-700">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{agent.name}</p>
                        <p className="text-sm text-gray-500">{agent.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Completed: {agent.completedCases}</p>
                        <p className="text-sm text-gray-600">Rate: {agent.approvalRate}</p>
                      </div>
                      <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-200">
                        Inactive
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => handleActivate(agent)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Activate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Invite Agent Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>✉️ Invite New Agent</DialogTitle>
            <DialogDescription>
              Send an invitation email to add a new agent to your team
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="inviteName">Full Name *</Label>
              <Input
                id="inviteName"
                placeholder="e.g., John Doe"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inviteEmail">Email Address *</Label>
              <Input
                id="inviteEmail"
                type="email"
                placeholder="john.doe@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inviteRole">Role *</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger id="inviteRole">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="senior-agent">Senior Agent</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="junior-agent">Junior Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteAgent} className="bg-blue-600 hover:bg-blue-700">
              <Mail className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate Confirmation Dialog */}
      <AlertDialog open={showDeactivateDialog} onOpenChange={setShowDeactivateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Agent?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to deactivate <strong>{selectedAgent?.name}</strong>? 
              They will no longer be able to access the system or work on cases.
              You can reactivate them later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeactivate} className="bg-red-600 hover:bg-red-700">
              Deactivate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
