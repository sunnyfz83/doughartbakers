// Order confirmation page functionality

// Initialize order confirmation page
document.addEventListener('DOMContentLoaded', function() {
    loadOrderDetails();
    loadCartCount();
    initializeConfirmationActions();
});

// Load order details from localStorage
function loadOrderDetails() {
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    
    if (!order) {
        // Redirect to home if no order found
        window.location.href = 'index.html';
        return;
    }
    
    // Update order information
    document.getElementById('orderNumber').textContent = order.id;
    document.getElementById('orderDate').textContent = formatDate(order.date);
    document.getElementById('paymentMethod').textContent = getPaymentMethodName(order.payment.method);
    document.getElementById('deliveryMethod').textContent = getDeliveryMethodName(order.delivery.method);
    
    // Update delivery address
    const address = order.customer.address;
    document.getElementById('deliveryAddress').innerHTML = `
        <p><strong>${order.customer.firstName} ${order.customer.lastName}</strong></p>
        <p>${address.street}</p>
        <p>${address.city}, ${address.state} ${address.postalCode}</p>
        <p>${address.country}</p>
        <p><strong>Phone:</strong> ${order.customer.phone}</p>
        <p><strong>Email:</strong> ${order.customer.email}</p>
    `;
    
    // Update order items
    const confirmationItems = document.getElementById('confirmationItems');
    let itemsHTML = '';
    
    order.items.forEach(item => {
        const giftInfo = item.giftOptions ? 
            `<div class="gift-info">
                <i class="fas fa-gift"></i>
                Gift: $${(item.giftOptions.giftCard + item.giftOptions.giftWrap + item.giftOptions.giftBag).toFixed(2)}
            </div>` : '';
        
        itemsHTML += `
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
    
    confirmationItems.innerHTML = itemsHTML;
    
    // Update totals
    document.getElementById('confirmationSubtotal').textContent = `$${order.totals.subtotal.toFixed(2)}`;
    document.getElementById('confirmationDelivery').textContent = `$${order.totals.delivery.toFixed(2)}`;
    document.getElementById('confirmationTax').textContent = `$${order.totals.tax.toFixed(2)}`;
    document.getElementById('confirmationTotal').textContent = `$${order.totals.total.toFixed(2)}`;
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

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Get payment method display name
function getPaymentMethodName(method) {
    const methodNames = {
        'cod': 'Cash on Delivery',
        'debitCard': 'Debit Card',
        'jazzcash': 'JazzCash',
        'easypaisa': 'EasyPaisa',
        'qrCode': 'QR Code Payment'
    };
    return methodNames[method] || method;
}

// Get delivery method display name
function getDeliveryMethodName(method) {
    const methodNames = {
        'standard': 'Standard Delivery (3-5 business days)',
        'express': 'Express Delivery (1-2 business days)',
        'sameDay': 'Same Day Delivery (within 4 hours)'
    };
    return methodNames[method] || method;
}

// Track order
function trackOrder() {
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    if (order) {
        showNotification(`Tracking your order ${order.id}. You'll receive updates via SMS and email.`, 'info');
        
        // Simulate tracking page (in a real app, this would redirect to a tracking page)
        setTimeout(() => {
            alert(`Order ${order.id} Status:\n\n✅ Order Confirmed\n🔄 Preparing\n⏳ Out for Delivery\n⏳ Delivered\n\nEstimated delivery: ${getEstimatedDelivery(order.delivery.method)}`);
        }, 1000);
    }
}

// Get estimated delivery time
function getEstimatedDelivery(method) {
    const deliveryTimes = {
        'standard': '3-5 business days',
        'express': '1-2 business days',
        'sameDay': 'Today (within 4 hours)'
    };
    return deliveryTimes[method] || '3-5 business days';
}

// Contact support
function contactSupport() {
    showNotification('Redirecting to customer support...', 'info');
    
    // Simulate support contact (in a real app, this would open a chat or redirect to support)
    setTimeout(() => {
        alert('Customer Support Options:\n\n📞 Phone: +1 (555) 123-4567\n📧 Email: support@sweetdreamsbakery.com\n💬 Live Chat: Available 24/7\n\nWe\'re here to help with any questions about your order!');
    }, 1000);
}

// Print order
function printOrder() {
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    if (order) {
        const printWindow = window.open('', '_blank');
        const printContent = generatePrintContent(order);
        
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
        
        showNotification('Order details sent to printer', 'success');
    }
}

// Generate print content
function generatePrintContent(order) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Order Confirmation - ${order.id}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
                .section { margin-bottom: 25px; }
                .section h3 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
                .item { display: flex; justify-content: space-between; margin-bottom: 10px; }
                .total { font-weight: bold; font-size: 1.2em; }
                .gift-info { color: #666; font-size: 0.9em; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Sweet Dreams Bakery</h1>
                <h2>Order Confirmation</h2>
                <p>Order #${order.id} - ${formatDate(order.date)}</p>
            </div>
            
            <div class="section">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> ${order.customer.firstName} ${order.customer.lastName}</p>
                <p><strong>Email:</strong> ${order.customer.email}</p>
                <p><strong>Phone:</strong> ${order.customer.phone}</p>
            </div>
            
            <div class="section">
                <h3>Delivery Address</h3>
                <p>${order.customer.address.street}</p>
                <p>${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.postalCode}</p>
                <p>${order.customer.address.country}</p>
            </div>
            
            <div class="section">
                <h3>Order Items</h3>
                ${order.items.map(item => `
                    <div class="item">
                        <div>
                            <strong>${item.name} x${item.quantity}</strong>
                            ${item.giftOptions ? `<div class="gift-info">Gift: $${(item.giftOptions.giftCard + item.giftOptions.giftWrap + item.giftOptions.giftBag).toFixed(2)}</div>` : ''}
                        </div>
                        <div>$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="section">
                <h3>Order Summary</h3>
                <div class="item">
                    <span>Subtotal:</span>
                    <span>$${order.totals.subtotal.toFixed(2)}</span>
                </div>
                <div class="item">
                    <span>Delivery:</span>
                    <span>$${order.totals.delivery.toFixed(2)}</span>
                </div>
                <div class="item">
                    <span>Tax:</span>
                    <span>$${order.totals.tax.toFixed(2)}</span>
                </div>
                <div class="item total">
                    <span>Total:</span>
                    <span>$${order.totals.total.toFixed(2)}</span>
                </div>
            </div>
            
            <div class="section">
                <h3>Payment & Delivery</h3>
                <p><strong>Payment Method:</strong> ${getPaymentMethodName(order.payment.method)}</p>
                <p><strong>Delivery Method:</strong> ${getDeliveryMethodName(order.delivery.method)}</p>
            </div>
            
            ${order.notes ? `
            <div class="section">
                <h3>Special Instructions</h3>
                <p>${order.notes}</p>
            </div>
            ` : ''}
            
            <div class="section">
                <p><strong>Thank you for your order!</strong></p>
                <p>We'll start preparing your delicious treats right away.</p>
                <p>For any questions, contact us at support@sweetdreamsbakery.com</p>
            </div>
        </body>
        </html>
    `;
}

// Share order
function shareOrder() {
    const order = JSON.parse(localStorage.getItem('currentOrder'));
    if (order) {
        const shareText = `I just ordered delicious treats from Sweet Dreams Bakery! Order #${order.id} - ${order.items.length} items for $${order.totals.total.toFixed(2)}. Can't wait to try them! 🍰🧁🥐`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My Sweet Dreams Bakery Order',
                text: shareText,
                url: window.location.href
            }).then(() => {
                showNotification('Order shared successfully!', 'success');
            }).catch(() => {
                fallbackShare(shareText);
            });
        } else {
            fallbackShare(shareText);
        }
    }
}

// Fallback share method
function fallbackShare(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Order details copied to clipboard!', 'success');
        });
    } else {
        // Create temporary textarea for copying
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Order details copied to clipboard!', 'success');
    }
}

// Add to cart function (for recommended items)
function addToCart(productName, price, quantity = 1) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: quantity,
            giftOptions: null
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartCount();
    showNotification(`${productName} added to cart!`, 'success');
}

// Initialize confirmation actions
function initializeConfirmationActions() {
    // Add any additional initialization here
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

// Initialize order confirmation page
console.log('Order confirmation page initialized successfully!');

