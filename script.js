const myName = "Essa Sajjad";
let articleCount = 2;
let siteTheme = "Dark";
console.log(myName);
console.log(articleCount);
console.log(siteTheme);

// Get the button and body
const button = document.getElementById('theme-switch');
const body = document.body;

// Only run dark mode code if the button exists
if (button) {
    const savedMode = localStorage.getItem('darkmode');
    
    if (savedMode === 'enabled') {
        body.classList.add('dark-mode');
        button.textContent = 'Switch to Light Mode';
    } else {
        body.classList.remove('dark-mode');
        button.textContent = 'Switch to Dark Mode';
    }
    
    button.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            button.textContent = 'Switch to Light Mode';
            localStorage.setItem('darkmode', 'enabled');
        } else {
            button.textContent = 'Switch to Dark Mode';
            localStorage.setItem('darkmode', 'disabled');
        }
    });
} else {
    console.log('Theme switch button not found on this page');
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

console.log('mobileMenuBtn found?', mobileMenuBtn);
console.log('navLinks found?', navLinks);

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.style.backgroundColor = 'red';
    
    mobileMenuBtn.addEventListener('click', () => {
        console.log('Button was clicked!');
        navLinks.classList.toggle('active');
        console.log('navLinks classes:', navLinks.className);
    });
} else {
    console.log('Button or navLinks not found!');
}