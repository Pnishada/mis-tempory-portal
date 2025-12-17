import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, Users, FileText, Download, Plus, Filter,
  Search, Edit, Trash2, Eye, CheckCircle, XCircle, AlertCircle, 
  ChevronLeft, ChevronRight, Printer, PlayCircle, UserCheck, UserX
} from 'lucide-react';

interface Exam {
  id: string;
  batchNo: string;
  date: string;
  time: string;
  duration: string;
  center: string;
  trade: string;
  level: string;
  examiner1: { id: string; name: string; status: 'confirmed' | 'pending' };
  examiner2: { id: string; name: string; status: 'confirmed' | 'pending' };
  students: { total: number; present: number; absent: number };
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled' | 'pending_review';
  room: string;
  equipment: string[];
  supervisor: string;
  remarks: string;
}

const NTTExamManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2024-01-20');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTrade, setFilterTrade] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 8;

  const exams: Exam[] = [
    { 
      id: 'EX2024-001', 
      batchNo: 'BATCH-NT-001', 
      date: '2024-01-20', 
      time: '09:00 AM', 
      duration: '4 hours',
      center: 'Colombo Trade Center', 
      trade: 'Electrician', 
      level: 'Level 3',
      examiner1: { id: 'EXR-001', name: 'Mr. Silva', status: 'confirmed' },
      examiner2: { id: 'EXR-002', name: 'Mr. Perera', status: 'pending' },
      students: { total: 25, present: 23, absent: 2 },
      status: 'scheduled',
      room: 'Room A-101',
      equipment: ['Multimeter', 'Voltage Tester', 'Tool Kit'],
      supervisor: 'Mr. Jayasuriya',
      remarks: 'Special accommodation needed for 1 student'
    },
    { 
      id: 'EX2024-002', 
      batchNo: 'BATCH-NT-002', 
      date: '2024-01-21', 
      time: '10:00 AM', 
      duration: '3 hours',
      center: 'Kandy Technical Center', 
      trade: 'Carpenter', 
      level: 'Level 2',
      examiner1: { id: 'EXR-003', name: 'Mr. Fernando', status: 'confirmed' },
      examiner2: { id: 'EXR-004', name: 'Mr. Bandara', status: 'confirmed' },
      students: { total: 20, present: 18, absent: 2 },
      status: 'scheduled',
      room: 'Room B-205',
      equipment: ['Circular Saw', 'Power Drill', 'Measuring Tools'],
      supervisor: 'Mr. Rathnayake',
      remarks: ''
    },
    { 
      id: 'EX2024-003', 
      batchNo: 'BATCH-NT-003', 
      date: '2024-01-18', 
      time: '08:30 AM', 
      duration: '5 hours',
      center: 'Galle Skill Center', 
      trade: 'Plumber', 
      level: 'Level 3',
      examiner1: { id: 'EXR-005', name: 'Mr. Jayasuriya', status: 'confirmed' },
      examiner2: { id: 'EXR-006', name: 'Mr. Rathnayake', status: 'confirmed' },
      students: { total: 18, present: 18, absent: 0 },
      status: 'completed',
      room: 'Room C-301',
      equipment: ['Pipe Cutter', 'Wrench Set', 'Pressure Gauge'],
      supervisor: 'Mr. Fernando',
      remarks: 'Excellent performance by all students'
    },
    { 
      id: 'EX2024-004', 
      batchNo: 'BATCH-NT-004', 
      date: '2024-01-19', 
      time: '02:00 PM', 
      duration: '4 hours',
      center: 'Colombo Trade Center', 
      trade: 'Welder', 
      level: 'Level 2',
      examiner1: { id: 'EXR-007', name: 'Mr. Wijesekara', status: 'confirmed' },
      examiner2: { id: 'EXR-008', name: 'Mr. Karunaratne', status: 'pending' },
      students: { total: 22, present: 20, absent: 2 },
      status: 'ongoing',
      room: 'Room D-102',
      equipment: ['Welding Machine', 'Safety Gear', 'Grinder'],
      supervisor: 'Mr. Silva',
      remarks: 'Running smoothly'
    },
    { 
      id: 'EX2024-005', 
      batchNo: 'BATCH-NT-005', 
      date: '2024-01-22', 
      time: '11:00 AM', 
      duration: '3 hours',
      center: 'Kurunegala Trade Center', 
      trade: 'Mason', 
      level: 'Level 1',
      examiner1: { id: 'EXR-009', name: 'Mr. Dissanayake', status: 'pending' },
      examiner2: { id: 'EXR-010', name: 'Mr. Gunawardena', status: 'pending' },
      students: { total: 15, present: 0, absent: 15 },
      status: 'scheduled',
      room: 'Room E-201',
      equipment: ['Trowel', 'Level', 'Mixing Tools'],
      supervisor: 'Mr. Perera',
      remarks: 'Waiting for material delivery'
    },
    { 
      id: 'EX2024-006', 
      batchNo: 'BATCH-NT-006', 
      date: '2024-01-17', 
      time: '09:00 AM', 
      duration: '4 hours',
      center: 'Jaffna Technical Institute', 
      trade: 'Mechanic', 
      level: 'Level 3',
      examiner1: { id: 'EXR-011', name: 'Mr. Suresh', status: 'confirmed' },
      examiner2: { id: 'EXR-012', name: 'Mrs. Priya', status: 'confirmed' },
      students: { total: 18, present: 16, absent: 2 },
      status: 'completed',
      room: 'Room F-101',
      equipment: ['Diagnostic Tool', 'Jack Stand', 'Tool Set'],
      supervisor: 'Mr. Kumar',
      remarks: 'Results pending review'
    },
    { 
      id: 'EX2024-007', 
      batchNo: 'BATCH-NT-007', 
      date: '2024-01-23', 
      time: '08:00 AM', 
      duration: '6 hours',
      center: 'Colombo Trade Center', 
      trade: 'Electrician', 
      level: 'Level 1',
      examiner1: { id: 'EXR-001', name: 'Mr. Silva', status: 'confirmed' },
      examiner2: { id: 'EXR-013', name: 'Mr. Rajapakse', status: 'pending' },
      students: { total: 30, present: 0, absent: 30 },
      status: 'pending_review',
      room: 'Room A-102',
      equipment: ['Basic Tool Kit', 'Testing Equipment'],
      supervisor: 'Mr. Jayasuriya',
      remarks: 'Materials need verification'
    },
    { 
      id: 'EX2024-008', 
      batchNo: 'BATCH-NT-008', 
      date: '2024-01-16', 
      time: '01:00 PM', 
      duration: '3 hours',
      center: 'Kandy Technical Center', 
      trade: 'Painter', 
      level: 'Level 2',
      examiner1: { id: 'EXR-014', name: 'Mr. Weerasinghe', status: 'confirmed' },
      examiner2: { id: 'EXR-015', name: 'Mrs. Fernando', status: 'confirmed' },
      students: { total: 12, present: 12, absent: 0 },
      status: 'completed',
      room: 'Room B-104',
      equipment: ['Paint Sprayer', 'Brushes', 'Ladders'],
      supervisor: 'Mr. Rathnayake',
      remarks: 'All students passed'
    },
  ];

  const trades = Array.from(new Set(exams.map(exam => exam.trade)));
  const centers = Array.from(new Set(exams.map(exam => exam.center)));
  
  const todayExams = exams.filter(exam => exam.date === selectedDate);
  const filteredExams = exams.filter(exam => {
    const matchesSearch = 
      exam.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.trade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.center.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || exam.status === filterStatus;
    const matchesTrade = filterTrade === 'all' || exam.trade === filterTrade;
    
    return matchesSearch && matchesStatus && matchesTrade;
  });

  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = filteredExams.slice(indexOfFirstExam, indexOfLastExam);
  const totalPages = Math.ceil(filteredExams.length / examsPerPage);

  const statusColors = {
    scheduled: { bg: 'bg-blue-100', text: 'text-blue-800', icon: <Clock className="w-3 h-3" /> },
    ongoing: { bg: 'bg-green-100', text: 'text-green-800', icon: <PlayCircle className="w-3 h-3" /> },
    completed: { bg: 'bg-gray-100', text: 'text-gray-800', icon: <CheckCircle className="w-3 h-3" /> },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle className="w-3 h-3" /> },
    pending_review: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <AlertCircle className="w-3 h-3" /> },
  };

  const getStatusLabel = (status: Exam['status']) => {
    const labels = {
      scheduled: 'Scheduled',
      ongoing: 'Ongoing',
      completed: 'Completed',
      cancelled: 'Cancelled',
      pending_review: 'Pending Review',
    };
    return labels[status];
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedExams(currentExams.map(exam => exam.id));
    } else {
      setSelectedExams([]);
    }
  };

  const handleSelectExam = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedExams([...selectedExams, id]);
    } else {
      setSelectedExams(selectedExams.filter(examId => examId !== id));
    }
  };

  const handleBulkAction = (action: string) => {
    alert(`Performing ${action} on ${selectedExams.length} exams`);
    setSelectedExams([]);
  };

  const stats = {
    total: exams.length,
    today: todayExams.length,
    thisWeek: exams.filter(e => {
      const examDate = new Date(e.date);
      const today = new Date(selectedDate);
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return examDate >= weekStart && examDate <= weekEnd;
    }).length,
    students: exams.reduce((sum, exam) => sum + exam.students.total, 0),
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Exam Management</h1>
            <p className="text-gray-600 mt-2">Schedule and manage National Trade Test examinations</p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              <Printer className="w-4 h-4 mr-2" />
              Print Schedule
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Schedule New Exam
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Exams', value: stats.total, icon: <Calendar className="w-5 h-5" />, color: 'bg-blue-100 text-blue-600' },
            { label: 'Today', value: stats.today, icon: <Clock className="w-5 h-5" />, color: 'bg-green-100 text-green-600' },
            { label: 'This Week', value: stats.thisWeek, icon: <FileText className="w-5 h-5" />, color: 'bg-purple-100 text-purple-600' },
            { label: 'Total Students', value: stats.students, icon: <Users className="w-5 h-5" />, color: 'bg-orange-100 text-orange-600' },
          ].map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedExams.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center mb-3 md:mb-0">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
              <span className="font-medium text-gray-800">
                {selectedExams.length} exam{selectedExams.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => handleBulkAction('approve')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                Approve Exams
              </button>
              <button 
                onClick={() => handleBulkAction('cancel')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Cancel Exams
              </button>
              <button 
                onClick={() => handleBulkAction('export')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
              >
                Export Schedule
              </button>
              <button 
                onClick={() => setSelectedExams([])}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Today's Schedule */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Today's Schedule ({selectedDate})</h2>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Schedule
            </button>
          </div>
        </div>

        {todayExams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todayExams.map((exam) => (
              <div key={exam.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{exam.trade}</h3>
                    <p className="text-sm text-gray-600">{exam.batchNo} • {exam.level}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center ${statusColors[exam.status].bg} ${statusColors[exam.status].text}`}>
                      {statusColors[exam.status].icon}
                      <span className="ml-1">{getStatusLabel(exam.status)}</span>
                    </span>
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                      checked={selectedExams.includes(exam.id)}
                      onChange={(e) => handleSelectExam(exam.id, e.target.checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <div className="flex-1">
                      <span>{exam.time}</span>
                      <span className="text-sm text-gray-500 ml-2">({exam.duration})</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{exam.center}</span>
                    <span className="text-sm text-gray-500 ml-2">• {exam.room}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <div className="flex-1">
                      <span>{exam.students.total} students</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-green-600 flex items-center">
                          <UserCheck className="w-3 h-3 mr-1" />
                          {exam.students.present} present
                        </span>
                        <span className="text-sm text-red-600 flex items-center">
                          <UserX className="w-3 h-3 mr-1" />
                          {exam.students.absent} absent
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Examiners:</p>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-800">{exam.examiner1.name}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          exam.examiner1.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {exam.examiner1.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-800">{exam.examiner2.name}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          exam.examiner2.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {exam.examiner2.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                    <FileText className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No exams scheduled for today</h3>
            <p className="text-gray-600 mb-4">There are no trade tests scheduled for {selectedDate}</p>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Schedule New Exam
            </button>
          </div>
        )}
      </div>

      {/* All Exams */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-800">All Exams</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100 text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <FileText className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('calendar')}
                className={`p-2 rounded-lg ${viewMode === 'calendar' ? 'bg-gray-100 text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Calendar className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search exams..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="pending_review">Pending Review</option>
                </select>
              </div>
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
            </div>
          </div>
        </div>
      </div>

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
                      checked={selectedExams.length === currentExams.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trade & Level</th>
                  <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Center</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentExams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
                        checked={selectedExams.includes(exam.id)}
                        onChange={(e) => handleSelectExam(exam.id, e.target.checked)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{exam.batchNo}</div>
                      <div className="text-sm text-gray-500">ID: {exam.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{exam.trade}</div>
                      <div className="text-sm text-gray-500">{exam.level}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{exam.date}</div>
                      <div className="text-sm text-gray-500">{exam.time} ({exam.duration})</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{exam.center}</div>
                      <div className="text-sm text-gray-500">{exam.room}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{exam.students.total}</div>
                      <div className="text-xs text-gray-500">
                        <span className="text-green-600">{exam.students.present} present</span>
                        {' • '}
                        <span className="text-red-600">{exam.students.absent} absent</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center ${statusColors[exam.status].bg} ${statusColors[exam.status].text}`}>
                        {statusColors[exam.status].icon}
                        <span className="ml-1">{getStatusLabel(exam.status)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="p-1 text-blue-600 hover:text-blue-800">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-1 text-green-600 hover:text-green-800">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button className="p-1 text-red-600 hover:text-red-800">
                          <Trash2 className="w-5 h-5" />
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
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center mb-6">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Calendar View</h3>
          <p className="text-gray-600 mb-4">Interactive calendar view coming soon</p>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Switch to List View
          </button>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="text-sm text-gray-700 mb-4 md:mb-0">
          Showing <span className="font-medium">{indexOfFirstExam + 1}</span> to{' '}
          <span className="font-medium">
            {Math.min(indexOfLastExam, filteredExams.length)}
          </span> of{' '}
          <span className="font-medium">{filteredExams.length}</span> exams
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

      {/* Exam Summary */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Exam Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-blue-600">
              {exams.filter(e => e.status === 'scheduled').length}
            </p>
            <p className="text-sm text-gray-600">Scheduled</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-green-600">
              {exams.filter(e => e.status === 'ongoing').length}
            </p>
            <p className="text-sm text-gray-600">Ongoing</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-gray-600">
              {exams.filter(e => e.status === 'completed').length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-yellow-600">
              {exams.filter(e => e.examiner1.status === 'pending' || e.examiner2.status === 'pending').length}
            </p>
            <p className="text-sm text-gray-600">Pending Confirmations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NTTExamManagement;
