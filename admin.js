// Admin Portal JavaScript

// Sample data
let bookingRequests = [
    { id: 'BR001', user: 'Ahmed Khan', email: 'ahmed@giki.edu.pk', facility: 'Swimming Pool', date: '2025-12-20', time: '10:00 AM - 11:00 AM', status: 'pending', requestDate: '2025-12-15' },
    { id: 'BR002', user: 'Sara Ali', email: 'sara@giki.edu.pk', facility: 'Cricket Area', date: '2025-12-21', time: '2:00 PM - 4:00 PM', status: 'pending', requestDate: '2025-12-15' },
    { id: 'BR003', user: 'Hassan Raza', email: 'hassan@giki.edu.pk', facility: 'Tennis Court', date: '2025-12-22', time: '5:00 PM - 6:00 PM', status: 'pending', requestDate: '2025-12-16' },
    { id: 'BR004', user: 'Fatima Malik', email: 'fatima@giki.edu.pk', facility: 'Badminton Court', date: '2025-12-19', time: '3:00 PM - 4:00 PM', status: 'pending', requestDate: '2025-12-14' },
    { id: 'BR005', user: 'Usman Ahmed', email: 'usman@giki.edu.pk', facility: 'Swimming Pool', date: '2025-12-23', time: '8:00 AM - 9:00 AM', status: 'pending', requestDate: '2025-12-16' },
];

let equipment = [
    { id: 'EQ001', name: 'Cricket Bat', category: 'cricket', quantity: 15, condition: 'good', lastMaintenance: '2025-11-01' },
    { id: 'EQ002', name: 'Cricket Ball', category: 'cricket', quantity: 30, condition: 'excellent', lastMaintenance: '2025-12-01' },
    { id: 'EQ003', name: 'Tennis Racket', category: 'tennis', quantity: 10, condition: 'good', lastMaintenance: '2025-10-15' },
    { id: 'EQ004', name: 'Swimming Goggles', category: 'swimming', quantity: 25, condition: 'excellent', lastMaintenance: '2025-11-20' },
    { id: 'EQ005', name: 'Badminton Racket', category: 'badminton', quantity: 12, condition: 'fair', lastMaintenance: '2025-09-10' },
    { id: 'EQ006', name: 'Gym Dumbbells (5kg)', category: 'gym', quantity: 20, condition: 'excellent', lastMaintenance: '2025-12-10' },
];

let trainers = [
    { id: 'TR001', name: 'Muhammad Ali', specialization: 'Swimming', contact: '0300-1234567', email: 'ali@giki.edu.pk', status: 'active', experience: 5, schedule: 'Mon-Fri 8AM-2PM' },
    { id: 'TR002', name: 'Ayesha Khan', specialization: 'Tennis', contact: '0301-2345678', email: 'ayesha@giki.edu.pk', status: 'active', experience: 3, schedule: 'Mon-Fri 2PM-6PM' },
    { id: 'TR003', name: 'Imran Shah', specialization: 'Cricket', contact: '0302-3456789', email: 'imran@giki.edu.pk', status: 'active', experience: 8, schedule: 'Mon-Sat 9AM-5PM' },
    { id: 'TR004', name: 'Zainab Tariq', specialization: 'Fitness/Gym', contact: '0303-4567890', email: 'zainab@giki.edu.pk', status: 'active', experience: 4, schedule: 'Mon-Fri 6AM-12PM' },
];

let currentEditingEquipment = null;
let currentEditingTrainer = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    renderBookingsTable();
    renderEquipmentGrid();
    renderTrainersTable();
});

// Tab switching
function switchTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Update sections
    document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
    document.getElementById(`${tab}-section`).classList.add('active');
}

// Update statistics
function updateStats() {
    document.getElementById('pendingCount').textContent = bookingRequests.filter(b => b.status === 'pending').length;
    document.getElementById('equipmentCount').textContent = equipment.length;
    document.getElementById('trainerCount').textContent = trainers.filter(t => t.status === 'active').length;
    document.getElementById('approvedCount').textContent = '23'; // Sample data
}

// Render bookings table
function renderBookingsTable() {
    const tbody = document.getElementById('bookingsTableBody');
    const filter = document.getElementById('facilityFilter')?.value || 'all';
    
    let filteredBookings = bookingRequests;
    if (filter !== 'all') {
        filteredBookings = bookingRequests.filter(b => b.facility.toLowerCase().includes(filter));
    }

    tbody.innerHTML = filteredBookings.map(booking => `
        <tr data-booking-id="${booking.id}">
            <td><strong>${booking.id}</strong></td>
            <td>
                <div class="user-info">
                    <div>${booking.user}</div>
                    <small>${booking.email}</small>
                </div>
            </td>
            <td>${booking.facility}</td>
            <td>${booking.date}</td>
            <td>${booking.time}</td>
            <td><span class="status-badge status-${booking.status}">${booking.status}</span></td>
            <td>
                <div class="action-buttons">
                    ${booking.status === 'pending' ? `
                        <button class="btn-approve" onclick="approveBooking('${booking.id}')" title="Approve">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </button>
                        <button class="btn-reject" onclick="rejectBooking('${booking.id}')" title="Reject">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    ` : ''}
                    <button class="btn-view" onclick="viewBookingDetails('${booking.id}')" title="View Details">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter bookings
function filterBookings() {
    renderBookingsTable();
}

// Approve booking
function approveBooking(bookingId) {
    const booking = bookingRequests.find(b => b.id === bookingId);
    if (booking) {
        booking.status = 'approved';
        renderBookingsTable();
        updateStats();
        showNotification('Booking approved successfully!', 'success');
    }
}

// Reject booking
function rejectBooking(bookingId) {
    if (confirm('Are you sure you want to reject this booking?')) {
        const booking = bookingRequests.find(b => b.id === bookingId);
        if (booking) {
            booking.status = 'rejected';
            renderBookingsTable();
            updateStats();
            showNotification('Booking rejected', 'error');
        }
    }
}

// View booking details
function viewBookingDetails(bookingId) {
    const booking = bookingRequests.find(b => b.id === bookingId);
    if (booking) {
        const content = `
            <div class="detail-row">
                <span class="detail-label">Request ID:</span>
                <span class="detail-value">${booking.id}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">User Name:</span>
                <span class="detail-value">${booking.user}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${booking.email}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Facility:</span>
                <span class="detail-value">${booking.facility}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${booking.date}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-value">${booking.time}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Request Date:</span>
                <span class="detail-value">${booking.requestDate}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value"><span class="status-badge status-${booking.status}">${booking.status}</span></span>
            </div>
        `;
        document.getElementById('bookingDetailsContent').innerHTML = content;
        document.getElementById('bookingDetailsModal').classList.add('active');
    }
}

function closeBookingDetailsModal() {
    document.getElementById('bookingDetailsModal').classList.remove('active');
}

// Render equipment grid
function renderEquipmentGrid() {
    const grid = document.getElementById('equipmentGrid');
    grid.innerHTML = equipment.map(item => `
        <div class="equipment-card">
            <div class="equipment-header">
                <h3>${item.name}</h3>
                <span class="condition-badge condition-${item.condition}">${item.condition}</span>
            </div>
            <div class="equipment-info">
                <div class="info-item">
                    <span class="info-label">Category:</span>
                    <span class="info-value">${item.category}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Quantity:</span>
                    <span class="info-value">${item.quantity}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Last Maintenance:</span>
                    <span class="info-value">${item.lastMaintenance}</span>
                </div>
            </div>
            <div class="equipment-actions">
                <button class="btn-edit" onclick="editEquipment('${item.id}')">Edit</button>
                <button class="btn-delete" onclick="deleteEquipment('${item.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Equipment modal functions
function openAddEquipmentModal() {
    currentEditingEquipment = null;
    document.getElementById('equipmentModalTitle').textContent = 'Add Equipment';
    document.getElementById('equipmentForm').reset();
    document.getElementById('equipmentModal').classList.add('active');
}

function closeEquipmentModal() {
    document.getElementById('equipmentModal').classList.remove('active');
}

function editEquipment(equipmentId) {
    const item = equipment.find(e => e.id === equipmentId);
    if (item) {
        currentEditingEquipment = equipmentId;
        document.getElementById('equipmentModalTitle').textContent = 'Edit Equipment';
        document.getElementById('equipmentName').value = item.name;
        document.getElementById('equipmentCategory').value = item.category;
        document.getElementById('equipmentQuantity').value = item.quantity;
        document.getElementById('equipmentCondition').value = item.condition;
        document.getElementById('equipmentModal').classList.add('active');
    }
}

function deleteEquipment(equipmentId) {
    if (confirm('Are you sure you want to delete this equipment?')) {
        equipment = equipment.filter(e => e.id !== equipmentId);
        renderEquipmentGrid();
        updateStats();
        showNotification('Equipment deleted successfully', 'success');
    }
}

// Equipment form submission
document.addEventListener('DOMContentLoaded', function() {
    const equipmentForm = document.getElementById('equipmentForm');
    if (equipmentForm) {
        equipmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const equipmentData = {
                name: document.getElementById('equipmentName').value,
                category: document.getElementById('equipmentCategory').value,
                quantity: parseInt(document.getElementById('equipmentQuantity').value),
                condition: document.getElementById('equipmentCondition').value,
                lastMaintenance: new Date().toISOString().split('T')[0]
            };

            if (currentEditingEquipment) {
                // Update existing
                const index = equipment.findIndex(e => e.id === currentEditingEquipment);
                equipment[index] = { ...equipment[index], ...equipmentData };
                showNotification('Equipment updated successfully', 'success');
            } else {
                // Add new
                equipmentData.id = 'EQ' + String(equipment.length + 1).padStart(3, '0');
                equipment.push(equipmentData);
                showNotification('Equipment added successfully', 'success');
            }

            renderEquipmentGrid();
            updateStats();
            closeEquipmentModal();
        });
    }
});

// Render trainers table
function renderTrainersTable() {
    const tbody = document.getElementById('trainersTableBody');
    tbody.innerHTML = trainers.map(trainer => `
        <tr>
            <td><strong>${trainer.id}</strong></td>
            <td>
                <div class="user-info">
                    <div>${trainer.name}</div>
                    <small>${trainer.email}</small>
                </div>
            </td>
            <td>${trainer.specialization}</td>
            <td>${trainer.contact}</td>
            <td><span class="status-badge status-${trainer.status}">${trainer.status}</span></td>
            <td>${trainer.schedule}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editTrainer('${trainer.id}')" title="Edit">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-delete" onclick="deleteTrainer('${trainer.id}')" title="Delete">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Trainer modal functions
function openAddTrainerModal() {
    currentEditingTrainer = null;
    document.getElementById('trainerModalTitle').textContent = 'Add Trainer';
    document.getElementById('trainerForm').reset();
    document.getElementById('trainerModal').classList.add('active');
}

function closeTrainerModal() {
    document.getElementById('trainerModal').classList.remove('active');
}

function editTrainer(trainerId) {
    const trainer = trainers.find(t => t.id === trainerId);
    if (trainer) {
        currentEditingTrainer = trainerId;
        document.getElementById('trainerModalTitle').textContent = 'Edit Trainer';
        document.getElementById('trainerName').value = trainer.name;
        document.getElementById('trainerEmail').value = trainer.email;
        document.getElementById('trainerPhone').value = trainer.contact;
        document.getElementById('trainerSpecialization').value = trainer.specialization.toLowerCase();
        document.getElementById('trainerExperience').value = trainer.experience;
        document.getElementById('trainerStatus').value = trainer.status;
        document.getElementById('trainerModal').classList.add('active');
    }
}

function deleteTrainer(trainerId) {
    if (confirm('Are you sure you want to delete this trainer?')) {
        trainers = trainers.filter(t => t.id !== trainerId);
        renderTrainersTable();
        updateStats();
        showNotification('Trainer deleted successfully', 'success');
    }
}

// Trainer form submission
document.addEventListener('DOMContentLoaded', function() {
    const trainerForm = document.getElementById('trainerForm');
    if (trainerForm) {
        trainerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const trainerData = {
                name: document.getElementById('trainerName').value,
                email: document.getElementById('trainerEmail').value,
                contact: document.getElementById('trainerPhone').value,
                specialization: document.getElementById('trainerSpecialization').value.charAt(0).toUpperCase() + 
                               document.getElementById('trainerSpecialization').value.slice(1),
                experience: parseInt(document.getElementById('trainerExperience').value),
                status: document.getElementById('trainerStatus').value,
                schedule: 'Mon-Fri 9AM-5PM' // Default schedule
            };

            if (currentEditingTrainer) {
                // Update existing
                const index = trainers.findIndex(t => t.id === currentEditingTrainer);
                trainers[index] = { ...trainers[index], ...trainerData };
                showNotification('Trainer updated successfully', 'success');
            } else {
                // Add new
                trainerData.id = 'TR' + String(trainers.length + 1).padStart(3, '0');
                trainers.push(trainerData);
                showNotification('Trainer added successfully', 'success');
            }

            renderTrainersTable();
            updateStats();
            closeTrainerModal();
        });
    }
});

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `admin-notification ${type}`;
    notification.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${type === 'success' 
                ? '<polyline points="20 6 9 17 4 12"></polyline>' 
                : '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'}
        </svg>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('admin-modal')) {
        event.target.classList.remove('active');
    }
};
