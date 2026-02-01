import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Globe,
  Users,
  CheckCircle2,
  Clock,
  Download
} from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";

const countryData = [
  { country: "United Kingdom", applications: 145, approved: 138, rejected: 7, successRate: 95.2 },
  { country: "Canada", applications: 98, approved: 90, rejected: 8, successRate: 91.8 },
  { country: "Australia", applications: 112, approved: 105, rejected: 7, successRate: 93.8 },
  { country: "United States", applications: 67, approved: 59, rejected: 8, successRate: 88.1 },
  { country: "Germany", applications: 53, approved: 48, rejected: 5, successRate: 90.6 },
];

const universityData = [
  { university: "University of Oxford", applications: 45, approved: 43, successRate: 95.6 },
  { university: "University of Toronto", applications: 38, approved: 35, successRate: 92.1 },
  { university: "University of Melbourne", applications: 42, approved: 40, successRate: 95.2 },
  { university: "MIT", applications: 28, approved: 24, successRate: 85.7 },
  { university: "University of Cambridge", applications: 32, approved: 31, successRate: 96.9 },
];

const monthlyTrends = [
  { month: "Jul", applications: 35, approved: 32, rejected: 3 },
  { month: "Aug", applications: 42, approved: 39, rejected: 3 },
  { month: "Sep", applications: 48, approved: 45, rejected: 3 },
  { month: "Oct", applications: 55, approved: 52, rejected: 3 },
  { month: "Nov", applications: 63, approved: 59, rejected: 4 },
  { month: "Dec", applications: 58, approved: 55, rejected: 3 },
  { month: "Jan", applications: 74, approved: 70, rejected: 4 },
];

const agentPerformance = [
  { 
    name: "Sarah Johnson", 
    totalCases: 157, 
    approved: 149, 
    rejected: 8, 
    successRate: 94.9,
    avgProcessingTime: "4.2 weeks",
    activeCases: 12
  },
  { 
    name: "John Smith", 
    totalCases: 106, 
    approved: 98, 
    rejected: 8, 
    successRate: 92.5,
    avgProcessingTime: "4.5 weeks",
    activeCases: 8
  },
  { 
    name: "Emma Wilson", 
    totalCases: 122, 
    approved: 115, 
    rejected: 7, 
    successRate: 94.3,
    avgProcessingTime: "4.3 weeks",
    activeCases: 10
  },
  { 
    name: "Michael Brown", 
    totalCases: 39, 
    approved: 34, 
    rejected: 5, 
    successRate: 87.2,
    avgProcessingTime: "5.1 weeks",
    activeCases: 5
  },
];

const statusDistribution = [
  { name: "Approved", value: 475, color: "#22c55e" },
  { name: "In Progress", value: 35, color: "#3b82f6" },
  { name: "Rejected", value: 25, color: "#ef4444" },
];

const COLORS = ["#22c55e", "#3b82f6", "#ef4444"];

export default function AgencyAnalyticsPage() {
  const navigate = useNavigate();

  const totalApplications = countryData.reduce((sum, c) => sum + c.applications, 0);
  const totalApproved = countryData.reduce((sum, c) => sum + c.approved, 0);
  const totalRejected = countryData.reduce((sum, c) => sum + c.rejected, 0);
  const overallSuccessRate = ((totalApproved / totalApplications) * 100).toFixed(1);

  const lastMonthApplications = monthlyTrends[monthlyTrends.length - 2]?.applications || 0;
  const currentMonthApplications = monthlyTrends[monthlyTrends.length - 1]?.applications || 0;
  const growthRate = lastMonthApplications > 0 
    ? (((currentMonthApplications - lastMonthApplications) / lastMonthApplications) * 100).toFixed(1)
    : 0;

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
                  <h1 className="text-xl font-semibold">Performance & Analytics</h1>
                  <p className="text-sm text-gray-500">Comprehensive insights into agency performance</p>
                </div>
              </div>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Total</Badge>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{totalApplications}</h3>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {growthRate}% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Approved</Badge>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{totalApproved}</h3>
              <p className="text-sm text-gray-600">Visas Approved</p>
              <p className="text-xs text-green-600 mt-2">95% success rate</p>
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
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{overallSuccessRate}%</h3>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                2% increase
              </p>
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
              <h3 className="text-3xl font-bold text-gray-900 mb-1">4.5</h3>
              <p className="text-sm text-gray-600">Avg. Processing (weeks)</p>
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                0.3 weeks faster
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Application Trends */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">📈 Monthly Application Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} name="Applications" />
                  <Line type="monotone" dataKey="approved" stroke="#22c55e" strokeWidth={2} name="Approved" />
                  <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} name="Rejected" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">📊 Application Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Country-wise Performance */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-xl">🌍 Country-wise Visa Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={countryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="approved" fill="#22c55e" name="Approved" />
                  <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Country</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Applications</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Approved</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rejected</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Success Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {countryData.map((country) => (
                    <tr key={country.country} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{country.country}</td>
                      <td className="py-3 px-4 text-gray-600">{country.applications}</td>
                      <td className="py-3 px-4">
                        <span className="text-green-600 font-semibold">{country.approved}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-red-600 font-semibold">{country.rejected}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          {country.successRate}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* University-wise Success Rates */}
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-xl">🎓 University-wise Success Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">University</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Applications</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Approved</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Success Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {universityData.map((uni) => (
                    <tr key={uni.university} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{uni.university}</td>
                      <td className="py-3 px-4 text-gray-600">{uni.applications}</td>
                      <td className="py-3 px-4">
                        <span className="text-green-600 font-semibold">{uni.approved}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            {uni.successRate}%
                          </Badge>
                          <div className="flex-1 max-w-xs">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${uni.successRate}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Agent Performance */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">👥 Agent Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Agent</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Total Cases</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Approved</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rejected</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Success Rate</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Avg. Processing</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Active Cases</th>
                  </tr>
                </thead>
                <tbody>
                  {agentPerformance.map((agent) => (
                    <tr key={agent.name} className="border-b hover:bg-gray-50">
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
                      <td className="py-3 px-4 text-gray-600">{agent.totalCases}</td>
                      <td className="py-3 px-4">
                        <span className="text-green-600 font-semibold">{agent.approved}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-red-600 font-semibold">{agent.rejected}</span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={
                          agent.successRate >= 94 
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : agent.successRate >= 90
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                            : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                        }>
                          {agent.successRate}%
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{agent.avgProcessingTime}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="font-semibold">
                          {agent.activeCases}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
