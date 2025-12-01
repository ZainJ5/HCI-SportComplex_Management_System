// Events Page JavaScript

// View Event Details
function viewEventDetails(eventId) {
    // You can redirect to a detailed event page or show a modal
    console.log('Viewing event:', eventId);
    
    // Example: Redirect to event detail page
    // window.location.href = `event-details.html?id=${eventId}`;
    
    // Example: Show alert (replace with proper modal later)
    const eventNames = {
        'giki-nust-swimming': 'GIKI vs NUST Swimming Competition - November 25',
        'faculty-cricket': 'Faculty Cricket Cup - December 01',
        'gss-tennis': 'GSS Tennis Cup - December 15',
        'giki-lums-volleyball': 'GIKI vs LUMS Volleyball Competition - December 18'
    };
    
    alert(`Event Details:\n${eventNames[eventId]}\n\nMore details coming soon! `);
}

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