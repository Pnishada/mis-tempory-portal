import React, { useState, useEffect } from "react";
import {
    GraduationCap,
    Search,
    X,
    Briefcase,
    CheckCircle2,
    User,
    Edit,
    Plus,
    BookOpen,
    CheckCircle,
    XCircle,
    Save,
    Loader2,
    AlertCircle,
} from "lucide-react";
import {
    fetchGraduatedStudents,
    createGraduatedStudent,
    updateGraduatedStudent,
    fetchGraduatedStudentStats,
    fetchCompletedStudents,
    type GraduatedStudentListType,
    type GraduatedStudentStats,
    type CompletedStudentType,
} from "../../api/cbt_api";

const GraduatedStudent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<"all" | "complete" | "incomplete">("all");
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<"education" | "workplace" | null>(null);
    const [currentStudent, setCurrentStudent] = useState<GraduatedStudentListType | null>(null);
    const [educationDetails, setEducationDetails] = useState("");
    const [workplaceDetails, setWorkplaceDetails] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
    const [editFieldType, setEditFieldType] = useState<"education" | "workplace" | null>(null);
    const [editEducationValue, setEditEducationValue] = useState("");
    const [editWorkplaceValue, setEditWorkplaceValue] = useState("");

    // Permission state
    const [canEdit, setCanEdit] = useState(false);

    // State for data and loading
    const [students, setStudents] = useState<GraduatedStudentListType[]>([]);
    const [stats, setStats] = useState<GraduatedStudentStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // Fetch data on component mount
    useEffect(() => {
        // Determine permissions based on role
        const role = localStorage.getItem("user_role");
        setCanEdit(role === "data_entry");

        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            setError(null);
            // Fetch everything for unified view
            const [graduatedData, completedData, statsData] = await Promise.all([
                fetchGraduatedStudents(),
                fetchCompletedStudents(),
                fetchGraduatedStudentStats(),
            ]);

            // Process completed students into GraduatedStudentListType format
            const eligibleStudents: GraduatedStudentListType[] = completedData.map((s: CompletedStudentType) => ({
                ...s,
                id: -1, // Placeholder ID indicating no graduation record
                student_id: s.id,
                graduate_education: null,
                workplace: null,
                job_description: null,
                is_complete: false,
                has_education: false,
                has_workplace: false,
            }) as unknown as GraduatedStudentListType);

            // Combine lists: Graduated students first, then eligible ones
            setStudents([...graduatedData, ...eligibleStudents]);
            setStats(statsData);
        } catch (err: any) {
            console.error("Error loading graduated students:", err);
            setError(err.response?.data?.detail || "Failed to load graduated students data");
        } finally {
            setLoading(false);
        }
    };

    // Extract unique values for filters
    const courses = Array.from(new Set(students.map((s) => s.course_name).filter((c): c is string => Boolean(c))));
    const years = Array.from(new Set(students.map((s) => s.registration_year).filter((y): y is string => Boolean(y))));
    const batches = Array.from(new Set(students.map((s) => s.batch_name).filter((b): b is string => Boolean(b))));

    // Helper function to check if all action columns are filled
    const isStudentComplete = (student: GraduatedStudentListType): boolean => {
        return student.is_complete;
    };

    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            (student.full_name_english || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (student.registration_no || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (student.graduate_education && student.graduate_education.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (student.workplace && student.workplace.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCourse = selectedCourse ? student.course_name === selectedCourse : true;
        const matchesYear = selectedYear ? student.registration_year === selectedYear : true;
        const matchesBatch = selectedBatch ? student.batch_name === selectedBatch : true;

        // Filter by graduate status
        const matchesStatus = selectedStatus === "all" ? true :
            selectedStatus === "complete" ? isStudentComplete(student) :
                !isStudentComplete(student);

        return matchesSearch && matchesCourse && matchesYear && matchesBatch && matchesStatus;
    });

    // Open modal for adding education
    const openEducationModal = (student: GraduatedStudentListType) => {
        if (!canEdit) return;
        setCurrentStudent(student);
        setModalType("education");
        setEducationDetails(student.graduate_education || "");
        setOpenModal(true);
    };

    // Open modal for adding workplace
    const openWorkplaceModal = (student: GraduatedStudentListType) => {
        if (!canEdit) return;
        setCurrentStudent(student);
        setModalType("workplace");
        setWorkplaceDetails(student.workplace || "");
        setJobDescription(student.job_description || "");
        setOpenModal(true);
    };

    const handleSubmit = async () => {
        if (!currentStudent || !modalType) return;

        try {
            setSubmitting(true);
            setError(null);

            const isNewRecord = currentStudent.id === -1;
            const data: any = {};

            if (modalType === "education") {
                if (!educationDetails.trim()) {
                    alert("Please enter education details.");
                    return;
                }
                data.graduate_education = educationDetails;
            } else if (modalType === "workplace") {
                if (!workplaceDetails.trim()) {
                    alert("Please enter workplace details.");
                    return;
                }
                data.workplace = workplaceDetails;
                data.job_description = jobDescription;
            }

            if (isNewRecord) {
                data.student_id = currentStudent.student_id;
                await createGraduatedStudent(data);
            } else {
                await updateGraduatedStudent(currentStudent.id, data);
            }

            // Reload data after successful update
            await loadData();

            setOpenModal(false);
            setEducationDetails("");
            setWorkplaceDetails("");
            setJobDescription("");
            setCurrentStudent(null);
            setModalType(null);
        } catch (err: any) {
            console.error("Error updating graduated student:", err);
            alert(err.response?.data?.detail || "Failed to update student information");
        } finally {
            setSubmitting(false);
        }
    };

    // Start inline editing for education
    const startEditEducation = (student: GraduatedStudentListType) => {
        if (!canEdit) return;
        setEditingStudentId(student.student_id);
        setEditFieldType("education");
        setEditEducationValue(student.graduate_education || "");
    };

    // Start inline editing for workplace
    const startEditWorkplace = (student: GraduatedStudentListType) => {
        if (!canEdit) return;
        setEditingStudentId(student.student_id);
        setEditFieldType("workplace");
        setEditWorkplaceValue(student.workplace || "");
    };

    // Save inline edit
    const saveInlineEdit = async () => {
        if (editingStudentId === null || editFieldType === null) return;

        const student = students.find(s => s.student_id === editingStudentId);
        if (!student) return;

        try {
            setSubmitting(true);
            setError(null);

            const isNewRecord = student.id === -1;
            const data: any = {};

            if (editFieldType === "education") {
                if (!editEducationValue.trim()) {
                    alert("Please enter education details.");
                    return;
                }
                data.graduate_education = editEducationValue;
            } else if (editFieldType === "workplace") {
                if (!editWorkplaceValue.trim()) {
                    alert("Please enter workplace details.");
                    return;
                }
                data.workplace = editWorkplaceValue;
            }

            if (isNewRecord) {
                data.student_id = student.student_id;
                await createGraduatedStudent(data);
            } else {
                await updateGraduatedStudent(student.id, data);
            }

            await loadData();
            setEditingStudentId(null);
            setEditFieldType(null);
            setEditEducationValue("");
            setEditWorkplaceValue("");
        } catch (err: any) {
            console.error("Error updating graduated student:", err);
            alert(err.response?.data?.detail || "Failed to update student information");
        } finally {
            setSubmitting(false);
        }
    };

    const cancelInlineEdit = () => {
        setEditingStudentId(null);
        setEditFieldType(null);
        setEditEducationValue("");
        setEditWorkplaceValue("");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading graduated students...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <p className="text-sm text-red-700 mt-1">{error}</p>
                        </div>
                        <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <div className="flex-1">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Graduated Students</h1>
                        <p className="text-gray-600 text-sm sm:text-base">
                            {canEdit
                                ? "Manage and track post-graduation education and employment"
                                : "View post-graduation education and employment status"}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center sm:text-right">
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold text-emerald-600">{stats?.with_workplace || 0}</p>
                            <p className="text-gray-500 text-sm">Employed</p>
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stats?.with_education || 0}</p>
                            <p className="text-gray-500 text-sm">Higher Education</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                            <input
                                type="text"
                                placeholder="Search graduates, education, or workplace..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                            />
                        </div>
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                        >
                            <option value="">All Courses</option>
                            {courses.map((course) => <option key={course} value={course}>{course}</option>)}
                        </select>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                        >
                            <option value="">All Years</option>
                            {years.map((year) => <option key={year} value={year}>{year}</option>)}
                        </select>
                        <select
                            value={selectedBatch}
                            onChange={(e) => setSelectedBatch(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                        >
                            <option value="">All Batches</option>
                            {batches.map((batch) => <option key={batch} value={batch}>{batch}</option>)}
                        </select>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value as "all" | "complete" | "incomplete")}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                        >
                            <option value="all">All Status</option>
                            <option value="complete">Complete</option>
                            <option value="incomplete">Incomplete</option>
                        </select>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Graduates</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.total || 0}</p>
                            </div>
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600"><GraduationCap className="w-6 h-6" /></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Higher Education</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.with_education || 0}</p>
                                <p className="text-sm text-blue-600 mt-1">{stats?.total ? Math.round((stats.with_education / stats.total) * 100) : 0}%</p>
                            </div>
                            <div className="p-3 rounded-full bg-purple-100 text-purple-600"><BookOpen className="w-6 h-6" /></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Employed</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.with_workplace || 0}</p>
                                <p className="text-sm text-green-600 mt-1">{stats?.total ? Math.round((stats.with_workplace / stats.total) * 100) : 0}%</p>
                            </div>
                            <div className="p-3 rounded-full bg-green-100 text-green-600"><Briefcase className="w-6 h-6" /></div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Complete Profiles</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.complete || 0}</p>
                                <p className="text-sm text-emerald-600 mt-1">{stats?.total ? Math.round((stats.complete / stats.total) * 100) : 0}%</p>
                            </div>
                            <div className="p-3 rounded-full bg-emerald-100 text-emerald-600"><CheckCircle className="w-6 h-6" /></div>
                        </div>
                    </div>
                </div>

                {/* Students Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration & Student Info</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Center & Course</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Details</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Graduate Education</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workplace</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredStudents.map((student) => (
                                    <tr key={student.student_id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 overflow-hidden bg-gradient-to-br from-green-100 to-blue-100">
                                                    {student.profile_photo_url ? (
                                                        <img
                                                            src={student.profile_photo_url}
                                                            alt={student.full_name_english}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none';
                                                                e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-green-100', 'to-blue-100');
                                                            }}
                                                        />
                                                    ) : (
                                                        <User className="w-5 h-5 text-green-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-green-600">{student.registration_no}</div>
                                                    <div className="text-sm font-medium text-gray-900">{student.full_name_english}</div>
                                                    <div className="text-xs text-gray-400">{student.batch_name} • {student.registration_year}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{student.center_name}</div>
                                            <div className="text-sm text-gray-500">{student.course_name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{student.mobile_no}</div>
                                            <div className="text-xs text-gray-500">{student.email}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{student.district}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {editingStudentId === student.student_id && editFieldType === "education" ? (
                                                <div className="space-y-2">
                                                    <textarea
                                                        value={editEducationValue}
                                                        onChange={(e) => setEditEducationValue(e.target.value)}
                                                        rows={3}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                        disabled={submitting}
                                                    />
                                                    <div className="flex gap-2">
                                                        <button onClick={saveInlineEdit} className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                                                            <Save className="w-3 h-3" /> Save
                                                        </button>
                                                        <button onClick={cancelInlineEdit} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300">Cancel</button>
                                                    </div>
                                                </div>
                                            ) : student.has_education ? (
                                                <div className="group relative">
                                                    <div className="text-sm text-gray-900">
                                                        {student.graduate_education}
                                                        <div className="text-xs text-green-600 mt-1 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" />Added</div>
                                                    </div>
                                                    {canEdit && (
                                                        <button
                                                            onClick={() => startEditEducation(student)}
                                                            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-blue-600"
                                                        >
                                                            <Edit className="w-3 h-3" />
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                canEdit ? (
                                                    <button
                                                        onClick={() => openEducationModal(student)}
                                                        className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium transition"
                                                    >
                                                        <Plus className="w-4 h-4" /> Add Education
                                                    </button>
                                                ) : <span className="text-sm text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {editingStudentId === student.student_id && editFieldType === "workplace" ? (
                                                <div className="space-y-2">
                                                    <input
                                                        type="text"
                                                        value={editWorkplaceValue}
                                                        onChange={(e) => setEditWorkplaceValue(e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                        disabled={submitting}
                                                    />
                                                    <div className="flex gap-2">
                                                        <button onClick={saveInlineEdit} className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                                                            <Save className="w-3 h-3" /> Save
                                                        </button>
                                                        <button onClick={cancelInlineEdit} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300">Cancel</button>
                                                    </div>
                                                </div>
                                            ) : student.has_workplace ? (
                                                <div className="group relative">
                                                    <div className="text-sm text-gray-900">
                                                        {student.workplace}
                                                        <div className="text-xs text-green-600 mt-1 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" />Employed</div>
                                                    </div>
                                                    {canEdit && (
                                                        <button
                                                            onClick={() => startEditWorkplace(student)}
                                                            className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-green-600"
                                                        >
                                                            <Edit className="w-3 h-3" />
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                canEdit ? (
                                                    <button
                                                        onClick={() => openWorkplaceModal(student)}
                                                        className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-sm font-medium transition"
                                                    >
                                                        <Plus className="w-4 h-4" /> Add Workplace
                                                    </button>
                                                ) : <span className="text-sm text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {isStudentComplete(student) ? (
                                                <div className="flex items-center gap-2 text-emerald-600"><CheckCircle className="w-4 h-4" /><span className="text-sm font-medium">Complete</span></div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-amber-600"><XCircle className="w-4 h-4" /><span className="text-sm font-medium">Incomplete</span></div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {filteredStudents.length === 0 && (
                                    <tr><td colSpan={7} className="text-center text-gray-500 py-6">No graduates found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal for Education/Workplace Details - Only shown if canEdit is true (enforced by open functions, but safe check here too) */}
            {openModal && currentStudent && modalType && canEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">{modalType === "education" ? "Add Graduate Education" : "Add Workplace Details"}</h2>
                                <button
                                    onClick={() => { setOpenModal(false); setCurrentStudent(null); setModalType(null); }}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                        <User className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{currentStudent.full_name_english}</p>
                                        <p className="text-sm text-gray-500">{currentStudent.registration_no}</p>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
                                {modalType === "education" ? (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Higher Education Details *</label>
                                        <textarea
                                            required
                                            value={educationDetails}
                                            onChange={(e) => setEducationDetails(e.target.value)}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Workplace / Company Name *</label>
                                            <input
                                                type="text"
                                                required
                                                value={workplaceDetails}
                                                onChange={(e) => setWorkplaceDetails(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Job Role / Description</label>
                                            <textarea
                                                value={jobDescription}
                                                onChange={(e) => setJobDescription(e.target.value)}
                                                rows={3}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="flex gap-3 pt-4">
                                    <button type="button" onClick={() => { setOpenModal(false); }} className="flex-1 py-2 bg-gray-100 rounded-lg">Cancel</button>
                                    <button type="submit" disabled={submitting} className="flex-1 py-2 bg-emerald-600 text-white rounded-lg">
                                        {submitting ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GraduatedStudent;
