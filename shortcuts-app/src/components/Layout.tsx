import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Search, Command, Menu, X, Download, ChevronRight } from 'lucide-react';
import { applications, shortcuts } from '../data';


export const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search logic
    const filteredApps = searchQuery
        ? applications.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    const filteredShortcuts = searchQuery
        ? shortcuts.filter(s =>
            s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.keys.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5) // Limit to 5 shortcuts
        : [];

    const handleSearchSelect = (path: string) => {
        navigate(path);
        setShowResults(false);
        setSearchQuery('');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navbar */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
                            <Command size={24} />
                            <span>ShortcutMaster</span>
                        </Link>
                    </div>

                    <div className="flex-1 max-w-lg mx-8 hidden md:block" ref={searchRef}>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search shortcuts..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setShowResults(true);
                                }}
                                onFocus={() => setShowResults(true)}
                            />

                            {/* Search Results Dropdown */}
                            {showResults && searchQuery && (filteredApps.length > 0 || filteredShortcuts.length > 0) && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden max-h-96 overflow-y-auto">
                                    {filteredApps.length > 0 && (
                                        <div className="p-2">
                                            <div className="text-xs font-semibold text-gray-500 px-2 py-1 uppercase">Apps</div>
                                            {filteredApps.map(app => (
                                                <button
                                                    key={app.id}
                                                    onClick={() => handleSearchSelect(`/app/${app.id}`)}
                                                    className="w-full text-left px-2 py-2 hover:bg-gray-50 rounded-md flex items-center justify-between group"
                                                >
                                                    <span className="font-medium text-gray-900">{app.name}</span>
                                                    <ChevronRight size={16} className="text-gray-400 group-hover:text-indigo-500" />
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {filteredShortcuts.length > 0 && (
                                        <div className="p-2 border-t border-gray-100">
                                            <div className="text-xs font-semibold text-gray-500 px-2 py-1 uppercase">Shortcuts</div>
                                            {filteredShortcuts.map(s => {
                                                const app = applications.find(a => a.id === s.appId);
                                                return (
                                                    <button
                                                        key={s.id}
                                                        onClick={() => handleSearchSelect(`/app/${s.appId}`)}
                                                        className="w-full text-left px-2 py-2 hover:bg-gray-50 rounded-md"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm text-gray-700">{s.description}</span>
                                                            <span className="text-xs text-gray-400">{app?.name}</span>
                                                        </div>
                                                        <div className="flex gap-1 mt-1">
                                                            {s.keys.map((k, i) => (
                                                                <kbd key={i} className="text-xs px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-500 font-mono">{k}</kbd>
                                                            ))}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/export"
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            <Download size={18} />
                            <span className="hidden sm:inline">Export PDF</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex max-w-7xl mx-auto w-full">
                {/* Sidebar */}
                <aside className={`
          fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-auto
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
                    <div className="h-full overflow-y-auto p-4">
                        <div className="space-y-1">
                            <Link
                                to="/"
                                className={`block px-4 py-2 rounded-lg ${location.pathname === '/' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                All Apps
                            </Link>
                            <div className="pt-4 pb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Applications
                            </div>
                            {applications.map(app => (
                                <Link
                                    key={app.id}
                                    to={`/app/${app.id}`}
                                    className={`block px-4 py-2 rounded-lg ${location.pathname === `/app/${app.id}` ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {app.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
