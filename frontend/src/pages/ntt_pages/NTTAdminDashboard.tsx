import React from 'react';

const NTTAdminDashboard: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">NTT Admin Dashboard</h1>
            <p>Welcome to the National Trade Test Admin Portal.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Manage Users</h2>
                    <p className="text-gray-600 mb-4">Create and manage NTT Data Entry users.</p>
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                        Go to Users
                    </button>
                </div>
                {/* Placeholder cards */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Overview</h2>
                    <p className="text-gray-600 mb-4">View system statistics.</p>
                </div>
            </div>
        </div>
    );
};

export default NTTAdminDashboard;
