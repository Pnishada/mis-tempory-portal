import React, { useState } from 'react';
import {
  Search, Filter, Download, Eye, X, CheckCircle,
  ChevronLeft, ChevronRight, FileText, UserCircle,
  FileBox, ExternalLink, Award, Clock, CalendarDays,
  User, Phone, Mail, Home, MapPin, BookOpen,
  Copy, Check, FolderOpen
} from 'lucide-react';

interface StudentDocument {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'document' | 'other';
  size: string;
  uploadDate: string;
  url?: string;
  file?: File;
}

const NTTStudentPerformance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExamType, setFilterExamType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [copySuccess, setCopySuccess] = useState('');

  const itemsPerPage = 10;

  // Mock Data (Enhanced to match NTTStudentPage structure)
  const students = [
    {
      id: 1,
      nic: '200012345678',
      registerNo: 'NT2024-001',
      nameWithInitials: 'K. Perera',
      fullName: 'Kamal Perera',
      gender: 'male',
      citizenship: 'Sri Lankan',
      medium: 'sinhala',
      email: 'kamal@email.com',
      telephoneMobile: '0712345678',
      telephoneHome: '0112345678',
      contactAddress: '123 Main Street, Colombo',
      permanentAddress: '123 Main Street, Colombo',
      trade: 'Electrician',
      tradeCode: 'ELC-101',
      level: 'Level 4 - National Certificate',
      batchNo: 'BATCH-NT-001',
      center: 'Colombo Trade Center',
      enrolledDate: '2024-01-15',
      bankSlipNo: 'BS2024001',
      bankSlipDate: '2024-01-10',
      examType: 'slccl',
      grade: 'Distinction',
      slccl: 'pass',
      status: 'active',
      preAwarenessDate: '2024-01-05',
      preExaminer: 'John Smith',
      preAttendance: 'present',
      finalExamDate: '2024-03-15',
      examiner1: 'Dr. Rajapaksa',
      examiner2: 'Prof. Silva',
      finalAttendance: 'present',
      remarks: 'Excellent performance',
      finalReport: 'Passed with distinction',
      slcclResults: [
        { unit: 'Unit 1: Safety Practices', grade: 'Competent' },
        { unit: 'Unit 2: Circuit Design', grade: 'Competent' },
        { unit: 'Unit 3: Wiring', grade: 'Competent' },
        { unit: 'Unit 4: Troubleshooting', grade: 'Competent' }
      ],
      progress: 85,
      studentImage: null,
      documents: [
        { id: 'doc1', name: 'NIC_Copy.pdf', type: 'pdf', size: '2.5 MB', uploadDate: '2024-01-15' },
        { id: 'doc2', name: 'Birth_Certificate.jpg', type: 'image', size: '1.2 MB', uploadDate: '2024-01-15' },
      ]
    },
    {
      id: 2,
      nic: '902345678V',
      registerNo: 'NT2024-002',
      nameWithInitials: 'S. Fernando',
      fullName: 'Samantha Fernando',
      gender: 'female',
      citizenship: 'Sri Lankan',
      medium: 'english',
      email: 'samantha@email.com',
      telephoneMobile: '0776543210',
      telephoneHome: '0812345678',
      contactAddress: '456 Flower Road, Kandy',
      permanentAddress: '456 Flower Road, Kandy',
      trade: 'Beautician',
      tradeCode: 'BEA-201',
      level: 'Level 2 - Intermediate',
      batchNo: 'BATCH-NT-002',
      center: 'Kandy Technical Center',
      enrolledDate: '2024-01-20',
      bankSlipNo: 'BS2024002',
      bankSlipDate: '2024-01-12',
      examType: 'other',
      grade: 'Competent',
      slccl: 'fail',
      status: 'active',
      preAwarenessDate: '2024-01-08',
      preExaminer: 'Jane Doe',
      preAttendance: 'present',
      finalExamDate: '2024-03-20',
      examiner1: 'Dr. Perera',
      examiner2: 'Prof. Fernando',
      finalAttendance: 'present',
      remarks: 'Needs improvement in practical',
      finalReport: 'Failed - Retake required',
      slcclResults: [
        { unit: 'Unit 1: Theory', grade: 'Competent' },
        { unit: 'Unit 2: Practical', grade: 'Not Competent' }
      ],
      progress: 60,
      studentImage: null,
      documents: [
        { id: 'doc5', name: 'Application_Form.pdf', type: 'pdf', size: '1.5 MB', uploadDate: '2024-01-20' },
      ]
    },
    {
      id: 3,
      nic: '903456789V',
      registerNo: 'NT2024-003',
      nameWithInitials: 'R. Silva',
      fullName: 'Ravi Silva',
      gender: 'male',
      citizenship: 'Sri Lankan',
      medium: 'tamil',
      email: 'ravi@email.com',
      telephoneMobile: '0734567890',
      telephoneHome: '0912345678',
      contactAddress: '789 Beach Road, Galle',
      permanentAddress: '789 Beach Road, Galle',
      trade: 'Carpenter',
      tradeCode: 'CAR-301',
      level: 'Level 3 - Advanced',
      batchNo: 'BATCH-NT-003',
      center: 'Galle Skill Center',
      enrolledDate: '2024-01-25',
      bankSlipNo: 'BS2024003',
      bankSlipDate: '2024-01-15',
      examType: 'slccl',
      grade: 'Credit',
      slccl: 'referred',
      status: 'inactive',
      preAwarenessDate: '2024-01-10',
      preExaminer: 'Robert Brown',
      preAttendance: 'absent',
      finalExamDate: '2024-03-25',
      examiner1: 'Dr. Karunaratne',
      examiner2: 'Prof. Wijesinghe',
      finalAttendance: 'present',
      remarks: 'Good theoretical knowledge',
      finalReport: 'Referred for practical test',
      slcclResults: [
        { unit: 'Unit 1: Wood Selection', grade: 'Competent' },
        { unit: 'Unit 2: Cutting & Joining', grade: 'Not Competent' },
        { unit: 'Unit 3: Finishing', grade: 'Competent' }
      ],
      progress: 100,
      studentImage: null,
      documents: []
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterExamType === 'all' || student.examType === filterExamType;
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'pass': return 'bg-green-100 text-green-800';
      case 'fail': return 'bg-red-100 text-red-800';
      case 'referred': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExamTypeColor = (type: string) => {
    return type === 'slccl' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'image': return <FileText className="w-5 h-5 text-green-500" />; // Fallback to FileText if FileImage not imported or custom
      case 'document': return <FileText className="w-5 h-5 text-blue-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleCopyRegisterNo = (registerNo: string) => {
    navigator.clipboard.writeText(registerNo).then(() => {
      setCopySuccess(registerNo);
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  const handleViewDocuments = (student: any) => {
    // Placeholder for view documents action
    alert(`Viewing documents for ${student.fullName}`);
  };

  const renderStudentDetailsModal = () => {
    if (!selectedStudent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="p-3 sm:p-4 md:p-6 border-b flex-shrink-0 bg-gradient-to-r from-blue-50 to-green-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-white border-4 border-white shadow-sm overflow-hidden">
                  {selectedStudent.studentImage ? (
                    <img
                      src={selectedStudent.studentImage}
                      alt={selectedStudent.fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                      <UserCircle className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">{selectedStudent.fullName}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium rounded-full truncate">
                      {selectedStudent.registerNo}
                    </span>
                    <button
                      onClick={() => handleCopyRegisterNo(selectedStudent.registerNo)}
                      className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                      title="Copy Register No"
                    >
                      {copySuccess === selectedStudent.registerNo ? (
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </button>
                    <span className={`px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium rounded-full ${getStatusColor(selectedStudent.status)} truncate`}>
                      {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-3 sm:p-4">
                <div className="flex items-center">
                  <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg mr-2 sm:mr-3">
                    <FileBox className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Documents</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">
                      {(selectedStudent.documents || []).length}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleViewDocuments(selectedStudent);
                  }}
                  className="mt-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center"
                >
                  View Documents
                  <ExternalLink className="w-3 h-3 ml-1" />
                </button>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-3 sm:p-4">
                <div className="flex items-center">
                  <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg mr-2 sm:mr-3">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Result</p>
                    <p className={`text-lg sm:text-xl font-bold ${getResultColor(selectedStudent.slccl).split(' ')[1]}`}>
                      {selectedStudent.slccl ? selectedStudent.slccl.toUpperCase() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-3 sm:p-4">
                <div className="flex items-center">
                  <div className="p-1.5 sm:p-2 bg-yellow-100 rounded-lg mr-2 sm:mr-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Progress</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">{selectedStudent.progress}%</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-3 sm:p-4">
                <div className="flex items-center">
                  <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg mr-2 sm:mr-3">
                    <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Enrolled</p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">
                      {selectedStudent.enrolledDate ? new Date(selectedStudent.enrolledDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Left Column - Personal Details */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Personal Information Card */}
                <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Name with Initials</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">{selectedStudent.nameWithInitials}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Gender</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base capitalize">{selectedStudent.gender}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Citizenship</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">{selectedStudent.citizenship}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Medium</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base capitalize">{selectedStudent.medium}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information Card */}
                <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                    Contact Information
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-2 sm:mr-3" />
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-500">Email</label>
                        <p className="text-gray-900 text-sm sm:text-base break-all">{selectedStudent.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-2 sm:mr-3" />
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-500">Mobile</label>
                        <p className="text-gray-900 text-sm sm:text-base">{selectedStudent.telephoneMobile || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Home className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-2 sm:mr-3" />
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-500">Home Phone</label>
                        <p className="text-gray-900 text-sm sm:text-base">{selectedStudent.telephoneHome || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex items-start">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-2 sm:mr-3 mt-0.5" />
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-500">Contact Address</label>
                        <p className="text-gray-900 mt-1 text-sm sm:text-base">{selectedStudent.contactAddress || 'N/A'}</p>
                        <label className="text-xs sm:text-sm font-medium text-gray-500 mt-2 sm:mt-3">Permanent Address</label>
                        <p className="text-gray-900 mt-1 text-sm sm:text-base">{selectedStudent.permanentAddress || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Information Card */}
                <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-600" />
                    Course Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Trade</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">{selectedStudent.trade}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Trade Code</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">{selectedStudent.tradeCode || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Level</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">{selectedStudent.level}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Batch No</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">{selectedStudent.batchNo || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Testing Center</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">{selectedStudent.center || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Enrolled Date</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">
                        {selectedStudent.enrolledDate ? new Date(selectedStudent.enrolledDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                    Payment Summary
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Bank Slip No</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">{selectedStudent.bankSlipNo || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Payment Date</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">
                        {selectedStudent.bankSlipDate ? new Date(selectedStudent.bankSlipDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Payment Completed
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column - Exam & Pre-Awareness Details */}
              <div className="space-y-4 sm:space-y-6">
                {/* Pre-Awareness Card */}
                <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-orange-600" />
                    Pre-Awareness Details
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Date</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">
                        {selectedStudent.preAwarenessDate ? new Date(selectedStudent.preAwarenessDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Examiner</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">{selectedStudent.preExaminer || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Attendance</label>
                      <span className={`px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium rounded-full mt-1 inline-block ${selectedStudent.preAttendance === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {selectedStudent.preAttendance ? selectedStudent.preAttendance.charAt(0).toUpperCase() + selectedStudent.preAttendance.slice(1) : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Exam Results Card */}
                <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-600" />
                    Exam Results
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Exam Type</label>
                      <span className={`px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium rounded-full mt-1 inline-block ${selectedStudent.examType === 'slccl' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                        {selectedStudent.examType === 'slccl' ? 'SLCCL Result' : 'Other'}
                      </span>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Final Exam Date</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">
                        {selectedStudent.finalExamDate ? new Date(selectedStudent.finalExamDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    {selectedStudent.slccl && (
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-500">Overall Result</label>
                        <span className={`px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium rounded-full mt-1 inline-block ${getResultColor(selectedStudent.slccl)}`}>
                          {selectedStudent.slccl.toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Final Exam Results</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">
                        {selectedStudent.grade || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Examiners</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base">
                        {selectedStudent.examiner1 || 'N/A'} {selectedStudent.examiner2 ? `& ${selectedStudent.examiner2}` : ''}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-500">Final Attendance</label>
                      <p className="text-gray-900 mt-1 text-sm sm:text-base capitalize">{selectedStudent.finalAttendance || 'N/A'}</p>
                    </div>
                    {selectedStudent.slcclResults && selectedStudent.slcclResults.length > 0 && (
                      <div className="mt-4">
                        <label className="text-xs sm:text-sm font-medium text-gray-500 mb-2 block">Detailed Results</label>
                        <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                                {selectedStudent.examType !== 'slccl' && (
                                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                                )}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {selectedStudent.slcclResults.map((result: any, index: number) => (
                                <tr key={index}>
                                  <td className="px-3 py-2 text-sm text-gray-900">{result.unit}</td>
                                  {selectedStudent.examType !== 'slccl' && (
                                    <td className="px-3 py-2 text-sm text-gray-900">{result.grade}</td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {selectedStudent.remarks && (
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-500">Remarks</label>
                        <p className="text-gray-900 mt-1 text-sm sm:text-base italic">{selectedStudent.remarks}</p>
                      </div>
                    )}
                    {selectedStudent.finalReport && (
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-500">Final Report</label>
                        <p className="text-gray-900 mt-1 text-sm sm:text-base">{selectedStudent.finalReport}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Documents Preview Card */}
                <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <FileBox className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                    Documents Preview
                  </h3>
                  <div className="space-y-3">
                    {selectedStudent.documents && selectedStudent.documents.slice(0, 3).map((doc: StudentDocument) => (
                      <div key={doc.id} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className={`p-1.5 sm:p-2 rounded-lg ${doc.type === 'pdf' ? 'bg-red-50' :
                            doc.type === 'image' ? 'bg-green-50' : 'bg-blue-50'
                            }`}>
                            {getFileIcon(doc.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[100px] sm:max-w-[120px]">{doc.name}</p>
                            <p className="text-xs text-gray-500">{doc.size}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewDocuments(selectedStudent)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                          title="View Document"
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    ))}
                    {selectedStudent.documents && selectedStudent.documents.length > 3 && (
                      <div className="text-center">
                        <button
                          onClick={() => {
                            handleViewDocuments(selectedStudent);
                          }}
                          className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View all {selectedStudent.documents.length} documents →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t bg-gray-50 p-3 sm:p-4 md:p-6 flex-shrink-0">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
              <div className="text-xs sm:text-sm text-gray-600">
                Student ID: {selectedStudent.id} • Last updated: {new Date().toLocaleDateString()}
              </div>
              <div className="flex space-x-2 sm:space-x-3">
                <button
                  onClick={() => {
                    handleViewDocuments(selectedStudent);
                  }}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-150 text-xs sm:text-sm font-medium flex items-center"
                >
                  <FolderOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                  View Documents
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-150 text-xs sm:text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Student Performance Details</h1>
        <p className="text-gray-600 mt-2">View and verify individual student exam results and performance status.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by Name, NIC, or Reg No..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                value={filterExamType}
                onChange={(e) => setFilterExamType(e.target.value)}
              >
                <option value="all">All Exam Types</option>
                <option value="slccl">SLCCL</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Student List Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trade / Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Result</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 text-gray-400 bg-gray-100 rounded-full flex items-center justify-center font-bold overflow-hidden">
                        {student.studentImage ? (
                          <img src={student.studentImage} alt={student.fullName} className="h-full w-full object-cover" />
                        ) : (
                          student.fullName.charAt(0)
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.fullName}</div>
                        <div className="text-xs text-gray-500">{student.registerNo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.trade}</div>
                    <div className="text-xs text-gray-500">{student.batchNo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getExamTypeColor(student.examType)}`}>
                      {student.examType === 'slccl' ? 'SLCCL' : 'Other'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{student.grade || '-'}</div>
                    <div className="text-xs text-gray-500">Overall: {student.slccl}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(student.status)}`}>
                      {student.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-3"
                      title="View Details"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600" title="Download Report">
                      <FileText className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredStudents.length)}</span> of <span className="font-medium">{filteredStudents.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === i + 1
                      ? 'z-10 bg-green-50 border-green-500 text-green-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {renderStudentDetailsModal()}
    </div>
  );
};

export default NTTStudentPerformance;
