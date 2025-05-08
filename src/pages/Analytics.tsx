import { BarChart3, LineChart, PieChart, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart as RechartLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartPie,
  Pie,
  Cell
} from "recharts";
import { mockAnalyticsData } from "@/data/mockData";

const mockDataDaily = Array.from({ length: 7 }, (_, i) => ({
  day: `Day ${i + 1}`,
  requests: Math.floor(Math.random() * 1000),
  users: Math.floor(Math.random() * 100)
}));

const mockAgentUsage = [
  { name: "AI Assistant", value: 400 },
  { name: "Data Processor", value: 300 },
  { name: "Content Generator", value: 200 },
  { name: "Research Agent", value: 100 }
];

const COLORS = ["#9b87f5", "#7E69AB", "#6163FF", "#B085F5"];

const pieColors = ["#9b87f5", "#7E69AB", "#6163FF", "#B085F5"];

const StatsCard = ({ title, value, icon: Icon, trend }: { 
  title: string;
  value: string;
  icon: any;
  trend: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">
        {trend}
      </p>
    </CardContent>
  </Card>
);

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Platform performance and usage metrics.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Requests"
          value={mockAnalyticsData.totalRequests.toLocaleString()}
          icon={BarChart3}
          trend="+20.1% from last month"
        />
        <StatsCard
          title="Active Users"
          value={mockAnalyticsData.activeUsers.toString()}
          icon={Users}
          trend="+15% from last month"
        />
        <StatsCard
          title="Success Rate"
          value={`${(100 - mockAnalyticsData.errorRate * 100).toFixed(1)}%`}
          icon={LineChart}
          trend="+2.3% from last month"
        />
        <StatsCard
          title="Agent Usage"
          value={mockAnalyticsData.agentUsage.map(a => a.value).reduce((a,b) => a+b,0).toLocaleString()}
          icon={PieChart}
          trend="+12.5% from last month"
        />
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Requests</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAnalyticsData.requestsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="requests" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Request Trends (Line)</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartLine data={mockAnalyticsData.requestsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="requests" stroke="#9b87f5" />
                </RechartLine>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Usage Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartPie>
                  <Pie
                    data={mockAnalyticsData.agentUsage}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockAnalyticsData.agentUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartPie>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>Performance Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Average Response Time</h3>
              <p className="text-2xl font-bold">{mockAnalyticsData.avgResponseTime}s</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Error Rate</h3>
              <p className="text-2xl font-bold">{(mockAnalyticsData.errorRate * 100).toFixed(1)}%</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Total Requests</h3>
              <p className="text-2xl font-bold">{mockAnalyticsData.totalRequests.toLocaleString()}</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm font-medium text-muted-foreground">Active Users</h3>
              <p className="text-2xl font-bold">{mockAnalyticsData.activeUsers}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
