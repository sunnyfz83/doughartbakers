// Products page functionality with gift options and enhanced features

// Product data
const productData = {
    'chocolate-cake': {
        name: 'Chocolate Art Sculpture',
        price: 24.99,
        rating: 4.9,
        description: 'Handcrafted chocolate dough art sculpture with intricate details and smooth finish. A masterpiece for any special occasion.',
        images: [
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80'
        ]
    },
    'glazed-donuts': {
        name: 'Glazed Dough Art Rings (6-pack)',
        price: 8.99,
        rating: 4.8,
        description: 'Artistically crafted glazed dough rings with perfect texture and sweetness. Each piece is a work of edible art.',
        images: [
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80'
        ]
    },
    'croissants': {
        name: 'Buttery Croissants (4-pack)',
        price: 6.99,
        rating: 5.0,
        description: 'Authentic French croissants with layers of buttery goodness. Perfect for breakfast or as a light snack.',
        images: [
            'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80'
        ]
    },
    'vanilla-cupcakes': {
        name: 'Vanilla Cupcakes (12-pack)',
        price: 18.99,
        rating: 4.7,
        description: 'Delicate vanilla cupcakes topped with smooth vanilla frosting. Perfect for parties and special occasions.',
        images: [
            'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80'
        ]
    },
    'sourdough-bread': {
        name: 'Artisan Sourdough Bread',
        price: 4.99,
        rating: 4.5,
        description: 'Traditional sourdough bread made with natural fermentation. Perfect crust and tangy flavor.',
        images: [
            'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80'
        ]
    },
    'strawberry-cake': {
        name: 'Strawberry Shortcake',
        price: 32.99,
        rating: 4.9,
        description: 'Light and fluffy cake layered with fresh strawberries and whipped cream. A summer favorite!',
        images: [
            'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80'
        ]
    },
    'danish-pastries': {
        name: 'Danish Pastries (6-pack)',
        price: 12.99,
        rating: 4.8,
        description: 'Flaky Danish pastries with various fillings. A perfect breakfast treat or afternoon snack.',
        images: [
            'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80'
        ]
    },
    'blueberry-muffins': {
        name: 'Blueberry Muffins (8-pack)',
        price: 9.99,
        rating: 4.6,
        description: 'Moist blueberry muffins bursting with fresh blueberries. Perfect for breakfast or a healthy snack.',
        images: [
            'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80',
            'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80'
        ]
    }
};

// Global variables
let currentProduct = null;
let giftOptions = {
    giftCard: 0,
    giftWrap: 0,
    giftBag: 0
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeQuickView();
    initializeGiftOptions();
    initializeAddToCart();
    loadCartCount();
});

// Filter functionality
function initializeFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');

    if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
    if (priceFilter) priceFilter.addEventListener('change', filterProducts);
    if (sortFilter) sortFilter.addEventListener('change', filterProducts);
}

function filterProducts() {
    const products = document.querySelectorAll('.product-card');
    const category = document.getElementById('categoryFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    const sortBy = document.getElementById('sortFilter').value;

    let filteredProducts = Array.from(products);

    // Filter by category
    if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.dataset.category === category
        );
    }

    // Filter by price
    if (priceRange && priceRange !== 'all') {
        filteredProducts = filteredProducts.filter(product => {
            const price = parseFloat(product.dataset.price);
            switch (priceRange) {
                case '0-10':
                    return price <= 10;
                case '10-20':
                    return price > 10 && price <= 20;
                case '20-30':
                    return price > 20 && price <= 30;
                case '30+':
                    return price > 30;
                default:
                    return true;
            }
        });
    }

    // Sort products
    filteredProducts.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);
        const ratingA = parseFloat(a.dataset.rating);
        const ratingB = parseFloat(b.dataset.rating);
        
        switch (sortBy) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'rating':
                return ratingB - ratingA;
            case 'newest':
                return Math.random() - 0.5; // Random for demo
            default:
                return 0;
        }
    });

    // Hide all products first
    products.forEach(product => {
        product.style.display = 'none';
    });

    // Show filtered and sorted products with animation
    filteredProducts.forEach((product, index) => {
        setTimeout(() => {
            product.style.display = 'block';
            product.style.animation = 'fadeInUp 0.6s ease forwards';
        }, index * 100);
    });
}

// Quick View functionality
function initializeQuickView() {
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const modal = document.getElementById('quickViewModal');
    const closeBtn = document.querySelector('.close');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.product;
            showQuickView(productId);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

function showQuickView(productId) {
    const product = productData[productId];
    if (!product) return;

    currentProduct = productId;

    // Update modal content
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalPrice').textContent = `$${product.price}`;
    document.getElementById('modalDescription').textContent = product.description;
    
    // Update rating
    const ratingElement = document.getElementById('modalRating');
    ratingElement.innerHTML = generateStars(product.rating);
    
    // Update review count
    document.getElementById('modalReviewCount').textContent = `(${Math.floor(Math.random() * 50) + 20} reviews)`;

    // Update images
    const mainImage = document.getElementById('modalMainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    mainImage.src = product.images[0];
    product.images.forEach((img, index) => {
        if (thumbnails[index]) {
            thumbnails[index].src = img;
            thumbnails[index].classList.toggle('active', index === 0);
        }
    });

    // Show modal
    document.getElementById('quickViewModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function closeModal() {
    document.getElementById('quickViewModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Quantity controls
function changeQuantity(delta) {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    const newValue = Math.max(1, Math.min(10, currentValue + delta));
    quantityInput.value = newValue;
}

// Gift options functionality
function initializeGiftOptions() {
    const giftCheckboxes = document.querySelectorAll('.gift-option');
    const giftModal = document.getElementById('giftModal');
    const closeGiftBtn = giftModal.querySelector('.close');

    giftCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                const productId = this.dataset.product;
                showGiftModal(productId);
            }
        });
    });

    if (closeGiftBtn) {
        closeGiftBtn.addEventListener('click', closeGiftModal);
    }

    // Gift option change handlers
    document.querySelectorAll('input[name="giftCard"]').forEach(input => {
        input.addEventListener('change', updateGiftSummary);
    });

    document.querySelectorAll('input[name="giftWrap"]').forEach(input => {
        input.addEventListener('change', updateGiftSummary);
    });

    document.querySelectorAll('input[name="giftBag"]').forEach(input => {
        input.addEventListener('change', updateGiftSummary);
    });
}

function showGiftModal(productId) {
    const product = productData[productId];
    if (!product) return;

    currentProduct = productId;
    document.getElementById('giftProductName').textContent = product.name;
    
    // Reset gift options
    giftOptions = { giftCard: 0, giftWrap: 0, giftBag: 0 };
    updateGiftSummary();
    
    document.getElementById('giftModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function updateGiftSummary() {
    // Get selected gift card
    const selectedGiftCard = document.querySelector('input[name="giftCard"]:checked');
    giftOptions.giftCard = selectedGiftCard ? parseFloat(selectedGiftCard.value) : 0;

    // Get selected gift wrap
    const selectedGiftWrap = document.querySelector('input[name="giftWrap"]:checked');
    giftOptions.giftWrap = selectedGiftWrap ? parseFloat(selectedGiftWrap.value) : 0;

    // Get selected gift bag
    const selectedGiftBag = document.querySelector('input[name="giftBag"]:checked');
    giftOptions.giftBag = selectedGiftBag ? parseFloat(selectedGiftBag.value) : 0;

    // Update summary
    document.getElementById('giftCardPrice').textContent = `$${giftOptions.giftCard.toFixed(2)}`;
    document.getElementById('giftWrapPrice').textContent = `$${giftOptions.giftWrap.toFixed(2)}`;
    document.getElementById('giftBagPrice').textContent = `$${giftOptions.giftBag.toFixed(2)}`;

    const total = giftOptions.giftCard + giftOptions.giftWrap + giftOptions.giftBag;
    document.getElementById('giftTotalPrice').textContent = `$${total.toFixed(2)}`;
}

function closeGiftModal() {
    document.getElementById('giftModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Uncheck gift checkboxes
    document.querySelectorAll('.gift-option').forEach(checkbox => {
        checkbox.checked = false;
    });
}

function addGiftToCart() {
    if (!currentProduct) return;

    const product = productData[currentProduct];
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    
    // Calculate total price including gift options
    const totalGiftCost = giftOptions.giftCard + giftOptions.giftWrap + giftOptions.giftBag;
    const totalPrice = (product.price * quantity) + totalGiftCost;

    // Add to cart
    addToCart(product.name, totalPrice, quantity, {
        giftCard: giftOptions.giftCard,
        giftWrap: giftOptions.giftWrap,
        giftBag: giftOptions.giftBag
    });

    showNotification(`${product.name} with gift options added to cart!`, 'success');
    closeGiftModal();
}

// Add to cart functionality
function initializeAddToCart() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const modalAddToCartBtn = document.querySelector('.add-to-cart-modal');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.product;
            addProductToCart(productId);
        });
    });

    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', function() {
            if (currentProduct) {
                addProductToCart(currentProduct);
                closeModal();
            }
        });
    }
}

function addProductToCart(productId) {
    const product = productData[productId];
    if (!product) return;

    addToCart(product.name, product.price, 1);
    showNotification(`${product.name} added to cart!`, 'success');
}

function addToCart(productName, price, quantity = 1, giftOptions = null) {
    let cartCount = parseInt(document.querySelector('.cart-count').textContent) || 0;
    cartCount += quantity;
    document.querySelector('.cart-count').textContent = cartCount;
    
    // Add animation to cart icon
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
    
    // Store cart data in localStorage
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

// Thumbnail image switching
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('thumbnail')) {
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('modalMainImage');
        
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        e.target.classList.add('active');
        mainImage.src = e.target.src;
    }
});

// Product zoom functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('.zoom-overlay')) {
        const mainImage = document.getElementById('modalMainImage');
        // Simple zoom effect - in a real app, you'd implement a proper zoom modal
        mainImage.style.transform = 'scale(1.5)';
        setTimeout(() => {
            mainImage.style.transform = 'scale(1)';
        }, 2000);
    }
});

// Search functionality
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productCategory = card.dataset.category.toLowerCase();
            
            if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = searchTerm ? 'none' : 'block';
            }
        });
    });
}

// Initialize products page
console.log('Products page with gift options initialized successfully!');
