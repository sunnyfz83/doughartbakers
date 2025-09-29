// Bakery shop page specific functionality

// Filter functionality
const categoryFilter = document.querySelector('select[name="category"]');
const priceFilter = document.querySelector('select[name="price"]');
const sortFilter = document.querySelector('select[name="sort"]');

function filterProducts() {
    const products = document.querySelectorAll('.product-card');
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;
    const sortBy = sortFilter.value;

    let filteredProducts = Array.from(products);

    // Filter by category (bakery items)
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
                case '0-50':
                    return price <= 50;
                case '50-100':
                    return price > 50 && price <= 100;
                case '100-200':
                    return price > 100 && price <= 200;
                case '200+':
                    return price > 200;
                default:
                    return true;
            }
        });
    }

    // Sort products
    filteredProducts.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);
        
        switch (sortBy) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'newest':
                // For demo purposes, we'll use a random order
                return Math.random() - 0.5;
            case 'rating':
                // For demo purposes, we'll use a random order
                return Math.random() - 0.5;
            default:
                return 0;
        }
    });

    // Hide all products first
    products.forEach(product => {
        product.style.display = 'none';
    });

    // Show filtered and sorted products
    filteredProducts.forEach(product => {
        product.style.display = 'block';
    });

    // Show message if no products match
    const productsGrid = document.querySelector('.products-grid');
    let noResultsMessage = document.querySelector('.no-results');
    
    if (filteredProducts.length === 0) {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'no-results';
            noResultsMessage.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #7f8c8d;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters to see more results.</p>
                </div>
            `;
            productsGrid.appendChild(noResultsMessage);
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

// Add event listeners to filters
if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
if (priceFilter) priceFilter.addEventListener('change', filterProducts);
if (sortFilter) sortFilter.addEventListener('change', filterProducts);

// Enhanced search functionality for bakery shop page
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

// Add to cart functionality for shop page
document.querySelectorAll('.product-card .btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get product info
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        // Add to cart
        addToCart(productName, productPrice);
        
        // Show success message
        showNotification(`${productName} added to cart!`);
        
        // Add visual feedback
        this.textContent = 'Added!';
        this.style.background = '#27ae60';
        
        setTimeout(() => {
            this.textContent = 'Add to Cart';
            this.style.background = '#e74c3c';
        }, 2000);
    });
});

// Add to cart function
function addToCart(productName, productPrice) {
    let cartCount = parseInt(document.querySelector('.cart-count').textContent) || 0;
    cartCount++;
    document.querySelector('.cart-count').textContent = cartCount;
    
    // Add animation to cart icon
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
    
    // Store cart data in localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart count from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
});

// Product hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Initialize bakery shop page
console.log('Bakery shop page initialized successfully!');
