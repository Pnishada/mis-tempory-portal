import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Users, GraduationCap, BarChart3, ArrowRight, Briefcase } from 'lucide-react';
import axios from 'axios';
import Footer from '../../components/Footer';

const API_BASE_URL = 'http://127.0.0.1:8000';

const Home: React.FC = () => {
  const [publicData, setPublicData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/public/graduates-performance/`);
        setPublicData(response.data);
      } catch (error) {
        console.error("Failed to fetch public data", error);
      }
    };
    fetchData();
  }, []);

  const features = [
    {
      icon: Building2,
      title: 'Center Management',
      description: 'Monitor and manage all 49 NAITA training centers across Sri Lanka from a centralized dashboard.',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Student Tracking',
      description: 'Track student enrollment, attendance, progress, and completion rates in real-time.',
      color: 'green'
    },
    {
      icon: GraduationCap,
      title: 'Staff Management',
      description: 'Manage instructors, staff performance, and training schedules efficiently.',
      color: 'green'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Generate comprehensive reports and analytics for data-driven decision making.',
      color: 'green'
    }
  ];

  const stats = [
    {
      label: 'Graduated Students',
      value: publicData ? publicData.total_graduated.toLocaleString() : '...',
      color: 'text-green-600',
      icon: GraduationCap
    },
    {
      label: 'Employed Graduates',
      value: publicData ? publicData.employment_stats.employed.toLocaleString() : '...',
      color: 'text-green-600',
      icon: Briefcase
    },
    {
      label: 'Training Centers',
      value: '49',
      color: 'text-green-600',
      icon: Building2
    },
    {
      label: 'Completion Rate',
      value: publicData && publicData.total_graduated ? `${Math.round((publicData.employment_stats.employed / publicData.total_graduated) * 100)}%` : '87%',
      color: 'text-green-600',
      icon: BarChart3
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header - Matches Login Theme */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                <img
                  src="/naita-logo.png"
                  alt="NAITA Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextSibling && ((target.nextSibling as HTMLElement).style.display = 'flex');
                  }}
                />
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center hidden">
                  <span className="text-red-600 font-bold text-lg">N</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 leading-none">NAITA</span>
                <span className="text-xs text-green-600 font-medium tracking-wider mt-0.5">MIS PORTAL</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/login"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-bold uppercase tracking-wide shadow-md hover:shadow-lg"
              >
                System Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Clean & Fresh */}
      <section className="bg-gradient-to-br from-green-50 to-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1 mb-6 bg-green-100/50 text-green-700 rounded-full font-medium text-sm tracking-widest uppercase">
            National Apprentice & Industrial Training Authority
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Digital Monitoring <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-600">Ecosystem</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Centralized monitoring ecosystem for all 49 training centers across Sri Lanka.
            Empowering the future workforce through data-driven tracking and management.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/login"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-green-900/10"
            >
              <span>Access Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/public/graduates-performance"
              className="bg-white border border-green-200 text-green-700 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center space-x-2"
            >
              <GraduationCap className="w-5 h-5 text-green-600" />
              <span>Visit Student Employability Tracking</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section with Real Data */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all group">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full bg-white shadow-sm border border-gray-200 group-hover:scale-110 transition-transform`}>
                    {stat.icon && <stat.icon className={`w-8 h-8 ${stat.color === 'text-amber-600' ? 'text-green-600' : 'text-gray-700'}`} />}
                  </div>
                </div>
                <div className={`text-4xl font-bold text-gray-900 mb-2`}>{stat.value}</div>
                <div className="text-gray-500 font-medium uppercase text-xs tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Comprehensive Management Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Everything you need to monitor and manage NAITA training centers efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                green: 'bg-green-600 text-white',
                slate: 'bg-gray-800 text-white'
              };

              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-8 border border-gray-200 hover:shadow-xl transition-shadow group">
                  <div className={`p-3 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses] || 'bg-green-600 text-white'} w-fit mb-6`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;