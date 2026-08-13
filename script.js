// --- Configuration ---
const CONFIG = {
    themeStorageKey: 'darkmode',
    darkModeClass: 'dark-mode',
    lightModeText: 'Switch to Light Mode',
    darkModeText: 'Switch to Dark Mode'
};

// --- Theme Management ---
const themeManager = {
    button: document.getElementById('theme-switch'),
    body: document.body,

    init() {
        if (!this.button) {
            console.warn('Theme switch button not found on this page');
            return;
        }

        this.loadSavedTheme();
        this.button.addEventListener('click', () => this.toggleTheme());
    },

    loadSavedTheme() {
        const savedMode = localStorage.getItem(CONFIG.themeStorageKey);
        const isDarkMode = savedMode === 'enabled';
        
        this.setTheme(isDarkMode);
    },

    setTheme(isDark) {
        this.body.classList.toggle(CONFIG.darkModeClass, isDark);
        this.button.textContent = isDark ? CONFIG.lightModeText : CONFIG.darkModeText;
    },

    toggleTheme() {
        const isDarkMode = this.body.classList.contains(CONFIG.darkModeClass);
        const newMode = !isDarkMode;
        
        this.setTheme(newMode);
        localStorage.setItem(CONFIG.themeStorageKey, newMode ? 'enabled' : 'disabled');
    }
};

// --- Navigation Mobile Menu ---
const navManager = {
    menuBtn: document.getElementById('mobileMenuBtn'),
    navLinks: document.querySelector('.nav-links'),

    init() {
        if (!this.menuBtn || !this.navLinks) {
            console.warn('Mobile menu elements not found on this page');
            return;
        }

        this.menuBtn.addEventListener('click', () => this.toggleMenu());
        
        // Close menu when clicking outside (optional but user-friendly)
        document.addEventListener('click', (e) => this.closeMenuOnOutsideClick(e));
    },

    toggleMenu() {
        this.navLinks.classList.toggle('active');
        this.menuBtn.setAttribute('aria-expanded', 
            this.navLinks.classList.contains('active')
        );
    },

    closeMenuOnOutsideClick(e) {
        const isClickInside = this.menuBtn.contains(e.target) || this.navLinks.contains(e.target);
        if (!isClickInside && this.navLinks.classList.contains('active')) {
            this.navLinks.classList.remove('active');
            this.menuBtn.setAttribute('aria-expanded', 'false');
        }
    }
};

// --- Author Info (console logging only, for development) ---
const authorInfo = {
    name: "Essa Sajjad",
    articleCount: 2,
    theme: "Dark"
};

// Only log in development (optional: remove for production)
if (process.env.NODE_ENV !== 'production') {
    console.log('Author:', authorInfo.name);
    console.log('Articles:', authorInfo.articleCount);
    console.log('Theme:', authorInfo.theme);
}

// --- Initialize Everything ---
document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
    navManager.init();
});