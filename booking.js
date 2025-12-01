// Booking Page JavaScript

let selectedFacility = null;
let selectedDate = new Date(2025, 10, 23); // November 23, 2025
let selectedSlot = null;
let currentMonth = new Date(2025, 10, 1); // November 2025

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateDateDisplay();
    generateCalendar();
});

// Facility Selection
function selectFacility(facility) {
    selectedFacility = facility;
    
    // Remove active class from all facilities
    document.querySelectorAll('.facility-option').forEach(option => {
        option.classList. remove('active');
    });
    
    // Add active class to selected facility
    document.querySelector(`[data-facility="${facility}"]`).classList.add('active');
}

// Scroll Facilities
function scrollFacilities(direction) {
    const container = document.getElementById('facilitiesContainer');
    const scrollAmount = 250;
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Date Selection
function openCalendar() {
    document.getElementById('calendarModal').classList.add('active');
    generateCalendar();
}

function closeCalendar(event) {
    if (! event || event.target. classList.contains('modal-overlay') || event.target.classList.contains('calendar-close-btn')) {
        document.getElementById('calendarModal').classList.remove('active');
    }
}

function updateDateDisplay() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const dateStr = `${months[selectedDate.getMonth()]} ${selectedDate.getDate()} ${selectedDate.getFullYear()}`;
    document.getElementById('selectedDate').textContent = dateStr;
}

function changeMonth(direction) {
    currentMonth. setMonth(currentMonth.getMonth() + direction);
    generateCalendar();
}

function generateCalendar() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    
    document.getElementById('calendarMonth').textContent = 
        `${months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
    
    const daysContainer = document.getElementById('calendarDays');
    daysContainer.innerHTML = '';
    
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth. getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    // Adjust for Monday start (0 = Monday, 6 = Sunday)
    let startDay = firstDay.getDay() - 1;
    if (startDay === -1) startDay = 6;
    
    // Previous month days
    const prevMonthLastDay = new Date(currentMonth. getFullYear(), currentMonth.getMonth(), 0). getDate();
    for (let i = startDay - 1; i >= 0; i--) {
        const dayBtn = document.createElement('button');
        dayBtn.className = 'calendar-day other-month';
        dayBtn. textContent = prevMonthLastDay - i;
        dayBtn.disabled = true;
        daysContainer.appendChild(dayBtn);
    }
    
    // Current month days
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayBtn = document.createElement('button');
        dayBtn. className = 'calendar-day';
        dayBtn.textContent = day;
        
        // Check if this is the selected date
        if (selectedDate.getMonth() === currentMonth.getMonth() &&
            selectedDate.getFullYear() === currentMonth.getFullYear() &&
            selectedDate. getDate() === day) {
            dayBtn.classList.add('selected');
        }
        
        dayBtn.onclick = function() {
            selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            updateDateDisplay();
            generateCalendar();
            closeCalendar();
        };
        
        daysContainer.appendChild(dayBtn);
    }
    
    // Next month days
    const totalCells = daysContainer.children.length;
    const remainingCells = 42 - totalCells; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayBtn = document.createElement('button');
        dayBtn.className = 'calendar-day other-month';
        dayBtn. textContent = day;
        dayBtn.disabled = true;
        daysContainer.appendChild(dayBtn);
    }
}

// Time Slot Selection
function selectTimeSlot(button) {
    selectedSlot = button.dataset.slot;
    
    // Remove active class from all slots
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList. remove('active');
    });
    
    // Add active class to selected slot
    button.classList.add('active');
}

// Book Facility
function bookFacility() {
    if (!selectedFacility) {
        alert('Please select a facility');
        return;
    }
    
    if (!selectedSlot) {
        alert('Please select a time slot');
        return;
    }
    
    // Show success modal
    document.getElementById('successModal').classList.add('active');
}

// Close Success Modal
function closeSuccessModal(event) {
    if (! event || event.target.classList. contains('modal-overlay') || 
        event.target.classList. contains('thanks-btn')) {
        document.getElementById('successModal'). classList.remove('active');
        
        // Reset form if needed
        // window.location.href = 'dashboard.html';
    }
}

// Prevent body scroll when modal is open
document. addEventListener('DOMContentLoaded', function() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.addEventListener('transitionend', function() {
            if (this.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body. style.overflow = '';
            }
        });
    });
});