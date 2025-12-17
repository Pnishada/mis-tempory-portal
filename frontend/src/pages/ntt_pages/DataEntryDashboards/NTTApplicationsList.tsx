import React, { useState } from 'react';
import { 
  Search, Filter, Eye, Edit, User, Phone, Mail, Calendar,
  CheckCircle, XCircle, Clock, MoreVertical, FileText, Users, BarChart3,
  ChevronLeft, ChevronRight, Plus, Upload, 
} from 'lucide-react';

interface Application {
  id: string;
  nic: string;
  name: string;
  trade: string;
  status: 'pending' | 'registered' | 'exam_scheduled' | 'completed' | 'certified' | 'rejected';
  date: string;
  phone: string;
  email: string;
  center: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  documents: number;
  lastUpdated: string;
}

const NTTApplicationsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTrade, setFilterTrade] = useState<string>('all');
  const [filterCenter, setFilterCenter] = useState<string>('all');
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 10;

  const applications: Application[] = [
    { id: 'NT2024-001', nic: '901234567V', name: 'Kamal Perera', trade: 'Electrician', status: 'registered', date: '2024-01-15', phone: '0771234567', email: 'kamal@email.com', center: 'Colombo Center', paymentStatus: 'paid', documents: 5, lastUpdated: '2024-01-15 10:30' },
    { id: 'NT2024-002', nic: '901234568V', name: 'Nimal Silva', trade: 'Carpenter', status: 'exam_scheduled', date: '2024-01-14', phone: '0771234568', email: 'nimal@email.com', center: 'Kandy Center', paymentStatus: 'paid', documents: 4, lastUpdated: '2024-01-14 14:20' },
    { id: 'NT2024-003', nic: '901234569V', name: 'Sunil Fernando', trade: 'Plumber', status: 'completed', date: '2024-01-13', phone: '0771234569', email: 'sunil@email.com', center: 'Galle Center', paymentStatus: 'paid', documents: 6, lastUpdated: '2024-01-13 09:15' },
    { id: 'NT2024-004', nic: '901234570V', name: 'Anil Rathnayake', trade: 'Mason', status: 'pending', date: '2024-01-12', phone: '0771234570', email: 'anil@email.com', center: 'Colombo Center', paymentStatus: 'pending', documents: 3, lastUpdated: '2024-01-12 16:45' },
    { id: 'NT2024-005', nic: '901234571V', name: 'Sarath Bandara', trade: 'Welder', status: 'certified', date: '2024-01-11', phone: '0771234571', email: 'sarath@email.com', center: 'Kurunegala Center', paymentStatus: 'paid', documents: 7, lastUpdated: '2024-01-11 11:30' },
    { id: 'NT2024-006', nic: '901234572V', name: 'Priyantha Jayasuriya', trade: 'Electrician', status: 'registered', date: '2024-01-10', phone: '0771234572', email: 'priyantha@email.com', center: 'Colombo Center', paymentStatus: 'paid', documents: 5, lastUpdated: '2024-01-10 13:20' },
    { id: 'NT2024-007', nic: '901234573V', name: 'Chaminda Silva', trade: 'Mechanic', status: 'rejected', date: '2024-01-09', phone: '0771234573', email: 'chaminda@email.com', center: 'Kandy Center', paymentStatus: 'failed', documents: 2, lastUpdated: '2024-01-09 15:10' },
    { id: 'NT2024-008', nic: '901234574V', name: 'Nayana Perera', trade: 'Beautician', status: 'pending', date: '2024-01-08', phone: '0771234574', email: 'nayana@email.com', center: 'Galle Center', paymentStatus: 'pending', documents: 4, lastUpdated: '2024-01-08 10:05' },
    { id: 'NT2024-009', nic: '901234575V', name: 'Ruwan Bandara', trade: 'Tailor', status: 'exam_scheduled', date: '2024-01-07', phone: '0771234575', email: 'ruwan@email.com', center: 'Colombo Center', paymentStatus: 'paid', documents: 5, lastUpdated: '2024-01-07 14:40' },
    { id: 'NT2024-010', nic: '901234576V', name: 'Saman Kumara', trade: 'Painter', status: 'completed', date: '2024-01-06', phone: '0771234576', email: 'saman@email.com', center: 'Kurunegala Center', paymentStatus: 'paid', documents: 6, lastUpdated: '2024-01-06 09:25' },
    { id: 'NT2024-011', nic: '901234577V', name: 'Malini Fernando', trade: 'Cook', status: 'registered', date: '2024-01-05', phone: '0771234577', email: 'malini@email.com', center: 'Kandy Center', paymentStatus: 'paid', documents: 5, lastUpdated: '2024-01-05 16:30' },
    { id: 'NT2024-012', nic: '901234578V', name: 'Ajith Rathnayake', trade: 'Electrician', status: 'pending', date: '2024-01-04', phone: '0771234578', email: 'ajith@email.com', center: 'Galle Center', paymentStatus: 'pending', documents: 3, lastUpdated: '2024-01-04 11:15' },
  ];

  const trades = Array.from(new Set(applications.map(app => app.trade)));
  const centers = Array.from(new Set(applications.map(app => app.center)));
  
  const statusCounts = {
    all: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    registered: applications.filter(a => a.status === 'registered').length,
    exam_scheduled: applications.filter(a => a.status === 'exam_scheduled').length,
    completed: applications.filter(a => a.status === 'completed').length,
    certified: applications.filter(a => a.status === 'certified').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.trade.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    const matchesTrade = filterTrade === 'all' || app.trade === filterTrade;
    const matchesCenter = filterCenter === 'all' || app.center === filterCenter;
    
    return matchesSearch && matchesFilter && matchesTrade && matchesCenter;
  });

  const indexOfLastApp = currentPage * applicationsPerPage;
  const indexOfFirstApp = indexOfLastApp - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApp, indexOfLastApp);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  const statusColors = {
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock className="w-3 h-3 mr-1" /> },
    registered: { bg: 'bg-blue-100', text: 'text-blue-800', icon: <CheckCircle className="w-3 h-3 mr-1" /> },
    exam_scheduled: { bg: 'bg-purple-100', text: 'text-purple-800', icon: <Calendar className="w-3 h-3 mr-1" /> },
    completed: { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="w-3 h-3 mr-1" /> },
    certified: { bg: 'bg-indigo-100', text: 'text-indigo-800', icon: <CheckCircle className="w-3 h-3 mr-1" /> },
    rejected: { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle className="w-3 h-3 mr-1" /> },
  };

  const paymentStatusColors = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
  };

  const getStatusLabel = (status: Application['status']) => {
    const labels = {
      pending: 'Pending Review',
      registered: 'Registered',
      exam_scheduled: 'Exam Scheduled',
      completed: 'Exam Completed',
      certified: 'Certified',
      rejected: 'Rejected',
    };
    return labels[status];
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(currentApplications.map(app => app.id));
    } else {
      setSelectedApplications([]);
    }
  };

  const handleSelectApplication = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedApplications([...selectedApplications, id]);
    } else {
      setSelectedApplications(selectedApplications.filter(appId => appId !== id));
    }
  };

  const handleBulkAction = (action: string) => {
    alert(`Performing ${action} on ${selectedApplications.length} applications`);
    setSelectedApplications([]);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">NTT Applications</h1>
            <p className="text-gray-600 mt-2">Manage and track National Trade Test applications</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              New Application
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div 
              key={status}
              className={`bg-white p-4 rounded-lg shadow-sm border cursor-pointer transition-all ${
                filterStatus === status ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setFilterStatus(status)}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-600 capitalize">{status === 'all' ? 'All' : status.replace('_', ' ')}</p>
                {status !== 'all' && statusColors[status as keyof typeof statusColors]?.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedApplications.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-3 md:mb-0">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
              <span className="font-medium text-gray-800">
                {selectedApplications.length} application{selectedApplications.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => handleBulkAction('approve')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                Approve Selected
              </button>
              <button 
                onClick={() => handleBulkAction('reject')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Reject Selected
              </button>
              <button 
                onClick={() => handleBulkAction('export')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              >
                Export Selected
              </button>
              <button 
                onClick={() => setSelectedApplications([])}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by ID, NIC, Name, or Trade..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                {trades.map(trade => (
                  <option key={trade} value={trade}>{trade}</option>
                ))}
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
                {centers.map(center => (
                  <option key={center} value={center}>{center}</option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100 text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100 text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Users className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table/Grid */}
      {viewMode === 'list' ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                      checked={selectedApplications.length === currentApplications.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trade & Center</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                        checked={selectedApplications.includes(app.id)}
                        onChange={(e) => handleSelectApplication(app.id, e.target.checked)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{app.id}</div>
                      <div className="text-sm text-gray-500">NIC: {app.nic}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{app.name}</div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Phone className="w-3 h-3 mr-1" />
                        {app.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="w-3 h-3 mr-1" />
                        {app.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{app.trade}</div>
                      <div className="text-sm text-gray-500">{app.center}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${paymentStatusColors[app.paymentStatus]}`}>
                        {app.paymentStatus.charAt(0).toUpperCase() + app.paymentStatus.slice(1)}
                      </span>
                      <div className="text-xs text-gray-500 mt-1 flex items-center">
                        <FileText className="w-3 h-3 mr-1" />
                        {app.documents} docs
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center ${statusColors[app.status].bg} ${statusColors[app.status].text}`}>
                          {statusColors[app.status].icon}
                          {getStatusLabel(app.status)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{app.lastUpdated}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{app.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800" title="View">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-1 text-green-600 hover:text-green-800" title="Edit">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="p-1 text-purple-600 hover:text-purple-800" title="Schedule">
                          <Calendar className="w-5 h-5" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600" title="More">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {currentApplications.map((app) => (
            <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{app.name}</h3>
                    <p className="text-sm text-gray-600">{app.id}</p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                    checked={selectedApplications.includes(app.id)}
                    onChange={(e) => handleSelectApplication(app.id, e.target.checked)}
                  />
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-sm">NIC: {app.nic}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{app.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm truncate">{app.email}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Trade</p>
                    <p className="font-medium text-gray-800">{app.trade}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Center</p>
                    <p className="font-medium text-gray-800">{app.center}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center ${statusColors[app.status].bg} ${statusColors[app.status].text}`}>
                    {statusColors[app.status].icon}
                    {getStatusLabel(app.status)}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${paymentStatusColors[app.paymentStatus]}`}>
                    {app.paymentStatus.charAt(0).toUpperCase() + app.paymentStatus.slice(1)}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="text-sm text-gray-700 mb-4 md:mb-0">
          Showing <span className="font-medium">{indexOfFirstApp + 1}</span> to{' '}
          <span className="font-medium">
            {Math.min(indexOfLastApp, filteredApplications.length)}
          </span> of{' '}
          <span className="font-medium">{filteredApplications.length}</span> applications
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-10 h-10 rounded-lg ${
                  currentPage === pageNum
                    ? 'bg-green-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Applications Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
            <p className="text-sm text-gray-600">Total Applications</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-green-600">
              {Math.round((statusCounts.registered + statusCounts.exam_scheduled + statusCounts.completed + statusCounts.certified) / applications.length * 100)}%
            </p>
            <p className="text-sm text-gray-600">Approval Rate</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">
              {applications.filter(a => a.paymentStatus === 'paid').length}
            </p>
            <p className="text-sm text-gray-600">Paid Applications</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-gray-900">3.2</p>
            <p className="text-sm text-gray-600">Avg. Processing Days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NTTApplicationsList;
