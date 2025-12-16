import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import {
    GraduationCap,
    TrendingUp,
    Search,
    Filter,
    Briefcase,
    ArrowRight
} from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer';

// Import Assets
import acImg from '../../assets/AC.jpg';
import electricalImg from '../../assets/Electrical.jpg';
import graduatesImg from '../../assets/Graduates_img.jpg';
import plumbingImg from '../../assets/Plumbing.jpg';
import qsImg from '../../assets/QS.jpg';

const API_BASE_URL = 'http://127.0.0.1:8000';

const PublicGraduatesPerformance: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'gallery' | 'stats'>('gallery');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const heroImages = [
        acImg,
        electricalImg,
        graduatesImg,
        plumbingImg,
        qsImg
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/public/graduates-performance/`);
                setData(response.data);
            } catch (err) {
                console.error('Failed to fetch public stats:', err);
                setError('Failed to load data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-red-700 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-red-600 bg-gray-50">
            <p>{error}</p>
            <Link to="/" className="mt-4 text-red-700 hover:underline">Return Home</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Navigation - NAITA Theme (Red/White) */}
            <nav className="bg-white/95 backdrop-blur-sm text-gray-900 shadow-md fixed w-full z-50 border-b border-red-600 transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 flex items-center justify-center">
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
                                <span className="text-xl font-bold tracking-tight text-red-700 leading-none">NAITA</span>
                                <span className="text-xs text-gray-500 font-medium tracking-wide mt-0.5">GRADUATE PORTAL</span>
                            </div>
                        </Link>
                        <div className="flex items-center space-x-6">
                            <Link to="/login" className="px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors text-sm font-semibold tracking-wide uppercase shadow-md">
                                Staff Login
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Image Slider */}
            <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-gray-900">

                {/* Background Slider */}
                <div className="absolute inset-0 z-0">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0"
                        >
                            <img
                                src={heroImages[currentImageIndex]}
                                alt="Vocational Training"
                                className="w-full h-full object-cover"
                            />
                            {/* Red Overlay for Theme Consistency & Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-red-800/80 to-red-900/40 mix-blend-multiply" />
                            <div className="absolute inset-0 bg-black/30" /> {/* Extra darken for legibility */}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block px-4 py-1 mb-6 bg-red-700/80 border border-red-500/50 text-white rounded-full font-medium text-sm tracking-widest uppercase backdrop-blur-md shadow-lg">
                            Sri Lanka's Premier Training Institute
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
                            Building the <span className="text-yellow-400">Nation's</span> <br />
                            Skilled Workforce
                        </h1>
                        <p className="text-xl text-red-50 mb-12 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                            Explore the career paths of our graduates and find the training that shapes your future.
                        </p>
                    </motion.div>

                    {/* Clean Tabs */}
                    <div className="flex justify-center space-x-2 mb-12 inline-flex bg-white/10 p-1 rounded-lg backdrop-blur-md border border-white/20 shadow-xl">
                        <button
                            onClick={() => setActiveTab('gallery')}
                            className={`px-8 py-3 rounded-md font-bold transition-all duration-300 text-sm tracking-wide uppercase ${activeTab === 'gallery' ? 'bg-white text-red-800 shadow-lg' : 'text-white hover:bg-white/10'}`}
                        >
                            Alumni Gallery
                        </button>
                        <button
                            onClick={() => setActiveTab('stats')}
                            className={`px-8 py-3 rounded-md font-bold transition-all duration-300 text-sm tracking-wide uppercase ${activeTab === 'stats' ? 'bg-white text-red-800 shadow-lg' : 'text-white hover:bg-white/10'}`}
                        >
                            Impact Data
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-10 relative z-20">

                {activeTab === 'gallery' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Filters Bar */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-5 rounded-lg shadow-xl border-t-4 border-red-600">
                            <div className="flex items-center space-x-3 text-gray-700 mb-4 md:mb-0 w-full md:w-auto">
                                <Filter className="w-5 h-5 text-red-600" />
                                <span className="font-bold text-sm uppercase tracking-wider">Filter Registry:</span>
                                <select className="bg-gray-50 border border-gray-300 text-gray-700 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none w-full md:w-64">
                                    <option>All Districts & Regions</option>
                                    {data?.district_breakdown?.map((d: any) => (
                                        <option key={d.district} value={d.district}>{d.district}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search alumni..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Gallery Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {data?.success_stories?.length > 0 ? (
                                data.success_stories.map((story: any, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col overflow-hidden"
                                    >
                                        <div className="relative h-64 overflow-hidden bg-gray-200">
                                            {story.image ? (
                                                <img src={story.image.startsWith('http') ? story.image : `${API_BASE_URL}${story.image}`} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-100">
                                                    <GraduationCap className="w-16 h-16 mb-2 opacity-30" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

                                            <div className="absolute bottom-4 left-4 text-white">
                                                <p className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-1">{story.course}</p>
                                                <h3 className="font-bold text-xl mb-0.5">{story.name}</h3>
                                                <p className="text-gray-300 text-sm">{story.designation}</p>
                                            </div>
                                        </div>

                                        <div className="p-6 flex-1 flex flex-col bg-white">
                                            <div className="flex items-center space-x-3 text-gray-600 mb-6">
                                                <Briefcase className="w-5 h-5 text-red-600" />
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Employed At</p>
                                                    <p className="font-semibold text-gray-900">{story.workplace}</p>
                                                </div>
                                            </div>

                                            <button className="mt-auto w-full py-2.5 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center">
                                                View Course Details <ArrowRight className="w-4 h-4 ml-2" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-24 text-center">
                                    <div className="inline-block p-6 rounded-full bg-red-50 mb-4">
                                        <Search className="w-8 h-8 text-red-400" />
                                    </div>
                                    <p className="text-gray-500 text-lg">No graduate records found. Please add data.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'stats' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-12"
                    >
                        {/* Stats Cards - Elegant Design */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { label: "Total Graduates", value: data?.total_graduated, icon: GraduationCap, color: "text-red-700", bg: "bg-red-50" },
                                { label: "Currently Employed", value: data?.employment_stats?.employed, icon: Briefcase, color: "text-gray-700", bg: "bg-gray-100" },
                                { label: "Employment Rate", value: data?.total_graduated ? `${Math.round((data.employment_stats.employed / data.total_graduated) * 100)}%` : "0%", icon: TrendingUp, color: "text-emerald-700", bg: "bg-emerald-50" },
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-red-800 flex items-center group hover:shadow-xl transition-shadow">
                                    <div className={`p-4 rounded-full ${stat.bg} mr-6 group-hover:scale-110 transition-transform`}>
                                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
                                        <div className="text-gray-500 font-medium uppercase text-xs tracking-wider mt-1">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Charts */}
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                                <div className="w-2 h-8 bg-red-600 mr-4 rounded-full"></div>
                                Course Enrollment Analytics
                            </h3>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data?.top_courses} layout="vertical" margin={{ left: 0, right: 30 }}>
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                                        <XAxis type="number" hide />
                                        <YAxis
                                            type="category"
                                            dataKey="name"
                                            width={220}
                                            tick={{ fill: '#374151', fontSize: 13, fontWeight: 500 }}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <Tooltip
                                            cursor={{ fill: '#F9FAFB' }}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                        />
                                        <Bar
                                            dataKey="count"
                                            fill="#B91C1C"
                                            barSize={32}
                                            radius={[0, 4, 4, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default PublicGraduatesPerformance;
