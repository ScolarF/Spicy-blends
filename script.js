// ====================================
// SPICY BLENDS - INTERACTIVE FEATURES
// ====================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ====================================
    // RENDER PRODUCTS DYNAMICALLY
    // ====================================
    const pricingGrid = document.getElementById('pricing-grid');

    function renderProducts(productsToRender) {
        if (!pricingGrid) return;
        pricingGrid.innerHTML = ''; // Clear existing

        productsToRender.forEach(product => {
            const card = document.createElement('div');
            card.className = 'price-card';
            card.id = `product-${product.id}`;
            card.setAttribute('data-category', product.category);

            // Determine display price (using the raw string from file)
            // Format: 350000 -> 350,000 L.L. (optional formatting)
            const formattedPrice = parseInt(product.price).toLocaleString() + ' L.L.';

            card.innerHTML = `
                <div class="price-card-inner">
                    <div class="card-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <h4 class="spice-name">${product.name}</h4>
                    <p class="spice-name-en">${product.nameEn || ''}</p>
                    <div class="price">${formattedPrice}</div>
                    <p class="description">${product.weight}</p>
                </div>
            `;
            pricingGrid.appendChild(card);
        });
    }

    // Initial Render (using global products array from products_data.js)
    if (typeof products !== 'undefined') {
        renderProducts(products);
    } else {
        console.error('Products data not found!');
    }

    // ====================================
    // PARALLAX SCROLLING EFFECT
    // ====================================
    const floatingElements = document.querySelectorAll('.floating-spice');

    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;

        floatingElements.forEach(element => {
            const speed = element.dataset.speed || 1;
            const yPos = -(scrolled * speed / 10);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });


    // ====================================
    // SMOOTH SCROLL FOR NAVIGATION
    // ====================================
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only smooth scroll for anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // ====================================
    // PRICE CARD INTERACTIONS & MODAL
    // ====================================
    // Select cards AFTER they have been rendered
    const priceCards = document.querySelectorAll('.price-card');
    const weightModal = document.getElementById('weight-modal');
    const modalSpiceName = document.getElementById('modal-spice-name');
    const weightBtns = document.querySelectorAll('.weight-btn');
    const customWeightInput = document.getElementById('custom-weight-input');

    let selectedSpice = null;
    let selectedWeight = null;

    priceCards.forEach(card => {
        // Add click effect & Open Modal
        card.addEventListener('click', function () {
            // Animation
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'scale(1.05)';
            }, 150);

            // Open Modal Logic
            selectedSpice = this.querySelector('.spice-name').textContent;
            modalSpiceName.textContent = selectedSpice;
            weightModal.classList.add('show');

            // Reset selection
            selectedWeight = null;
            weightBtns.forEach(btn => btn.classList.remove('selected'));
            if (customWeightInput) customWeightInput.value = '';
        });

        // Enhanced hover tracking for cursor-based invert effect
        card.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Optional: Add subtle rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });


    // ====================================
    // INTERSECTION OBSERVER FOR FADE-IN
    // ====================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe pricing cards for staggered fade-in
    priceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        // Limit stagger delay for large lists to avoid waiting too long
        const delay = Math.min(index * 0.05, 1.0);
        card.style.transition = `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`;
        observer.observe(card);
    });


    // ====================================
    // GRAIN ANIMATION RANDOMIZATION
    // ====================================
    const grainOverlay = document.querySelector('.grain-overlay');

    // Add random grain patterns
    if (grainOverlay) {
        setInterval(() => {
            const randomOpacity = 0.1 + Math.random() * 0.1;
            grainOverlay.style.opacity = randomOpacity;
        }, 100);
    }


    // ====================================
    // HEADER BACKGROUND ON SCROLL
    // ====================================
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(5, 5, 5, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.backgroundColor = 'rgba(5, 5, 5, 0.95)';
            header.style.boxShadow = 'none';
        }
    });


    // ====================================
    // CONSOLE EASTER EGG
    // ====================================
    console.log('%c🌶️ Spicy Blends', 'font-size: 24px; font-weight: bold; color: #F0F0F0; background: #050505; padding: 10px;');
    console.log('%cاكتشف النكهة - Explore the Flavor', 'font-size: 14px; color: #F0F0F0;');
    console.log('%cWebsite crafted with love and spices ✨', 'font-size: 12px; color: #999;');


    // ====================================
    // SEARCH & CATEGORY FILTERING (ENHANCED)
    // ====================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('spice-search');

    let currentCategory = 'all';
    let currentSearchTerm = '';
    let searchTimeout = null;

    // Remove Arabic diacritics for better matching
    function removeDiacritics(text) {
        return text.replace(/[\u064B-\u065F\u0670]/g, ''); // Remove Arabic diacritics
    }

    // Normalize text for search (lowercase, remove diacritics, trim)
    function normalizeText(text) {
        return removeDiacritics(text.toLowerCase().trim());
    }

    // Check if search terms match (supports multi-word search)
    function matchesSearchTerms(text, searchTerms) {
        if (!searchTerms || searchTerms.length === 0) return true;

        const normalizedText = normalizeText(text);

        // Check if ALL search terms are found in the text
        return searchTerms.every(term => {
            // Exact match or fuzzy match (allows for minor typos)
            if (normalizedText.includes(term)) return true;

            // Check word-by-word for partial matches
            const words = normalizedText.split(/\s+/);
            return words.some(word => {
                // Match if word starts with the search term
                if (word.startsWith(term)) return true;

                // Fuzzy match: allow 1 character difference for terms > 3 chars
                if (term.length > 3 && word.length > 3) {
                    let differences = 0;
                    const minLen = Math.min(word.length, term.length);
                    for (let i = 0; i < minLen; i++) {
                        if (word[i] !== term[i]) differences++;
                        if (differences > 1) return false;
                    }
                    return differences <= 1;
                }
                return false;
            });
        });
    }

    function filterCards() {
        // Split search term into individual words for multi-word search
        const searchTerms = currentSearchTerm ?
            currentSearchTerm.split(/\s+/).map(term => normalizeText(term)).filter(t => t.length > 0) :
            [];

        let visibleCount = 0;

        priceCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardTitle = card.querySelector('.spice-name').textContent;
            const cardTitleEn = card.querySelector('.spice-name-en').textContent;
            const cardDesc = card.querySelector('.description').textContent;

            const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;

            // Enhanced search that checks all fields
            const matchesSearch = searchTerms.length === 0 ||
                matchesSearchTerms(cardTitle, searchTerms) ||
                matchesSearchTerms(cardTitleEn, searchTerms) ||
                matchesSearchTerms(cardDesc, searchTerms);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                visibleCount++;
                // Fade in animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Optional: Show "no results" message
        console.log(`Found ${visibleCount} matching products`);
    }

    // Category Button Click
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Update current category
            currentCategory = this.getAttribute('data-category');

            // Apply filter
            filterCards();
        });
    });

    // Search Input with debouncing for better performance
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            // Clear previous timeout
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }

            // Debounce: wait 300ms after user stops typing
            searchTimeout = setTimeout(() => {
                currentSearchTerm = e.target.value.toLowerCase().trim();
                filterCards();
            }, 300);
        });
    }

    // ====================================
    // SHOPPING CART FUNCTIONALITY
    // ====================================
    const cart = [];
    const cartModal = document.getElementById('cart-modal');
    const cartFab = document.getElementById('cart-fab');
    const cartCount = document.getElementById('cart-count');
    const closeModal = document.querySelector('.close-modal');
    const closeCart = document.querySelector('.close-cart');
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const cartItemsList = document.getElementById('cart-items');
    const emptyCartMsg = document.getElementById('empty-cart-msg');
    const sendWhatsappBtn = document.getElementById('send-whatsapp-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');

    // Close Modals
    function closeAllModals() {
        weightModal.classList.remove('show');
        cartModal.classList.remove('show');
    }

    if (closeModal) closeModal.addEventListener('click', closeAllModals);
    if (closeCart) closeCart.addEventListener('click', closeAllModals);

    window.addEventListener('click', (e) => {
        if (e.target === weightModal || e.target === cartModal) {
            closeAllModals();
        }
    });

    // Weight Selection
    weightBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            weightBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedWeight = this.dataset.weight;
            customWeightInput.value = ''; // Clear custom input
        });
    });

    if (customWeightInput) {
        customWeightInput.addEventListener('input', function () {
            if (this.value) {
                weightBtns.forEach(b => b.classList.remove('selected'));
                selectedWeight = this.value;
            }
        });
    }

    // Add to Cart
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function () {
            if (!selectedSpice || !selectedWeight) {
                alert('الرجاء اختيار الوزن');
                return;
            }

            const item = {
                id: Date.now(),
                name: selectedSpice,
                weight: selectedWeight
            };

            cart.push(item);
            updateCartUI();
            closeAllModals();

            // Animation for FAB
            cartFab.classList.add('cart-bump');
            setTimeout(() => cartFab.classList.remove('cart-bump'), 300);
        });
    }

    // Update Cart UI
    function updateCartUI() {
        if (cartCount) cartCount.textContent = cart.length;

        // Update Cart List
        if (cartItemsList) {
            cartItemsList.innerHTML = '';
            if (cart.length === 0) {
                if (emptyCartMsg) emptyCartMsg.style.display = 'block';
            } else {
                if (emptyCartMsg) emptyCartMsg.style.display = 'none';
                cart.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'cart-item';
                    li.innerHTML = `
                        <div class="cart-item-details">
                            <span class="cart-item-name">${item.name}</span>
                            <span class="cart-item-weight">${item.weight} غرام</span>
                        </div>
                        <span class="cart-item-remove" onclick="removeCartItem(${item.id})">&times;</span>
                    `;
                    cartItemsList.appendChild(li);
                });
            }
        }
    }

    // Remove Item (Global function to be accessible from HTML onclick)
    window.removeCartItem = function (id) {
        const index = cart.findIndex(item => item.id === id);
        if (index > -1) {
            cart.splice(index, 1);
            updateCartUI();
        }
    };

    // Open Cart Modal
    if (cartFab) {
        cartFab.addEventListener('click', () => {
            cartModal.classList.add('show');
        });
    }

    // Clear Cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            cart.length = 0;
            updateCartUI();
        });
    }

    // Send to WhatsApp
    if (sendWhatsappBtn) {
        sendWhatsappBtn.addEventListener('click', () => {
            if (cart.length === 0) return;

            let message = "مرحبا، أريد طلب التوابل التالية:%0a";
            cart.forEach(item => {
                message += `- ${item.name} (${item.weight} غرام)%0a`;
            });

            const phoneNumber = "96181079758";
            const url = `https://wa.me/${phoneNumber}?text=${message}`;

            window.open(url, '_blank');
        });
    }

});
