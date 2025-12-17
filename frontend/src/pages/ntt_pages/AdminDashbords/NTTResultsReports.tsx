import React, { useState } from 'react';
import { 
  BarChart3, PieChart, Download, Filter, FileText, TrendingUp, Award, Users,
  Printer, Share2, Eye, CheckCircle, Calendar, Clock, Search, Settings, 
} from 'lucide-react';

const NTTResultsReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>('overview');
  const [timeRange, setTimeRange] = useState<string>('month');
  const [filterTrade, setFilterTrade] = useState<string>('all');
  const [filterCenter, setFilterCenter] = useState<string>('all');
  const [selectedResults, setSelectedResults] = useState<string[]>([]);

  const mainStats = [
    { 
      label: 'Total Tests Conducted', 
      value: '1,248', 
      change: '+12%', 
      changeType: 'increase',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    { 
      label: 'Overall Pass Rate', 
      value: '78.5%', 
      change: '+5.2%', 
      changeType: 'increase',
      icon: <Award className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    { 
      label: 'Avg. Processing Time', 
      value: '3.2 days', 
      change: '-1.5 days', 
      changeType: 'decrease',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-purple-500'
    },
    { 
      label: 'Certified Students', 
      value: '975', 
      change: '+48', 
      changeType: 'increase',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-orange-500'
    }
  ];

  const reports = [
    { id: 'overview', name: 'Overview Dashboard', icon: <BarChart3 className="w-5 h-5" />, description: 'Key metrics and performance overview' },
    { id: 'trade', name: 'Trade-wise Analysis', icon: <PieChart className="w-5 h-5" />, description: 'Performance by trade category' },
    { id: 'center', name: 'Center Performance', icon: <BarChart3 className="w-5 h-5" />, description: 'Results by testing center' },
    { id: 'monthly', name: 'Monthly Reports', icon: <TrendingUp className="w-5 h-5" />, description: 'Monthly trends and analysis' },
    { id: 'detailed', name: 'Detailed Results', icon: <FileText className="w-5 h-5" />, description: 'Complete student results' },
    { id: 'export', name: 'Export Data', icon: <Download className="w-5 h-5" />, description: 'Export results in multiple formats' },
  ];

  const trades = [
    { name: 'Electrician', passRate: 82, totalTests: 245, avgGrade: 1.8, revenue: '₹245K' },
    { name: 'Carpenter', passRate: 75, totalTests: 198, avgGrade: 2.2, revenue: '₹198K' },
    { name: 'Plumber', passRate: 80, totalTests: 187, avgGrade: 2.0, revenue: '₹187K' },
    { name: 'Welder', passRate: 70, totalTests: 156, avgGrade: 2.4, revenue: '₹156K' },
    { name: 'Mason', passRate: 85, totalTests: 142, avgGrade: 1.9, revenue: '₹142K' },
    { name: 'Mechanic', passRate: 78, totalTests: 135, avgGrade: 2.1, revenue: '₹135K' },
    { name: 'Other Trades', passRate: 79, totalTests: 185, avgGrade: 2.1, revenue: '₹185K' },
  ];

  const centers = [
    { name: 'Colombo Trade Center', passRate: 81, totalTests: 320, avgProcessing: 2.8, satisfaction: 4.8 },
    { name: 'Kandy Technical Center', passRate: 79, totalTests: 245, avgProcessing: 3.1, satisfaction: 4.6 },
    { name: 'Galle Skill Center', passRate: 76, totalTests: 198, avgProcessing: 3.5, satisfaction: 4.5 },
    { name: 'Kurunegala Trade Center', passRate: 82, totalTests: 187, avgProcessing: 2.9, satisfaction: 4.7 },
    { name: 'Jaffna Technical Center', passRate: 74, totalTests: 156, avgProcessing: 4.2, satisfaction: 4.3 },
  ];

  const recentResults = [
    { id: 'NT2024-001', name: 'Kamal Perera', trade: 'Electrician', grade: '1', slccl: 'Pass', date: '2024-01-15', center: 'Colombo' },
    { id: 'NT2024-002', name: 'Nimal Silva', trade: 'Carpenter', grade: '2', slccl: 'Pass', date: '2024-01-14', center: 'Kandy' },
    { id: 'NT2024-003', name: 'Sunil Fernando', trade: 'Plumber', grade: '3', slccl: 'Pass', date: '2024-01-13', center: 'Galle' },
    { id: 'NT2024-004', name: 'Anil Rathnayake', trade: 'Mason', grade: '1', slccl: 'Pass', date: '2024-01-12', center: 'Colombo' },
    { id: 'NT2024-005', name: 'Sarath Bandara', trade: 'Welder', grade: '2', slccl: 'Fail', date: '2024-01-11', center: 'Kurunegala' },
    { id: 'NT2024-006', name: 'Priyantha Jayasuriya', trade: 'Electrician', grade: '1', slccl: 'Pass', date: '2024-01-10', center: 'Colombo' },
  ];

  const monthlyTrends = [
    { month: 'Jan', applications: 1248, passRate: 78.5, revenue: '₹2.4M' },
    { month: 'Dec', applications: 1150, passRate: 76.8, revenue: '₹2.1M' },
    { month: 'Nov', applications: 1085, passRate: 75.2, revenue: '₹1.9M' },
    { month: 'Oct', applications: 980, passRate: 73.5, revenue: '₹1.7M' },
    { month: 'Sep', applications: 895, passRate: 72.1, revenue: '₹1.5M' },
    { month: 'Aug', applications: 820, passRate: 70.5, revenue: '₹1.3M' },
  ];

  const handleSelectResult = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedResults([...selectedResults, id]);
    } else {
      setSelectedResults(selectedResults.filter(resultId => resultId !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedResults(recentResults.map(result => result.id));
    } else {
      setSelectedResults([]);
    }
  };

  const handleExport = () => {
    alert(`Exporting ${selectedResults.length > 0 ? selectedResults.length : 'all'} results`);
  };

  const renderReportContent = () => {
    switch(selectedReport) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mainStats.map((stat, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Pass Rate by Trade</h3>
                <div className="space-y-4">
                  {trades.map((trade) => (
                    <div key={trade.name} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 w-32">{trade.name}</span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${trade.passRate}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12 text-right">{trade.passRate}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Trends</h3>
                <div className="space-y-4">
                  {monthlyTrends.map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 w-16">{month.month}</span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(month.applications / 1300) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{month.applications}</div>
                        <div className="text-xs text-gray-500">{month.passRate}% pass rate</div>
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pass Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Tests</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {trades.map((trade) => (
                    <tr key={trade.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{trade.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${trade.passRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{trade.passRate}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{trade.totalTests}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{trade.avgGrade}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{trade.revenue}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button className="p-1 text-blue-600 hover:text-blue-800">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-green-600 hover:text-green-800">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'center':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Center</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Tests</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Processing</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {centers.map((center) => (
                    <tr key={center.name} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{center.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${center.passRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{center.passRate}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{center.totalTests}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{center.avgProcessing} days</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-yellow-600 h-2 rounded-full"
                              style={{ width: `${(center.satisfaction / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{center.satisfaction}/5</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          center.passRate >= 80 ? 'bg-green-100 text-green-800' :
                          center.passRate >= 75 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {center.passRate >= 80 ? 'Excellent' :
                           center.passRate >= 75 ? 'Good' : 'Needs Improvement'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'detailed':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                        checked={selectedResults.length === recentResults.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Center</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentResults.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                          checked={selectedResults.includes(result.id)}
                          onChange={(e) => handleSelectResult(result.id, e.target.checked)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{result.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{result.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{result.trade}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          result.grade === '1' ? 'bg-green-100 text-green-800' :
                          result.grade === '2' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          Grade {result.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          result.slccl === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {result.slccl}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{result.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{result.center}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Report Type</h3>
            <p className="text-gray-600">Choose a report type from the sidebar to view detailed analytics</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Results & Reports</h1>
            <p className="text-gray-600 mt-2">Analytics and reports for National Trade Test results</p>
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
              </select>
            </div>
            <button 
              onClick={handleExport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Report Navigation */}
        <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-wrap gap-2">
            {reports.map((report) => (
              <button
                key={report.id}
                className={`px-4 py-2 rounded-md flex items-center ${selectedReport === report.id ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setSelectedReport(report.id)}
              >
                <span className="mr-2">{report.icon}</span>
                {report.name}
              </button>
            ))}
          </div>
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
                placeholder="Search results..."
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
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Results Actions */}
      {selectedResults.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-3 md:mb-0">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
              <span className="font-medium text-gray-800">
                {selectedResults.length} result{selectedResults.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                Generate Certificates
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Export Selected
              </button>
              <button 
                onClick={() => setSelectedResults([])}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        {renderReportContent()}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Highest Pass Rate</span>
              <span className="text-sm font-medium text-gray-900">Mason (85%)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Most Tests</span>
              <span className="text-sm font-medium text-gray-900">Electrician (245)</span>
            </div>
            <div className="flex justifyBetween items-center">
              <span className="text-sm text-gray-700">Fastest Processing</span>
              <span className="text-sm font-medium text-gray-900">Colombo (2.8 days)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Revenue Leader</span>
              <span className="text-sm font-medium text-gray-900">Electrician (₹245K)</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Actions</h3>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center">
              <Printer className="w-4 h-4 mr-2" />
              Print Report
            </button>
            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share Report
            </button>
            <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center">
              <Settings className="w-4 h-4 mr-2" />
              Customize Report
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Formats</h3>
          <div className="space-y-3">
            {[
              { format: 'PDF Report', size: '2.4 MB', updated: 'Today' },
              { format: 'Excel Data', size: '1.8 MB', updated: 'Yesterday' },
              { format: 'CSV Export', size: '1.2 MB', updated: 'Jan 14' },
              { format: 'Dashboard JSON', size: '3.1 MB', updated: 'Jan 13' },
            ].map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div>
                  <p className="text-sm font-medium text-gray-800">{file.format}</p>
                  <p className="text-xs text-gray-600">{file.size} • Updated {file.updated}</p>
                </div>
                <button className="p-1 text-green-600 hover:text-green-700">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NTTResultsReports;
