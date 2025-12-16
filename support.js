// Support button and form functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create support button
    const supportButton = document.createElement('button');
    supportButton.className = 'support-btn';
    supportButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <span>Help & Support</span>
    `;
    supportButton.setAttribute('aria-label', 'Help and Support');
    document.body.appendChild(supportButton);

    // Create support modal
    const supportModal = document.createElement('div');
    supportModal.className = 'support-modal';
    supportModal.innerHTML = `
        <div class="support-modal-content">
            <div class="support-modal-header">
                <h2>Help & Support</h2>
                <button class="close-modal" aria-label="Close">&times;</button>
            </div>
            <form class="support-form" id="supportForm">
                <div class="form-group">
                    <label for="support-name">Name *</label>
                    <input type="text" id="support-name" name="name" required placeholder="Enter your name">
                </div>
                
                <div class="form-group">
                    <label for="support-email">Email *</label>
                    <input type="email" id="support-email" name="email" required placeholder="Enter your email">
                </div>
                
                <div class="form-group">
                    <label for="support-category">Category *</label>
                    <select id="support-category" name="category" required>
                        <option value="">Select a category</option>
                        <option value="booking">Booking Issue</option>
                        <option value="payment">Payment Issue</option>
                        <option value="facilities">Facilities Information</option>
                        <option value="events">Events & Schedule</option>
                        <option value="account">Account Issue</option>
                        <option value="technical">Technical Problem</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="support-subject">Subject *</label>
                    <input type="text" id="support-subject" name="subject" required placeholder="Brief description of your issue">
                </div>
                
                <div class="form-group">
                    <label for="support-message">Message *</label>
                    <textarea id="support-message" name="message" rows="5" required placeholder="Describe your issue in detail"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="support-priority">Priority</label>
                    <select id="support-priority" name="priority">
                        <option value="low">Low</option>
                        <option value="medium" selected>Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                
                <div class="support-form-actions">
                    <button type="button" class="btn-cancel">Cancel</button>
                    <button type="submit" class="btn-submit">Submit Request</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(supportModal);

    // Event listeners
    supportButton.addEventListener('click', function() {
        supportModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    const closeModal = supportModal.querySelector('.close-modal');
    const cancelBtn = supportModal.querySelector('.btn-cancel');
    
    function closeSupportModal() {
        supportModal.classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('supportForm').reset();
    }

    closeModal.addEventListener('click', closeSupportModal);
    cancelBtn.addEventListener('click', closeSupportModal);

    // Close modal when clicking outside
    supportModal.addEventListener('click', function(e) {
        if (e.target === supportModal) {
            closeSupportModal();
        }
    });

    // Handle form submission
    const supportForm = document.getElementById('supportForm');
    supportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('support-name').value,
            email: document.getElementById('support-email').value,
            category: document.getElementById('support-category').value,
            subject: document.getElementById('support-subject').value,
            message: document.getElementById('support-message').value,
            priority: document.getElementById('support-priority').value,
            timestamp: new Date().toISOString()
        };

        // Show success message
        showSuccessMessage();
        
        // Log to console (in real app, would send to backend)
        console.log('Support Request Submitted:', formData);
        
        // Close modal and reset form
        setTimeout(() => {
            closeSupportModal();
        }, 2000);
    });

    function showSuccessMessage() {
        const successMsg = document.createElement('div');
        successMsg.className = 'support-success-message';
        successMsg.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>Your support request has been submitted successfully!</span>
        `;
        document.body.appendChild(successMsg);

        setTimeout(() => {
            successMsg.classList.add('show');
        }, 100);

        setTimeout(() => {
            successMsg.classList.remove('show');
            setTimeout(() => {
                successMsg.remove();
            }, 300);
        }, 3000);
    }
});
