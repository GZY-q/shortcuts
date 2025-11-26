import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface ExportContextType {
    selectedShortcuts: string[]; // IDs of selected shortcuts
    toggleShortcut: (id: string) => void;
    clearSelection: () => void;
    isSelected: (id: string) => boolean;
}

const ExportContext = createContext<ExportContextType | undefined>(undefined);

export const ExportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedShortcuts, setSelectedShortcuts] = useState<string[]>([]);

    const toggleShortcut = (id: string) => {
        setSelectedShortcuts(prev =>
            prev.includes(id)
                ? prev.filter(s => s !== id)
                : [...prev, id]
        );
    };

    const clearSelection = () => {
        setSelectedShortcuts([]);
    };



    return (
        <ExportContext.Provider value={{
            selectedShortcuts,
            toggleShortcut,
            clearSelection,
            isSelected: (id: string) => selectedShortcuts.includes(id)
        }}>
            {children}
        </ExportContext.Provider>
    );
};

export const useExport = () => {
    const context = useContext(ExportContext);
    if (context === undefined) {
        throw new Error('useExport must be used within an ExportProvider');
    }
    return context;
};
