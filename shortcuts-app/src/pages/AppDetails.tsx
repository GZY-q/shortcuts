import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { applications, shortcuts, categories } from '../data';
import type { Platform } from '../types';
import { useExport } from '../context/ExportContext';
import { CheckSquare, Square } from 'lucide-react';

export const AppDetails: React.FC = () => {
    const { appId } = useParams<{ appId: string }>();
    const [platform, setPlatform] = useState<Platform>('macOS');
    const { isSelected, toggleShortcut } = useExport();

    const app = applications.find(a => a.id === appId);

    if (!app) {
        return <div>App not found</div>;
    }

    const appShortcuts = shortcuts.filter(s => s.appId === appId && s.platform === platform);

    // Group by category
    const groupedShortcuts = categories.map(cat => ({
        ...cat,
        shortcuts: appShortcuts.filter(s => s.categoryId === cat.id)
    })).filter(group => group.shortcuts.length > 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-900">{app.name} Shortcuts</h1>

                {/* Platform Toggle */}
                <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                    {(['macOS', 'Windows'] as Platform[]).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPlatform(p)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${platform === p
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-900'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-8">
                {groupedShortcuts.map(group => (
                    <div key={group.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                            <h2 className="font-semibold text-gray-700">{group.name}</h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {group.shortcuts.map(shortcut => {
                                const selected = isSelected(shortcut.id);
                                return (
                                    <div
                                        key={shortcut.id}
                                        className={`px-6 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${selected ? 'bg-indigo-50/50' : ''}`}
                                        onClick={() => toggleShortcut(shortcut.id)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <button className={`text-gray-400 hover:text-indigo-600 ${selected ? 'text-indigo-600' : ''}`}>
                                                {selected ? <CheckSquare size={20} /> : <Square size={20} />}
                                            </button>
                                            <span className="text-gray-700">{shortcut.description}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {shortcut.keys.map((key, i) => (
                                                <kbd
                                                    key={i}
                                                    className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-md text-sm font-mono text-gray-600 min-w-[24px] text-center"
                                                >
                                                    {key}
                                                </kbd>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {groupedShortcuts.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No shortcuts found for {platform}.
                    </div>
                )}
            </div>
        </div>
    );
};
