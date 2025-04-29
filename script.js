// Cart functionality
let cart = [];
const cartCount = document.getElementById('cart-count');

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        const productImage = productCard.querySelector('img').src;
        
        // Add product to cart
        cart.push({
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
        
        // Update cart count
        updateCartCount();
        
        // Show notification
        showNotification(`${productName} added to cart!`);
        
        // Save cart to localStorage
        saveCart();
    });
});

// Update cart count
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add styles
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = '#2ecc71';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
        if (window.location.pathname.includes('cart.html')) {
            displayCart();
        }
    }
}

// Display cart items
function displayCart() {
    const cartItems = document.querySelector('.cart-items');
    if (!cartItems) return;

    cartItems.innerHTML = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace('R', '').replace(',', ''));
        const itemTotal = price * item.quantity;
        subtotal += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeItem(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });

    updateCartSummary(subtotal);
}

// Update item quantity
function updateQuantity(index, change) {
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    saveCart();
    displayCart();
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
    updateCartCount();
}

// Update cart summary
function updateCartSummary(subtotal) {
    const shipping = subtotal > 1000 ? 0 : 100;
    const tax = subtotal * 0.15;
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = `R${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `R${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `R${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `R${total.toFixed(2)}`;
}

// Initialize cart
loadCart();

// Newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // Here you would typically send the email to your server
    // For now, we'll just show a success message
    showNotification('Thank you for subscribing to our newsletter!');
    this.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle (for smaller screens)
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '☰';
    
    // Add styles
    menuButton.style.display = 'none';
    menuButton.style.background = 'none';
    menuButton.style.border = 'none';
    menuButton.style.fontSize = '24px';
    menuButton.style.cursor = 'pointer';
    
    nav.insertBefore(menuButton, nav.firstChild);
    
    const navLinks = document.querySelector('.nav-links');
    
    menuButton.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Show/hide menu button based on screen size
    const checkScreenSize = () => {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
            navLinks.style.display = 'none';
        } else {
            menuButton.style.display = 'none';
            navLinks.style.display = 'flex';
        }
    };
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
};

// Initialize mobile menu
createMobileMenu();

// Product hover effect
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Product filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const subject = this.querySelector('#subject').value;
        const message = this.querySelector('#message').value;

        // Here you would typically send the form data to your server
        // For now, we'll just show a success message
        showNotification('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Authentication functionality
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

if (authTabs.length > 0) {
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}-form`).classList.add('active');
        });
    });
}

// Password visibility toggle
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        
        // Toggle eye icon
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
});

// Sign In form handling
const signinForm = document.getElementById('signin-form');
if (signinForm) {
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('#signin-email').value;
        const password = this.querySelector('#signin-password').value;
        const rememberMe = this.querySelector('#remember-me').checked;

        // Here you would typically send the login data to your server
        // For now, we'll just show a success message
        showNotification('Sign in successful!');
        
        // Store user session if remember me is checked
        if (rememberMe) {
            localStorage.setItem('user', JSON.stringify({ email }));
        }
        
        // Redirect to home page
        window.location.href = 'index.html';
    });
}

// Register form handling
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('#register-name').value;
        const email = this.querySelector('#register-email').value;
        const password = this.querySelector('#register-password').value;
        const confirmPassword = this.querySelector('#register-confirm-password').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }
        
        // Here you would typically send the registration data to your server
        // For now, we'll just show a success message
        showNotification('Registration successful! Please sign in.');
        
        // Switch to sign in tab
        document.querySelector('[data-tab="signin"]').click();
    });
}

// Social login buttons
document.querySelectorAll('.social-btn').forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
        // Here you would typically implement social login
        showNotification(`${provider} login coming soon!`);
    });
});

// Check user authentication status
function checkAuth() {
    const user = localStorage.getItem('user');
    if (user) {
        // User is logged in
        const userData = JSON.parse(user);
        // Update UI to show logged-in state
        const navLinks = document.querySelector('.nav-links');
        const userLink = document.createElement('li');
        userLink.innerHTML = `
            <a href="#" class="user-link">
                <i class="fas fa-user"></i> ${userData.email}
            </a>
        `;
        navLinks.appendChild(userLink);
    }
}

// Initialize authentication check
checkAuth();

// Search functionality
const searchInput = document.createElement('input');
searchInput.type = 'search';
searchInput.placeholder = 'Search products...';
searchInput.className = 'search-input';

const searchContainer = document.createElement('div');
searchContainer.className = 'search-container';
searchContainer.appendChild(searchInput);

// Add search to navigation
const nav = document.querySelector('nav');
if (nav) {
    nav.insertBefore(searchContainer, nav.querySelector('.cart-icon'));
}

// Search functionality
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDescription = card.querySelector('.price').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Currency conversion functionality
const API_KEY = '0cf1e41b69417c4d3222e81ed33a1dbf';
const BASE_CURRENCY = 'ZAR';
let exchangeRates = {
    ZAR: 1,
    USD: 0.053,
    EUR: 0.049,
    GBP: 0.042
};

const currencySymbols = {
    ZAR: 'R',
    USD: '$',
    EUR: '€',
    GBP: '£'
};

// Fetch exchange rates from API
async function fetchExchangeRates() {
    try {
        const response = await fetch(`http://api.exchangerate.host/live?access_key=${API_KEY}&base=${BASE_CURRENCY}`);
        const data = await response.json();
        
        if (data.success) {
            exchangeRates = {
                ZAR: 1,
                USD: data.quotes.USD,
                EUR: data.quotes.EUR,
                GBP: data.quotes.GBP
            };
            
            // Update prices with new rates
            updateAllPrices();
            
            // Store rates in localStorage with timestamp
            localStorage.setItem('exchangeRates', JSON.stringify({
                rates: exchangeRates,
                timestamp: Date.now()
            }));
        } else {
            console.error('Failed to fetch exchange rates:', data.error);
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        // Use cached rates if available
        const cachedRates = localStorage.getItem('exchangeRates');
        if (cachedRates) {
            const { rates, timestamp } = JSON.parse(cachedRates);
            // Use cached rates if they're less than 1 hour old
            if (Date.now() - timestamp < 3600000) {
                exchangeRates = rates;
            }
        }
    }
}

// Get current currency from localStorage or default to ZAR
let currentCurrency = localStorage.getItem('currency') || 'ZAR';

// Update currency selector
const currencySelect = document.getElementById('currency-select');
if (currencySelect) {
    currencySelect.value = currentCurrency;
    
    currencySelect.addEventListener('change', function() {
        currentCurrency = this.value;
        localStorage.setItem('currency', currentCurrency);
        updateAllPrices();
    });
}

// Convert price to selected currency
function convertPrice(price, fromCurrency = BASE_CURRENCY) {
    const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ''));
    const convertedPrice = numericPrice * exchangeRates[currentCurrency];
    return convertedPrice.toFixed(2);
}

// Format price with currency symbol
function formatPrice(price) {
    return `${currencySymbols[currentCurrency]}${price}`;
}

// Update all prices on the page
function updateAllPrices() {
    // Update product prices
    document.querySelectorAll('.price').forEach(priceElement => {
        const originalPrice = priceElement.getAttribute('data-original-price') || priceElement.textContent;
        if (!priceElement.hasAttribute('data-original-price')) {
            priceElement.setAttribute('data-original-price', originalPrice);
        }
        const convertedPrice = convertPrice(originalPrice);
        priceElement.textContent = formatPrice(convertedPrice);
    });

    // Update cart summary if on cart page
    if (window.location.pathname.includes('cart.html')) {
        updateCartSummary();
    }
}

// Initialize prices and fetch exchange rates
document.addEventListener('DOMContentLoaded', function() {
    // Check if we have cached rates
    const cachedRates = localStorage.getItem('exchangeRates');
    if (cachedRates) {
        const { rates, timestamp } = JSON.parse(cachedRates);
        // Use cached rates if they're less than 1 hour old
        if (Date.now() - timestamp < 3600000) {
            exchangeRates = rates;
        } else {
            // Fetch new rates if cache is old
            fetchExchangeRates();
        }
    } else {
        // Fetch rates if no cache exists
        fetchExchangeRates();
    }
    
    updateAllPrices();
});

// Update cart summary with converted prices
function updateCartSummary(subtotal) {
    if (!subtotal) {
        subtotal = 0;
        cart.forEach(item => {
            const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
            subtotal += price * item.quantity;
        });
    }

    const shipping = subtotal > 1000 ? 0 : 100;
    const tax = subtotal * 0.15;
    const total = subtotal + shipping + tax;

    document.getElementById('subtotal').textContent = formatPrice(convertPrice(subtotal.toString()));
    document.getElementById('shipping').textContent = formatPrice(convertPrice(shipping.toString()));
    document.getElementById('tax').textContent = formatPrice(convertPrice(tax.toString()));
    document.getElementById('total').textContent = formatPrice(convertPrice(total.toString()));
} 