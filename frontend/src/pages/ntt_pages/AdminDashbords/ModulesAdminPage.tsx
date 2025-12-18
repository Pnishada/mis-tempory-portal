import React, { useState } from 'react';
import {
  Plus, Save, X, Search, ChevronRight,
  BookOpen, Edit, Trash2, Building, GraduationCap,
  CheckCircle, Check, FolderOpen, Briefcase, ChevronDown
} from 'lucide-react';

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
const autoGenerateGradesForAdmin = (selectedModuleIds: string[], allModules: Module[]) => {
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

const ModulesAdminPage: React.FC = () => {
  // Initial modules data - organized by trade
  const initialModules: Module[] = [
    // SLCCL Modules
    { id: '1', moduleName: 'Basic Concept', unitCode: 'SLCCL-001', type: 'slccl', grades: ['All'], createdAt: '2024-01-15', status: 'active' },
    { id: '2', moduleName: 'Word Processing', unitCode: 'SLCCL-002', type: 'slccl', grades: ['All'], createdAt: '2024-01-15', status: 'active' },
    { id: '3', moduleName: 'Spread Sheet', unitCode: 'SLCCL-003', type: 'slccl', grades: ['All'], createdAt: '2024-01-15', status: 'active' },
    { id: '4', moduleName: 'Data Base', unitCode: 'SLCCL-004', type: 'slccl', grades: ['All'], createdAt: '2024-01-15', status: 'active' },
    { id: '5', moduleName: 'Presentation', unitCode: 'SLCCL-005', type: 'slccl', grades: ['All'], createdAt: '2024-01-15', status: 'active' },
    { id: '6', moduleName: 'Internet Email', unitCode: 'SLCCL-006', type: 'slccl', grades: ['All'], createdAt: '2024-01-15', status: 'active' },
    { id: '7', moduleName: 'Theory', unitCode: 'SLCCL-007', type: 'slccl', grades: ['All'], createdAt: '2024-01-15', status: 'active' },
    
    // Other Modules (previously vocational) grouped by trade
    { id: '8', moduleName: 'Special Qualities to be Inculcated and Attitudes', unitCode: 'U-01', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Fashionable Hair Dresser', createdAt: '2024-01-20', status: 'active' },
    { id: '9', moduleName: 'Gent\'s Haircut and Styling', unitCode: 'U-02', type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3'], trade: 'Fashionable Hair Dresser', createdAt: '2024-01-20', status: 'active' },
    { id: '10', moduleName: 'Basic Carpentry', unitCode: 'U-03', type: 'other', grades: ['Grade 2', 'Grade 3'], trade: 'Carpenter', createdAt: '2024-01-25', status: 'active' },
    { id: '11', moduleName: 'Advanced Carpentry', unitCode: 'U-04', type: 'other', grades: ['Grade 3'], trade: 'Carpenter', createdAt: '2024-01-25', status: 'active' },
  ];

  const [modules, setModules] = useState<Module[]>(initialModules);
  const [expandedTrades, setExpandedTrades] = useState<{[key: string]: boolean}>({});

  // Modal states
  const [showAddModuleModal, setShowAddModuleModal] = useState(false);
  const [showEditModuleModal, setShowEditModuleModal] = useState(false);
  const [editModule, setEditModule] = useState<Module | null>(null);

  // New module form
  const [newModule, setNewModule] = useState({
    moduleName: '',
    unitCode: '',
    type: 'slccl' as 'slccl' | 'other',
    grades: ['All'],
    trade: '',
    status: 'active' as 'active' | 'inactive'
  });

  // All available grades
  const allGrades = ['Grade 1', 'Grade 2', 'Grade 3', 'All'];

  // Get unique trades from other modules
  const availableTrades = Array.from(new Set(modules.filter(m => m.trade).map(m => m.trade!)));

  // Toggle trade expansion
  const toggleTradeExpansion = (trade: string) => {
    setExpandedTrades(prev => ({
      ...prev,
      [trade]: !prev[trade]
    }));
  };

  // Toggle grade selection for new module
  const toggleGrade = (grade: string) => {
    if (newModule.type === 'slccl') {
      setNewModule({ ...newModule, grades: ['All'] });
      return;
    }

    if (grade === 'All') {
      setNewModule({ ...newModule, grades: ['Grade 1', 'Grade 2', 'Grade 3'] });
      return;
    }

    const currentGrades = [...newModule.grades];
    const filteredGrades = currentGrades.filter(g => g !== 'All');
    
    if (filteredGrades.includes(grade)) {
      const newGrades = filteredGrades.filter(g => g !== grade);
      setNewModule({ ...newModule, grades: newGrades.length > 0 ? newGrades : ['All'] });
    } else {
      const newGrades = [...filteredGrades, grade];
      setNewModule({ ...newModule, grades: newGrades });
    }
  };

  // Toggle edit grade selection
  const toggleEditGrade = (grade: string) => {
    if (!editModule) return;

    if (editModule.type === 'slccl') {
      setEditModule({ ...editModule, grades: ['All'] });
      return;
    }

    if (grade === 'All') {
      setEditModule({ ...editModule, grades: ['Grade 1', 'Grade 2', 'Grade 3'] });
      return;
    }

    const currentGrades = [...editModule.grades];
    const filteredGrades = currentGrades.filter(g => g !== 'All');
    
    if (filteredGrades.includes(grade)) {
      const newGrades = filteredGrades.filter(g => g !== grade);
      setEditModule({ ...editModule, grades: newGrades.length > 0 ? newGrades : ['All'] });
    } else {
      const newGrades = [...filteredGrades, grade];
      setEditModule({ ...editModule, grades: newGrades });
    }
  };

  // Handle trade change for new module
  const handleTradeChange = (trade: string) => {
    setNewModule({
      ...newModule,
      trade,
      // Reset grades to default when trade changes
      grades: ['Grade 1', 'Grade 2', 'Grade 3']
    });
  };

  // Handle edit trade change
  const handleEditTradeChange = (trade: string) => {
    if (!editModule) return;
    setEditModule({
      ...editModule,
      trade,
      // Reset grades to default when trade changes
      grades: ['Grade 1', 'Grade 2', 'Grade 3']
    });
  };

  // Add new module
  const handleAddModule = () => {
    if (!newModule.moduleName || !newModule.unitCode) {
      alert('Please fill in Module Name and Unit Code');
      return;
    }

    if (newModule.type === 'other' && !newModule.trade) {
      alert('Please enter Trade Name for other modules');
      return;
    }

    // For other modules, ensure grades are properly set
    const grades = newModule.type === 'slccl' ? ['All'] : newModule.grades;

    const moduleData: Module = {
      id: (modules.length + 1).toString(),
      moduleName: newModule.moduleName,
      unitCode: newModule.unitCode.toUpperCase(),
      type: newModule.type,
      grades: grades,
      ...(newModule.type === 'other' && {
        trade: newModule.trade
      }),
      createdAt: new Date().toISOString().split('T')[0],
      status: newModule.status
    };

    setModules([...modules, moduleData]);
    setShowAddModuleModal(false);
    // Reset form
    setNewModule({
      moduleName: '',
      unitCode: '',
      type: 'slccl',
      grades: ['All'],
      trade: '',
      status: 'active'
    });
  };

  // Update module
  const handleUpdateModule = () => {
    if (!editModule) return;

    const updatedModule = {
      ...editModule,
      grades: editModule.type === 'slccl' ? ['All'] : editModule.grades
    };

    setModules(modules.map(m => 
      m.id === updatedModule.id ? updatedModule : m
    ));
    setShowEditModuleModal(false);
    setEditModule(null);
  };

  // Delete module
  const handleDeleteModule = (id: string) => {
    if (confirm('Are you sure you want to delete this module?')) {
      setModules(modules.filter(m => m.id !== id));
    }
  };

  // Search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterTrade, setFilterTrade] = useState('all');

  // Filter modules
  const filteredModules = modules.filter(module => {
    const matchesSearch = searchTerm === '' ||
      module.moduleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.unitCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (module.trade && module.trade.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || module.type === filterType;
    const matchesGrade = filterGrade === 'all' || module.grades.includes(filterGrade);
    const matchesTrade = filterTrade === 'all' || module.trade === filterTrade;
    
    return matchesSearch && matchesType && matchesGrade && matchesTrade;
  });

  // Group modules by trade
  const slcclModules = filteredModules.filter(m => m.type === 'slccl');
  const otherModules = filteredModules.filter(m => m.type === 'other');
  
  // Group other modules by trade
  const modulesByTrade: {[key: string]: Module[]} = {};
  otherModules.forEach(module => {
    if (module.trade) {
      if (!modulesByTrade[module.trade]) {
        modulesByTrade[module.trade] = [];
      }
      modulesByTrade[module.trade].push(module);
    }
  });

  // Get unique trades for filtering
  const allTrades = Array.from(new Set(modules.filter(m => m.trade).map(m => m.trade!)));

  // Render grade badges
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

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Modules Management</h1>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Manage SLCCL and Other Modules by Trade</p>
          </div>
          <button
            onClick={() => setShowAddModuleModal(true)}
            className="mt-3 md:mt-0 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-150 flex items-center shadow-sm hover:shadow text-sm md:text-base"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Add New Module
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
          <div className="bg-white border rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-blue-100 rounded-lg md:rounded-xl mr-3 md:mr-4">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Total Modules</p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">{modules.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-blue-100 rounded-lg md:rounded-xl mr-3 md:mr-4">
                <GraduationCap className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">SLCCL Modules</p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                  {slcclModules.length}
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
                <p className="text-xs md:text-sm text-gray-600">Other Modules</p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                  {otherModules.length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg md:rounded-xl p-3 md:p-4 lg:p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 md:p-3 bg-purple-100 rounded-lg md:rounded-xl mr-3 md:mr-4">
                <FolderOpen className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">Total Trades</p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
                  {Object.keys(modulesByTrade).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Module Modal */}
      {showAddModuleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50">
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Add New Module</h2>
                <button
                  onClick={() => setShowAddModuleModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-4">
              {/* Module Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Module Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewModule({...newModule, type: 'slccl', grades: ['All'], trade: ''})}
                    className={`p-4 border-2 rounded-lg text-sm font-medium flex flex-col items-center justify-center ${
                      newModule.type === 'slccl' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <GraduationCap className="w-5 h-5 mb-1" />
                    SLCCL Module
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewModule({...newModule, type: 'other', grades: ['Grade 1', 'Grade 2', 'Grade 3']})}
                    className={`p-4 border-2 rounded-lg text-sm font-medium flex flex-col items-center justify-center ${
                      newModule.type === 'other' 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <Briefcase className="w-5 h-5 mb-1" />
                    Other Module
                  </button>
                </div>
              </div>

              {/* Module Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Module Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={newModule.moduleName}
                  onChange={(e) => setNewModule({...newModule, moduleName: e.target.value})}
                  placeholder="Enter module name"
                />
              </div>

              {/* Unit Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Module Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={newModule.unitCode}
                  onChange={(e) => setNewModule({...newModule, unitCode: e.target.value.toUpperCase()})}
                  placeholder={newModule.type === 'slccl' ? "e.g., SLCCL-001" : "e.g., U-01, MOD-001"}
                />
              </div>

              {/* Grade Level Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Grades <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {newModule.type === 'slccl' ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm text-blue-700">SLCCL modules are automatically assigned to All Grades</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {allGrades.map((grade) => (
                        <button
                          key={grade}
                          type="button"
                          onClick={() => toggleGrade(grade)}
                          className={`p-3 border rounded-lg text-sm font-medium flex items-center justify-center ${
                            (grade === 'All' && newModule.grades.length === 3) || newModule.grades.includes(grade)
                              ? grade === 'All' 
                                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                : 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {((grade === 'All' && newModule.grades.length === 3) || newModule.grades.includes(grade)) && (
                            <Check className="w-4 h-4 mr-2" />
                          )}
                          {grade}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Trade Name (Only for Other Modules) */}
              {newModule.type === 'other' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trade Name <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <select
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      value={newModule.trade}
                      onChange={(e) => handleTradeChange(e.target.value)}
                    >
                      <option value="">Select Existing Trade</option>
                      {availableTrades.map(trade => (
                        <option key={trade} value={trade}>{trade}</option>
                      ))}
                      <option value="new">Create New Trade</option>
                    </select>
                    {newModule.trade === 'new' && (
                      <input
                        type="text"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="Enter new trade name"
                        onChange={(e) => handleTradeChange(e.target.value)}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      checked={newModule.status === 'active'}
                      onChange={() => setNewModule({...newModule, status: 'active'})}
                    />
                    <span className="ml-2 text-sm text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      className="h-4 w-4 text-gray-600 focus:ring-gray-500"
                      checked={newModule.status === 'inactive'}
                      onChange={() => setNewModule({...newModule, status: 'inactive'})}
                    />
                    <span className="ml-2 text-sm text-gray-700">Inactive</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t bg-gray-50 p-4 md:p-6">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddModuleModal(false)}
                  className="px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddModule}
                  disabled={!newModule.moduleName || !newModule.unitCode || 
                    (newModule.type === 'other' && !newModule.trade)}
                  className="px-4 py-2 md:px-6 md:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <Save className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  Add Module
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Module Modal */}
      {showEditModuleModal && editModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50">
          <div className="bg-white rounded-lg md:rounded-xl shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">Edit Module</h2>
                <button
                  onClick={() => setShowEditModuleModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-4">
              {/* Module Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Module Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditModule({ 
                        ...editModule, 
                        type: 'slccl',
                        grades: ['All'],
                        trade: undefined
                      });
                    }}
                    className={`p-4 border-2 rounded-lg text-sm font-medium flex flex-col items-center justify-center ${
                      editModule.type === 'slccl' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <GraduationCap className="w-5 h-5 mb-1" />
                    SLCCL Module
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditModule({ 
                        ...editModule, 
                        type: 'other',
                        grades: editModule.grades && editModule.grades.length > 0 ? editModule.grades : ['Grade 1', 'Grade 2', 'Grade 3'],
                        trade: editModule.trade || ''
                      });
                    }}
                    className={`p-4 border-2 rounded-lg text-sm font-medium flex flex-col items-center justify-center ${
                      editModule.type === 'other' 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <Briefcase className="w-5 h-5 mb-1" />
                    Other Module
                  </button>
                </div>
              </div>

              {/* Module Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Module Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={editModule.moduleName}
                  onChange={(e) => setEditModule({...editModule, moduleName: e.target.value})}
                />
              </div>

              {/* Unit Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Module Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={editModule.unitCode}
                  onChange={(e) => setEditModule({...editModule, unitCode: e.target.value.toUpperCase()})}
                />
              </div>

              {/* Grade Level Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Grades <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {editModule.type === 'slccl' ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm text-blue-700">SLCCL modules are automatically assigned to All Grades</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      {allGrades.map((grade) => (
                        <button
                          key={grade}
                          type="button"
                          onClick={() => toggleEditGrade(grade)}
                          className={`p-3 border rounded-lg text-sm font-medium flex items-center justify-center ${
                            (grade === 'All' && editModule.grades.length === 3) || editModule.grades.includes(grade)
                              ? grade === 'All' 
                                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                                : 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          {((grade === 'All' && editModule.grades.length === 3) || editModule.grades.includes(grade)) && (
                            <Check className="w-4 h-4 mr-2" />
                          )}
                          {grade}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Trade Name (Only for Other Modules) */}
              {editModule.type === 'other' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trade Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    value={editModule.trade || ''}
                    onChange={(e) => handleEditTradeChange(e.target.value)}
                  >
                    <option value="">Select Trade</option>
                    {availableTrades.map(trade => (
                      <option key={trade} value={trade}>{trade}</option>
                    ))}
                    <option value="new">Create New Trade</option>
                  </select>
                  {editModule.trade === 'new' && (
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm mt-2"
                      placeholder="Enter new trade name"
                      onChange={(e) => handleEditTradeChange(e.target.value)}
                    />
                  )}
                </div>
              )}

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="edit-status"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      checked={editModule.status === 'active'}
                      onChange={() => setEditModule({...editModule, status: 'active'})}
                    />
                    <span className="ml-2 text-sm text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="edit-status"
                      className="h-4 w-4 text-gray-600 focus:ring-gray-500"
                      checked={editModule.status === 'inactive'}
                      onChange={() => setEditModule({...editModule, status: 'inactive'})}
                    />
                    <span className="ml-2 text-sm text-gray-700">Inactive</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="border-t bg-gray-50 p-4 md:p-6">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowEditModuleModal(false)}
                  className="px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateModule}
                  disabled={!editModule.moduleName || !editModule.unitCode || 
                    (editModule.type === 'other' && !editModule.trade)}
                  className="px-4 py-2 md:px-6 md:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <Save className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  Update Module
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  className="w-full pl-9 md:pl-10 pr-3 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  placeholder="Search modules, code, or trade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Module Type</label>
              <select
                className="w-full px-3 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="slccl">SLCCL</option>
                <option value="other">Other Modules</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
              <select
                className="w-full px-3 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
              >
                <option value="all">All Grades</option>
                {allGrades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trade</label>
              <select
                className="w-full px-3 py-2 md:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={filterTrade}
                onChange={(e) => setFilterTrade(e.target.value)}
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
                setFilterType('all');
                setFilterGrade('all');
                setFilterTrade('all');
              }}
              className="px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center text-sm"
            >
              <X className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Modules List */}
        <div className="p-4 md:p-6">
          {filteredModules.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-3 md:mb-4" />
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">No modules found</h3>
              <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">Try adjusting your search or filters</p>
              <button
                onClick={() => setShowAddModuleModal(true)}
                className="px-4 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-150 flex items-center mx-auto text-sm md:text-base"
              >
                <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Add New Module
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* SLCCL Modules Section */}
              {slcclModules.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-blue-50 border-b px-4 py-3 md:px-6 md:py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                          <GraduationCap className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-blue-900">SLCCL Modules</h3>
                          <p className="text-xs text-blue-700">{slcclModules.length} modules</p>
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
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-1/3">Module Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-1/4">Module Code</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-1/4">Created Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-1/6">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {slcclModules.map((module) => (
                          <tr key={module.id} className="hover:bg-gray-50">
                            <td className="px-4 py-4">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded bg-blue-100 flex items-center justify-center mr-3">
                                  <BookOpen className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="font-medium text-gray-900">{module.moduleName}</div>
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <span className="font-bold text-gray-900">{module.unitCode}</span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500">
                              {module.createdAt}
                            </td>
                            <td className="px-4 py-4">
                              <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                module.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {module.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    setEditModule(module);
                                    setShowEditModuleModal(true);
                                  }}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg border border-green-200 flex items-center justify-center"
                                  title="Edit Module"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteModule(module.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 flex items-center justify-center"
                                  title="Delete Module"
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

              {/* Other Modules by Trade */}
              {Object.keys(modulesByTrade).map((trade) => (
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
                          <p className="text-xs text-green-700">{modulesByTrade[trade].length} modules</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                          Other Modules
                        </span>
                      </div>
                    </div>
                  </div>
                  {expandedTrades[trade] && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-1/3">Module Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-1/4">Module Code</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-1/4">Grades</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-1/6">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {modulesByTrade[trade].map((module) => (
                            <tr key={module.id} className="hover:bg-gray-50">
                              <td className="px-4 py-4">
                                <div className="flex items-center">
                                  <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center mr-3">
                                    <BookOpen className="w-4 h-4 text-green-600" />
                                  </div>
                                  <div className="font-medium text-gray-900">{module.moduleName}</div>
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <span className="font-bold text-gray-900">{module.unitCode}</span>
                              </td>
                              <td className="px-4 py-4">
                                {renderGradeBadges(module.grades)}
                              </td>
                              <td className="px-4 py-4">
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                  module.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {module.status.toUpperCase()}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => {
                                      setEditModule(module);
                                      setShowEditModuleModal(true);
                                    }}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg border border-green-200 flex items-center justify-center"
                                    title="Edit Module"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteModule(module.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 flex items-center justify-center"
                                    title="Delete Module"
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
          )}
        </div>

        {/* Simple Footer */}
        {filteredModules.length > 0 && (
          <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="text-xs md:text-sm text-gray-700 mb-2 md:mb-0">
                Showing {filteredModules.length} modules
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulesAdminPage;