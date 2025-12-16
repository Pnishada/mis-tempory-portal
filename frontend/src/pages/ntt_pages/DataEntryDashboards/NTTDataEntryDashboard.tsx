import React from 'react';

const NTTDataEntryDashboard: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">NTT Data Entry Dashboard</h1>
            <p>Welcome to the National Trade Test Data Entry Portal.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Student Registration</h2>
                    <p className="text-gray-600 mb-4">Register new students for NTT.</p>
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                        Register Student
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NTTDataEntryDashboard;
