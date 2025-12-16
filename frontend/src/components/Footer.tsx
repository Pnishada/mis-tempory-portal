import React from 'react';
import {
    MapPin,
    Phone,
    Mail,
    Globe,
    ArrowRight,
    Facebook,
    Linkedin,
    Youtube
} from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900/95 text-white pt-16 pb-8 border-t-4 border-red-700 relative z-50 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Column 1: About */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                <img src="/naita-logo.png" alt="NAITA" className="w-10 h-10 object-contain" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg leading-tight">NAITA</h4>
                                <p className="text-xs text-gray-400">Government of Sri Lanka</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The National Apprentice and Industrial Training Authority (NAITA) is the leading vocational training body in Sri Lanka, empowering the youth with industry-recognized skills.
                        </p>
                    </div>

                    {/* Column 2: Specific Contacts */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-red-500 uppercase tracking-widest text-sm">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span>
                                    No. 971, Sri Jayawardenepura Mawatha,<br />
                                    Welikada, Rajagiriya,<br />
                                    Sri Lanka.
                                </span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                                <span>+94 11 2888 782 - 5</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                                <a href="mailto:info@naita.gov.lk" className="hover:text-white transition-colors">info@naita.gov.lk</a>
                            </li>
                            <li className="flex items-center">
                                <Globe className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                                <a href="https://naita.gov.lk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.naita.gov.lk</a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-red-500 uppercase tracking-widest text-sm">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><a href="https://naita.gov.lk/index.php/en/about-us" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> About NAITA</a></li>
                            <li><a href="https://naita.gov.lk/index.php/en/training-courses" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Training Courses</a></li>
                            <li><a href="https://naita.gov.lk/index.php/en/news-events" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> News & Events</a></li>
                            <li><a href="https://naita.gov.lk/index.php/en/contact-us" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Contact Support</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter/Social */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-red-500 uppercase tracking-widest text-sm">Stay Connected</h4>
                        <p className="text-gray-400 text-sm mb-4">Follow us on social media for the latest updates and success stories.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} NAITA. All Rights Reserved.</p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
