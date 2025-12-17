import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Users, Award, Calendar, Filter, Search,
  Download, CheckCircle, Star, TrendingDown, Clock, MapPin, BookOpen, Activity,
} from 'lucide-react';

const NTTStudentPerformance: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [filterTrade, setFilterTrade] = useState('all');
  const [filterCenter, setFilterCenter] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Performance Metrics
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

  // Trade Performance Data
  const tradePerformance = [
    { 
      trade: 'Electrician', 
      students: 245, 
      passRate: 82, 
      avgGrade: 1.8, 
      completion: 95, 
      trend: 'up',
      revenue: '₹245,000'
    },
    { 
      trade: 'Carpenter', 
      students: 198, 
      passRate: 75, 
      avgGrade: 2.2, 
      completion: 88, 
      trend: 'stable',
      revenue: '₹198,000'
    },
    { 
      trade: 'Plumber', 
      students: 187, 
      passRate: 80, 
      avgGrade: 2.0, 
      completion: 92, 
      trend: 'up',
      revenue: '₹187,000'
    },
    { 
      trade: 'Welder', 
      students: 156, 
      passRate: 70, 
      avgGrade: 2.4, 
      completion: 85, 
      trend: 'down',
      revenue: '₹156,000'
    },
    { 
      trade: 'Mason', 
      students: 142, 
      passRate: 85, 
      avgGrade: 1.9, 
      completion: 96, 
      trend: 'up',
      revenue: '₹142,000'
    },
    { 
      trade: 'Mechanic', 
      students: 135, 
      passRate: 78, 
      avgGrade: 2.1, 
      completion: 90, 
      trend: 'stable',
      revenue: '₹135,000'
    },
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
    { id: 'NT2024-001', name: 'Kamal Perera', trade: 'Electrician', grade: '1', score: 98, center: 'Colombo' },
    { id: 'NT2024-004', name: 'Anil Rathnayake', trade: 'Mason', grade: '1', score: 97, center: 'Colombo' },
    { id: 'NT2024-015', name: 'Nayana Fernando', trade: 'Plumber', grade: '1', score: 96, center: 'Galle' },
    { id: 'NT2024-008', name: 'Ruwan Silva', trade: 'Carpenter', grade: '1', score: 95, center: 'Kandy' },
    { id: 'NT2024-012', name: 'Sarath Kumara', trade: 'Electrician', grade: '1', score: 94, center: 'Colombo' },
  ];

  // Center Performance (derived from student data)
  const centerPerformance = [
    { 
      center: 'Colombo Trade Center', 
      students: 456, 
      passRate: 81, 
      avgGrade: 2.0, 
      satisfaction: 4.8,
      completionTime: '2.8 days'
    },
    { 
      center: 'Kandy Technical Center', 
      students: 324, 
      passRate: 79, 
      avgGrade: 2.1, 
      satisfaction: 4.6,
      completionTime: '3.1 days'
    },
    { 
      center: 'Galle Skill Center', 
      students: 287, 
      passRate: 76, 
      avgGrade: 2.2, 
      satisfaction: 4.5,
      completionTime: '3.5 days'
    },
    { 
      center: 'Kurunegala Trade Center', 
      students: 198, 
      passRate: 82, 
      avgGrade: 1.9, 
      satisfaction: 4.7,
      completionTime: '2.9 days'
    },
    { 
      center: 'Jaffna Technical Center', 
      students: 156, 
      passRate: 74, 
      avgGrade: 2.3, 
      satisfaction: 4.3,
      completionTime: '4.2 days'
    },
  ];

  // Demographic Analysis
  const demographicData = {
    gender: [
      { label: 'Male', value: 68, color: 'bg-blue-500' },
      { label: 'Female', value: 32, color: 'bg-pink-500' },
    ],
    ageGroups: [
      { range: '18-25', count: 45, percentage: 45 },
      { range: '26-35', count: 35, percentage: 35 },
      { range: '36-45', count: 15, percentage: 15 },
      { range: '46+', count: 5, percentage: 5 },
    ],
    education: [
      { level: 'O/L Completed', count: 65 },
      { level: 'A/L Completed', count: 25 },
      { level: 'Diploma', count: 7 },
      { level: 'Degree', count: 3 },
    ]
  };

  // Performance by Level
  const levelPerformance = [
    { level: 'Level 3 (Advanced)', students: 420, passRate: 85, avgGrade: 1.8 },
    { level: 'Level 2 (Intermediate)', students: 580, passRate: 78, avgGrade: 2.1 },
    { level: 'Level 1 (Basic)', students: 248, passRate: 72, avgGrade: 2.4 },
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Performance Metrics */}
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
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>0%</span>
                      <span>Target: {metric.target}</span>
                      <span>100%</span>
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
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
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
                        <div className="text-sm font-bold text-gray-900">Grade {student.grade}</div>
                        <div className="text-xs text-gray-600">Score: {student.score}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'trade':
        return (
          <div className="space-y-6">
            {/* Trade Performance Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pass Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Grade</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tradePerformance.map((trade, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{trade.trade}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{trade.students}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                              <div
                                className={`h-2 rounded-full ${
                                  trade.passRate >= 80 ? 'bg-green-600' :
                                  trade.passRate >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                                }`}
                                style={{ width: `${trade.passRate}%` }}
                              />
                            </div>
                            <span className={`text-sm font-medium ${
                              trade.passRate >= 80 ? 'text-green-800' :
                              trade.passRate >= 70 ? 'text-yellow-800' : 'text-red-800'
                            }`}>
                              {trade.passRate}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{trade.avgGrade}</div>
                          <div className="text-xs text-gray-500">
                            {trade.avgGrade <= 1.8 ? 'Excellent' :
                             trade.avgGrade <= 2.2 ? 'Good' : 'Needs Improvement'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{trade.completion}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {trade.trend === 'up' ? (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            ) : trade.trend === 'down' ? (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            ) : (
                              <Activity className="w-4 h-4 text-gray-400" />
                            )}
                            <span className="ml-1 text-sm text-gray-600 capitalize">{trade.trend}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{trade.revenue}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Trade Comparison Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Trade Performance Comparison</h3>
              <div className="space-y-4">
                {tradePerformance.map((trade) => (
                  <div key={trade.trade} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">{trade.trade}</span>
                      <span className="text-sm text-gray-900">{trade.passRate}% pass rate</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${trade.passRate}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 w-16 text-right">
                        {trade.students} students
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'centers':
        return (
          <div className="space-y-6">
            {/* Center Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {centerPerformance.map((center, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{center.center}</h3>
                      <div className="flex items-center mt-1">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">{center.students} students</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900">{center.satisfaction}/5</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Pass Rate</span>
                        <span className="text-sm font-medium text-gray-900">{center.passRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            center.passRate >= 80 ? 'bg-green-600' :
                            center.passRate >= 75 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${center.passRate}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Avg. Grade</p>
                        <p className="text-lg font-bold text-gray-900">{center.avgGrade}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Processing</p>
                        <p className="text-lg font-bold text-gray-900">{center.completionTime}</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                    View Center Details
                  </button>
                </div>
              ))}
            </div>

            {/* Center Ranking */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Center Performance Ranking</h3>
              <div className="space-y-4">
                {centerPerformance
                  .sort((a, b) => b.passRate - a.passRate)
                  .map((center, index) => (
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
                          <p className="text-sm font-medium text-gray-800">{center.center}</p>
                          <p className="text-xs text-gray-600">{center.students} students</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">{center.passRate}% pass</div>
                        <div className="text-xs text-gray-600">Grade: {center.avgGrade}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        );

      case 'demographics':
        return (
          <div className="space-y-6">
            {/* Demographic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Gender Distribution */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Gender Distribution</h3>
                <div className="space-y-3">
                  {demographicData.gender.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Age Groups */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Age Distribution</h3>
                <div className="space-y-3">
                  {demographicData.ageGroups.map((group, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-700">{group.range} years</span>
                        <span className="text-sm font-medium text-gray-900">{group.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${group.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Level */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Education Level</h3>
                <div className="space-y-3">
                  {demographicData.education.map((edu, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{edu.level}</span>
                      <span className="text-sm font-medium text-gray-900">{edu.count}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Level Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Performance by Level</h3>
              <div className="space-y-4">
                {levelPerformance.map((level, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-800">{level.level}</h4>
                        <p className="text-sm text-gray-600">{level.students} students</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{level.passRate}%</div>
                        <div className="text-sm text-gray-600">Pass Rate</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Average Grade: {level.avgGrade}</span>
                        <span className="font-medium text-gray-900">
                          {level.avgGrade <= 1.8 ? '⭐ Excellent' :
                           level.avgGrade <= 2.2 ? '👍 Good' : '📈 Needs Improvement'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
                          style={{ width: `${level.passRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Analytics Category</h3>
            <p className="text-gray-600">Choose a category from the tabs above to view detailed performance analytics</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Performance Analytics</h1>
            <p className="text-gray-600 mt-2">Comprehensive analysis of NTT student performance metrics</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4 mr-2" /> },
              { id: 'trade', label: 'Trade Analysis', icon: <BookOpen className="w-4 h-4 mr-2" /> },
              { id: 'centers', label: 'Center Analysis', icon: <MapPin className="w-4 h-4 mr-2" /> },
              { id: 'demographics', label: 'Demographics', icon: <Users className="w-4 h-4 mr-2" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search analytics..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={filterTrade}
                onChange={(e) => setFilterTrade(e.target.value)}
              >
                <option value="all">All Trades</option>
                <option value="electrician">Electrician</option>
                <option value="carpenter">Carpenter</option>
                <option value="plumber">Plumber</option>
                <option value="welder">Welder</option>
                <option value="mason">Mason</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={filterCenter}
                onChange={(e) => setFilterCenter(e.target.value)}
              >
                <option value="all">All Centers</option>
                <option value="colombo">Colombo</option>
                <option value="kandy">Kandy</option>
                <option value="galle">Galle</option>
                <option value="kurunegala">Kurunegala</option>
                <option value="jaffna">Jaffna</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {renderTabContent()}

      {/* Quick Stats Footer */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <p className="text-xl font-bold text-gray-900">1,248</p>
            <p className="text-sm text-gray-600">Total Students</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <p className="text-xl font-bold text-green-600">78.5%</p>
            <p className="text-sm text-gray-600">Overall Pass Rate</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <p className="text-xl font-bold text-blue-600">2.1</p>
            <p className="text-sm text-gray-600">Avg. Grade</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <p className="text-xl font-bold text-purple-600">92.4%</p>
            <p className="text-sm text-gray-600">Completion Rate</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <p className="text-xl font-bold text-orange-600">6</p>
            <p className="text-sm text-gray-600">Trades Offered</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
            <p className="text-xl font-bold text-indigo-600">5</p>
            <p className="text-sm text-gray-600">Testing Centers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NTTStudentPerformance;
