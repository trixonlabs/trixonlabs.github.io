document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        menuToggle.classList.toggle('toggle');
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scroll effect for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                menuToggle.classList.remove('toggle');
            }
        });
    });

    // Add hover effect to feature cards with glowing border
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--accent-cyan)';
            card.style.boxShadow = '0 0 20px rgba(0, 255, 252, 0.3)';
            
            // Pause animation on hover for Premium Solutions card
            if (card.querySelector('h3').textContent === 'Premium Solutions') {
                const icon = card.querySelector('.card-icon svg');
                icon.style.animationPlayState = 'paused';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'var(--border-color)';
            card.style.boxShadow = 'none';
            
            // Resume animation when not hovering for Premium Solutions card
            if (card.querySelector('h3').textContent === 'Premium Solutions') {
                const icon = card.querySelector('.card-icon svg');
                icon.style.animationPlayState = 'running';
            }
        });
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const isTrigenCard = card.querySelector('h3').textContent === 'Trigen';
            if (isTrigenCard) {
                card.style.borderColor = '#ffffff';
                card.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
            } else {
                card.style.borderColor = 'var(--accent-purple)';
                card.style.boxShadow = '0 0 20px rgba(179, 0, 255, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'var(--border-color)';
            card.style.boxShadow = 'none';
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            heroVisual.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
    });

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .project-card, .section-header, .about-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize animation on load
    window.addEventListener('load', () => {
        // Set animation delay for each dot in unified experience icon
        const dotPaths = document.querySelectorAll('.feature-card:nth-child(3) .card-icon svg path:nth-of-type(2), .feature-card:nth-child(3) .card-icon svg path:nth-of-type(3), .feature-card:nth-child(3) .card-icon svg path:nth-of-type(4)');
        dotPaths.forEach((path, index) => {
            path.style.setProperty('--dot-index', index);
        });
        
        document.querySelectorAll('.feature-card, .project-card, .section-header, .about-content').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        animateOnScroll();
    });

    window.addEventListener('scroll', animateOnScroll);
});