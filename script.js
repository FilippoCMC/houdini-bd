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

const overlay = document.getElementById('overlay');
const zoomableImages = document.querySelectorAll('.zoomable');

zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
        const isZoomed = img.classList.contains('zoomed');

        if (!isZoomed) {
            // ZOOM IN
            img.classList.add('zoomed');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            // ZOOM OUT (if clicking the image itself)
            closeAll();
        }
    });
});

// Close when clicking the dark background overlay
overlay.addEventListener('click', closeAll);

function closeAll() {
    zoomableImages.forEach(img => img.classList.remove('zoomed'));
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

document.querySelectorAll('.qr-item').forEach(item => {
    item.addEventListener('click', function() {
        // Toggle the 'active' class on the clicked item
        this.classList.toggle('active');
        
        // Prevent scrolling when a QR code is popped up
        if (this.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
});