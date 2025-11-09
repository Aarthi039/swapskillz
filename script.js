document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Smooth Scrolling for Internal Links
    // ----------------------------------------------------
    
    // Select all links with hashes (#) that point to an ID on the same page
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent the default jump behavior
            e.preventDefault();

            // Get the target element's ID (e.g., '#demo-form')
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Use the built-in smooth scroll behavior
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ----------------------------------------------------
    // 2. Simple Form Submission Handling and Validation
    // ----------------------------------------------------

    const form = document.getElementById('contactForm');
    const emailInput = document.getElementById('emailInput');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', function(e) {
        // Stop the form from submitting normally (which would refresh the page)
        e.preventDefault();

        // Get the trimmed email value
        const email = emailInput.value.trim();

        // Basic validation check
        if (!email) {
            displayMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Simple email format regex (more robust validation would be server-side)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            displayMessage('The email format is invalid.', 'error');
            return;
        }

        // --- Mock Success Action ---
        
        // In a real application, you would send this email to a server here (using fetch() or XMLHttpRequest)
        
        // Clear the input and display success message
        emailInput.value = '';
        displayMessage(`Thank you! We've registered ${email} for early access and a demo.`, 'success');

        // Optional: Disable the button for a moment to prevent multiple clicks
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        setTimeout(() => {
            submitButton.disabled = false;
        }, 3000);
    });

    /**
     * Helper function to display messages on the form.
     * @param {string} message - The text to display.
     * @param {string} type - 'success' or 'error' to style the message.
     */
    function displayMessage(message, type) {
        formMessage.textContent = message;
        
        // Remove existing classes and add the new one for styling
        formMessage.classList.remove('success', 'error');
        formMessage.classList.add(type);

        // Make the message visible (in case it was hidden by default)
        formMessage.style.opacity = 1;
    }
});