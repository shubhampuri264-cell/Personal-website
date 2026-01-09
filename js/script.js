document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle (Mobile)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Navbar Styling
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Typing Animation
    const textToType = "A little something about me.";
    const typingElement = document.getElementById('typing-text');
    let typeIndex = 0;

    function typeWriter() {
        if (typeIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    console.log(`Found ${revealElements.length} elements to reveal.`);

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Revealing element:', entry.target);
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Lower threshold triggers sooner
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
