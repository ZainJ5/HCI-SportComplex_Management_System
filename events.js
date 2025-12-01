// Events Page JavaScript

// View Event Details
function viewEventDetails(eventId) {
    console.log('Viewing event:', eventId);
    
    // Event details data
    const eventDetails = {
        'giki-nust-swimming': {
            title: 'GIKI vs NUST Swimming Competition',
            date: 'November 25, 2025',
            time: '2:00 PM - 5:00 PM',
            venue: 'GIKI Swimming Pool',
            description: 'An exciting competition between GIKI and NUST swimming teams. All students are welcome to attend and cheer for their teams!',
            registration: 'Open for participants until Nov 20'
        },
        'faculty-cricket': {
            title: 'Faculty Cricket Cup',
            date: 'December 01, 2025',
            time: '3:00 PM - 7:00 PM',
            venue: 'GIKI Cricket Ground',
            description: 'Annual faculty cricket tournament featuring teams from all departments. Come support your favorite faculty!',
            registration: 'Faculty members only'
        },
        'gss-tennis': {
            title: 'GSS Tennis Cup',
            date: 'December 15, 2025',
            time: '10:00 AM - 6:00 PM',
            venue: 'GIKI Tennis Courts',
            description: 'GSS annual tennis championship. Singles and doubles categories available. Prizes for winners!',
            registration: 'Open until Dec 10'
        },
        'giki-lums-volleyball': {
            title: 'GIKI vs LUMS Volleyball Competition',
            date: 'December 18, 2025',
            time: '4:00 PM - 7:00 PM',
            venue: 'GIKI Sports Complex',
            description: 'Inter-university volleyball match between GIKI and LUMS. An intense competition showcasing athletic excellence!',
            registration: 'Team registration closed'
        }
    };
    
    const event = eventDetails[eventId];
    if (event) {
        // Update modal content
        document.getElementById('eventModalTitle').textContent = event.title;
        document.getElementById('eventDate').textContent = event.date;
        document.getElementById('eventTime').textContent = event.time;
        document.getElementById('eventVenue').textContent = event.venue;
        document.getElementById('eventDescription').textContent = event.description;
        document.getElementById('eventRegistration').textContent = event.registration;
        
        // Show modal
        document.getElementById('eventDetailsModal').classList.add('active');
    }
}

// Close Event Details Modal
function closeEventDetails() {
    document.getElementById('eventDetailsModal').classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const eventModal = document.getElementById('eventDetailsModal');
    if (eventModal) {
        eventModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeEventDetails();
            }
        });
    }
});

// Add scroll animation for events
document.addEventListener('DOMContentLoaded', function() {
    const eventItems = document.querySelectorAll('.event-item');
    
    // Add staggered animation on load
    eventItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style. transform = 'translateX(-30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
});