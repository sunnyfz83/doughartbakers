// Checkout page functionality with payment options

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    loadOrderSummary();
    initializeFormValidation();
    initializePaymentOptions();
    initializeDeliveryOptions();
    loadCartCount();
});

// Load order summary from cart
function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItems = document.getElementById('orderItems');
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    let subtotal = 0;
    let orderHTML = '';
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const giftInfo = item.giftOptions ? 
            `<div class="gift-info">
                <i class="fas fa-gift"></i>
                Gift: $${(item.giftOptions.giftCard + item.giftOptions.giftWrap + item.giftOptions.giftBag).toFixed(2)}
            </div>` : '';
        
        orderHTML += `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${getProductImage(item.name)}" alt="${item.name}">
                </div>
                <div class="order-item-details">
                    <div class="order-item-name">${item.name} x${item.quantity}</div>
                    ${giftInfo}
                    <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            </div>
        `;
    });
    
    orderItems.innerHTML = orderHTML;
    
    // Calculate totals
    const deliveryFee = 2.99;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + deliveryFee + tax;
    
    document.getElementById('orderSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('orderDelivery').textContent = `$${deliveryFee.toFixed(2)}`;
    document.getElementById('orderTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('orderTotal').textContent = `$${total.toFixed(2)}`;
}

// Get product image based on product name
function getProductImage(productName) {
    const imageMap = {
        'Chocolate Delight Cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80',
        'Glazed Donuts (6-pack)': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80',
        'Buttery Croissants (4-pack)': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80',
        'Vanilla Cupcakes (12-pack)': 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80',
        'Artisan Sourdough Bread': 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80',
        'Strawberry Shortcake': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80',
        'Danish Pastries (6-pack)': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80',
        'Blueberry Muffins (8-pack)': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80'
    };
    
    return imageMap[productName] || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80';
}

// Initialize form validation
function initializeFormValidation() {
    const form = document.getElementById('checkoutForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            processOrder();
        }
    });
    
    // Real-time validation
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required`;
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
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Card number validation
    if (fieldName === 'cardNumber' && value) {
        const cardRegex = /^[0-9\s]{13,19}$/;
        if (!cardRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid card number';
        }
    }
    
    // CVV validation
    if (fieldName === 'cvv' && value) {
        const cvvRegex = /^[0-9]{3,4}$/;
        if (!cvvRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid CVV';
        }
    }
    
    // Show error if invalid
    if (!isValid) {
        showFieldError(field, errorMessage);
        field.style.borderColor = '#e74c3c';
    } else {
        field.style.borderColor = '#27ae60';
    }
    
    return isValid;
}

// Get field label
function getFieldLabel(fieldName) {
    const labels = {
        'email': 'Email Address',
        'phone': 'Phone Number',
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'address': 'Street Address',
        'city': 'City',
        'state': 'State/Province',
        'postalCode': 'Postal Code',
        'country': 'Country',
        'cardNumber': 'Card Number',
        'expiryDate': 'Expiry Date',
        'cvv': 'CVV',
        'cardName': 'Name on Card',
        'jazzcashNumber': 'JazzCash Number',
        'jazzcashPin': 'JazzCash PIN',
        'easypaisaNumber': 'EasyPaisa Number',
        'easypaisaPin': 'EasyPaisa PIN'
    };
    return labels[fieldName] || fieldName;
}

// Show field error
function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    `;
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    field.parentNode.appendChild(errorDiv);
}

// Validate entire form
function validateForm() {
    const form = document.getElementById('checkoutForm');
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Check if payment method is selected
    const selectedPayment = form.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        showNotification('Please select a payment method', 'error');
        isValid = false;
    }
    
    // Check if delivery method is selected
    const selectedDelivery = form.querySelector('input[name="delivery"]:checked');
    if (!selectedDelivery) {
        showNotification('Please select a delivery method', 'error');
        isValid = false;
    }
    
    return isValid;
}

// Initialize payment options
function initializePaymentOptions() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            hideAllPaymentDetails();
            
            switch(this.value) {
                case 'debitCard':
                    document.getElementById('cardDetails').style.display = 'block';
                    break;
                case 'jazzcash':
                    document.getElementById('jazzcashDetails').style.display = 'block';
                    break;
                case 'easypaisa':
                    document.getElementById('easypaisaDetails').style.display = 'block';
                    break;
                case 'qrCode':
                    // QR code will be shown after form submission
                    break;
            }
            
            // Show/hide COD option based on country
            const country = document.getElementById('country').value;
            const codOption = document.getElementById('codOption');
            if (country === 'pakistan') {
                codOption.style.display = 'block';
            } else {
                codOption.style.display = 'none';
                if (this.value === 'cod') {
                    document.getElementById('debitCard').checked = true;
                    document.getElementById('cardDetails').style.display = 'block';
                }
            }
        });
    });
    
    // Country change handler
    document.getElementById('country').addEventListener('change', function() {
        const codOption = document.getElementById('codOption');
        if (this.value === 'pakistan') {
            codOption.style.display = 'block';
        } else {
            codOption.style.display = 'none';
            const codRadio = document.getElementById('cod');
            if (codRadio.checked) {
                document.getElementById('debitCard').checked = true;
                document.getElementById('cardDetails').style.display = 'block';
            }
        }
    });
}

// Hide all payment details
function hideAllPaymentDetails() {
    document.getElementById('cardDetails').style.display = 'none';
    document.getElementById('jazzcashDetails').style.display = 'none';
    document.getElementById('easypaisaDetails').style.display = 'none';
}

// Initialize delivery options
function initializeDeliveryOptions() {
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    
    deliveryOptions.forEach(option => {
        option.addEventListener('change', function() {
            updateDeliveryFee(this.value);
        });
    });
}

// Update delivery fee based on selected option
function updateDeliveryFee(deliveryType) {
    const deliveryFees = {
        'standard': 2.99,
        'express': 5.99,
        'sameDay': 9.99
    };
    
    const newFee = deliveryFees[deliveryType] || 2.99;
    document.getElementById('orderDelivery').textContent = `$${newFee.toFixed(2)}`;
    
    // Recalculate total
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const tax = subtotal * 0.1;
    const total = subtotal + newFee + tax;
    document.getElementById('orderTotal').textContent = `$${total.toFixed(2)}`;
}

// Process order
function processOrder() {
    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);
    const selectedPayment = form.querySelector('input[name="payment"]:checked').value;
    
    // Show loading state
    const submitBtn = document.getElementById('placeOrderBtn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    // Simulate processing delay
    setTimeout(() => {
        if (selectedPayment === 'qrCode') {
            showQRPaymentModal();
        } else {
            completeOrder();
        }
        
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 2000);
}

// Show QR payment modal
function showQRPaymentModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const deliveryFee = parseFloat(document.getElementById('orderDelivery').textContent.replace('$', ''));
    const tax = subtotal * 0.1;
    const total = subtotal + deliveryFee + tax;
    
    document.getElementById('qrAmount').textContent = `$${total.toFixed(2)}`;
    document.getElementById('qrOrderId').textContent = `#SWD-${Date.now()}`;
    
    const modal = document.getElementById('qrModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Close modal handlers
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = closeQRModal;
    
    window.onclick = function(event) {
        if (event.target === modal) {
            closeQRModal();
        }
    };
}

// Close QR modal
function closeQRModal() {
    document.getElementById('qrModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Check QR payment
function checkQRPayment() {
    // Simulate payment verification
    showNotification('Payment verified! Processing your order...', 'success');
    setTimeout(() => {
        closeQRModal();
        completeOrder();
    }, 1500);
}

// Complete order
function completeOrder() {
    const form = document.getElementById('checkoutForm');
    const formData = new FormData(form);
    
    // Create order object
    const order = {
        id: `SWD-${Date.now()}`,
        date: new Date().toISOString(),
        customer: {
            email: formData.get('email'),
            phone: formData.get('phone'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            address: {
                street: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                postalCode: formData.get('postalCode'),
                country: formData.get('country')
            }
        },
        delivery: {
            method: formData.get('delivery'),
            fee: parseFloat(document.getElementById('orderDelivery').textContent.replace('$', ''))
        },
        payment: {
            method: formData.get('payment'),
            details: getPaymentDetails(formData)
        },
        items: JSON.parse(localStorage.getItem('cart')) || [],
        notes: formData.get('orderNotes') || '',
        status: 'confirmed'
    };
    
    // Calculate totals
    let subtotal = 0;
    order.items.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    order.totals = {
        subtotal: subtotal,
        delivery: order.delivery.fee,
        tax: subtotal * 0.1,
        total: subtotal + order.delivery.fee + (subtotal * 0.1)
    };
    
    // Store order
    localStorage.setItem('currentOrder', JSON.stringify(order));
    localStorage.setItem('orderHistory', JSON.stringify([order]));
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Redirect to confirmation
    window.location.href = 'order-confirmation.html';
}

// Get payment details based on selected method
function getPaymentDetails(formData) {
    const paymentMethod = formData.get('payment');
    
    switch(paymentMethod) {
        case 'debitCard':
            return {
                cardNumber: formData.get('cardNumber'),
                expiryDate: formData.get('expiryDate'),
                cvv: formData.get('cvv'),
                cardName: formData.get('cardName')
            };
        case 'jazzcash':
            return {
                number: formData.get('jazzcashNumber'),
                pin: formData.get('jazzcashPin')
            };
        case 'easypaisa':
            return {
                number: formData.get('easypaisaNumber'),
                pin: formData.get('easypaisaPin')
            };
        case 'cod':
            return {
                method: 'Cash on Delivery'
            };
        case 'qrCode':
            return {
                method: 'QR Code Payment'
            };
        default:
            return {};
    }
}

// Load cart count in header
function loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
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
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
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

// Initialize checkout page
console.log('Checkout page with payment options initialized successfully!');

