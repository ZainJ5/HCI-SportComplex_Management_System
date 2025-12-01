// Dark Mode Controller
(function() {
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply theme on page load
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update moon icon based on theme
    updateMoonIcon(currentTheme);
})();

function toggleDarkMode() {
    const currentTheme = document.documentElement. getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    updateMoonIcon(newTheme);
    
    // Add animation
    document.body.style.transition = 'background-color 0.3s ease';
}

function updateMoonIcon(theme) {
    const moonIcons = document.querySelectorAll('.moon-icon');
    moonIcons.forEach(icon => {
        if (theme === 'dark') {
            icon.textContent = '☀️'; // Sun icon for light mode toggle
        } else {
            icon.textContent = '🌙'; // Moon icon for dark mode toggle
        }
    });
}

// Listen for theme changes across tabs
window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
        document.documentElement.setAttribute('data-theme', e.newValue);
        updateMoonIcon(e.newValue);
    }
});