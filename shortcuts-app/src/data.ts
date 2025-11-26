import type { Application, Category, Shortcut } from './types';

export const applications: Application[] = [
    {
        id: 'vscode',
        name: 'VS Code',
        icon: 'Code',
        description: 'Code editing. Redefined.',
    },
    {
        id: 'chrome',
        name: 'Google Chrome',
        icon: 'Chrome',
        description: 'Fast, secure, and free web browser.',
    },
    {
        id: 'photoshop',
        name: 'Adobe Photoshop',
        icon: 'Image',
        description: 'Professional image editing software.',
    }
];

export const categories: Category[] = [
    { id: 'general', name: 'General' },
    { id: 'editing', name: 'Editing' },
    { id: 'navigation', name: 'Navigation' },
    { id: 'view', name: 'View' },
    { id: 'debug', name: 'Debugging' },
];

export const shortcuts: Shortcut[] = [
    // VS Code - macOS
    { id: '1', appId: 'vscode', categoryId: 'general', keys: ['⌘', 'Shift', 'P'], description: 'Show Command Palette', platform: 'macOS' },
    { id: '2', appId: 'vscode', categoryId: 'general', keys: ['⌘', 'P'], description: 'Quick Open', platform: 'macOS' },
    { id: '3', appId: 'vscode', categoryId: 'editing', keys: ['⌘', 'C'], description: 'Copy line (empty selection)', platform: 'macOS' },
    { id: '4', appId: 'vscode', categoryId: 'editing', keys: ['⌘', 'X'], description: 'Cut line (empty selection)', platform: 'macOS' },
    { id: '5', appId: 'vscode', categoryId: 'navigation', keys: ['Ctrl', 'G'], description: 'Go to Line...', platform: 'macOS' },

    // VS Code - Windows
    { id: '6', appId: 'vscode', categoryId: 'general', keys: ['Ctrl', 'Shift', 'P'], description: 'Show Command Palette', platform: 'Windows' },
    { id: '7', appId: 'vscode', categoryId: 'general', keys: ['Ctrl', 'P'], description: 'Quick Open', platform: 'Windows' },
    { id: '8', appId: 'vscode', categoryId: 'editing', keys: ['Ctrl', 'C'], description: 'Copy line (empty selection)', platform: 'Windows' },

    // Chrome - macOS
    { id: '9', appId: 'chrome', categoryId: 'navigation', keys: ['⌘', 'T'], description: 'New Tab', platform: 'macOS' },
    { id: '10', appId: 'chrome', categoryId: 'navigation', keys: ['⌘', 'W'], description: 'Close Tab', platform: 'macOS' },
    { id: '11', appId: 'chrome', categoryId: 'navigation', keys: ['⌘', 'Shift', 'T'], description: 'Reopen Closed Tab', platform: 'macOS' },

    // Chrome - Windows
    { id: '12', appId: 'chrome', categoryId: 'navigation', keys: ['Ctrl', 'T'], description: 'New Tab', platform: 'Windows' },
    { id: '13', appId: 'chrome', categoryId: 'navigation', keys: ['Ctrl', 'W'], description: 'Close Tab', platform: 'Windows' },
];
