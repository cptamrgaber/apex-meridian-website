// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initHeroAnimations();
    initServiceSelector();
    initTestimonials();
    initContactForm();
    initScrollAnimations();
    initBackToTop();
    initCounterAnimations();
});

// Navigation Functionality
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Active navigation link
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Hero Animations
function initHeroAnimations() {
    // Smooth scrolling for hero scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(scrollIndicator.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Service Selector Functionality
function initServiceSelector() {
    const questions = [
        {
            question: "What is your primary industry or business focus?",
            options: [
                { text: "Aviation & Aerospace", value: "aviation", weight: { aviation: 3, management: 1, education: 1 } },
                { text: "Technology & Software", value: "tech", weight: { aviation: 1, management: 3, education: 2 } },
                { text: "Healthcare & Medical", value: "healthcare", weight: { aviation: 1, management: 2, education: 3 } },
                { text: "Manufacturing & Production", value: "manufacturing", weight: { aviation: 2, management: 3, education: 2 } },
                { text: "Education & Training", value: "education", weight: { aviation: 1, management: 2, education: 3 } }
            ]
        },
        {
            question: "What is your organization's primary challenge?",
            options: [
                { text: "Operational inefficiencies", value: "operations", weight: { aviation: 2, management: 3, education: 1 } },
                { text: "Staff training and development", value: "training", weight: { aviation: 1, management: 1, education: 3 } },
                { text: "Safety and compliance", value: "safety", weight: { aviation: 3, management: 2, education: 1 } },
                { text: "Process optimization", value: "process", weight: { aviation: 1, management: 3, education: 1 } },
                { text: "Technology integration", value: "technology", weight: { aviation: 2, management: 2, education: 2 } }
            ]
        },
        {
            question: "What is your organization size?",
            options: [
                { text: "Small (1-50 employees)", value: "small", weight: { aviation: 1, management: 2, education: 2 } },
                { text: "Medium (51-500 employees)", value: "medium", weight: { aviation: 2, management: 3, education: 2 } },
                { text: "Large (500+ employees)", value: "large", weight: { aviation: 3, management: 3, education: 3 } },
                { text: "Enterprise (1000+ employees)", value: "enterprise", weight: { aviation: 3, management: 3, education: 3 } }
            ]
        },
        {
            question: "What is your primary goal?",
            options: [
                { text: "Improve operational efficiency", value: "efficiency", weight: { aviation: 3, management: 3, education: 1 } },
                { text: "Enhance employee skills", value: "skills", weight: { aviation: 1, management: 2, education: 3 } },
                { text: "Ensure regulatory compliance", value: "compliance", weight: { aviation: 3, management: 2, education: 1 } },
                { text: "Digital transformation", value: "digital", weight: { aviation: 2, management: 3, education: 2 } },
                { text: "Cost reduction", value: "cost", weight: { aviation: 2, management: 3, education: 1 } }
            ]
        },
        {
            question: "What is your timeline for implementation?",
            options: [
                { text: "Immediate (1-3 months)", value: "immediate", weight: { aviation: 2, management: 3, education: 2 } },
                { text: "Short-term (3-6 months)", value: "short", weight: { aviation: 2, management: 2, education: 3 } },
                { text: "Medium-term (6-12 months)", value: "medium", weight: { aviation: 3, management: 2, education: 2 } },
                { text: "Long-term (12+ months)", value: "long", weight: { aviation: 3, management: 3, education: 3 } }
            ]
        }
    ];

    let currentQuestion = 0;
    let answers = [];
    let scores = { aviation: 0, management: 0, education: 0 };

    const questionContainer = document.getElementById('question-container');
    const progressFill = document.getElementById('progress-fill');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const selectorResult = document.getElementById('selector-result');
    const restartBtn = document.getElementById('restart-btn');

    if (!questionContainer) return;

    // Set total questions
    totalQuestionsSpan.textContent = questions.length;

    // Display current question
    function displayQuestion() {
        const question = questions[currentQuestion];
        questionContainer.innerHTML = `
            <div class="question">
                <h3>${question.question}</h3>
                <div class="question-options">
                    ${question.options.map((option, index) => `
                        <div class="option" data-value="${option.value}" data-index="${index}">
                            ${option.text}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Add click handlers to options
        const options = questionContainer.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                
                const value = option.dataset.value;
                const index = parseInt(option.dataset.index);
                answers[currentQuestion] = { value, index, weights: question.options[index].weight };
                
                nextBtn.disabled = false;
            });
        });

        // Restore previous selection
        if (answers[currentQuestion]) {
            const selectedIndex = answers[currentQuestion].index;
            options[selectedIndex].classList.add('selected');
            nextBtn.disabled = false;
        } else {
            nextBtn.disabled = true;
        }

        // Update progress
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressFill.style.width = `${progress}%`;
        currentQuestionSpan.textContent = currentQuestion + 1;

        // Update button states
        prevBtn.disabled = currentQuestion === 0;
        nextBtn.textContent = currentQuestion === questions.length - 1 ? 'Get Results' : 'Next';
    }

    // Calculate results
    function calculateResults() {
        scores = { aviation: 0, management: 0, education: 0 };
        
        answers.forEach(answer => {
            if (answer && answer.weights) {
                Object.keys(answer.weights).forEach(service => {
                    scores[service] += answer.weights[service];
                });
            }
        });

        const maxScore = Math.max(scores.aviation, scores.management, scores.education);
        let recommendedService = 'management'; // default

        if (scores.aviation === maxScore) {
            recommendedService = 'aviation';
        } else if (scores.education === maxScore) {
            recommendedService = 'education';
        }

        return recommendedService;
    }

    // Display results
    function displayResults() {
        const recommendedService = calculateResults();
        
        const serviceInfo = {
            aviation: {
                title: 'Aviation Solutions',
                description: 'Based on your responses, our Aviation Solutions would be the perfect fit for your organization. We can help you optimize flight operations, enhance safety compliance, and improve operational efficiency.',
                icon: 'fas fa-plane',
                benefits: [
                    'Enhanced operational efficiency',
                    'Improved safety compliance',
                    'Reduced operational costs',
                    'Streamlined flight operations'
                ]
            },
            management: {
                title: 'Organizational Management Solutions',
                description: 'Our Organizational Management Solutions are ideal for your needs. We can help you optimize business processes, improve team collaboration, and enhance overall organizational effectiveness.',
                icon: 'fas fa-cogs',
                benefits: [
                    'Optimized business processes',
                    'Enhanced team collaboration',
                    'Improved performance metrics',
                    'Strategic planning excellence'
                ]
            },
            education: {
                title: 'Educational Solutions',
                description: 'Educational Solutions would be the best match for your organization. We can provide customized training programs, advanced learning technologies, and professional certification courses.',
                icon: 'fas fa-graduation-cap',
                benefits: [
                    'Customized training programs',
                    'Advanced learning technologies',
                    'Professional certifications',
                    'Measurable learning outcomes'
                ]
            }
        };

        const service = serviceInfo[recommendedService];
        
        document.getElementById('result-service').innerHTML = `
            <div class="service-card">
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <div class="service-content">
                    <h3 class="service-title">${service.title}</h3>
                    <p class="service-description">${service.description}</p>
                    <ul class="service-benefits">
                        ${service.benefits.map(benefit => `
                            <li><i class="fas fa-check"></i> ${benefit}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;

        document.querySelector('.selector-content').style.display = 'none';
        selectorResult.style.display = 'block';
    }

    // Event handlers
    nextBtn.addEventListener('click', () => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            displayQuestion();
        } else {
            displayResults();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            displayQuestion();
        }
    });

    restartBtn.addEventListener('click', () => {
        currentQuestion = 0;
        answers = [];
        scores = { aviation: 0, management: 0, education: 0 };
        document.querySelector('.selector-content').style.display = 'block';
        selectorResult.style.display = 'none';
        displayQuestion();
    });

    // Initialize
    displayQuestion();
}

// Testimonials Carousel
function initTestimonials() {
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const dots = document.querySelectorAll('.dot');
    
    if (!track) return;

    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.testimonial-card').length;

    function updateCarousel() {
        const translateX = -currentSlide * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // Update testimonial cards
        document.querySelectorAll('.testimonial-card').forEach((card, index) => {
            card.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Auto-play
    setInterval(nextSlide, 5000);
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation classes to elements
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.2}s`;
    });

    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.classList.add('slide-in-left');
        item.style.animationDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.classList.add('slide-in-right');
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number
        let displayValue = Math.floor(current);
        if (target >= 1000) {
            displayValue = displayValue.toLocaleString();
        }
        if (element.dataset.target === '99') {
            displayValue += '%';
        } else if (target >= 1000) {
            displayValue += '+';
        }
        
        element.textContent = displayValue;
    }, 16);
}

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroPattern = document.querySelector('.hero-pattern');
    
    if (heroPattern) {
        heroPattern.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Form field animations
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Check if field has value on load
    if (field.value) {
        field.parentElement.classList.add('focused');
    }
});

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            this.querySelector('input[type="email"]').value = '';
        }
    });
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    }
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Error handling for failed image loads
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});

// Console welcome message
console.log('%cWelcome to Apex Meridian!', 'color: #333; font-size: 20px; font-weight: bold;');
console.log('%cTransforming Industries Through Expert Solutions', 'color: #666; font-size: 14px;');
console.log('%cContact us: info@Apex-meridian.net | +20 120 0929092', 'color: #999; font-size: 12px;');

