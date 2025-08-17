// Application Data
document.documentElement.requestFullscreen();
const appData = {
    products: {
        sports: [
            {id: 1, name: "Men's Sports T-shirt", price: 799, rating: 4.2, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop", category: "sports"},
            {id: 2, name: "Athletic Track Jacket", price: 1299, rating: 4.5, image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop", category: "sports"},
            {id: 3, name: "Women's Athleisure", price: 1899, rating: 4.3, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop", category: "sports"},
            {id: 4, name: "Hoodie's", price: 1599, rating: 4.4, image: "https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=300&h=300&fit=crop", category: "sports"}
        ],
        electronics: [
            {id: 5, name: "Wireless Headphones", price: 2999, rating: 4.6, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop", category: "electronics"},
            {id: 6, name: "Smartphone", price: 15999, rating: 4.3, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop", category: "electronics"},
            {id: 7, name: "Laptop", price: 45999, rating: 4.5, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop", category: "electronics"},
            {id: 8, name: "Smart Watch", price: 5999, rating: 4.2, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop", category: "electronics"}
        ],
fashion: [
    {id: 9, name: "Ethnic Lehenga Choli", price: 3499, rating: 4.4, image: "fashion1.webp", category: "fashion"},
    {id: 10, name: "Women's Cargos", price: 1299, rating: 4.3, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop", category: "fashion"},
    {id: 11, name: "Traditional Saree", price: 2199, rating: 4.5, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=300&fit=crop&crop=center", category: "fashion"},
    {id: 12, name: "Kurta Set", price: 1899, rating: 4.2, image: "fashion4.webp", category: "fashion"}
],
        topdeals: [
            {id: 13, name: "Music Instruments", price: 8999, rating: 4.3, image: "topDeal1.webp", category: "topdeals"},
            {id: 14, name: "Fitness Smart Watch", price: 3999, rating: 4.6, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&h=300&fit=crop", category: "topdeals"},
            {id: 15, name: "Travel Umbrella", price: 599, rating: 4.1, image: "topDeal3.webp", category: "topdeals"},
            {id: 16, name: "Toys", price: 899, rating: 4.4, image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=300&fit=crop", category: "topdeals"}
        ]
    },
    categories: [
        {"name": "Grocery", "icon": "🛒", "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=64&h=64&fit=crop"},
        {"name": "Mobiles", "icon": "📱", "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=64&h=64&fit=crop"},
        {"name": "Fashion", "icon": "👗", "image": "https://images.unsplash.com/photo-1445205170230-053b83016050?w=64&h=64&fit=crop"},
        {"name": "Laptops", "icon": "💻", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=64&h=64&fit=crop"},
        {"name": "Home", "icon": "🏠", "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=64&h=64&fit=crop"},
        {"name": "Electronics", "icon": "🔌", "image": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=64&h=64&fit=crop"},
        {"name": "Travel", "icon": "✈️", "image": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=64&h=64&fit=crop"},
        {"name": "Toys", "icon": "🧸", "image": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=64&h=64&fit=crop"},
        {"name": "Bikes", "icon": "🚲", "image": "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=64&h=64&fit=crop"}
    ],
    banners: [
        {image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop", alt: "Summer Sale"},
        {image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=400&fit=crop", alt: "Electronics Deal"},
        {image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=1200&h=400&fit=crop", alt: "Fashion Week"}
    ]
};

// Application State
class AppState {
    constructor() {
        this.cart = [];
        this.user = null;
        this.currentSlide = 0;
        this.searchResults = [];
    }

    addToCart(productId, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const product = this.findProductById(productId);
            if (product) {
                this.cart.push({...product, quantity});
            }
        }
        this.updateCartUI();
        this.showCartNotification();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartUI();
    }

    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
            }
        }
        this.updateCartUI();
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartItemCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    findProductById(id) {
        for (const category in appData.products) {
            const product = appData.products[category].find(p => p.id === id);
            if (product) return product;
        }
        return null;
    }

    showCartNotification() {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = '✓ Added to cart';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-size: 14px;
            animation: slideInRight 0.3s ease;
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2700);
    }

    updateCartUI() {
        const cartCount = document.getElementById('cartCount');
        const cartContent = document.getElementById('cartContent');
        const cartTotal = document.getElementById('cartTotal');

        if (cartCount) cartCount.textContent = this.getCartItemCount();
        if (cartTotal) cartTotal.textContent = this.getCartTotal().toLocaleString();

        if (!cartContent) return;

        if (this.cart.length === 0) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            cartContent.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="app.updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="app.updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                            <button class="remove-item" onclick="app.removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
}

// Initialize app state
const app = new AppState();

// UI Functions
function renderCategories() {
    const container = document.getElementById('categoryContainer');
    if (!container) return;

    container.innerHTML = appData.categories.map(category => `
        <div class="category-item">
            <img src="${category.image}" alt="${category.name}" class="category-icon">
            <span class="category-name">${category.name}</span>
        </div>
    `).join('');
}

function renderBanners() {
    const slider = document.getElementById('heroSlider');
    const indicators = document.getElementById('heroIndicators');
    
    if (!slider || !indicators) return;

    slider.innerHTML = appData.banners.map(banner => `
        <div class="hero-slide">
            <img src="${banner.image}" alt="${banner.alt}">
        </div>
    `).join('');

    indicators.innerHTML = appData.banners.map((_, index) => `
        <div class="indicator ${index === 0 ? 'active' : ''}" onclick="goToSlide(${index})"></div>
    `).join('');
}

function renderProducts(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !appData.products[category]) return;

    container.innerHTML = appData.products[category].map(product => `
        <div class="product-card" onclick="showProductModal(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <div class="product-rating">
                    <span class="rating-stars">${'★'.repeat(Math.floor(product.rating))}</span>
                    <span class="rating-value">(${product.rating})</span>
                </div>
                <div class="product-actions" onclick="event.stopPropagation()">
                    <button class="add-to-cart-btn" onclick="app.addToCart(${product.id})">ADD TO CART</button>
                    <button class="buy-now-btn">BUY NOW</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderAllProducts() {
    renderProducts('sports', 'sportsGrid');
    renderProducts('electronics', 'electronicsGrid');
    renderProducts('fashion', 'fashionGrid');
    renderProducts('topdeals', 'topdealsGrid');
}

// Hero Slider Functions
function goToSlide(slideIndex) {
    const slider = document.getElementById('heroSlider');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!slider) return;

    app.currentSlide = slideIndex;
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === slideIndex);
    });
}

function nextSlide() {
    const nextIndex = (app.currentSlide + 1) % appData.banners.length;
    goToSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (app.currentSlide - 1 + appData.banners.length) % appData.banners.length;
    goToSlide(prevIndex);
}

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function showProductModal(productId) {
    const product = app.findProductById(productId);
    if (!product) return;

    const modalContent = document.getElementById('productModalContent');
    if (modalContent) {
        modalContent.innerHTML = `
            <div class="product-modal-content">
                <div class="product-modal-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-modal-details">
                    <h3>${product.name}</h3>
                    <div class="product-modal-price">₹${product.price.toLocaleString()}</div>
                    <div class="product-modal-rating">
                        <span class="rating-stars">${'★'.repeat(Math.floor(product.rating))}</span>
                        <span class="rating-value">(${product.rating})</span>
                    </div>
                    <div class="product-modal-actions">
                        <button class="add-to-cart-btn" onclick="app.addToCart(${product.id}); hideModal('productModal')">ADD TO CART</button>
                        <button class="buy-now-btn">BUY NOW</button>
                    </div>
                </div>
            </div>
        `;
    }
    showModal('productModal');
}

// Event Listeners
function initEventListeners() {
    // Navigation
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => showModal('authModal'));
    }

    // Cart
    const cartBtn = document.getElementById('cartBtn');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');

    if (cartBtn && cartOverlay) {
        cartBtn.addEventListener('click', () => {
            cartOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeCart && cartOverlay) {
        closeCart.addEventListener('click', () => {
            cartOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) {
                cartOverlay.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Hero Slider
    const heroPrev = document.getElementById('heroPrev');
    const heroNext = document.getElementById('heroNext');

    if (heroPrev) heroPrev.addEventListener('click', prevSlide);
    if (heroNext) heroNext.addEventListener('click', nextSlide);

    // Modal close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal-overlay');
            if (modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMobileMenu = document.getElementById('closeMobileMenu');

    if (mobileMenuBtn && mobileMenuOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('hidden');
        });
    }

    if (closeMobileMenu && mobileMenuOverlay) {
        closeMobileMenu.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('hidden');
        });
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.add('hidden');
            }
        });
    }

    // Close modals when clicking outside
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Auto-slide for hero banner
function startAutoSlide() {
    setInterval(() => {
        nextSlide();
    }, 5000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderCategories();
    renderBanners();
    renderAllProducts();
    initEventListeners();
    startAutoSlide();
    app.updateCartUI();
});

// Make functions global for inline event handlers
window.app = app;
window.showProductModal = showProductModal;
window.hideModal = hideModal;
window.goToSlide = goToSlide;
