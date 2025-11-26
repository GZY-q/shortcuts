import React from 'react';
import { Link } from 'react-router-dom';
import { applications } from '../data';
import * as Icons from 'lucide-react';

export const Home: React.FC = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Popular Applications</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.map(app => {
                    // Dynamic icon rendering
                    const IconComponent = (Icons as any)[app.icon] || Icons.Command;

                    return (
                        <Link
                            key={app.id}
                            to={`/app/${app.id}`}
                            className="block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                                    <IconComponent size={32} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{app.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{app.description}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
