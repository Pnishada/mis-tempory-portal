import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, FileText, Clock, Calendar, 
  AlertCircle, CheckCircle, XCircle, TrendingUp,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const NTTDataEntryDashboard: React.FC = () => {
  const navigate = useNavigate();
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
    { label: 'Daily Target', value: '50', current: '42', progress: 84, color: 'bg-green-500' },
    { label: 'Weekly Target', value: '250', current: '198', progress: 79, color: 'bg-blue-500' },
    { label: 'Monthly Target', value: '1000', current: '856', progress: 86, color: 'bg-purple-500' },
    { label: 'Accuracy Target', value: '99%', current: '98.2%', progress: 99, color: 'bg-yellow-500' },
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

      {/* Main Content - Reorganized Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Performance Metrics */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Performance Overview</h2>
            
            {/* Performance Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {metric.current}<span className="text-sm text-gray-600">/{metric.value}</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div 
                      className={`h-2.5 rounded-full ${metric.color}`}
                      style={{ width: `${metric.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">0%</span>
                    <span className="font-medium text-gray-700">{metric.progress}% complete</span>
                    <span className="text-gray-500">100%</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Performance Summary */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-100">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-800">You're doing great!</p>
                  <p className="text-sm text-gray-600">You're 12% ahead of the average data entry operator</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Recent Activity */}
        <div>
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
                  <div className={`p-2 rounded-full flex-shrink-0 ${
                    activity.type === 'success' ? 'bg-green-100 text-green-600' :
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
                <span className={`px-3 py-1 text-xs font-medium rounded-full ml-4 ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
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