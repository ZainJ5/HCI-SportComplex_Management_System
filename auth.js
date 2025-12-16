// Authentication and User Management

// Toggle user dropdown menu
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const userAvatar = document.querySelector('.user-avatar');
    const dropdown = document.getElementById('userDropdown');
    
    if (dropdown && userAvatar) {
        if (!userAvatar.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    }
});

// Handle logout
function handleLogout() {
    // Clear user session data
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    
    // Redirect to login page
    window.location.href = 'index.html';
}

// Check authentication on page load
function checkAuth() {
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    
    // Update user info in dropdown
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userRoleDisplay = document.getElementById('userRoleDisplay');
    
    if (userNameDisplay && userName) {
        userNameDisplay.textContent = userName;
    }
    
    if (userRoleDisplay && userRole) {
        userRoleDisplay.textContent = userRole === 'admin' ? 'Administrator' : 'Member';
    }
    
    // Optional: Redirect if not authenticated (uncomment if needed)
    // if (!userRole) {
    //     window.location.href = 'index.html';
    // }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', checkAuth);
