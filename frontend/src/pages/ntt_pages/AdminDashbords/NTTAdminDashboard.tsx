
import React, { useState } from 'react';
import { 
  Users,  Award, TrendingUp, TrendingDown, Clock, 
  CheckCircle, XCircle, AlertCircle, Star, Eye, ExternalLink,
  ArrowUpRight, ArrowDownRight, BarChart3, PieChart
} from 'lucide-react';

const NTTAdminDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Key Performance Indicators
  const kpiCards = [
    {
      title: "Total Students",
      value: "1,248",
      change: "+12.5%",
      changeType: "increase",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      description: "Registered students"
    },
    {
      title: "Pass Rate",
      value: "78.5%",
      change: "+5.2%",
      changeType: "increase",
      icon: <Award className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      description: "Overall success rate"
    },
    {
      title: "Avg. Grade",
      value: "2.1",
      change: "+0.3",
      changeType: "increase",
      icon: <Star className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      description: "Average grade score"
    },
    {
      title: "Processing Time",
      value: "3.2 days",
      change: "-1.5 days",
      changeType: "decrease",
      icon: <Clock className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      description: "Average processing"
    }
  ];

  // Student Distribution by Trade
  const tradeDistribution = [
    { trade: 'Electrician', students: 245, percentage: 20, color: 'bg-blue-500' },
    { trade: 'Carpenter', students: 198, percentage: 16, color: 'bg-green-500' },
    { trade: 'Plumber', students: 187, percentage: 15, color: 'bg-purple-500' },
    { trade: 'Welder', students: 156, percentage: 12, color: 'bg-orange-500' },
    { trade: 'Mason', students: 142, percentage: 11, color: 'bg-red-500' },
    { trade: 'Other Trades', students: 320, percentage: 26, color: 'bg-gray-500' },
  ];

  // Recent Activity
  const recentActivities = [
    {
      type: 'success',
      action: 'New student registered',
      details: 'Kamal Perera - Electrician',
      time: '10:30 AM',
      status: 'completed'
    },
    {
      type: 'warning',
      action: 'Exam scheduled',
      details: 'Batch #NT2024-012',
      time: '09:45 AM',
      status: 'pending'
    },
    {
      type: 'info',
      action: 'Results verified',
      details: '25 students - Carpenter',
      time: 'Yesterday',
      status: 'completed'
    },
    {
      type: 'success',
      action: 'Certificates generated',
      details: '18 students certified',
      time: 'Jan 14',
      status: 'completed'
    }
  ];

  // Top Performing Trades
  const topTrades = [
    { trade: 'Mason', passRate: 85, students: 142, trend: 'up' },
    { trade: 'Electrician', passRate: 82, students: 245, trend: 'up' },
    { trade: 'Plumber', passRate: 80, students: 187, trend: 'stable' },
    { trade: 'Carpenter', passRate: 75, students: 198, trend: 'stable' },
    { trade: 'Welder', passRate: 70, students: 156, trend: 'down' },
  ];

  // Performance Metrics
  const performanceMetrics = [
    { label: 'Data Accuracy', value: '98.2%', target: '99%', status: 'good' },
    { label: 'Processing Efficiency', value: '92.4%', target: '95%', status: 'good' },
    { label: 'System Uptime', value: '99.8%', target: '99.9%', status: 'excellent' },
    { label: 'User Satisfaction', value: '4.7/5', target: '4.5/5', status: 'excellent' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">NTT Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to the National Trade Test Administration Portal</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-end mb-6">
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((card, index) => (
          <div key={index} className={`${card.bgColor} rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color} text-white`}>
                {card.icon}
              </div>
              <div className={`flex items-center ${card.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                {card.changeType === 'increase' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span className="text-sm font-medium ml-1">{card.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
            <p className="text-gray-700 font-medium mb-1">{card.title}</p>
            <p className="text-sm text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Trade Distribution & Performance */}
        <div className="lg:col-span-2 space-y-8">
          {/* Trade Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Student Distribution by Trade</h2>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {tradeDistribution.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                      <span className="text-sm font-medium text-gray-700">{item.trade}</span>
                    </div>
                    <span className="text-sm text-gray-600">{item.students} students ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Students</span>
                <span className="text-lg font-bold text-gray-900">1,248</span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">System Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                    {metric.status === 'excellent' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : metric.status === 'good' ? (
                      <AlertCircle className="w-4 h-4 text-blue-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className="text-sm text-gray-600 ml-2">Target: {metric.target}</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        metric.status === 'excellent' ? 'bg-green-500' :
                        metric.status === 'good' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ 
                        width: metric.status === 'excellent' ? '95%' :
                               metric.status === 'good' ? '85%' : '70%'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Recent Activity & Top Trades */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
              <div className="flex items-center text-gray-400">
                <span className="text-sm mr-2">Last 24h</span>
                <Clock className="w-4 h-4" />
              </div>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-100 text-green-600' :
                    activity.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'success' ? <CheckCircle className="w-4 h-4" /> :
                     activity.type === 'warning' ? <AlertCircle className="w-4 h-4" /> :
                     <Eye className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{activity.action}</p>
                    <p className="text-xs text-gray-600 truncate">{activity.details}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Trades */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Top Performing Trades</h2>
            
            <div className="space-y-4">
              {topTrades.map((trade, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">{trade.trade}</p>
                      <p className="text-xs text-gray-600">{trade.students} students</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end">
                      <span className="text-sm font-bold text-gray-900 mr-2">{trade.passRate}%</span>
                      {trade.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : trade.trend === 'down' ? (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      ) : (
                        <BarChart3 className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500">pass rate</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Quick Stats</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Certified Students</span>
                <span className="text-sm font-medium text-gray-900">975</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Pending Review</span>
                <span className="text-sm font-medium text-gray-900">48</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Exams This Week</span>
                <span className="text-sm font-medium text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Active Centers</span>
                <span className="text-sm font-medium text-gray-900">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Performance Trend */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Monthly Performance Trend</h2>
            <p className="text-sm text-gray-600 mt-1">Pass rate trend over the last 6 months</p>
          </div>
          <ExternalLink className="w-5 h-5 text-gray-400" />
        </div>

        <div className="space-y-4">
          {[
            { month: 'Jan', passRate: 78.5, applications: 1248 },
            { month: 'Dec', passRate: 76.8, applications: 1150 },
            { month: 'Nov', passRate: 75.2, applications: 1085 },
            { month: 'Oct', passRate: 73.5, applications: 980 },
            { month: 'Sep', passRate: 72.1, applications: 895 },
            { month: 'Aug', passRate: 70.5, applications: 820 },
          ].map((data, index) => (
            <div key={index} className="flex items-center">
              <span className="text-sm text-gray-700 w-12">{data.month}</span>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                    style={{ width: `${data.passRate}%` }}
                  />
                </div>
              </div>
              <div className="text-right w-24">
                <div className="text-sm font-medium text-gray-900">{data.passRate}%</div>
                <div className="text-xs text-gray-500">{data.applications} students</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NTTAdminDashboard;
