import React, { useState } from 'react';
import {
  Users, FileText, Clock, Calendar,
  AlertCircle, CheckCircle, XCircle, TrendingUp,
  ArrowUpRight, ArrowDownRight, TrendingDown, Award, Star
} from 'lucide-react';

const NTTDataEntryDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  const stats = [
    {
      title: 'Total Students',
      value: '1,248',
      change: '+12.5%',
      changeType: 'increase',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-500',
      trendData: [65, 70, 75, 80, 85, 90, 95]
    },
    {
      title: 'Pending Data Entry',
      value: '23',
      change: '-5.2%',
      changeType: 'decrease',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-yellow-500',
      trendData: [30, 28, 26, 24, 23, 22, 23]
    },
    {
      title: 'Data Accuracy',
      value: '98.2%',
      change: '+1.3%',
      changeType: 'increase',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'bg-green-500',
      trendData: [95, 96, 96.5, 97, 97.5, 98, 98.2]
    },
    {
      title: 'Avg. Time/Student',
      value: '15m',
      change: '-2.5m',
      changeType: 'decrease',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-purple-500',
      trendData: [20, 18, 17, 16, 15.5, 15.2, 15]
    }
  ];

  const recentActivities = [
    {
      action: 'Student record created',
      user: 'You',
      time: '10:30 AM',
      target: 'John Doe (NT2024-0156)',
      type: 'success'
    },
    {
      action: 'Data verification failed',
      user: 'System',
      time: '09:45 AM',
      target: 'Record #NT2024-0142',
      type: 'warning'
    },
    {
      action: 'Bulk upload completed',
      user: 'You',
      time: 'Yesterday',
      target: '25 records imported',
      type: 'success'
    },
    {
      action: 'Record updated',
      user: 'Supervisor',
      time: 'Jan 14',
      target: 'Sarah Johnson',
      type: 'info'
    }
  ];

  const performanceMetrics = [
    {
      label: 'Overall Pass Rate',
      value: '78.5%',
      change: '+5.2%',
      changeType: 'increase',
      target: '80%',
      progress: 78.5,
      icon: <Award className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      label: 'Avg. Grade Score',
      value: '2.1',
      change: '+0.3',
      changeType: 'increase',
      target: '2.0',
      progress: 70,
      icon: <Star className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      label: 'Completion Rate',
      value: '92.4%',
      change: '+3.1%',
      changeType: 'increase',
      target: '95%',
      progress: 92.4,
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    {
      label: 'Avg. Processing Time',
      value: '3.2 days',
      change: '-1.5 days',
      changeType: 'decrease',
      target: '2.5 days',
      progress: 72,
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-orange-500'
    }
  ];

  // Monthly Trends
  const monthlyTrends = [
    { month: 'Jan 2024', applications: 1248, passRate: 78.5, avgGrade: 2.1 },
    { month: 'Dec 2023', applications: 1150, passRate: 76.8, avgGrade: 2.2 },
    { month: 'Nov 2023', applications: 1085, passRate: 75.2, avgGrade: 2.3 },
    { month: 'Oct 2023', applications: 980, passRate: 73.5, avgGrade: 2.4 },
    { month: 'Sep 2023', applications: 895, passRate: 72.1, avgGrade: 2.4 },
    { month: 'Aug 2023', applications: 820, passRate: 70.5, avgGrade: 2.5 },
  ];

  // Top Performing Students
  const topStudents = [
    { id: 'NT2024-001', name: 'Kamal Perera', trade: 'Electrician', grade: 'grade1', score: 98, center: 'Colombo' },
    { id: 'NT2024-004', name: 'Anil Rathnayake', trade: 'Mason', grade: 'grade1', score: 97, center: 'Colombo' },
    { id: 'NT2024-015', name: 'Nayana Fernando', trade: 'Plumber', grade: 'grade1', score: 96, center: 'Galle' },
    { id: 'NT2024-008', name: 'Ruwan Silva', trade: 'Carpenter', grade: 'grade1', score: 95, center: 'Kandy' },
    { id: 'NT2024-012', name: 'Sarath Kumara', trade: 'Electrician', grade: 'grade1', score: 94, center: 'Colombo' },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">NTT Data Entry Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's your data entry overview</p>
          </div>
          <div className="mt-4 md:mt-0">
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.changeType === 'increase' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  <span className="text-sm font-medium ml-1">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 mb-4">{stat.title}</p>
              <div className="flex items-center h-2">
                {stat.trendData.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 mx-0.5 bg-gray-200 rounded-full overflow-hidden"
                  >
                    <div
                      className={`h-full ${stat.color.replace('bg-', 'bg-').replace('500', '400')}`}
                      style={{
                        height: `${(value / Math.max(...stat.trendData)) * 100}%`,
                        marginTop: 'auto'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Charts Section */}
      <div className="space-y-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800">Performance Overview</h2>

        {/* Detailed Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.color} text-white`}>
                  {metric.icon}
                </div>
                <div className={`flex items-center ${metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.changeType === 'increase' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm font-medium ml-1">{metric.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-gray-600 mb-4">{metric.label}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{metric.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${metric.color}`}
                    style={{ width: `${metric.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trends */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Monthly Performance Trends</h3>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {monthlyTrends.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 w-24">{month.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(month.passRate / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right w-32">
                    <div className="text-sm font-medium text-gray-900">{month.passRate}% pass</div>
                    <div className="text-xs text-gray-500">{month.applications} students</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Students */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Top Performing Students</h3>
              <Award className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="space-y-4">
              {topStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-yellow-100 text-yellow-800' :
                      index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                      }`}>
                      <span className="text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">{student.name}</p>
                      <p className="text-xs text-gray-600">{student.trade} • {student.center}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">
                      {student.grade === 'grade1' ? 'Grade 01' :
                        student.grade === 'grade2' ? 'Grade 02' :
                          student.grade === 'grade3' ? 'Grade 03' : 'N/A'}
                    </div>
                    <div className="text-xs text-green-600">Score: {student.score}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legacy/Other Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Performance Metrics (Legacy - Removed/Replaced) */}
        <div className="hidden lg:col-span-2">
          {/* ... */}
        </div>

        {/* Right Column - Recent Activity */}
        <div className="lg:col-span-3"> {/* Expanded to full width if needed, or keep tailored */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`p-2 rounded-full flex-shrink-0 ${activity.type === 'success' ? 'bg-green-100 text-green-600' :
                    activity.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                    {activity.type === 'success' ? <CheckCircle className="w-4 h-4" /> :
                      activity.type === 'warning' ? <AlertCircle className="w-4 h-4" /> :
                        <FileText className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{activity.action}</p>
                    <p className="text-xs text-gray-600 truncate">by {activity.user} • {activity.target}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Data Summary & Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Data Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Data Summary</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg mr-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Verified Records</p>
                  <p className="text-sm text-gray-600">Ready for processing</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">856</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Pending Verification</p>
                  <p className="text-sm text-gray-600">Needs review</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">23</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg mr-4">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Rejected Records</p>
                  <p className="text-sm text-gray-600">Requires correction</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-gray-900">8</span>
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Upcoming Tasks</h2>
            <div className="flex items-center text-gray-400">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="text-sm">This Week</span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { task: 'Complete monthly data audit', time: 'Today, 3:00 PM', priority: 'high' },
              { task: 'Verify 50 pending records', time: 'Tomorrow, 10:00 AM', priority: 'medium' },
              { task: 'Submit weekly report', time: 'Jan 18, 2:00 PM', priority: 'medium' },
              { task: 'System maintenance backup', time: 'Jan 20, 11:00 PM', priority: 'low' },
            ].map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{task.task}</p>
                  <p className="text-sm text-gray-600 mt-1">{task.time}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ml-4 ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 px-4 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg font-medium transition-colors">
            View All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default NTTDataEntryDashboard;