const root = document.documentElement;
const themeOptions = document.querySelectorAll('.theme-opt');

// 1. Check for saved theme on load
const savedTheme = localStorage.getItem('theme') || 'automatic';
applyTheme(savedTheme);

// 2. Theme Switching Logic
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-value');
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    });
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

// Click-to-Copy Email Logic
const emailContainer = document.getElementById('copy-email');
const emailText = document.getElementById('email-text').innerText;
const copyBadge = document.getElementById('copy-badge');

if (emailContainer) {
    emailContainer.addEventListener('click', () => {
        // Copy to clipboard
        navigator.clipboard.writeText(emailText).then(() => {
            // Show "Copied!" badge
            copyBadge.classList.add('show');
            
            // Hide badge after 2 seconds
            setTimeout(() => {
                copyBadge.classList.remove('show');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
}