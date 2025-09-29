// Cart page functionality

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    updateCartSummary();
    initializeCartActions();
    loadCartCount();
});

// Load cart items from localStorage
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cartItemsList');
    const itemCount = document.querySelector('.item-count');
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        itemCount.textContent = '0 items';
        return;
    }
    
    let totalItems = 0;
    let cartHTML = '';
    
    cart.forEach((item, index) => {
        totalItems += item.quantity;
        const giftInfo = item.giftOptions ? 
            `<div class="gift-info">
                <i class="fas fa-gift"></i>
                Gift: $${(item.giftOptions.giftCard + item.giftOptions.giftWrap + item.giftOptions.giftBag).toFixed(2)}
            </div>` : '';
        
        cartHTML += `
            <div class="cart-item" data-index="${index}">
                <div class="cart-item-image">
                    <img src="${getProductImage(item.name)}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-header">
                        <div class="cart-item-info">
                            <h3>${item.name}</h3>
                            ${giftInfo}
                        </div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" onchange="updateQuantity(${index}, 0, this.value)">
                            <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                        <button class="remove-item" onclick="removeItem(${index})" title="Remove item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItemsList.innerHTML = cartHTML;
    itemCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
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

// Update item quantity
function updateQuantity(index, delta, newValue = null) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (newValue !== null) {
        cart[index].quantity = Math.max(1, Math.min(10, parseInt(newValue)));
    } else {
        cart[index].quantity = Math.max(1, Math.min(10, cart[index].quantity + delta));
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartSummary();
    loadCartCount();
    
    // Add animation to quantity input
    const quantityInput = document.querySelector(`[data-index="${index}"] .quantity-input`);
    if (quantityInput) {
        quantityInput.style.transform = 'scale(1.1)';
        setTimeout(() => {
            quantityInput.style.transform = 'scale(1)';
        }, 200);
    }
}

// Remove item from cart
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart[index];
    
    // Show confirmation
    if (confirm(`Remove "${item.name}" from your cart?`)) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartSummary();
        loadCartCount();
        
        showNotification(`${item.name} removed from cart`, 'info');
    }
}

// Update cart summary
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (cart.length === 0) {
        document.getElementById('subtotal').textContent = '$0.00';
        document.getElementById('total').textContent = '$0.00';
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'Cart is Empty';
        return;
    }
    
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const deliveryFee = 2.99;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + deliveryFee + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('deliveryFee').textContent = `$${deliveryFee.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    checkoutBtn.disabled = false;
    checkoutBtn.textContent = 'Proceed to Checkout';
}

// Apply promo code
function applyPromoCode() {
    const promoCode = document.getElementById('promoCode').value.trim().toUpperCase();
    const discountRow = document.querySelector('.discount-row');
    const discountElement = document.getElementById('discount');
    
    // Valid promo codes
    const validCodes = {
        'WELCOME10': 10,
        'SAVE20': 20,
        'BAKERY15': 15,
        'NEWUSER': 25
    };
    
    if (validCodes[promoCode]) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        
        const discount = (subtotal * validCodes[promoCode]) / 100;
        const deliveryFee = 2.99;
        const tax = (subtotal - discount) * 0.1;
        const total = subtotal - discount + deliveryFee + tax;
        
        discountElement.textContent = `-$${discount.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
        discountRow.style.display = 'flex';
        
        // Store applied promo code
        localStorage.setItem('appliedPromoCode', promoCode);
        
        showNotification(`Promo code "${promoCode}" applied! ${validCodes[promoCode]}% discount`, 'success');
        document.getElementById('promoCode').value = '';
    } else {
        showNotification('Invalid promo code', 'error');
    }
}

// Proceed to checkout
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    window.location.href = 'checkout.html';
}

// Add recommended item to cart
function addRecommendedToCart(productId, productName, price) {
    addToCart(productName, price, 1);
    showNotification(`${productName} added to cart!`, 'success');
    loadCartItems();
    updateCartSummary();
    loadCartCount();
}

// Initialize cart actions
function initializeCartActions() {
    // Promo code input enter key
    const promoInput = document.getElementById('promoCode');
    if (promoInput) {
        promoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyPromoCode();
            }
        });
    }
}

// Load cart count in header
function loadCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// Add to cart function (shared with other pages)
function addToCart(productName, price, quantity = 1, giftOptions = null) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === productName && 
        JSON.stringify(item.giftOptions) === JSON.stringify(giftOptions));
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: quantity,
            giftOptions: giftOptions
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
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

// Initialize cart page
console.log('Cart page initialized successfully!');

