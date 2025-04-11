// Enhanced Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add click event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section ID from href attribute
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                document.querySelector('.nav-links').classList.remove('active');
                
                // Scroll to the target section
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active link
                updateActiveLink(this);
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        // Check each section
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                const correspondingLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                
                if (correspondingLink) {
                    updateActiveLink(correspondingLink);
                }
            }
        });
    });
    
    // Function to update active link
    function updateActiveLink(activeLink) {
        // Remove active class from all links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        activeLink.classList.add('active');
    }
    
    // Set home as active by default
    document.querySelector('.nav-links a[href="#home"]').classList.add('active');
});
// Mobile Menu Toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.coach-card').length;
const carouselInner = document.querySelector('.carousel-inner');

function moveSlide(direction) {
    currentSlide += direction;
    
    // Boundary checks
    if (currentSlide < 0) {
        currentSlide = 0;
    } else if (currentSlide > slides - 3) {
        currentSlide = slides - 3;
    }
    
    // Calculate the transform value
    const transformValue = -currentSlide * (300 + 30); // 300px card width + 30px margin
    carouselInner.style.transform = `translateX(${transformValue}px)`;
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Sticky navbar on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Button hover effects
document.querySelectorAll('.cta-button').forEach(button => {
    // Add ripple effect on click
    button.addEventListener('click', function(e) {
        // Remove any existing ripples
        const existingRipples = this.querySelectorAll('.ripple');
        existingRipples.forEach(ripple => ripple.remove());
        
        // Create new ripple
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // Position the ripple
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // Add pulse animation on hover
    button.addEventListener('mouseenter', function() {
        this.classList.add('pulse');
    });
    
    button.addEventListener('mouseleave', function() {
        this.classList.remove('pulse');
    });
});

// Get Started Buttons - Show modal
document.querySelectorAll('.cta-button:not(.secondary)').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        showModal();
    });
});

// Become a Coach Button - Different action
document.querySelector('.cta-button.secondary').addEventListener('click', function(e) {
    e.preventDefault();
    showCoachSignup();
});

// Modal functionality
function showModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Get Started with CoachConnect</h2>
            <form id="signup-form">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="sport">Sport of Interest</label>
                    <select id="sport" required>
                        <option value="">Select a sport</option>
                        <option value="basketball">Basketball</option>
                        <option value="tennis">Tennis</option>
                        <option value="soccer">Soccer</option>
                        <option value="boxing">Boxing</option>
                        <option value="wrestling">Wrestling</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit" class="cta-button">Find My Coach</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Form submission
    const form = modal.querySelector('#signup-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real app, you would send this data to your server
        alert('Thank you for signing up! We will contact you shortly with coach recommendations.');
        modal.remove();
    });
}

function showCoachSignup() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Become a CoachConnect Coach</h2>
            <form id="coach-signup-form">
                <div class="form-group">
                    <label for="coach-name">Full Name</label>
                    <input type="text" id="coach-name" required>
                </div>
                <div class="form-group">
                    <label for="coach-email">Email</label>
                    <input type="email" id="coach-email" required>
                </div>
                <div class="form-group">
                    <label for="coach-sport">Primary Sport</label>
                    <select id="coach-sport" required>
                        <option value="">Select a sport</option>
                        <option value="basketball">Basketball</option>
                        <option value="tennis">Tennis</option>
                        <option value="soccer">Soccer</option>
                        <option value="boxing">Boxing</option>
                        <option value="wrestling">Wrestling</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="experience">Years of Experience</label>
                    <input type="number" id="experience" min="1" required>
                </div>
                <div class="form-group">
                    <label for="certifications">Certifications</label>
                    <textarea id="certifications" placeholder="List your relevant certifications"></textarea>
                </div>
                <button type="submit" class="cta-button">Apply Now</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Form submission
    const form = modal.querySelector('#coach-signup-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real app, you would send this data to your server
        alert('Thank you for your application! Our team will review your information and contact you within 3 business days.');
        modal.remove();
    });
}

// View Profile Buttons - Show coach details
document.querySelectorAll('.coach-card .cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.coach-card');
        const coachName = card.querySelector('h3').textContent;
        const coachSport = card.querySelector('p:first-of-type').textContent;
        const coachExp = card.querySelector('p:nth-of-type(2)').textContent;
        const coachBio = card.querySelector('p:nth-of-type(3)').textContent;
        const coachRating = card.querySelector('.rating').textContent;
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content coach-profile">
                <span class="close-modal">&times;</span>
                <div class="coach-header">
                    ${card.querySelector('img').outerHTML}
                    <div class="coach-info">
                        <h2>${coachName}</h2>
                        <p>${coachSport}</p>
                        <p>${coachExp}</p>
                        <div class="rating">${coachRating}</div>
                    </div>
                </div>
                <div class="coach-details">
                    <h3>About Me</h3>
                    <p>${coachBio}</p>
                    <h3>Training Approach</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <h3>Session Options</h3>
                    <ul>
                        <li>1-on-1 Training ($60/session)</li>
                        <li>Group Sessions ($25/person)</li>
                        <li>Online Coaching ($45/session)</li>
                    </ul>
                </div>
                <button class="cta-button book-session">Book a Session</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        // Close when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Book session button
        modal.querySelector('.book-session').addEventListener('click', () => {
            modal.remove();
            showBookingForm(coachName);
        });
    });
});

function showBookingForm(coachName) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Book a Session with ${coachName}</h2>
            <form id="booking-form">
                <div class="form-group">
                    <label for="booking-name">Your Name</label>
                    <input type="text" id="booking-name" required>
                </div>
                <div class="form-group">
                    <label for="booking-email">Email</label>
                    <input type="email" id="booking-email" required>
                </div>
                <div class="form-group">
                    <label for="session-type">Session Type</label>
                    <select id="session-type" required>
                        <option value="">Select session type</option>
                        <option value="1on1">1-on-1 Training</option>
                        <option value="group">Group Session</option>
                        <option value="online">Online Coaching</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="session-date">Preferred Date</label>
                    <input type="date" id="session-date" required>
                </div>
                <div class="form-group">
                    <label for="session-time">Preferred Time</label>
                    <input type="time" id="session-time" required>
                </div>
                <div class="form-group">
                    <label for="goals">Your Goals</label>
                    <textarea id="goals" placeholder="What do you hope to achieve from these sessions?"></textarea>
                </div>
                <button type="submit" class="cta-button">Confirm Booking</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Form submission
    const form = modal.querySelector('#booking-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real app, you would send this data to your server
        alert(`Your session with ${coachName} has been requested! The coach will contact you to confirm the details.`);
        modal.remove();
    });
}