export type Platform = 'macOS' | 'Windows';

export interface Application {
    id: string;
    name: string;
    icon: string;
    description: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Shortcut {
    id: string;
    appId: string;
    categoryId: string;
    keys: string[];
    description: string;
    notes?: string;
    platform: Platform;
}
