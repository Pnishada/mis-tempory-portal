import React, { useState, useRef } from 'react';
import {
  Search, Save, Upload, Download, Printer, Edit, User, AlertCircle,
  CheckCircle, Plus, X, Trash2, Filter, ChevronLeft, ChevronRight, Mail, Phone, MapPin,
  Users, Award, Clock, List, Loader2,
  UserCircle, FileText, Home, BookOpen,
  FileBox, File, CalendarDays,
  FileImage, FolderOpen, ExternalLink,
  Eye as EyeOpen, Copy, Check, FolderPlus
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

const NTTStudentPage: React.FC = () => {
  const [searchNIC, setSearchNIC] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [modalActiveTab, setModalActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentsInputRef = useRef<HTMLInputElement>(null);

  const [students, setStudents] = useState<any[]>([
    {
      id: 1,
      nic: '901234567V',
      registerNo: 'NT2024-001',
      nameWithInitials: 'K. Perera',
      fullName: 'Kamal Perera',
      citizenship: 'Sri Lankan',
      gender: 'male',
      contactAddress: '123 Main Street, Colombo',
      permanentAddress: '123 Main Street, Colombo',
      email: 'kamal@email.com',
      telephoneMobile: '0712345678',
      telephoneHome: '0112345678',
      medium: 'sinhala',
      bankSlipNo: 'BS2024001',
      bankSlipDate: '2024-01-10',
      trade: 'Electrician',
      tradeCode: 'ELC-101',
      level: 'Level 1 - Basic',
      batchNo: 'BATCH-NT-001',
      preAwarenessDate: '2024-01-05',
      preExaminer: 'John Smith',
      preAttendance: 'present',
      finalExamDate: '2024-03-15',
      center: 'Colombo Trade Center',
      examiner1: 'Dr. Rajapaksa',
      examiner2: 'Prof. Silva',
      grade: 'Distinction',
      examType: 'slccl',
      slccl: 'pass',
      slcclResults: [
        { unit: 'Unit 1: Safety Practices', grade: 'Competent' },
        { unit: 'Unit 2: Circuit Design', grade: 'Competent' },
        { unit: 'Unit 3: Wiring', grade: 'Competent' },
        { unit: 'Unit 4: Troubleshooting', grade: 'Competent' }
      ],
      finalAttendance: 'present',
      remarks: 'Excellent performance',
      finalReport: 'Passed with distinction',
      status: 'active',
      progress: 85,
      enrolledDate: '2024-01-15',
      studentImage: null,
      documents: [
        { id: 'doc1', name: 'ID_Card.pdf', type: 'pdf', size: '2.4 MB', uploadDate: '2024-01-15' },
        { id: 'doc2', name: 'Educational_Certificates.pdf', type: 'pdf', size: '3.1 MB', uploadDate: '2024-01-16' },
        { id: 'doc3', name: 'Bank_Slip.jpg', type: 'image', size: '1.2 MB', uploadDate: '2024-01-17' },
        { id: 'doc4', name: 'Medical_Report.pdf', type: 'pdf', size: '1.8 MB', uploadDate: '2024-01-18' },
      ]
    },
    {
      id: 2,
      nic: '902345678V',
      registerNo: 'NT2024-002',
      nameWithInitials: 'S. Fernando',
      fullName: 'Samantha Fernando',
      citizenship: 'Sri Lankan',
      gender: 'female',
      contactAddress: '456 Garden Road, Kandy',
      permanentAddress: '456 Garden Road, Kandy',
      email: 'samantha@email.com',
      telephoneMobile: '0723456789',
      telephoneHome: '0812345678',
      medium: 'english',
      bankSlipNo: 'BS2024002',
      bankSlipDate: '2024-01-12',
      trade: 'Beautician',
      tradeCode: 'BEA-201',
      level: 'Level 2 - Intermediate',
      batchNo: 'BATCH-NT-002',
      preAwarenessDate: '2024-01-08',
      preExaminer: 'Jane Doe',
      preAttendance: 'present',
      finalExamDate: '2024-03-20',
      center: 'Kandy Technical Center',
      examiner1: 'Dr. Perera',
      examiner2: 'Prof. Fernando',
      grade: 'Competent',
      slccl: 'fail',
      finalAttendance: 'present',
      remarks: 'Needs improvement in practical',
      finalReport: 'Failed - Retake required',
      status: 'active',
      examType: 'other',
      slcclResults: [
        { unit: 'Unit 1: Theory', grade: 'Competent' },
        { unit: 'Unit 2: Practical', grade: 'Not Competent' }
      ],
      progress: 60,
      enrolledDate: '2024-01-20',
      studentImage: null,
      documents: [
        { id: 'doc5', name: 'Application_Form.pdf', type: 'pdf', size: '1.5 MB', uploadDate: '2024-01-20' },
        { id: 'doc6', name: 'Photo.jpg', type: 'image', size: '0.8 MB', uploadDate: '2024-01-21' },
      ]
    },
    {
      id: 3,
      nic: '903456789V',
      registerNo: 'NT2024-003',
      nameWithInitials: 'R. Silva',
      fullName: 'Ravi Silva',
      citizenship: 'Sri Lankan',
      gender: 'male',
      contactAddress: '789 Beach Road, Galle',
      permanentAddress: '789 Beach Road, Galle',
      email: 'ravi@email.com',
      telephoneMobile: '0734567890',
      telephoneHome: '0912345678',
      medium: 'tamil',
      bankSlipNo: 'BS2024003',
      bankSlipDate: '2024-01-15',
      trade: 'Carpenter',
      tradeCode: 'CAR-301',
      level: 'Level 3 - Advanced',
      batchNo: 'BATCH-NT-003',
      preAwarenessDate: '2024-01-10',
      preExaminer: 'Robert Brown',
      preAttendance: 'absent',
      finalExamDate: '2024-03-25',
      center: 'Galle Skill Center',
      examiner1: 'Dr. Karunaratne',
      examiner2: 'Prof. Wijesinghe',
      grade: 'Credit',
      slccl: 'referred',
      finalAttendance: 'present',
      remarks: 'Good theoretical knowledge',
      finalReport: 'Referred for practical test',
      status: 'inactive',
      examType: 'slccl',
      slcclResults: [
        { unit: 'Unit 1: Wood Selection', grade: 'Competent' },
        { unit: 'Unit 2: Cutting & Joining', grade: 'Not Competent' },
        { unit: 'Unit 3: Finishing', grade: 'Competent' }
      ],
      progress: 100,
      enrolledDate: '2024-01-25',
      studentImage: null,
      documents: []
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrade, setSelectedTrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedDocuments, setUploadedDocuments] = useState<StudentDocument[]>([]);
  const [copySuccess, setCopySuccess] = useState<string>('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const EXAMINERS = [
    'Dr. Rajapaksa',
    'Prof. Silva',
    'Ms. Perera',
    'Mr. Fernando',
    'Dr. Gunawardena'
  ];
  const [newSlcclUnit, setNewSlcclUnit] = useState('');
  const [newSlcclGrade, setNewSlcclGrade] = useState('');


  // Add New Student Modal State
  const [newStudentData, setNewStudentData] = useState({
    // Personal Details
    nic: '',
    registerNo: '',
    nameWithInitials: '',
    fullName: '',
    citizenship: 'sri_lankan',
    gender: 'male',
    contactAddress: '',
    permanentAddress: '',
    email: '',
    telephoneMobile: '',
    telephoneHome: '',
    medium: 'sinhala',
    bankSlipNo: '',
    bankSlipDate: '',
    studentImage: null as File | null,

    // Course Details
    trade: '',
    tradeCode: '',
    level: '',
    batchNo: '',

    // Pre-Awareness
    preAwarenessDate: '',
    preExaminer: '',
    preAttendance: 'present',

    // Exam and Results
    finalExamDate: '',
    center: '',
    examiner1: '',
    examiner2: '',
    grade: '',
    slccl: 'pass',
    examType: 'other',
    slcclResults: [] as { unit: string; grade: string }[],
    finalAttendance: 'present',
    remarks: '',
    finalReport: '',

    // Status
    status: 'active',

    // Documents
    documents: [] as StudentDocument[]
  });

  const [modalErrors, setModalErrors] = useState<Record<string, string>>({});

  const trades = [
    'Electrician', 'Carpenter', 'Plumber', 'Welder', 'Mason',
    'Mechanic', 'Painter', 'Tailor', 'Beautician', 'Cook'
  ];

  const centers = [
    'Colombo Trade Center', 'Kandy Technical Center', 'Galle Skill Center',
    'Kurunegala Trade Center', 'Jaffna Technical Institute'
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'image': return <FileImage className="w-5 h-5 text-green-500" />;
      case 'document': return <File className="w-5 h-5 text-blue-500" />;
      default: return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getFileType = (fileName: string): 'pdf' | 'image' | 'document' | 'other' => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext || '')) return 'image';
    if (['doc', 'docx', 'txt', 'rtf'].includes(ext || '')) return 'document';
    return 'other';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewStudentData(prev => ({ ...prev, studentImage: file }));
      setUploadedFileName(file.name);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 0) {
      const newDocuments: StudentDocument[] = files.map(file => ({
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: getFileType(file.name),
        size: formatFileSize(file.size),
        uploadDate: new Date().toISOString().split('T')[0],
        file: file
      }));

      setUploadedDocuments(prev => [...prev, ...newDocuments]);
      setNewStudentData(prev => ({
        ...prev,
        documents: [...prev.documents, ...newDocuments]
      }));

      // Reset file input
      if (documentsInputRef.current) {
        documentsInputRef.current.value = '';
      }
    }
  };

  const handleRemoveDocument = (id: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== id));
    setNewStudentData(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== id)
    }));
  };

  const handleViewDocument = (document: StudentDocument) => {
    if (document.file) {
      // Create object URL for the file
      const url = URL.createObjectURL(document.file);
      window.open(url, '_blank');
    } else {
      alert(`Viewing document: ${document.name}`);
    }
  };

  const handleCopyRegisterNo = (registerNo: string) => {
    navigator.clipboard.writeText(registerNo).then(() => {
      setCopySuccess(registerNo);
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  const handleModalChange = (field: string, value: string | File | StudentDocument[]) => {
    setNewStudentData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field if it exists
    if (modalErrors[field]) {
      setModalErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSearch = () => {
    if (!searchNIC.trim()) {
      alert('Please enter NIC to search');
      return;
    }
    // Search in existing students
    const foundStudent = students.find(student =>
      student.nic.toLowerCase() === searchNIC.toLowerCase()
    );

    if (foundStudent) {
      setSearchTerm(foundStudent.fullName);
      alert(`Student found: ${foundStudent.fullName} (${foundStudent.registerNo})`);
    } else {
      alert('No student found with this NIC. Please add as new student.');
      handleOpenModal();
    }
  };

  const validateModalForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!newStudentData.nic) newErrors.nic = 'NIC is required';
    if (!newStudentData.registerNo) newErrors.registerNo = 'Register number is required';
    if (!newStudentData.nameWithInitials) newErrors.nameWithInitials = 'Name with initials is required';
    if (!newStudentData.fullName) newErrors.fullName = 'Full name is required';
    if (!newStudentData.email) newErrors.email = 'Email is required';
    if (!newStudentData.trade) newErrors.trade = 'Trade is required';

    // Email validation
    if (newStudentData.email && !/\S+@\S+\.\S+/.test(newStudentData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setModalErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simulate saving process with loading bar
  const simulateSaveProcess = () => {
    return new Promise<void>((resolve) => {
      setSaveProgress(0);
      setIsSaving(true);

      const interval = setInterval(() => {
        setSaveProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              resolve();
            }, 500);
            return 100;
          }
          return prev + 20;
        });
      }, 200);
    });
  };

  const handleModalSubmit = async () => {
    if (!validateModalForm()) {
      alert('Please fix the errors in the form');
      return;
    }

    try {
      // Show loading
      await simulateSaveProcess();

      // Create student image URL if image exists
      const studentImageUrl = previewImage;

      // Add student after loading completes
      const newStudent = {
        id: students.length + 1,
        ...newStudentData,
        studentImage: studentImageUrl,
        progress: 0,
        enrolledDate: new Date().toISOString().split('T')[0],
        // Ensure all fields are present
        citizenship: newStudentData.citizenship || 'Sri Lankan',
        telephoneHome: newStudentData.telephoneHome || '',
        tradeCode: newStudentData.tradeCode || '',
        batchNo: newStudentData.batchNo || '',
        preAwarenessDate: newStudentData.preAwarenessDate || '',
        preExaminer: newStudentData.preExaminer || '',
        preAttendance: newStudentData.preAttendance || 'present',
        examiner1: newStudentData.examiner1 || '',
        examiner2: newStudentData.examiner2 || '',
        grade: newStudentData.grade || '',
        finalReport: newStudentData.finalReport || '',
        bankSlipNo: newStudentData.bankSlipNo || '',
        bankSlipDate: newStudentData.bankSlipDate || '',
        slcclResults: newStudentData.slcclResults || [],
        documents: uploadedDocuments
      };

      setStudents(prev => [...prev, newStudent]);

      // Reset states
      setSaveProgress(0);
      setIsSaving(false);
      setPreviewImage(null);
      setUploadedFileName('');
      setUploadedDocuments([]);

      alert('New student added successfully!');
      handleCloseModal();
      setSearchNIC(newStudentData.nic);
    } catch (error) {
      console.error('Error saving student:', error);
      setIsSaving(false);
      alert('Failed to save student. Please try again.');
    }
  };

  const handleOpenModal = () => {
    setShowAddModal(true);
    setModalActiveTab('personal');
    // Reset modal data
    setNewStudentData({
      nic: '',
      registerNo: '',
      nameWithInitials: '',
      fullName: '',
      citizenship: 'sri_lankan',
      gender: 'male',
      contactAddress: '',
      permanentAddress: '',
      email: '',
      telephoneMobile: '',
      telephoneHome: '',
      medium: 'sinhala',
      bankSlipNo: '',
      bankSlipDate: '',
      studentImage: null,
      trade: '',
      tradeCode: '',
      level: '',
      batchNo: '',
      preAwarenessDate: '',
      preExaminer: '',
      preAttendance: 'present',
      finalExamDate: '',
      center: '',
      examiner1: '',
      examiner2: '',
      grade: '',
      slccl: 'pass',
      finalAttendance: 'present',
      remarks: '',
      finalReport: '',
      status: 'active',
      slcclResults: [],
      examType: 'other',
      documents: []
    });
    setModalErrors({});
    setIsSaving(false);
    setSaveProgress(0);
    setPreviewImage(null);
    setUploadedFileName('');
    setUploadedDocuments([]);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setModalErrors({});
    setIsSaving(false);
    setSaveProgress(0);
    setPreviewImage(null);
    setUploadedFileName('');
    setUploadedDocuments([]);
  };

  const handleViewFullDetails = (student: any) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const handleViewDocuments = (student: any) => {
    setSelectedStudent(student);
    setShowDocumentsModal(true);
  };

  const handleDeleteStudent = (id: number) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(student => student.id !== id));
    }
  };

  const handleEditStudent = (student: any) => {
    // Load student data into modal for editing
    setNewStudentData({
      nic: student.nic || '',
      registerNo: student.registerNo || '',
      nameWithInitials: student.nameWithInitials || '',
      fullName: student.fullName || '',
      citizenship: student.citizenship || 'sri_lankan',
      gender: student.gender || 'male',
      contactAddress: student.contactAddress || '',
      permanentAddress: student.permanentAddress || '',
      email: student.email || '',
      telephoneMobile: student.telephoneMobile || '',
      telephoneHome: student.telephoneHome || '',
      medium: student.medium || 'sinhala',
      bankSlipNo: student.bankSlipNo || '',
      bankSlipDate: student.bankSlipDate || '',
      studentImage: null,
      trade: student.trade || '',
      tradeCode: student.tradeCode || '',
      level: student.level || '',
      batchNo: student.batchNo || '',
      preAwarenessDate: student.preAwarenessDate || '',
      preExaminer: student.preExaminer || '',
      preAttendance: student.preAttendance || 'present',
      finalExamDate: student.finalExamDate || '',
      center: student.center || '',
      examiner1: student.examiner1 || '',
      examiner2: student.examiner2 || '',
      grade: student.grade || '',
      slccl: student.slccl || 'pass',
      finalAttendance: student.finalAttendance || 'present',
      remarks: student.remarks || '',
      finalReport: student.finalReport || '',
      status: student.status || 'active',
      examType: student.examType || 'other',
      slcclResults: student.slcclResults || [],
      documents: student.documents || []
    });

    // Set preview image if exists
    if (student.studentImage) {
      setPreviewImage(student.studentImage);
      setUploadedFileName('student-image.jpg');
    }

    // Set uploaded documents
    if (student.documents) {
      setUploadedDocuments(student.documents);
    }

    setShowAddModal(true);
    setModalActiveTab('personal');
  };

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = searchTerm === '' ||
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.nic.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTrade = selectedTrade === 'all' || student.trade === selectedTrade;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;

    return matchesSearch && matchesTrade && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

  const renderDocumentsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Documents Upload</h3>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Upload Documents (PDF, Images, Documents)
        </label>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-10 pb-6 px-4 text-center">
                <Upload className="w-12 h-12 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-700 font-medium">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, JPG, PNG, DOC, DOCX (MAX. 10MB per file)
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Multiple files allowed
                </p>
              </div>
              <input
                ref={documentsInputRef}
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt"
                onChange={handleDocumentsUpload}
              />
            </label>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => documentsInputRef.current?.click()}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-150 flex items-center shadow-sm hover:shadow mx-auto"
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              Select Files
            </button>
          </div>
        </div>
      </div>

      {/* Uploaded Documents List */}
      {uploadedDocuments.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="text-md font-medium text-gray-800 mb-4 flex items-center">
            <FileBox className="w-5 h-5 mr-2 text-blue-600" />
            Uploaded Documents ({uploadedDocuments.length})
          </h4>

          <div className="space-y-3">
            {uploadedDocuments.map((doc) => (
              <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-lg ${doc.type === 'pdf' ? 'bg-red-50' :
                      doc.type === 'image' ? 'bg-green-50' :
                        doc.type === 'document' ? 'bg-blue-50' : 'bg-gray-50'
                      }`}>
                      {getFileIcon(doc.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${doc.type === 'pdf' ? 'bg-red-100 text-red-800' :
                          doc.type === 'image' ? 'bg-green-100 text-green-800' :
                            doc.type === 'document' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                          {doc.type.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">{doc.size}</span>
                        <span className="text-xs text-gray-500">{doc.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end sm:justify-start space-x-2">
                    <button
                      type="button"
                      onClick={() => handleViewDocument(doc)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Document"
                    >
                      <EyeOpen className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveDocument(doc.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove Document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Document Requirements */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <h4 className="text-md font-medium text-gray-800 mb-2 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
          Recommended Documents
        </h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-center">
            <Check className="w-4 h-4 mr-2 text-green-500" />
            National ID Card / Passport (PDF/Image)
          </li>
          <li className="flex items-center">
            <Check className="w-4 h-4 mr-2 text-green-500" />
            Educational Certificates (PDF)
          </li>
          <li className="flex items-center">
            <Check className="w-4 h-4 mr-2 text-green-500" />
            Bank Payment Slip (PDF/Image)
          </li>
          <li className="flex items-center">
            <Check className="w-4 h-4 mr-2 text-green-500" />
            Medical Report (PDF)
          </li>
          <li className="flex items-center">
            <Check className="w-4 h-4 mr-2 text-green-500" />
            Application Form (PDF/DOC)
          </li>
        </ul>
      </div>
    </div>
  );

  const addSlcclResult = () => {
    // For 'other' type (nvq), both unit and grade/competency are required
    // For 'slccl' type, only unit is required
    const isOther = newStudentData.examType === 'other';

    if (newSlcclUnit && (!isOther || newSlcclGrade)) {
      setNewStudentData(prev => ({
        ...prev,
        slcclResults: [...(prev.slcclResults || []), { unit: newSlcclUnit, grade: newSlcclGrade || '-' }]
      }));
      setNewSlcclUnit('');
      setNewSlcclGrade('');
    }
  };

  const removeSlcclResult = (index: number) => {
    setNewStudentData(prev => ({
      ...prev,
      slcclResults: (prev.slcclResults || []).filter((_, i) => i !== index)
    }));
  };



  const renderModalSection = () => {
    switch (modalActiveTab) {
      case 'personal':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Details</h3>

            {/* Student Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Student Photo
              </label>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex-shrink-0">
                  <div className="h-32 w-32 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Student preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserCircle className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-150 flex items-center shadow-sm hover:shadow w-full sm:w-auto"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    {uploadedFileName && (
                      <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                        <File className="w-4 h-4 mr-2" />
                        <span className="truncate flex-1">{uploadedFileName}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewImage(null);
                            setUploadedFileName('');
                            setNewStudentData(prev => ({ ...prev, studentImage: null }));
                          }}
                          className="ml-2 text-red-500 hover:text-red-700 flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">
                      Supported formats: JPG, PNG, JPEG. Max size: 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  NIC <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm ${modalErrors.nic ? 'border-red-500' : 'border-gray-300'
                    }`}
                  value={newStudentData.nic}
                  onChange={(e) => handleModalChange('nic', e.target.value)}
                  placeholder="901234567V"
                />
                {modalErrors.nic && (
                  <p className="mt-1 text-xs text-red-600">{modalErrors.nic}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Register No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm ${modalErrors.registerNo ? 'border-red-500' : 'border-gray-300'
                    }`}
                  value={newStudentData.registerNo}
                  onChange={(e) => handleModalChange('registerNo', e.target.value)}
                  placeholder="NT2024-001"
                />
                {modalErrors.registerNo && (
                  <p className="mt-1 text-xs text-red-600">{modalErrors.registerNo}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name with Initials <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm ${modalErrors.nameWithInitials ? 'border-red-500' : 'border-gray-300'
                    }`}
                  value={newStudentData.nameWithInitials}
                  onChange={(e) => handleModalChange('nameWithInitials', e.target.value)}
                  placeholder="K. Perera"
                />
                {modalErrors.nameWithInitials && (
                  <p className="mt-1 text-xs text-red-600">{modalErrors.nameWithInitials}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm ${modalErrors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  value={newStudentData.fullName}
                  onChange={(e) => handleModalChange('fullName', e.target.value)}
                  placeholder="Kamal Perera"
                />
                {modalErrors.fullName && (
                  <p className="mt-1 text-xs text-red-600">{modalErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Citizenship
                </label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={newStudentData.citizenship}
                  onChange={(e) => handleModalChange('citizenship', e.target.value)}
                >
                  <option value="sri_lankan">Sri Lankan</option>
                  <option value="foreign">Foreign</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="modal-gender"
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                      checked={newStudentData.gender === 'male'}
                      onChange={() => handleModalChange('gender', 'male')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="modal-gender"
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                      checked={newStudentData.gender === 'female'}
                      onChange={() => handleModalChange('gender', 'female')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Female</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medium
                </label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={newStudentData.medium}
                  onChange={(e) => handleModalChange('medium', e.target.value)}
                >
                  <option value="sinhala">Sinhala</option>
                  <option value="tamil">Tamil</option>
                  <option value="english">English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm ${modalErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  value={newStudentData.email}
                  onChange={(e) => handleModalChange('email', e.target.value)}
                  placeholder="student@email.com"
                />
                {modalErrors.email && (
                  <p className="mt-1 text-xs text-red-600">{modalErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telephone (Mobile)
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={newStudentData.telephoneMobile}
                  onChange={(e) => handleModalChange('telephoneMobile', e.target.value)}
                  placeholder="07XXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telephone (Home)
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={newStudentData.telephoneHome}
                  onChange={(e) => handleModalChange('telephoneHome', e.target.value)}
                  placeholder="0XXXXXXXXX"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Address
                </label>
                <textarea
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  rows={2}
                  value={newStudentData.contactAddress}
                  onChange={(e) => handleModalChange('contactAddress', e.target.value)}
                  placeholder="Current address"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Permanent Address
                </label>
                <textarea
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  rows={2}
                  value={newStudentData.permanentAddress}
                  onChange={(e) => handleModalChange('permanentAddress', e.target.value)}
                  placeholder="Permanent address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Slip No
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={newStudentData.bankSlipNo}
                  onChange={(e) => handleModalChange('bankSlipNo', e.target.value)}
                  placeholder="BS2024001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Slip Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={newStudentData.bankSlipDate}
                  onChange={(e) => handleModalChange('bankSlipDate', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'course':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Course Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trade <span className="text-red-500">*</span>
                </label>
                <select
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm ${modalErrors.trade ? 'border-red-500' : 'border-gray-300'
                    }`}
                  value={newStudentData.trade}
                  onChange={(e) => handleModalChange('trade', e.target.value)}
                >
                  <option value="">Select Trade</option>
                  {trades.map(trade => (
                    <option key={trade} value={trade}>{trade}</option>
                  ))}
                </select>
                {modalErrors.trade && (
                  <p className="mt-1 text-xs text-red-600">{modalErrors.trade}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trade Code
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={newStudentData.tradeCode}
                  onChange={(e) => handleModalChange('tradeCode', e.target.value)}
                  placeholder="ELC-101"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={newStudentData.level}
                  onChange={(e) => handleModalChange('level', e.target.value)}
                >
                  <option value="">Select Level</option>
                  <option value="Level 1 - Basic">Level 1 - Basic</option>
                  <option value="Level 2 - Intermediate">Level 2 - Intermediate</option>
                  <option value="Level 3 - Advanced">Level 3 - Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Batch No
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={newStudentData.batchNo}
                  onChange={(e) => handleModalChange('batchNo', e.target.value)}
                  placeholder="BATCH-NT-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testing Center
                </label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={newStudentData.center}
                  onChange={(e) => handleModalChange('center', e.target.value)}
                >
                  <option value="">Select Center</option>
                  {centers.map(center => (
                    <option key={center} value={center}>{center}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-md font-medium text-gray-700 mb-3">Pre-Awareness</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pre-Awareness Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    value={newStudentData.preAwarenessDate}
                    onChange={(e) => handleModalChange('preAwarenessDate', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Examiner
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    value={newStudentData.preExaminer}
                    onChange={(e) => handleModalChange('preExaminer', e.target.value)}
                    placeholder="Examiner name"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attendance
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="pre-attendance"
                        className="h-4 w-4 text-green-600 focus:ring-green-500"
                        checked={newStudentData.preAttendance === 'present'}
                        onChange={() => handleModalChange('preAttendance', 'present')}
                      />
                      <span className="ml-2 text-sm text-gray-700">Present</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="pre-attendance"
                        className="h-4 w-4 text-red-600 focus:ring-red-500"
                        checked={newStudentData.preAttendance === 'absent'}
                        onChange={() => handleModalChange('preAttendance', 'absent')}
                      />
                      <span className="ml-2 text-sm text-gray-700">Absent</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'exam':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Exam and Results</h3>

            {/* Exam Result Type Selector */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Exam Result Type
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="examType"
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                    checked={newStudentData.examType === 'slccl'}
                    onChange={() => handleModalChange('examType', 'slccl')}
                  />
                  <span className="ml-2 text-sm text-gray-700 font-medium">SLCCL Result</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="examType"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    checked={newStudentData.examType === 'other'}
                    onChange={() => handleModalChange('examType', 'other')}
                  />
                  <span className="ml-2 text-sm text-gray-700 font-medium">Other</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Final Exam Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={newStudentData.finalExamDate}
                  onChange={(e) => handleModalChange('finalExamDate', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Final Attendance
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="final-attendance"
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                      checked={newStudentData.finalAttendance === 'present'}
                      onChange={() => handleModalChange('finalAttendance', 'present')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Present</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="final-attendance"
                      className="h-4 w-4 text-red-600 focus:ring-red-500"
                      checked={newStudentData.finalAttendance === 'absent'}
                      onChange={() => handleModalChange('finalAttendance', 'absent')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Absent</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Examiner 1
                </label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={newStudentData.examiner1}
                  onChange={(e) => handleModalChange('examiner1', e.target.value)}
                >
                  <option value="">Select Examiner</option>
                  {EXAMINERS.map((examiner) => (
                    <option key={examiner} value={examiner}>
                      {examiner}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Examiner 2
                </label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={newStudentData.examiner2}
                  onChange={(e) => handleModalChange('examiner2', e.target.value)}
                >
                  <option value="">Select Examiner</option>
                  {EXAMINERS.map((examiner) => (
                    <option key={examiner} value={examiner}>
                      {examiner}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {newStudentData.examType === 'other' ? (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3 text-sm">Unit Results</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      value={newSlcclUnit}
                      onChange={(e) => setNewSlcclUnit(e.target.value)}
                    >
                      <option value="">Select Unit</option>
                      <option value="Unit 1">Unit 1 - Workplace Safety </option>
                      <option value="Unit 2">Unit 2 - Tools Handling</option>
                      <option value="Unit 3">Unit 3 - Basic Operations</option>
                      <option value="Unit 4">Unit 4 - Advanced Operations</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <select
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      value={newSlcclGrade}
                      onChange={(e) => setNewSlcclGrade(e.target.value)}
                    >
                      <option value="">Select Competency</option>
                      <option value="Competent">Competent</option>
                      <option value="Not Competent">Not Competent</option>
                    </select>
                    <button
                      type="button"
                      onClick={addSlcclResult}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Results Table for Other */}
                {newStudentData.slcclResults && newStudentData.slcclResults.length > 0 ? (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Result</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {newStudentData.slcclResults.map((res, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-800">{res.unit}</td>
                            <td className="px-4 py-2 text-sm">
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${res.grade === 'Competent'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}>
                                {res.grade}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-right">
                              <button
                                type="button"
                                onClick={() => removeSlcclResult(idx)}
                                className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic text-center py-2 mb-4">No units added yet.</p>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Final Exam Results
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    value={newStudentData.grade}
                    onChange={(e) => handleModalChange('grade', e.target.value)}
                    placeholder="Enter final results..."
                  />
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-3 text-sm">SLCCL Unit Results</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div className="flex space-x-2 sm:col-span-2">
                    <select
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      value={newSlcclUnit}
                      onChange={(e) => setNewSlcclUnit(e.target.value)}
                    >
                      <option value="">Select Unit</option>
                      <option value="Unit 1">Unit 1 - Workplace Safety </option>
                      <option value="Unit 2">Unit 2 - Tools Handling</option>
                      <option value="Unit 3">Unit 3 - Basic Operations</option>
                      <option value="Unit 4">Unit 4 - Advanced Operations</option>
                      <option value="SLCCL">SLCCL</option>
                    </select>
                    <button
                      type="button"
                      onClick={addSlcclResult}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Results Table for SLCCL (Unit Only) */}
                {newStudentData.slcclResults && newStudentData.slcclResults.length > 0 ? (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                          <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {newStudentData.slcclResults.map((res, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="px-4 py-2 text-sm text-gray-800">{res.unit}</td>
                            <td className="px-4 py-2 text-right">
                              <button
                                type="button"
                                onClick={() => removeSlcclResult(idx)}
                                className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic text-center py-2 mb-4">No units added yet.</p>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Final Exam Results
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    value={newStudentData.grade}
                    onChange={(e) => handleModalChange('grade', e.target.value)}
                    placeholder="Enter final results..."
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Overall Result
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="modal-slccl"
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                      checked={newStudentData.slccl === 'pass'}
                      onChange={() => handleModalChange('slccl', 'pass')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Pass</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="modal-slccl"
                      className="h-4 w-4 text-red-600 focus:ring-red-500"
                      checked={newStudentData.slccl === 'fail'}
                      onChange={() => handleModalChange('slccl', 'fail')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Fail</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="modal-slccl"
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500"
                      checked={newStudentData.slccl === 'referred'}
                      onChange={() => handleModalChange('slccl', 'referred')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Referred</span>
                  </label>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Final Report
                </label>
                <textarea
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  rows={2}
                  value={newStudentData.finalReport}
                  onChange={(e) => handleModalChange('finalReport', e.target.value)}
                  placeholder="Final assessment report..."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <textarea
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  rows={3}
                  value={newStudentData.remarks}
                  onChange={(e) => handleModalChange('remarks', e.target.value)}
                  placeholder="Additional comments..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  value={newStudentData.status}
                  onChange={(e) => handleModalChange('status', e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'documents':
        return renderDocumentsSection();

      default:
        return null;
    }
  };

  const renderStudentDocumentsModal = () => {
    if (!selectedStudent) return null;

    const studentDocs = selectedStudent.documents || [];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="p-3 sm:p-4 md:p-6 border-b flex-shrink-0 bg-gradient-to-r from-blue-50 to-green-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white border-4 border-white shadow-sm overflow-hidden">
                  {selectedStudent.studentImage ? (
                    <img
                      src={selectedStudent.studentImage}
                      alt={selectedStudent.fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                      <UserCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">{selectedStudent.fullName}</h2>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full truncate">
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
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(selectedStudent.status)} truncate`}>
                      {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDocumentsModal(false)}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </button>
            </div>
            <div className="mt-3">
              <p className="text-gray-600 text-xs sm:text-sm">
                Documents: <span className="font-semibold text-gray-800">{studentDocs.length} files</span>
              </p>
            </div>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
            {studentDocs.length > 0 ? (
              <div className="space-y-4">
                {/* Documents Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Total Documents</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{studentDocs.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg mr-3">
                        <FileImage className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">PDF Files</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">
                          {studentDocs.filter(d => d.type === 'pdf').length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg mr-3">
                        <File className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600">Images</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">
                          {studentDocs.filter(d => d.type === 'image').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents List */}
                <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <FolderOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                    Student Documents
                  </h3>
                  <div className="space-y-3">
                    {studentDocs.map((doc: StudentDocument) => (
                      <div key={doc.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-sm transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 sm:p-3 rounded-lg ${doc.type === 'pdf' ? 'bg-red-50' :
                              doc.type === 'image' ? 'bg-green-50' :
                                doc.type === 'document' ? 'bg-blue-50' : 'bg-gray-50'
                              }`}>
                              {getFileIcon(doc.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 mt-1 sm:mt-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${doc.type === 'pdf' ? 'bg-red-100 text-red-800' :
                                  doc.type === 'image' ? 'bg-green-100 text-green-800' :
                                    doc.type === 'document' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                  }`}>
                                  {doc.type.toUpperCase()}
                                </span>
                                <span className="text-xs text-gray-500">{doc.size}</span>
                                <span className="text-xs text-gray-500">{doc.uploadDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-end sm:justify-start space-x-2">
                            <button
                              onClick={() => handleViewDocument(doc)}
                              className="px-2 py-1.5 sm:px-3 sm:py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-150 flex items-center shadow-sm hover:shadow text-xs sm:text-sm w-full sm:w-auto justify-center"
                            >
                              <EyeOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                              View
                            </button>
                            <button
                              onClick={() => window.open('#', '_blank')}
                              className="px-2 py-1.5 sm:px-3 sm:py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 flex items-center text-xs sm:text-sm w-full sm:w-auto justify-center"
                              title="Download"
                            >
                              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upload New Documents */}
                <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" />
                    Upload Additional Documents
                  </h3>
                  <div className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-xl p-4 sm:p-6 md:p-8 bg-gray-50">
                    <Upload className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-3 sm:mb-4 text-gray-400" />
                    <p className="mb-2 text-xs sm:text-sm text-gray-700 font-medium text-center">
                      Drag and drop files here, or click to select files
                    </p>
                    <p className="text-xs text-gray-500 mb-3 sm:mb-4 text-center">
                      PDF, JPG, PNG, DOC, DOCX (MAX. 10MB per file)
                    </p>
                    <button
                      onClick={() => documentsInputRef.current?.click()}
                      className="px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-150 flex items-center shadow-sm hover:shadow text-sm"
                    >
                      <FolderPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      Select Files
                    </button>
                    <input
                      ref={documentsInputRef}
                      type="file"
                      className="hidden"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 sm:py-8 md:py-12">
                <div className="flex flex-col items-center">
                  <FileBox className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gray-400 mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                  <p className="text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
                    This student has no uploaded documents yet. You can upload documents using the button below.
                  </p>
                  <button
                    onClick={() => documentsInputRef.current?.click()}
                    className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-150 flex items-center shadow-sm hover:shadow text-sm sm:text-base"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Documents
                  </button>
                  <input
                    ref={documentsInputRef}
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx,.txt"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="border-t bg-gray-50 p-3 sm:p-4 md:p-6 flex-shrink-0">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
              <div className="text-xs sm:text-sm text-gray-600">
                Last updated: {new Date().toLocaleDateString()}
              </div>
              <div className="flex space-x-2 sm:space-x-3">
                <button
                  onClick={() => setShowDocumentsModal(false)}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-xs sm:text-sm font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowDocumentsModal(false);
                    setShowAddModal(true);
                    handleEditStudent(selectedStudent);
                  }}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-150 text-xs sm:text-sm font-medium flex items-center"
                >
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Manage Documents
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
                onClick={() => setShowDetailsModal(false)}
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
                    setShowDetailsModal(false);
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

                {/* Payment Information Card */}
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
                          onClick={() => handleViewDocument(doc)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
                          title="View Document"
                        >
                          <EyeOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    ))}
                    {selectedStudent.documents && selectedStudent.documents.length > 3 && (
                      <div className="text-center">
                        <button
                          onClick={() => {
                            setShowDetailsModal(false);
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
                    setShowDetailsModal(false);
                    handleViewDocuments(selectedStudent);
                  }}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-150 text-xs sm:text-sm font-medium flex items-center"
                >
                  <FolderOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                  View Documents
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleEditStudent(selectedStudent);
                  }}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-150 text-xs sm:text-sm font-medium flex items-center"
                >
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                  Edit Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderListView = () => (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] sm:min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Info</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Course Details</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Info</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentStudents.map((student) => (
            <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-3 py-4">
                <div className="flex items-center">
                  <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-blue-100 overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                    {student.studentImage ? (
                      <img
                        src={student.studentImage}
                        alt={student.fullName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{student.fullName}</div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[100px] sm:max-w-none">{student.registerNo}</div>
                      <button
                        onClick={() => handleCopyRegisterNo(student.registerNo)}
                        className="p-0.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors flex-shrink-0"
                        title="Copy Register No"
                      >
                        {copySuccess === student.registerNo ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center mt-1">
                      <Mail className="w-3 h-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500 truncate max-w-[120px] sm:max-w-[150px]">{student.email}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-3 py-4 hidden md:table-cell">
                <div className="text-sm text-gray-900">{student.trade}</div>
                <div className="text-sm text-gray-500">{student.level}</div>
                <div className="flex items-center mt-1">
                  <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500 truncate max-w-[100px] lg:max-w-[120px]">{student.center || 'No center'}</span>
                </div>
              </td>
              <td className="px-3 py-4">
                <div className="text-sm text-gray-900">
                  {student.finalExamDate ? new Date(student.finalExamDate).toLocaleDateString() : 'Not scheduled'}
                </div>
                <div className="mt-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getResultColor(student.slccl)}`}>
                    {student.slccl ? student.slccl.toUpperCase() : 'N/A'}
                  </span>
                </div>
              </td>
              <td className="px-3 py-4 hidden sm:table-cell">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                  {student.status.toUpperCase()}
                </span>
              </td>
              <td className="px-3 py-4">
                <div className="flex flex-nowrap gap-1">
                  <button
                    onClick={() => handleViewFullDetails(student)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                    title="View Full Details"
                  >
                    <EyeOpen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleViewDocuments(student)}
                    className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-150"
                    title="View Documents"
                  >
                    <FolderOpen className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditStudent(student)}
                    className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-150"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-3 sm:p-4 md:p-6 border-b flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Add New Student</h2>
                  <p className="text-gray-600 mt-1 text-xs sm:text-sm">Fill in the student details below</p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isSaving}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Tabs */}
            <div className="border-b border-gray-200 flex-shrink-0">
              <nav className="-mb-px flex space-x-2 sm:space-x-4 px-3 sm:px-4 md:px-6 overflow-x-auto">
                {[
                  { id: 'personal', label: 'Personal' },
                  { id: 'course', label: 'Course' },
                  { id: 'exam', label: 'Exam & Results' },
                  { id: 'documents', label: 'Documents' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => !isSaving && setModalActiveTab(tab.id)}
                    disabled={isSaving}
                    className={`py-3 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${modalActiveTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {tab.label}
                    {tab.id === 'documents' && uploadedDocuments.length > 0 && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                        {uploadedDocuments.length}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Loading Bar */}
            {isSaving && (
              <div className="bg-blue-50 border-b border-blue-200 flex-shrink-0">
                <div className="p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm font-medium text-blue-700 flex items-center">
                      <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 animate-spin" />
                      Saving student data...
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-blue-700">{saveProgress}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-1.5 sm:h-2">
                    <div
                      className="bg-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${saveProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
              {isSaving ? (
                <div className="flex flex-col items-center justify-center h-full py-8 sm:py-12">
                  <div className="relative">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-600 animate-spin" />
                    </div>
                  </div>
                  <h3 className="mt-4 sm:mt-6 text-base sm:text-lg font-medium text-gray-900">Saving Student Data</h3>
                  <p className="mt-2 text-gray-600 text-center max-w-md text-xs sm:text-sm">
                    Please wait while we save the student information. This may take a few moments.
                  </p>
                  <div className="mt-4 sm:mt-6 w-full max-w-xs">
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{saveProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                      <div
                        className="bg-green-600 h-2 sm:h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${saveProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                renderModalSection()
              )}
            </div>

            {/* Modal Footer - Buttons */}
            <div className="border-t bg-gray-50 p-3 sm:p-4 md:p-6 flex-shrink-0">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                {/* Error message */}
                <div className="text-xs sm:text-sm text-gray-600">
                  {Object.keys(modalErrors).length > 0 && !isSaving && (
                    <div className="flex items-center text-red-600">
                      <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                      <span>{Object.keys(modalErrors).length} errors need to be fixed</span>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
                  {/* Cancel button - always visible */}
                  <button
                    onClick={handleCloseModal}
                    disabled={isSaving}
                    className="px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-[70px] sm:min-w-[80px] flex-1 sm:flex-none"
                  >
                    Cancel
                  </button>

                  {/* Previous button - visible except on first tab */}
                  {modalActiveTab !== 'personal' && !isSaving && (
                    <button
                      onClick={() => {
                        const tabs = ['personal', 'course', 'exam', 'documents'];
                        const currentIndex = tabs.indexOf(modalActiveTab);
                        if (currentIndex > 0) {
                          setModalActiveTab(tabs[currentIndex - 1]);
                        }
                      }}
                      disabled={isSaving}
                      className="px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center min-w-[90px] sm:min-w-[100px] justify-center flex-1 sm:flex-none"
                    >
                      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Previous
                    </button>
                  )}

                  {/* Next button - visible except on last tab */}
                  {modalActiveTab !== 'documents' && !isSaving ? (
                    <button
                      onClick={() => {
                        const tabs = ['personal', 'course', 'exam', 'documents'];
                        const currentIndex = tabs.indexOf(modalActiveTab);
                        if (currentIndex < tabs.length - 1) {
                          setModalActiveTab(tabs[currentIndex + 1]);
                        }
                      }}
                      disabled={isSaving}
                      className="px-3 py-2 sm:px-4 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center min-w-[90px] sm:min-w-[100px] justify-center flex-1 sm:flex-none"
                    >
                      Next
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    </button>
                  ) : (
                    /* Save button - only on last tab and when not saving */
                    !isSaving && (
                      <button
                        onClick={handleModalSubmit}
                        disabled={isSaving || Object.keys(modalErrors).length > 0}
                        className="px-3 py-2 sm:px-4 sm:py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-150 text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center min-w-[90px] sm:min-w-[100px] justify-center flex-1 sm:flex-none"
                      >
                        <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                        Save Student
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {showDetailsModal && renderStudentDetailsModal()}

      {/* Student Documents Modal */}
      {showDocumentsModal && renderStudentDocumentsModal()}

      {/* Header */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Student Management</h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">Manage student records, documents and exam results</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 flex items-center shadow-sm text-xs sm:text-sm"
            >
              <Printer className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={() => alert('Export functionality')}
              className="px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 flex items-center shadow-sm text-xs sm:text-sm"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={handleOpenModal}
              className="px-3 py-2 sm:px-4 sm:px-6 sm:py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-150 flex items-center shadow-sm hover:shadow text-xs sm:text-sm"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
              <span className="hidden sm:inline">Add Student</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          {[
            {
              title: 'Total Students',
              value: students.length,
              icon: Users,
              bgColor: 'bg-blue-100',
              iconColor: 'text-blue-600'
            },
            {
              title: 'Passed',
              value: students.filter(s => s.slccl === 'pass').length,
              icon: Award,
              bgColor: 'bg-green-100',
              iconColor: 'text-green-600'
            },
            {
              title: 'Total Documents',
              value: students.reduce((acc, student) => acc + (student.documents || []).length, 0),
              icon: FileBox,
              bgColor: 'bg-purple-100',
              iconColor: 'text-purple-600'
            },
            {
              title: 'Active Students',
              value: students.filter(s => s.status === 'active').length,
              icon: Clock,
              bgColor: 'bg-yellow-100',
              iconColor: 'text-yellow-600'
            },
          ].map((stat, index) => (
            <div key={index} className="bg-white border rounded-xl p-3 sm:p-4 md:p-5 shadow-sm">
              <div className="flex items-center">
                <div className={`p-2 sm:p-3 ${stat.bgColor} rounded-xl mr-3 sm:mr-4`}>
                  <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">{stat.title}</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Students Display Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-4 sm:mb-6 md:mb-8">
        {/* Table Header */}
        <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">Students</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredStudents.length)} of {filteredStudents.length} students
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">View:</span>
              <div className="flex items-center text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 py-1.5 rounded-lg">
                <List className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                List View
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters Toggle */}
        <div className="sm:hidden border-b border-gray-200">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <div className="flex items-center">
              <Filter className="w-4 h-4 mr-2 text-gray-500" />
              Filters {selectedTrade !== 'all' || selectedStatus !== 'all' ? `(${[selectedTrade !== 'all' && 'Trade', selectedStatus !== 'all' && 'Status'].filter(Boolean).length})` : ''}
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${showMobileFilters ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Search and Filters Section */}
        <div className={`${showMobileFilters ? 'block' : 'hidden'} sm:block p-3 sm:p-4 md:p-6 border-b border-gray-200 bg-gray-50`}>
          {/* Quick Search Card */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
            <div className="flex items-center mb-3 sm:mb-4">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2 sm:mr-3" />
              <h4 className="text-sm sm:text-md font-semibold text-gray-800">Quick Search</h4>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                    placeholder="Search by NIC, name, or register number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSearchNIC(searchTerm)}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-150 flex items-center shadow-sm hover:shadow text-xs sm:text-sm flex-1 sm:flex-none justify-center"
                >
                  <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                  <span className="hidden sm:inline">Search</span>
                </button>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSearchNIC('');
                    setSelectedTrade('all');
                    setSelectedStatus('all');
                    setShowMobileFilters(false);
                  }}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 flex items-center shadow-sm text-xs sm:text-sm flex-1 sm:flex-none justify-center"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filters Card */}
          <div className="bg-white border rounded-xl p-3 sm:p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2 sm:mr-3" />
                <h4 className="text-sm sm:text-md font-semibold text-gray-800">Filters</h4>
              </div>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="sm:hidden p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Trade
                </label>
                <select
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                  value={selectedTrade}
                  onChange={(e) => setSelectedTrade(e.target.value)}
                >
                  <option value="all">All Trades</option>
                  {trades.map(trade => (
                    <option key={trade} value={trade}>{trade}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Result
                </label>
                <select
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                  onChange={(e) => setSearchTerm(e.target.value)}
                >
                  <option value="">All Results</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
                  <option value="referred">Referred</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Documents
                </label>
                <select
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                  onChange={(e) => {
                    if (e.target.value === 'has_docs') {
                      setSearchTerm('has_documents');
                    } else if (e.target.value === 'no_docs') {
                      setSearchTerm('no_documents');
                    }
                  }}
                >
                  <option value="">All Documents</option>
                  <option value="has_docs">Has Documents</option>
                  <option value="no_docs">No Documents</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Students Data */}
        <div className="p-3 sm:p-4 md:p-6">
          {currentStudents.length > 0 ? (
            renderListView()
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="flex flex-col items-center">
                <User className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No students found</h3>
                <p className="text-gray-500 mb-4 sm:mb-6 max-w-md mx-auto text-sm">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={handleOpenModal}
                  className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-150 flex items-center shadow-sm hover:shadow text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Student
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredStudents.length > 0 && (
          <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-xs sm:text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg flex items-center transition-colors text-xs sm:text-sm ${currentPage === 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex space-x-0.5 sm:space-x-1">
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage <= 2) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 1) {
                      pageNum = totalPages - 2 + i;
                    } else {
                      pageNum = currentPage - 1 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm ${currentPage === pageNum
                          ? 'bg-green-600 text-white border-green-600'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg flex items-center transition-colors text-xs sm:text-sm ${currentPage === totalPages
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-0.5 sm:ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NTTStudentPage;