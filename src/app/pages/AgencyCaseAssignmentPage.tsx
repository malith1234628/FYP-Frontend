import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  ArrowLeft,
  UserPlus,
  RefreshCw,
  User,
  CheckCircle2
} from "lucide-react";
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

const agents = [
  { id: 1, name: "Sarah Johnson", role: "Senior Agent", activeCases: 12, maxCapacity: 15 },
  { id: 2, name: "John Smith", role: "Agent", activeCases: 8, maxCapacity: 12 },
  { id: 3, name: "Emma Wilson", role: "Agent", activeCases: 10, maxCapacity: 12 },
  { id: 4, name: "Michael Brown", role: "Junior Agent", activeCases: 5, maxCapacity: 8 },
];

const studentCases = [
  { 
    id: 1, 
    studentName: "Kamal Perera", 
    country: "United Kingdom", 
    university: "University of Oxford", 
    course: "MSc Computer Science",
    status: "New Request",
    assignedAgent: null,
    priority: "High"
  },
  { 
    id: 2, 
    studentName: "Nimali Silva", 
    country: "Canada", 
    university: "University of Toronto", 
    course: "MBA",
    status: "New Request",
    assignedAgent: null,
    priority: "Medium"
  },
  { 
    id: 3, 
    studentName: "Sahan Wickramasinghe", 
    country: "United Kingdom", 
    university: "Imperial College London", 
    course: "MSc Data Science",
    status: "In Progress",
    assignedAgent: "Sarah Johnson",
    priority: "High"
  },
  { 
    id: 4, 
    studentName: "Dilini Rajapaksa", 
    country: "Canada", 
    university: "McGill University", 
    course: "MSc Engineering",
    status: "In Progress",
    assignedAgent: "John Smith",
    priority: "Medium"
  },
  { 
    id: 5, 
    studentName: "Chamod Bandara", 
    country: "Australia", 
    university: "University of Melbourne", 
    course: "MBA",
    status: "In Progress",
    assignedAgent: "Emma Wilson",
    priority: "Low"
  },
  { 
    id: 6, 
    studentName: "Tharindu Jayasinghe", 
    country: "United States", 
    university: "MIT", 
    course: "MS Data Science",
    status: "Documents Review",
    assignedAgent: "Sarah Johnson",
    priority: "High"
  },
  { 
    id: 7, 
    studentName: "Ravindu Fernando", 
    country: "Australia", 
    university: "ANU", 
    course: "Master of Engineering",
    status: "New Request",
    assignedAgent: null,
    priority: "Medium"
  },
];

export default function AgencyCaseAssignmentPage() {
  const navigate = useNavigate();
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showReassignDialog, setShowReassignDialog] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [selectedAgent, setSelectedAgent] = useState("");

  const unassignedCases = studentCases.filter(c => !c.assignedAgent);
  const assignedCases = studentCases.filter(c => c.assignedAgent);

  const handleAssign = () => {
    if (!selectedAgent) {
      alert("Please select an agent");
      return;
    }
    const agent = agents.find(a => a.id.toString() === selectedAgent);
    alert(`✅ Case assigned to ${agent?.name}`);
    setShowAssignDialog(false);
    setSelectedCase(null);
    setSelectedAgent("");
  };

  const handleReassign = () => {
    if (!selectedAgent) {
      alert("Please select an agent");
      return;
    }
    const agent = agents.find(a => a.id.toString() === selectedAgent);
    alert(`✅ Case reassigned to ${agent?.name}`);
    setShowReassignDialog(false);
    setSelectedCase(null);
    setSelectedAgent("");
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">🔴 High</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">🟡 Medium</Badge>;
      case "Low":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">🟢 Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New Request":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">New Request</Badge>;
      case "In Progress":
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">In Progress</Badge>;
      case "Documents Review":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Documents Review</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getWorkloadPercentage = (agent: any) => {
    return Math.round((agent.activeCases / agent.maxCapacity) * 100);
  };

  const getWorkloadColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-600";
    if (percentage >= 70) return "bg-orange-600";
    if (percentage >= 50) return "bg-yellow-600";
    return "bg-green-600";
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
                  <h1 className="text-xl font-semibold">Case Assignment</h1>
                  <p className="text-sm text-gray-500">Assign and manage student cases to agents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Agent Workload Overview */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl">👥 Agent Workload Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {agents.map(agent => {
                const workloadPercentage = getWorkloadPercentage(agent);
                const workloadColor = getWorkloadColor(workloadPercentage);
                
                return (
                  <div key={agent.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{agent.name}</p>
                        <p className="text-xs text-gray-500">{agent.role}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Workload</span>
                        <span className="font-semibold text-gray-900">
                          {agent.activeCases} / {agent.maxCapacity}
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${workloadColor}`}
                          style={{ width: `${workloadPercentage}%` }}
                        ></div>
                      </div>
                      
                      <p className="text-xs text-gray-500 text-center">
                        {workloadPercentage}% capacity
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Unassigned Cases */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  📋 Unassigned Cases ({unassignedCases.length})
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {unassignedCases.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p>All cases have been assigned! 🎉</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {unassignedCases.map(caseItem => (
                    <div key={caseItem.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {caseItem.studentName}
                          </h4>
                          <p className="text-sm text-gray-600">{caseItem.university}</p>
                          <p className="text-xs text-gray-500">{caseItem.country} • {caseItem.course}</p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          {getPriorityBadge(caseItem.priority)}
                          {getStatusBadge(caseItem.status)}
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => {
                          setSelectedCase(caseItem);
                          setShowAssignDialog(true);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Assign Agent
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Assigned Cases */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">
                ✅ Assigned Cases ({assignedCases.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {assignedCases.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p>No cases assigned yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {assignedCases.map(caseItem => (
                    <div key={caseItem.id} className="p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {caseItem.studentName}
                          </h4>
                          <p className="text-sm text-gray-600">{caseItem.university}</p>
                          <p className="text-xs text-gray-500">{caseItem.country} • {caseItem.course}</p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          {getPriorityBadge(caseItem.priority)}
                          {getStatusBadge(caseItem.status)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg mb-3">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-blue-200 text-blue-700 text-xs">
                            {caseItem.assignedAgent?.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Assigned to: {caseItem.assignedAgent}
                          </p>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => {
                          setSelectedCase(caseItem);
                          setShowReassignDialog(true);
                        }}
                        variant="outline"
                        className="w-full"
                        size="sm"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reassign
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assign Agent Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Agent to Case</DialogTitle>
            <DialogDescription>
              Select an agent to handle this case
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-1">{selectedCase?.studentName}</h4>
              <p className="text-sm text-gray-600">{selectedCase?.university}</p>
              <p className="text-xs text-gray-500">{selectedCase?.country}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Select Agent *</label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map(agent => {
                    const workloadPercentage = getWorkloadPercentage(agent);
                    const isOverloaded = workloadPercentage >= 90;
                    
                    return (
                      <SelectItem 
                        key={agent.id} 
                        value={agent.id.toString()}
                        disabled={isOverloaded}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{agent.name} - {agent.role}</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({agent.activeCases}/{agent.maxCapacity})
                          </span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign} className="bg-blue-600 hover:bg-blue-700">
              Assign Case
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reassign Agent Dialog */}
      <Dialog open={showReassignDialog} onOpenChange={setShowReassignDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reassign Case</DialogTitle>
            <DialogDescription>
              Transfer this case to a different agent
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-1">{selectedCase?.studentName}</h4>
              <p className="text-sm text-gray-600">{selectedCase?.university}</p>
              <p className="text-xs text-gray-500 mb-2">{selectedCase?.country}</p>
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600">
                  Currently assigned to: <strong>{selectedCase?.assignedAgent}</strong>
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Reassign to *</label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose new agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents
                    .filter(agent => agent.name !== selectedCase?.assignedAgent)
                    .map(agent => {
                      const workloadPercentage = getWorkloadPercentage(agent);
                      const isOverloaded = workloadPercentage >= 90;
                      
                      return (
                        <SelectItem 
                          key={agent.id} 
                          value={agent.id.toString()}
                          disabled={isOverloaded}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span>{agent.name} - {agent.role}</span>
                            <span className="text-xs text-gray-500 ml-2">
                              ({agent.activeCases}/{agent.maxCapacity})
                            </span>
                          </div>
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReassignDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleReassign} className="bg-blue-600 hover:bg-blue-700">
              Confirm Reassignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
