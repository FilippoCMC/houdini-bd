const themeSelector = document.getElementById('theme-selector');
const root = document.documentElement;

// 1. Check for saved theme on load
const savedTheme = localStorage.getItem('theme') || 'automatic';
themeSelector.value = savedTheme;
applyTheme(savedTheme);

// 2. Theme Switching Logic
themeSelector.addEventListener('change', (e) => {
    const theme = e.target.value;
    localStorage.setItem('theme', theme); // Save preference
    applyTheme(theme);
});

function applyTheme(theme) {
    if (theme === 'automatic') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        root.setAttribute('data-theme', theme);
    }
}

// 3. Set Contact Template
window.addEventListener('DOMContentLoaded', () => {
    const messageBox = document.getElementById('message');
    if (messageBox) {
        messageBox.value = "Dear HOUDINI-BD Team,\n\nI would like to inquire about...";
    }
});