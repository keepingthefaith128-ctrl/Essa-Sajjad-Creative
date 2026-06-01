const myName = "Essa Sajjad";
let articleCount = 2;
let siteTheme = "Dark";
console.log(myName);
console.log(articleCount);
console.log(siteTheme);

// Get the button and body
const button = document.getElementById('theme-switch');
const body = document.body;

// Check for saved preference in localStorage
const savedMode = localStorage.getItem('darkmode');

// Apply saved preference if it exists
if (savedMode === 'enabled') {
    body.classList.add('dark-mode');
    button.textContent = 'Switch to Light Mode';
} else {
    body.classList.remove('dark-mode');
    button.textContent = 'Switch to Dark Mode';
}

// Toggle when button is clicked
button.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update button text and save preference
    if (body.classList.contains('dark-mode')) {
        button.textContent = 'Switch to Light Mode';
        localStorage.setItem('darkmode', 'enabled');
    } else {
        button.textContent = 'Switch to Dark Mode';
        localStorage.setItem('darkmode', 'disabled');
    }
});