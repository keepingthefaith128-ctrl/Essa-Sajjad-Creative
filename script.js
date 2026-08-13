// --- Configuration ---
const CONFIG = {
    themeStorageKey: 'darkmode',
    darkModeClass: 'dark-mode',
    lightModeText: 'Switch to Light Mode',
    darkModeText: 'Switch to Dark Mode'
};

// --- Theme Management ---
const themeManager = {
    button: null,
    body: document.body,

    init() {
        // Find button - it might not exist on all pages
        this.button = document.getElementById('theme-switch');
        
        // Always load saved theme, even if button doesn't exist
        this.loadSavedTheme();
        
        // Only add event listener if button exists
        if (this.button) {
            this.button.addEventListener('click', () => this.toggleTheme());
            console.log('✅ Theme button found and listener added');
        } else {
            console.log('ℹ️ Theme toggle button not found on this page - theme still applied');
        }
    },

    loadSavedTheme() {
        const savedMode = localStorage.getItem(CONFIG.themeStorageKey);
        
        // Determine theme: if nothing saved OR saved is 'enabled' → dark mode
        // If saved is 'disabled' → light mode
        let isDarkMode;
        if (savedMode === null) {
            // Default to dark mode (matches your HTML)
            isDarkMode = true;
            // Save the default so next time it remembers
            localStorage.setItem(CONFIG.themeStorageKey, 'enabled');
        } else {
            isDarkMode = savedMode === 'enabled';
        }
        
        console.log('Loading theme:', isDarkMode ? 'Dark' : 'Light');
        console.log('Saved mode:', savedMode);
        this.setTheme(isDarkMode);
    },

    setTheme(isDark) {
        // ALWAYS update body class - use add/remove instead of toggle for consistency
        if (isDark) {
            this.body.classList.add(CONFIG.darkModeClass);
            this.body.classList.remove('light-mode');
        } else {
            this.body.classList.remove(CONFIG.darkModeClass);
            this.body.classList.add('light-mode');
        }
        
        // Update button text only if button exists
        if (this.button) {
            this.button.textContent = isDark ? CONFIG.lightModeText : CONFIG.darkModeText;
            console.log('Button text updated to:', this.button.textContent);
        }
    },

    toggleTheme() {
        const isDarkMode = this.body.classList.contains(CONFIG.darkModeClass);
        const newMode = !isDarkMode;
        
        console.log('Toggling theme from', isDarkMode ? 'Dark' : 'Light', 'to', newMode ? 'Dark' : 'Light');
        this.setTheme(newMode);
        localStorage.setItem(CONFIG.themeStorageKey, newMode ? 'enabled' : 'disabled');
        console.log('Saved theme to localStorage:', newMode ? 'enabled' : 'disabled');
    }
};

// --- Navigation Mobile Menu ---
const navManager = {
    menuBtn: null,
    navLinks: null,

    init() {
        this.menuBtn = document.getElementById('mobileMenuBtn');
        this.navLinks = document.querySelector('.nav-links');
        
        if (!this.menuBtn || !this.navLinks) {
            console.warn('⚠️ Mobile menu elements not found on this page');
            return;
        }

        console.log('✅ Mobile menu found');
        this.menuBtn.addEventListener('click', () => this.toggleMenu());
        document.addEventListener('click', (e) => this.closeMenuOnOutsideClick(e));
    },

    toggleMenu() {
        this.navLinks.classList.toggle('active');
        const isActive = this.navLinks.classList.contains('active');
        this.menuBtn.setAttribute('aria-expanded', isActive);
        console.log('Menu toggled:', isActive ? 'Open' : 'Closed');
    },

    closeMenuOnOutsideClick(e) {
        const isClickInside = this.menuBtn.contains(e.target) || this.navLinks.contains(e.target);
        if (!isClickInside && this.navLinks.classList.contains('active')) {
            this.navLinks.classList.remove('active');
            this.menuBtn.setAttribute('aria-expanded', 'false');
        }
    }
};

// --- Author Info ---
const authorInfo = {
    name: "Essa Sajjad",
    articleCount: 2
};

console.log('📚 Author:', authorInfo.name);
console.log('📝 Articles:', authorInfo.articleCount);

// --- Initialize Everything ---
console.log('🚀 Initializing site...');
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM loaded');
    themeManager.init();
    navManager.init();
    console.log('✅ Site initialized');
});