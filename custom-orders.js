// Custom Cakes page specific functionality

// Form validation and submission
const customOrderForm = document.getElementById('customOrderForm');

if (customOrderForm) {
    customOrderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const orderData = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            orderData[key] = value;
        }
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'description'];
        const missingFields = requiredFields.filter(field => !orderData[field] || orderData[field].trim() === '');
        
        if (missingFields.length > 0) {
            showNotification('Please fill in all required fields: ' + missingFields.join(', '), 'error');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(orderData.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Validate terms acceptance
        if (!orderData.terms) {
            showNotification('Please accept the terms and conditions', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        // Simulate form submission (in real app, this would send to server)
        setTimeout(() => {
            // Store order data in localStorage for demo
            const orders = JSON.parse(localStorage.getItem('customOrders')) || [];
            orders.push({
                ...orderData,
                id: Date.now(),
                status: 'pending',
                submittedAt: new Date().toISOString()
            });
            localStorage.setItem('customOrders', JSON.stringify(orders));
            
            // Show success message
            showNotification('Custom cake request submitted successfully! We\'ll contact you within 24 hours.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        }, 2000);
    });
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Set styles based on type
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;
    
    // Add content styles
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// File upload preview
const fileInput = document.getElementById('reference');
if (fileInput) {
    fileInput.addEventListener('change', function() {
        const files = this.files;
        const maxFiles = 5;
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        if (files.length > maxFiles) {
            showNotification(`Please select no more than ${maxFiles} files`, 'error');
            this.value = '';
            return;
        }
        
        // Check file sizes
        for (let file of files) {
            if (file.size > maxSize) {
                showNotification(`File "${file.name}" is too large. Maximum size is 5MB.`, 'error');
                this.value = '';
                return;
            }
        }
        
        if (files.length > 0) {
            showNotification(`${files.length} file(s) selected successfully`, 'success');
        }
    });
}

// Form field validation on blur
const formInputs = document.querySelectorAll('.custom-form input, .custom-form select, .custom-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        // Remove error state on input
        this.classList.remove('error');
        const errorMsg = this.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Description length validation
    if (fieldName === 'description' && value) {
        if (value.length < 20) {
            isValid = false;
            errorMessage = 'Please provide a more detailed description (at least 20 characters)';
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

// Add error styles to CSS
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #e74c3c;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
    }
`;
document.head.appendChild(errorStyles);

// Gallery hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Process steps animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.step').forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(30px)';
    step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    stepObserver.observe(step);
});

// Character counter for textarea
const descriptionTextarea = document.getElementById('description');
if (descriptionTextarea) {
    const maxLength = 1000;
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        text-align: right;
        font-size: 0.875rem;
        color: #7f8c8d;
        margin-top: 0.25rem;
    `;
    descriptionTextarea.parentNode.appendChild(counter);
    
    function updateCounter() {
        const length = descriptionTextarea.value.length;
        counter.textContent = `${length}/${maxLength}`;
        
        if (length > maxLength * 0.9) {
            counter.style.color = '#e74c3c';
        } else {
            counter.style.color = '#7f8c8d';
        }
    }
    
    descriptionTextarea.addEventListener('input', updateCounter);
    updateCounter();
}

// Initialize custom cakes page
console.log('Custom Cakes page initialized successfully!');
