import React, { useState, useRef } from 'react';
import {
  Search, Save, Upload, Edit, User, AlertCircle,
  Plus, X, Trash2, ChevronRight, Mail, Phone,
  Users, Loader2,
  UserCircle, FileText, Home, BookOpen,
  FileBox, File, CalendarDays,
  FileImage, ExternalLink,
  Eye as EyeOpen, Copy, Check, FolderPlus,
  Layers, GraduationCap, ChevronDown, Building, Briefcase,
  Download as DownloadIcon, FileX
} from 'lucide-react';

interface StudentDocument {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'document' | 'other';
  size: string;
  uploadDate: string;
  url?: string;
  file?: File;
  blobUrl?: string; // For temporary blob URLs
}

interface Module {
  id: string;
  moduleName: string;
  unitCode: string;
  type: 'slccl' | 'other';
  grades: string[];
  trade?: string;
  createdAt: string;
  status: 'active' | 'inactive';
}

// Auto-generate grades helper function
const autoGenerateGrades = (selectedModuleIds: string[], allModules: Module[]) => {
  const selectedModules = allModules.filter(module => 
    selectedModuleIds.includes(module.id)
  );
  
  const allGrades = new Set<string>();
  selectedModules.forEach(module => {
    module.grades.forEach((grade: string) => {
      if (grade !== 'All') {
        allGrades.add(grade);
      }
    });
  });
  
  const sortedGrades = Array.from(allGrades).sort((a, b) => {
    const order = ['Grade 3', 'Grade 2', 'Grade 1'];
    return order.indexOf(a) - order.indexOf(b);
  });
  
  return sortedGrades.length > 0 ? sortedGrades[0] : 'Grade 1';
};

// Grade calculator based on marks
const calculateGradeFromMarks = (marks: number, moduleType: 'slccl' | 'other'): string => {
  if (moduleType === 'slccl') {
    if (marks >= 75) return 'Distinction';
    if (marks >= 65) return 'Credit';
    if (marks >= 40) return 'Pass';
    return 'Fail';
  } else {
    // For other modules
    if (marks >= 75) return 'Distinction';
    if (marks >= 65) return 'Competent';
    return 'Not Competent';
  }
};

const NTTStudentPage: React.FC = () => {
  const [searchNIC, setSearchNIC] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentsInputRef = useRef<HTMLInputElement>(null);
  const [expandedTrades, setExpandedTrades] = useState<{[key: string]: boolean}>({});
  const [viewingDocument, setViewingDocument] = useState<StudentDocument | null>(null);
  const [downloadingDocId, setDownloadingDocId] = useState<string | null>(null);

  // Mock modules data - updated to match modules page structure
  const mockModules: Module[] = [
    // SLCCL Modules
    { id: '1', moduleName: 'Basic Concept', unitCode: 'SLCCL-001', type: 'slccl', grades: ['All'], createdAt: '2024-01-15', status: 'active' },
    { id: '2', moduleName: 'Word Processing', unitCode: 'SLCCL-002', type: 'slccl', grades: ['All'], createdAt: '2024-01-15', status: 'active' },
    { id: '3', moduleName: 'Spread Sheet', unitCode: 'SLCCL-003', type: 'slccl', grades: ['All'], createdAt: '2024-01-15', status: 'active' },
    { id: '4', moduleName: 'Data Base', unitCode: 'SLCCL-004', type: 'slccl', grades: ['All'], createdAt: '2024-01-15', status: 'active' },
    { id: '5', moduleName: 'Presentation', unitCode: 'SLCCL-005', type: 'slccl', grades: ['All'], createdAt: '2024-01-15', status: 'active' },
    { id: '6', moduleName: 'Internet Email', unitCode: 'SLCCL-006', type: 'slccl', grades: ['All'], createdAt: '2024-01-15', status: 'active' },
    { id: '7', moduleName: 'Theory', unitCode: 'SLCCL-007', type: 'slccl', grades: ['All'], createdAt: '2024-01-15', status: 'active' },
    
    // Other Modules (previously vocational)
    { id: '8', moduleName: 'Special Qualities to be Inculcated and Attitudes', unitCode: 'U-01', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Fashionable Hair Dresser', createdAt: '2024-01-20', status: 'active' },
    { id: '9', moduleName: 'Gent\'s Haircut and Styling', unitCode: 'U-02', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Fashionable Hair Dresser', createdAt: '2024-01-20', status: 'active' },
    { id: '10', moduleName: 'Moustache and Beard Cut with Fashion stylist', unitCode: 'U-03', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Fashionable Hair Dresser', createdAt: '2024-01-20', status: 'active' },
    { id: '11', moduleName: 'Health and safety', unitCode: 'U-01', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Hair Color Technician', createdAt: '2024-01-22', status: 'active' },
    { id: '12', moduleName: 'Hair theory and Color Product Knowledge', unitCode: 'U-02', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Hair Color Technician', createdAt: '2024-01-22', status: 'active' },
    { id: '13', moduleName: 'Tattoo Hygiene and Safety', unitCode: 'U-01', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Tattoo Artist', createdAt: '2024-01-25', status: 'active' },
    { id: '14', moduleName: 'Identifying Tattoo Equipment and Tools', unitCode: 'U-02', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Tattoo Artist', createdAt: '2024-01-25', status: 'active' },
  ];

  const [modules] = useState<Module[]>(mockModules);

  // Updated students data with more complete information
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
      trade: 'Fashionable Hair Dresser',
      tradeCode: 'FHD-101',
      level: 'Grade 3',
      batchNo: 'BATCH-NT-001',
      preAwarenessDate: '2024-01-05',
      preExaminer: 'John Smith',
      preAttendance: 'present',
      finalExamDate: '2024-03-15',
      center: 'Colombo Trade Center',
      examiner1: 'Dr. Rajapaksa',
      examiner2: 'Prof. Silva',
      grade: 'Distinction',
      finalMarks: 85,
      examType: 'other',
      slccl: 'pass',
      slcclResults: [
        { unit: 'Unit 1: Safety Practices', marks: 85, grade: 'Distinction' },
        { unit: 'Unit 2: Circuit Design', marks: 78, grade: 'Credit' },
        { unit: 'Unit 3: Wiring', marks: 92, grade: 'Distinction' },
        { unit: 'Unit 4: Troubleshooting', marks: 88, grade: 'Distinction' }
      ],
      finalAttendance: 'present',
      remarks: 'Excellent performance',
      finalReport: 'Passed with distinction',
      status: 'active',
      progress: 85,
      enrolledDate: '2024-01-15',
      studentImage: null,
      moduleType: 'other',
      selectedModules: [
        { id: '8', moduleName: 'Special Qualities to be Inculcated and Attitudes', unitCode: 'U-01', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Fashionable Hair Dresser' },
        { id: '9', moduleName: 'Gent\'s Haircut and Styling', unitCode: 'U-02', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Fashionable Hair Dresser' },
      ],
      documents: [
        { id: 'doc1', name: 'ID_Card.pdf', type: 'pdf', size: '2.4 MB', uploadDate: '2024-01-15' },
        { id: 'doc2', name: 'Educational_Certificates.pdf', type: 'pdf', size: '3.1 MB', uploadDate: '2024-01-16' },
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
      trade: 'Hair Color Technician',
      tradeCode: 'HCT-201',
      level: 'Grade 2',
      batchNo: 'BATCH-NT-002',
      preAwarenessDate: '2024-01-08',
      preExaminer: 'Jane Doe',
      preAttendance: 'present',
      finalExamDate: '2024-03-20',
      center: 'Kandy Technical Center',
      examiner1: 'Dr. Perera',
      examiner2: 'Prof. Fernando',
      grade: 'Competent',
      finalMarks: 68,
      slccl: 'fail',
      finalAttendance: 'present',
      remarks: 'Needs improvement in practical',
      finalReport: 'Failed - Retake required',
      status: 'active',
      examType: 'other',
      slcclResults: [
        { unit: 'Unit 1: Theory', marks: 45, grade: 'Pass' },
        { unit: 'Unit 2: Practical', marks: 35, grade: 'Fail' }
      ],
      progress: 60,
      enrolledDate: '2024-01-20',
      studentImage: null,
      moduleType: 'other',
      selectedModules: [
        { id: '11', moduleName: 'Health and safety', unitCode: 'U-01', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Hair Color Technician' },
        { id: '12', moduleName: 'Hair theory and Color Product Knowledge', unitCode: 'U-02', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Hair Color Technician' }
      ],
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
      trade: 'Tattoo Artist',
      tradeCode: 'TAT-301',
      level: 'Grade 3',
      batchNo: 'BATCH-NT-003',
      preAwarenessDate: '2024-01-10',
      preExaminer: 'Robert Brown',
      preAttendance: 'absent',
      finalExamDate: '2024-03-25',
      center: 'Galle Skill Center',
      examiner1: 'Dr. Karunaratne',
      examiner2: 'Prof. Wijesinghe',
      grade: 'Credit',
      finalMarks: 72,
      slccl: 'referred',
      finalAttendance: 'present',
      remarks: 'Good theoretical knowledge',
      finalReport: 'Referred for practical test',
      status: 'inactive',
      examType: 'other',
      slcclResults: [
        { unit: 'Unit 1: Wood Selection', marks: 80, grade: 'Distinction' },
        { unit: 'Unit 2: Cutting & Joining', marks: 38, grade: 'Fail' },
        { unit: 'Unit 3: Finishing', marks: 65, grade: 'Credit' }
      ],
      progress: 100,
      enrolledDate: '2024-01-25',
      studentImage: null,
      moduleType: 'other',
      selectedModules: [
        { id: '13', moduleName: 'Tattoo Hygiene and Safety', unitCode: 'U-01', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Tattoo Artist' },
        { id: '14', moduleName: 'Identifying Tattoo Equipment and Tools', unitCode: 'U-02', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Tattoo Artist' }
      ],
      documents: []
    },
    {
      id: 4,
      nic: '904567890V',
      registerNo: 'NT2024-004',
      nameWithInitials: 'M. Rajapaksa',
      fullName: 'Malith Rajapaksa',
      citizenship: 'Sri Lankan',
      gender: 'male',
      contactAddress: '321 Temple Road, Anuradhapura',
      permanentAddress: '321 Temple Road, Anuradhapura',
      email: 'malith@email.com',
      telephoneMobile: '0745678901',
      telephoneHome: '0251234567',
      medium: 'sinhala',
      bankSlipNo: 'BS2024004',
      bankSlipDate: '2024-01-18',
      trade: 'SLCCL',
      tradeCode: 'SLCCL-001',
      level: 'All',
      batchNo: 'BATCH-SLCCL-001',
      preAwarenessDate: '2024-01-12',
      preExaminer: 'Dr. Silva',
      preAttendance: 'present',
      finalExamDate: '2024-03-30',
      center: 'Colombo Trade Center',
      examiner1: 'Dr. Rajapaksa',
      examiner2: 'Prof. Perera',
      grade: 'Distinction',
      finalMarks: 92,
      slccl: 'pass',
      finalAttendance: 'present',
      remarks: 'Excellent performance in all units',
      finalReport: 'Passed with distinction',
      status: 'active',
      examType: 'slccl',
      slcclResults: [
        { unit: 'Unit 1: Basic Concept', marks: 95, grade: 'Distinction' },
        { unit: 'Unit 2: Word Processing', marks: 88, grade: 'Distinction' },
        { unit: 'Unit 3: Spread Sheet', marks: 92, grade: 'Distinction' },
        { unit: 'Unit 4: Data Base', marks: 85, grade: 'Distinction' },
        { unit: 'Unit 5: Presentation', marks: 90, grade: 'Distinction' },
        { unit: 'Unit 6: Internet Email', marks: 94, grade: 'Distinction' },
        { unit: 'Unit 7: Theory', marks: 91, grade: 'Distinction' }
      ],
      progress: 90,
      enrolledDate: '2024-01-18',
      studentImage: null,
      moduleType: 'slccl',
      selectedModules: mockModules.filter(m => m.type === 'slccl'),
      documents: [
        { id: 'doc7', name: 'ID_Card.pdf', type: 'pdf', size: '2.5 MB', uploadDate: '2024-01-18' },
      ]
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrade, setSelectedTrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedDocuments, setUploadedDocuments] = useState<StudentDocument[]>([]);
  const [copySuccess, setCopySuccess] = useState<string>('');

  const EXAMINERS = [
    'Dr. Rajapaksa',
    'Prof. Silva',
    'Ms. Perera',
    'Mr. Fernando',
    'Dr. Gunawardena'
  ];
  const [newSlcclUnit, setNewSlcclUnit] = useState('');
  const [newSlcclMarks, setNewSlcclMarks] = useState('');

  // Add New Student Modal State
  const [newStudentData, setNewStudentData] = useState({
    // Module Type Selection (at top)
    moduleType: 'other' as 'slccl' | 'other',
    
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

    // Course Details - Simplified
    batchNo: '',
    center: '',

    // Module Enrollment (only for other modules)
    selectedTrade: '',
    selectedGrade: '',
    selectedModuleIds: [] as string[],

    // Pre-Awareness
    preAwarenessDate: '',
    preExaminer: '',
    preAttendance: 'present',

    // Exam and Results
    finalExamDate: '',
    examiner1: '',
    examiner2: '',
    finalMarks: '',
    grade: '',
    slccl: 'pass',
    slcclResults: [] as { unit: string; marks: number; grade: string }[],
    finalAttendance: 'present',
    remarks: '',
    finalReport: '',

    // Status
    status: 'active',

    // Documents
    documents: [] as StudentDocument[]
  });

  const [modalErrors, setModalErrors] = useState<Record<string, string>>({});

  const centers = [
    'Colombo Trade Center', 
    'Kandy Technical Center', 
    'Galle Skill Center',
    'Kurunegala Trade Center', 
    'Jaffna Technical Institute'
  ];

  // Toggle trade expansion
  const toggleTradeExpansion = (trade: string) => {
    setExpandedTrades(prev => ({
      ...prev,
      [trade]: !prev[trade]
    }));
  };

  // Get unique trades from students
  const availableTrades = Array.from(
    new Set(
      students
        .filter(s => s.trade && s.trade !== 'SLCCL')
        .map(s => s.trade)
    )
  ).filter(Boolean);

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

  // Group students by trade (similar to modules page)
  const slcclStudents = filteredStudents.filter(s => s.moduleType === 'slccl' || s.trade === 'SLCCL');
  const otherStudents = filteredStudents.filter(s => s.moduleType === 'other' && s.trade !== 'SLCCL');
  
  // Group other students by trade
  const studentsByTrade: {[key: string]: any[]} = {};
  otherStudents.forEach(student => {
    if (student.trade) {
      if (!studentsByTrade[student.trade]) {
        studentsByTrade[student.trade] = [];
      }
      studentsByTrade[student.trade].push(student);
    }
  });

  // Get unique trades for filtering
  const allTrades = Array.from(new Set(students.filter(s => s.trade).map(s => s.trade)));

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

  // Enhanced document viewing function
  const handleViewDocument = async (document: StudentDocument) => {
    try {
      if (document.file) {
        // Create blob URL for viewing
        const blobUrl = URL.createObjectURL(document.file);
        
        // Store the blob URL in the document for cleanup later
        const updatedDocument = { ...document, blobUrl };
        
        // Open in new tab for PDFs and images
        if (document.type === 'pdf' || document.type === 'image') {
          window.open(blobUrl, '_blank');
        } else {
          // For other types, show a preview modal
          setViewingDocument(updatedDocument);
        }
      } else {
        // If no file object (from existing data), simulate viewing
        alert(`Viewing document: ${document.name}\n\nThis is a mock preview. In a real application, this would open the actual document.`);
      }
    } catch (error) {
      console.error('Error viewing document:', error);
      alert('Unable to open document. Please try again.');
    }
  };

  // Enhanced document download function
  const handleDownloadDocument = async (document: StudentDocument) => {
    try {
      setDownloadingDocId(document.id);
      
      if (document.file) {
        // Create blob URL for download
        const blobUrl = URL.createObjectURL(document.file);
        
        // Create a temporary anchor element
        const link = globalThis.document.createElement('a');
        link.href = blobUrl;
        link.download = document.name;
        globalThis.document.body.appendChild(link);
        link.click();
        globalThis.document.body.removeChild(link);
        
        // Clean up the blob URL after download
        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
        }, 100);
        
        // Show success message
        alert(`Document "${document.name}" downloaded successfully!`);
      } else {
        // If no file object (from existing data), simulate download
        const blob = new Blob(['Mock document content'], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = globalThis.document.createElement('a');
        link.href = url;
        link.download = document.name;
        globalThis.document.body.appendChild(link);
        link.click();
        globalThis.document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        alert(`Document "${document.name}" downloaded successfully (mock download)!`);
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Failed to download document. Please try again.');
    } finally {
      setDownloadingDocId(null);
    }
  };

  // Download all documents for a student
  const handleDownloadAllDocuments = async (student: any) => {
    if (!student.documents || student.documents.length === 0) {
      alert('No documents available for download.');
      return;
    }

    try {
      // Create a zip file or download individual files
      alert(`Preparing to download ${student.documents.length} documents...\n\nIn a real application, this would create a ZIP file or download multiple files.`);
      
      // For now, download the first document as an example
      if (student.documents[0]) {
        await handleDownloadDocument(student.documents[0]);
      }
    } catch (error) {
      console.error('Error downloading all documents:', error);
      alert('Failed to download documents. Please try again.');
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

  const validateModalForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!newStudentData.nic) newErrors.nic = 'NIC is required';
    if (!newStudentData.registerNo) newErrors.registerNo = 'Register number is required';
    if (!newStudentData.nameWithInitials) newErrors.nameWithInitials = 'Name with initials is required';
    if (!newStudentData.fullName) newErrors.fullName = 'Full name is required';
    if (!newStudentData.email) newErrors.email = 'Email is required';

    // Email validation
    if (newStudentData.email && !/\S+@\S+\.\S+/.test(newStudentData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Module-related validations for other students
    if (newStudentData.moduleType === 'other') {
      if (!newStudentData.selectedTrade) {
        newErrors.selectedTrade = 'Trade is required';
      }
      if (newStudentData.selectedModuleIds.length === 0) {
        newErrors.selectedModuleIds = 'At least one module must be selected';
      }
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

      // Get selected modules data
      const selectedModulesData = newStudentData.selectedModuleIds
        .map(id => modules.find(m => m.id === id))
        .filter(Boolean) as Module[];

      // Calculate final grade from marks if marks are provided (only for other modules)
      let finalGrade = newStudentData.grade;
      if (newStudentData.finalMarks && newStudentData.moduleType === 'other') {
        const marks = parseInt(newStudentData.finalMarks);
        if (!isNaN(marks)) {
          finalGrade = calculateGradeFromMarks(marks, newStudentData.moduleType);
        }
      }

      // Add student after loading completes
      const newStudent = {
        id: students.length + 1,
        ...newStudentData,
        selectedModules: selectedModulesData,
        studentImage: previewImage,
        progress: 0,
        enrolledDate: new Date().toISOString().split('T')[0],
        trade: newStudentData.moduleType === 'slccl' ? 'SLCCL' : newStudentData.selectedTrade,
        tradeCode: newStudentData.moduleType === 'slccl' ? 'SLCCL-001' : '',
        level: newStudentData.moduleType === 'slccl' ? 'All' : newStudentData.selectedGrade,
        grade: finalGrade,
        examType: newStudentData.moduleType,
        // Ensure all fields are present
        citizenship: newStudentData.citizenship || 'Sri Lankan',
        telephoneHome: newStudentData.telephoneHome || '',
        batchNo: newStudentData.batchNo || '',
        preAwarenessDate: newStudentData.preAwarenessDate || '',
        preExaminer: newStudentData.preExaminer || '',
        preAttendance: newStudentData.preAttendance || 'present',
        examiner1: newStudentData.examiner1 || '',
        examiner2: newStudentData.examiner2 || '',
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
    // Reset modal data
    setNewStudentData({
      moduleType: 'other',
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
      batchNo: '',
      center: '',
      selectedTrade: '',
      selectedGrade: '',
      selectedModuleIds: [],
      preAwarenessDate: '',
      preExaminer: '',
      preAttendance: 'present',
      finalExamDate: '',
      examiner1: '',
      examiner2: '',
      finalMarks: '',
      grade: '',
      slccl: 'pass',
      finalAttendance: 'present',
      remarks: '',
      finalReport: '',
      status: 'active',
      slcclResults: [],
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
      moduleType: student.moduleType || 'other',
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
      batchNo: student.batchNo || '',
      center: student.center || '',
      selectedTrade: student.trade || '',
      selectedGrade: student.level || '',
      selectedModuleIds: student.selectedModules?.map((m: any) => m.id) || [],
      preAwarenessDate: student.preAwarenessDate || '',
      preExaminer: student.preExaminer || '',
      preAttendance: student.preAttendance || 'present',
      finalExamDate: student.finalExamDate || '',
      examiner1: student.examiner1 || '',
      examiner2: student.examiner2 || '',
      finalMarks: student.finalMarks || '',
      grade: student.grade || '',
      slccl: student.slccl || 'pass',
      finalAttendance: student.finalAttendance || 'present',
      remarks: student.remarks || '',
      finalReport: student.finalReport || '',
      status: student.status || 'active',
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
  };

  // Handle module selection
  const handleModuleSelection = (moduleId: string, isChecked: boolean) => {
    const updatedModuleIds = isChecked
      ? [...newStudentData.selectedModuleIds, moduleId]
      : newStudentData.selectedModuleIds.filter(id => id !== moduleId);
    
    // Auto-generate grade based on selected modules
    const autoGeneratedGrade = autoGenerateGrades(updatedModuleIds, modules);
    
    setNewStudentData(prev => ({
      ...prev,
      selectedModuleIds: updatedModuleIds,
      selectedGrade: autoGeneratedGrade
    }));
  };

  const addSlcclResult = () => {
    if (newSlcclUnit && newSlcclMarks) {
      const marks = parseInt(newSlcclMarks);
      if (!isNaN(marks)) {
        const grade = calculateGradeFromMarks(marks, newStudentData.moduleType);
        setNewStudentData(prev => ({
          ...prev,
          slcclResults: [...(prev.slcclResults || []), { 
            unit: newSlcclUnit, 
            marks: marks, 
            grade: grade 
          }]
        }));
        setNewSlcclUnit('');
        setNewSlcclMarks('');
      }
    }
  };

  const removeSlcclResult = (index: number) => {
    setNewStudentData(prev => ({
      ...prev,
      slcclResults: (prev.slcclResults || []).filter((_, i) => i !== index)
    }));
  };

  const handleFinalMarksChange = (marks: string) => {
    const marksNum = parseInt(marks);
    if (!isNaN(marksNum)) {
      // Only calculate grade for other modules, not for SLCCL
      if (newStudentData.moduleType === 'other') {
        const grade = calculateGradeFromMarks(marksNum, newStudentData.moduleType);
        setNewStudentData(prev => ({
          ...prev,
          finalMarks: marks,
          grade: grade
        }));
      } else {
        setNewStudentData(prev => ({
          ...prev,
          finalMarks: marks
        }));
      }
    } else {
      setNewStudentData(prev => ({
        ...prev,
        finalMarks: marks,
        grade: ''
      }));
    }
  };

  // Render grade badges for other students
  const renderGradeBadges = (grades: string[]) => {
    if (grades.length === 1 && grades[0] === 'All') {
      return (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
          All Grades
        </span>
      );
    }
    
    return (
      <div className="flex flex-wrap gap-1">
        {grades.map((grade, index) => (
          <span 
            key={index} 
            className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
          >
            {grade}
          </span>
        ))}
      </div>
    );
  };

  // Enhanced document viewer modal
  const renderDocumentViewerModal = () => {
    if (!viewingDocument) return null;

    const closeViewer = () => {
      // Clean up blob URL if exists
      if (viewingDocument.blobUrl) {
        URL.revokeObjectURL(viewingDocument.blobUrl);
      }
      setViewingDocument(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="p-4 border-b flex-shrink-0 bg-gradient-to-r from-blue-50 to-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg mr-3 ${
                  viewingDocument.type === 'pdf' ? 'bg-red-100' :
                  viewingDocument.type === 'image' ? 'bg-green-100' :
                  viewingDocument.type === 'document' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {getFileIcon(viewingDocument.type)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{viewingDocument.name}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <FileText className="w-3 h-3 mr-1" />
                      {viewingDocument.type.toUpperCase()}
                    </span>
                    <span className="flex items-center">
                      <CalendarDays className="w-3 h-3 mr-1" />
                      {viewingDocument.uploadDate}
                    </span>
                    <span className="flex items-center">
                      <File className="w-3 h-3 mr-1" />
                      {viewingDocument.size}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDownloadDocument(viewingDocument)}
                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  title="Download"
                >
                  <DownloadIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={closeViewer}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Document Preview */}
          <div className="flex-1 overflow-auto p-4 bg-gray-50">
            <div className="bg-white border rounded-lg p-4 h-full flex items-center justify-center">
              {viewingDocument.type === 'pdf' ? (
                <div className="text-center">
                  <FileText className="w-24 h-24 text-red-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">PDF Document Preview</p>
                  <p className="text-sm text-gray-500">PDF files open in a new tab for better viewing</p>
                  <button
                    onClick={() => {
                      if (viewingDocument.blobUrl) {
                        window.open(viewingDocument.blobUrl, '_blank');
                      }
                    }}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in New Tab
                  </button>
                </div>
              ) : viewingDocument.type === 'image' ? (
                <div className="text-center">
                  <FileImage className="w-24 h-24 text-green-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Image Preview</p>
                  <p className="text-sm text-gray-500">Image files open in a new tab for better viewing</p>
                  <button
                    onClick={() => {
                      if (viewingDocument.blobUrl) {
                        window.open(viewingDocument.blobUrl, '_blank');
                      }
                    }}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in New Tab
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <File className="w-24 h-24 text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Document Preview</p>
                  <p className="text-sm text-gray-500 mb-4">Content preview for document files</p>
                  <div className="bg-gray-100 rounded-lg p-6 max-w-md mx-auto text-left">
                    <p className="font-medium text-gray-800 mb-2">Sample Document Content:</p>
                    <div className="text-sm text-gray-600 space-y-2">
                      <p>Student: {selectedStudent?.fullName || 'Unknown'}</p>
                      <p>Register No: {selectedStudent?.registerNo || 'N/A'}</p>
                      <p>Document Type: {viewingDocument.type}</p>
                      <p>Uploaded: {viewingDocument.uploadDate}</p>
                      <p className="mt-4 italic">This is a preview of the document content.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t bg-gray-50 p-4 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Use the download button to save this document to your device
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDownloadDocument(viewingDocument)}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-150 flex items-center"
                >
                  <DownloadIcon className="w-4 h-4 mr-2" />
                  Download
                </button>
                <button
                  onClick={closeViewer}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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

  // Render the Add Student Modal Content
  const renderAddStudentModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
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
                    <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:w-12 text-blue-600 animate-spin" />
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
              <div className="space-y-6">
                {/* Module Type Selection at the top */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Module Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setNewStudentData(prev => ({
                          ...prev,
                          moduleType: 'slccl',
                          selectedTrade: '',
                          selectedGrade: '',
                          selectedModuleIds: modules
                            .filter(m => m.type === 'slccl')
                            .map(m => m.id)
                        }));
                      }}
                      className={`p-3 border rounded-lg text-sm font-medium flex items-center justify-center ${
                        newStudentData.moduleType === 'slccl'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      SLCCL Modules
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNewStudentData(prev => ({
                          ...prev,
                          moduleType: 'other',
                          selectedModuleIds: []
                        }));
                      }}
                      className={`p-3 border rounded-lg text-sm font-medium flex items-center justify-center ${
                        newStudentData.moduleType === 'other'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <Layers className="w-4 h-4 mr-2" />
                      Other Modules
                    </button>
                  </div>
                </div>

                {/* Module Selection Section (Only for Other Modules) */}
                {newStudentData.moduleType === 'other' && (
                  <div className="bg-white border rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Module Selection</h3>
                    
                    {/* Trade Selection */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Trade <span className="text-red-500">*</span>
                      </label>
                      <select
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm ${
                          modalErrors.selectedTrade ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={newStudentData.selectedTrade}
                        onChange={(e) => {
                          const trade = e.target.value;
                          setNewStudentData(prev => ({
                            ...prev,
                            selectedTrade: trade,
                            selectedModuleIds: []
                          }));
                        }}
                      >
                        <option value="">Select Trade</option>
                        {availableTrades.map(trade => (
                          <option key={trade} value={trade}>{trade}</option>
                        ))}
                      </select>
                      {modalErrors.selectedTrade && (
                        <p className="mt-1 text-xs text-red-600">{modalErrors.selectedTrade}</p>
                      )}
                    </div>

                    {/* Module Selection */}
                    {newStudentData.selectedTrade && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Modules for {newStudentData.selectedTrade}
                          <span className="text-red-500"> *</span>
                        </label>
                        
                        <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                          {modules
                            .filter(m => m.type === 'other' && m.trade === newStudentData.selectedTrade)
                            .length > 0 ? (
                            <div className="space-y-3">
                              {modules
                                .filter(m => m.type === 'other' && m.trade === newStudentData.selectedTrade)
                                .map(module => (
                                  <div key={module.id} className="flex items-start p-3 bg-white rounded border border-gray-200">
                                    <input
                                      type="checkbox"
                                      id={`module-${module.id}`}
                                      checked={newStudentData.selectedModuleIds.includes(module.id)}
                                      onChange={(e) => handleModuleSelection(module.id, e.target.checked)}
                                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-0.5"
                                    />
                                    <div className="ml-3 flex-1">
                                      <label
                                        htmlFor={`module-${module.id}`}
                                        className="font-medium text-gray-900 cursor-pointer"
                                      >
                                        {module.moduleName}
                                      </label>
                                      <div className="text-sm text-gray-600 mt-1">
                                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mr-2">
                                          {module.unitCode}
                                        </span>
                                        {renderGradeBadges(module.grades)}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          ) : (
                            <div className="text-center py-4 text-gray-500">
                              No modules available for this trade
                            </div>
                          )}
                        </div>
                        
                        {modalErrors.selectedModuleIds && (
                          <p className="mt-1 text-xs text-red-600">{modalErrors.selectedModuleIds}</p>
                        )}
                        
                        {/* Auto-generated Grade Display */}
                        {newStudentData.selectedGrade && (
                          <div className="mt-4 p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center">
                              <GraduationCap className="w-4 h-4 text-green-600 mr-2" />
                              <div>
                                <p className="text-sm font-medium text-green-800">
                                  Auto-generated Grade: <span className="font-bold">{newStudentData.selectedGrade}</span>
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                  Based on {newStudentData.selectedModuleIds.length} selected modules
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Personal Details */}
                <div className="bg-white border rounded-lg p-4">
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
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm ${
                          modalErrors.nic ? 'border-red-500' : 'border-gray-300'
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
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm ${
                          modalErrors.registerNo ? 'border-red-500' : 'border-gray-300'
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
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm ${
                          modalErrors.nameWithInitials ? 'border-red-500' : 'border-gray-300'
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
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm ${
                          modalErrors.fullName ? 'border-red-500' : 'border-gray-300'
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
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm ${
                          modalErrors.email ? 'border-red-500' : 'border-gray-300'
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

                {/* Course Details - Simplified */}
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Course Details</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Batch No
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        value={newStudentData.batchNo}
                        onChange={(e) => handleModalChange('batchNo', e.target.value)}
                        placeholder={newStudentData.moduleType === 'slccl' ? 'BATCH-SLCCL-001' : 'BATCH-NT-001'}
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

                    {/* Pre-Awareness Section */}
                    <div className="pt-6 mt-6 border-t border-gray-200">
                      <h4 className="text-md font-medium text-gray-700 mb-3">Pre-Awareness Details</h4>
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
                </div>

                {/* Exam and Results */}
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Exam and Results</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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

                  {/* Final Exam Marks and Grade - Only for Other Modules */}
                  {newStudentData.moduleType === 'other' && (
                    <div className="mb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Final Exam Marks
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm pr-20"
                              value={newStudentData.finalMarks}
                              onChange={(e) => handleFinalMarksChange(e.target.value)}
                              placeholder="Enter marks (0-100)"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                              / 100
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Final Grade
                          </label>
                          <div className={`w-full px-3 py-2.5 border rounded-lg text-sm font-medium ${
                            newStudentData.grade === 'Distinction' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                            newStudentData.grade === 'Credit' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            newStudentData.grade === 'Pass' ? 'bg-green-100 text-green-800 border-green-200' :
                            newStudentData.grade === 'Competent' ? 'bg-green-100 text-green-800 border-green-200' :
                            newStudentData.grade === 'Not Competent' ? 'bg-red-100 text-red-800 border-red-200' :
                            newStudentData.grade === 'Fail' ? 'bg-red-100 text-red-800 border-red-200' :
                            'bg-gray-100 text-gray-800 border-gray-200'
                          }`}>
                            {newStudentData.grade || 'Grade will be auto-calculated'}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Unit-wise Results - For Both SLCCL and Other Modules */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Unit-wise Results
                    </label>
                    
                    {/* Add New Unit */}
                    <div className="mb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Unit name"
                          value={newSlcclUnit}
                          onChange={(e) => setNewSlcclUnit(e.target.value)}
                        />
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-16"
                            placeholder="Marks"
                            value={newSlcclMarks}
                            onChange={(e) => setNewSlcclMarks(e.target.value)}
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                            / 100
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={addSlcclResult}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Add Unit
                        </button>
                      </div>
                    </div>

                    {/* Results Table */}
                    {newStudentData.slcclResults && newStudentData.slcclResults.length > 0 ? (
                      <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Marks</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {newStudentData.slcclResults.map((res, idx) => (
                              <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-2 text-sm text-gray-800">{res.unit}</td>
                                <td className="px-4 py-2 text-sm text-gray-800">{res.marks}/100</td>
                                <td className="px-4 py-2 text-sm">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    res.grade === 'Distinction' ? 'bg-purple-100 text-purple-800' :
                                    res.grade === 'Credit' ? 'bg-blue-100 text-blue-800' :
                                    res.grade === 'Pass' ? 'bg-green-100 text-green-800' :
                                    res.grade === 'Competent' ? 'bg-green-100 text-green-800' :
                                    'bg-red-100 text-red-800'
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
                      <p className="text-sm text-gray-500 italic text-center py-4">No unit results added yet.</p>
                    )}
                  </div>

                  {/* Overall Result and Other Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Overall Result
                      </label>
                      <div className="flex space-x-4">
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
                  </div>
                </div>

                {/* Documents Upload */}
                <div className="bg-white border rounded-lg p-4">
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
                                  onClick={() => handleDownloadDocument(doc)}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Download Document"
                                >
                                  {downloadingDocId === doc.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <DownloadIcon className="w-4 h-4" />
                                  )}
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
                </div>
              </div>
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
                {/* Cancel button */}
                <button
                  onClick={handleCloseModal}
                  disabled={isSaving}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-[70px] sm:min-w-[80px] flex-1 sm:flex-none"
                >
                  Cancel
                </button>

                {/* Save button */}
                {!isSaving && (
                  <button
                    onClick={handleModalSubmit}
                    disabled={isSaving || Object.keys(modalErrors).length > 0}
                    className="px-3 py-2 sm:px-4 sm:py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-150 text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center min-w-[90px] sm:min-w-[100px] justify-center flex-1 sm:flex-none"
                  >
                    <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
                    Save Student
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced student documents modal
  const renderStudentDocumentsModal = () => {
    if (!selectedStudent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="p-6 border-b flex-shrink-0 bg-gradient-to-r from-blue-50 to-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Student Documents</h2>
                <div className="flex items-center mt-1">
                  <User className="w-4 h-4 text-gray-500 mr-2" />
                  <p className="text-gray-600">{selectedStudent.fullName} • {selectedStudent.registerNo}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDocumentsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Documents Summary */}
          <div className="p-6 border-b bg-gray-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{selectedStudent.documents?.length || 0}</div>
                <div className="text-sm text-gray-600">Total Documents</div>
              </div>
              <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {selectedStudent.documents?.filter((d: StudentDocument) => d.type === 'pdf').length || 0}
                </div>
                <div className="text-sm text-gray-600">PDF Files</div>
              </div>
              <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {selectedStudent.documents?.filter((d: StudentDocument) => d.type === 'image').length || 0}
                </div>
                <div className="text-sm text-gray-600">Images</div>
              </div>
              <div className="bg-white border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {selectedStudent.documents?.filter((d: StudentDocument) => d.type === 'document').length || 0}
                </div>
                <div className="text-sm text-gray-600">Documents</div>
              </div>
            </div>
          </div>

          {/* Documents List */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedStudent.documents && selectedStudent.documents.length > 0 ? (
              <div className="space-y-4">
                {/* Download All Button */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => handleDownloadAllDocuments(selectedStudent)}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-150 flex items-center"
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Download All Documents
                  </button>
                </div>

                {/* Documents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedStudent.documents.map((doc: StudentDocument) => (
                    <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <div className={`p-3 rounded-lg mr-4 ${
                          doc.type === 'pdf' ? 'bg-red-50' :
                          doc.type === 'image' ? 'bg-green-50' :
                          doc.type === 'document' ? 'bg-blue-50' : 'bg-gray-50'
                        }`}>
                          {getFileIcon(doc.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{doc.name}</h4>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              doc.type === 'pdf' ? 'bg-red-100 text-red-800' :
                              doc.type === 'image' ? 'bg-green-100 text-green-800' :
                              doc.type === 'document' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {doc.type.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-500">{doc.size}</span>
                            <span className="text-xs text-gray-500">{doc.uploadDate}</span>
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <button
                              onClick={() => handleViewDocument(doc)}
                              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                            >
                              <EyeOpen className="w-3 h-3 mr-1.5" />
                              View
                            </button>
                            <button
                              onClick={() => handleDownloadDocument(doc)}
                              disabled={downloadingDocId === doc.id}
                              className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center text-sm disabled:opacity-50"
                            >
                              {downloadingDocId === doc.id ? (
                                <>
                                  <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                                  Downloading...
                                </>
                              ) : (
                                <>
                                  <DownloadIcon className="w-3 h-3 mr-1.5" />
                                  Download
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${doc.name}"?`)) {
                                  // Remove document from student
                                  const updatedStudents = students.map(s => {
                                    if (s.id === selectedStudent.id) {
                                      return {
                                        ...s,
                                        documents: s.documents.filter((d: StudentDocument) => d.id !== doc.id)
                                      };
                                    }
                                    return s;
                                  });
                                  setStudents(updatedStudents);
                                  
                                  // Update selected student
                                  setSelectedStudent((prev: any) => ({
                                    ...prev,
                                    documents: prev.documents.filter((d: StudentDocument) => d.id !== doc.id)
                                  }));
                                }
                              }}
                              className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center text-sm"
                            >
                              <Trash2 className="w-3 h-3 mr-1.5" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents Found</h3>
                <p className="text-gray-500 mb-6">This student doesn't have any uploaded documents yet.</p>
                <button
                  onClick={() => {
                    setShowDocumentsModal(false);
                    handleEditStudent(selectedStudent);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-150 flex items-center mx-auto"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Documents
                </button>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="border-t bg-gray-50 p-6 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {selectedStudent.documents?.length || 0} document(s) • Click view to preview or download to save
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDocumentsModal(false)}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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

  // Render student details modal
  const renderStudentDetailsModal = () => {
    if (!selectedStudent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Modal Header */}
          <div className="p-6 border-b flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Student Details</h2>
                <p className="text-gray-600 mt-1">Complete information for {selectedStudent.fullName}</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Personal Info */}
              <div className="lg:col-span-1 space-y-6">
                {/* Student Photo */}
                <div className="bg-white border rounded-lg p-6">
                  <div className="flex flex-col items-center">
                    <div className="h-40 w-40 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4">
                      {selectedStudent.studentImage ? (
                        <img
                          src={selectedStudent.studentImage}
                          alt={selectedStudent.fullName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                          <User className="h-20 w-20 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedStudent.fullName}</h3>
                    <p className="text-gray-600">{selectedStudent.nameWithInitials}</p>
                    <div className="mt-4 flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedStudent.status === 'active' ? 'bg-green-100 text-green-800' :
                        selectedStudent.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {selectedStudent.status.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedStudent.slccl === 'pass' ? 'bg-green-100 text-green-800' :
                        selectedStudent.slccl === 'fail' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedStudent.slccl.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Contact Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Mail className="w-4 h-4 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{selectedStudent.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="w-4 h-4 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Mobile</p>
                        <p className="font-medium">{selectedStudent.telephoneMobile}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Home className="w-4 h-4 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium">{selectedStudent.contactAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-green-600" />
                    Course Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Trade</p>
                      <p className="font-medium">{selectedStudent.trade}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Grade Level</p>
                      <p className="font-medium">{selectedStudent.level}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Batch No</p>
                      <p className="font-medium">{selectedStudent.batchNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Center</p>
                      <p className="font-medium">{selectedStudent.center}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Columns - Detailed Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Details */}
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">NIC</p>
                      <p className="font-medium">{selectedStudent.nic}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Register No</p>
                      <p className="font-medium">{selectedStudent.registerNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Citizenship</p>
                      <p className="font-medium">{selectedStudent.citizenship}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Gender</p>
                      <p className="font-medium">{selectedStudent.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Medium</p>
                      <p className="font-medium">{selectedStudent.medium}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Enrolled Date</p>
                      <p className="font-medium">{selectedStudent.enrolledDate}</p>
                    </div>
                  </div>
                </div>

                {/* Exam Results */}
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Exam Results</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Final Exam Date</p>
                      <p className="font-medium">{selectedStudent.finalExamDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Final Attendance</p>
                      <p className="font-medium capitalize">{selectedStudent.finalAttendance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Examiner 1</p>
                      <p className="font-medium">{selectedStudent.examiner1}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Examiner 2</p>
                      <p className="font-medium">{selectedStudent.examiner2}</p>
                    </div>
                    
                    {/* Only show final grade for other modules, not for SLCCL */}
                    {selectedStudent.moduleType === 'other' && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600">Final Marks</p>
                          <p className="font-medium">{selectedStudent.finalMarks}/100</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Final Grade</p>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                            selectedStudent.grade === 'Distinction' ? 'bg-purple-100 text-purple-800' :
                            selectedStudent.grade === 'Credit' ? 'bg-blue-100 text-blue-800' :
                            selectedStudent.grade === 'Pass' || selectedStudent.grade === 'Competent' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {selectedStudent.grade}
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Unit-wise Results */}
                  {selectedStudent.slcclResults && selectedStudent.slcclResults.length > 0 && (
                    <div>
                      <h5 className="text-md font-semibold text-gray-900 mb-3">Unit-wise Results</h5>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Marks</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {selectedStudent.slcclResults.map((result: any, idx: number) => (
                              <tr key={idx} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-800">{result.unit}</td>
                                <td className="px-4 py-3 text-sm text-gray-800">{result.marks}/100</td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    result.grade === 'Distinction' ? 'bg-purple-100 text-purple-800' :
                                    result.grade === 'Credit' ? 'bg-blue-100 text-blue-800' :
                                    result.grade === 'Pass' ? 'bg-green-100 text-green-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {result.grade}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Pre-Awareness Date</p>
                      <p className="font-medium">{selectedStudent.preAwarenessDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pre-Examiner</p>
                      <p className="font-medium">{selectedStudent.preExaminer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Pre-Attendance</p>
                      <p className="font-medium capitalize">{selectedStudent.preAttendance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Bank Slip No</p>
                      <p className="font-medium">{selectedStudent.bankSlipNo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Bank Slip Date</p>
                      <p className="font-medium">{selectedStudent.bankSlipDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Progress</p>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${selectedStudent.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{selectedStudent.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Remarks */}
                <div className="bg-white border rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Remarks & Final Report</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Remarks</p>
                      <p className="text-gray-800">{selectedStudent.remarks}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Final Report</p>
                      <p className="text-gray-800">{selectedStudent.finalReport}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t bg-gray-50 p-6 flex-shrink-0">
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleEditStudent(selectedStudent)}
                className="px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Student
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleViewDocuments(selectedStudent)}
                  className="px-4 py-2.5 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                >
                  <EyeOpen className="w-4 h-4 mr-2" />
                  View Documents
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Render the list view
  const renderListView = () => (
    <div className="space-y-6">
      {/* SLCCL Students Section */}
      {slcclStudents.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-50 border-b px-4 py-3 md:px-6 md:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-900">SLCCL Students</h3>
                  <p className="text-xs text-blue-700">{slcclStudents.length} students</p>
                </div>
              </div>
              <div className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                All Grades
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Info</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Register No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enrolled Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {slcclStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                          {student.studentImage ? (
                            <img
                              src={student.studentImage}
                              alt={student.fullName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-900">{student.fullName}</div>
                          <div className="text-sm text-gray-500">{student.nic}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <span className="font-bold text-gray-900">{student.registerNo}</span>
                        <button
                          onClick={() => handleCopyRegisterNo(student.registerNo)}
                          className="ml-2 p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Copy Register No"
                        >
                          {copySuccess === student.registerNo ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-500">{student.telephoneMobile}</div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {student.enrolledDate}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(student.progress)}`}
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewFullDetails(student)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-center"
                          title="View Details"
                        >
                          <EyeOpen className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg border border-green-200 flex items-center justify-center"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 flex items-center justify-center"
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
        </div>
      )}

      {/* Other Students by Trade */}
      {Object.keys(studentsByTrade).map((trade) => (
        <div key={trade} className="border rounded-lg overflow-hidden">
          <div className="bg-green-50 border-b px-4 py-3 md:px-6 md:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => toggleTradeExpansion(trade)}
                  className="mr-2 text-green-600"
                >
                  {expandedTrades[trade] ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
                <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                  <Building className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-900">{trade}</h3>
                  <p className="text-xs text-green-700">{studentsByTrade[trade].length} students</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                  Other Students
                </span>
              </div>
            </div>
          </div>
          {expandedTrades[trade] && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Info</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Register No</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade Level</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Final Grade</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentsByTrade[trade].map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-green-100 overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                            {student.studentImage ? (
                              <img
                                src={student.studentImage}
                                alt={student.fullName}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center">
                                <User className="h-5 w-5 text-green-600" />
                              </div>
                            )}
                          </div>
                          <div className="ml-3">
                            <div className="font-medium text-gray-900">{student.fullName}</div>
                            <div className="text-sm text-gray-500">{student.nic}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <span className="font-bold text-gray-900">{student.registerNo}</span>
                          <button
                            onClick={() => handleCopyRegisterNo(student.registerNo)}
                            className="ml-2 p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Copy Register No"
                          >
                            {copySuccess === student.registerNo ? (
                              <Check className="w-3 h-3" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {renderGradeBadges([student.level])}
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-500">{student.telephoneMobile}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
                          student.grade === 'Distinction' ? 'bg-purple-100 text-purple-800' :
                          student.grade === 'Credit' ? 'bg-blue-100 text-blue-800' :
                          student.grade === 'Pass' || student.grade === 'Competent' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.grade}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewFullDetails(student)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-center"
                            title="View Details"
                          >
                            <EyeOpen className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditStudent(student)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg border border-green-200 flex items-center justify-center"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 flex items-center justify-center"
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
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4 md:p-6">
      {/* Document Viewer Modal */}
      {viewingDocument && renderDocumentViewerModal()}

      {/* Add Student Modal */}
      {showAddModal && renderAddStudentModal()}

      {/* Student Details Modal */}
      {showDetailsModal && renderStudentDetailsModal()}

      {/* Student Documents Modal */}
      {showDocumentsModal && renderStudentDocumentsModal()}

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Student Management</h1>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Manage SLCCL and Other Students by Trade</p>
          </div>
          <button
            onClick={handleOpenModal}
            className="mt-3 md:mt-0 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-150 flex items-center shadow-sm hover:shadow text-sm md:text-base"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Add New Student
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
          <div className="bg-white border rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-blue-100 rounded-lg md:rounded-xl mr-3 md:mr-4">
                <Users className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Total Students</p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-blue-100 rounded-lg md:rounded-xl mr-3 md:mr-4">
                <GraduationCap className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">SLCCL Students</p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                  {slcclStudents.length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-green-100 rounded-lg md:rounded-xl mr-3 md:mr-4">
                <Briefcase className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Other Students</p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                  {otherStudents.length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-purple-100 rounded-lg md:rounded-xl mr-3 md:mr-4">
                <Building className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Total Trades</p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                  {Object.keys(studentsByTrade).length + (slcclStudents.length > 0 ? 1 : 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Filters */}
        <div className="p-4 md:p-6 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  className="w-full pl-9 md:pl-10 pr-3 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  placeholder="Search students, register no, or NIC..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student Type</label>
              <select
                className="w-full px-3 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                value={selectedTrade === 'SLCCL' ? 'slccl' : selectedTrade === 'all' ? 'all' : 'other'}
                onChange={(e) => {
                  if (e.target.value === 'slccl') setSelectedTrade('SLCCL');
                  else if (e.target.value === 'all') setSelectedTrade('all');
                  else setSelectedTrade(selectedTrade);
                }}
              >
                <option value="all">All Types</option>
                <option value="slccl">SLCCL</option>
                <option value="other">Other Students</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
              <select
                className="w-full px-3 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                onChange={(e) => {
                  if (e.target.value !== 'all') {
                    setSearchTerm(e.target.value);
                  }
                }}
              >
                <option value="all">All Grades</option>
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="All">All Grades</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trade</label>
              <select
                className="w-full px-3 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                value={selectedTrade}
                onChange={(e) => setSelectedTrade(e.target.value)}
              >
                <option value="all">All Trades</option>
                {allTrades.map(trade => (
                  <option key={trade} value={trade}>{trade}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTrade('all');
                setSelectedStatus('all');
              }}
              className="px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-sm"
            >
              <X className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Students List */}
        <div className="p-4 md:p-6">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <User className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-3 md:mb-4" />
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">Try adjusting your search or filters</p>
              <button
                onClick={handleOpenModal}
                className="px-4 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-150 flex items-center mx-auto text-sm md:text-base"
              >
                <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Add New Student
              </button>
            </div>
          ) : (
            renderListView()
          )}
        </div>

        {/* Simple Footer */}
        {filteredStudents.length > 0 && (
          <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="text-xs md:text-sm text-gray-700 mb-2 md:mb-0">
                Showing {filteredStudents.length} students
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NTTStudentPage;