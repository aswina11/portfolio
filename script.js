document.addEventListener('DOMContentLoaded', () => {
    // Generate Stars for background
    const generateStars = (id, count, maxShadow) => {
        const starContainer = document.getElementById(id);
        if (!starContainer) return;
        
        let boxShadows = '';
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * 2000);
            const y = Math.floor(Math.random() * 2000);
            boxShadows += `${x}px ${y}px #FFF${i < count - 1 ? ', ' : ''}`;
        }
        
        starContainer.style.width = '1px';
        starContainer.style.height = '1px';
        starContainer.style.background = 'transparent';
        starContainer.style.boxShadow = boxShadows;
    };

    generateStars('stars', 700);
    generateStars('stars2', 200);
    generateStars('stars3', 100);

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Optional: Stop observing after it appears once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-in-left, .slide-in-right');
    animElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Form submission handler (prevent default)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.style.opacity = '0.8';
            
            // Simulate sending
            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#10b981'; // Green color
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = ''; // Revert to default
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }
});
