document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Scroll Styles & Theme Switching
    const header = document.querySelector('.main-header');
    const sections = document.querySelectorAll('section');
    
    const handleScroll = () => {
        const scrollPos = window.scrollY + 100; // Offset for header height
        
        // Add scroll class to header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Dynamic theme switching based on section background
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // If the section is sustainability (which is our light theme section)
                if (sectionId === 'sustainability') {
                    header.classList.add('light-nav');
                } else {
                    header.classList.remove('light-nav');
                }
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial state

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-item, .nav-cta').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });
    }



    // 5. Anti-Spam Email Protection
    // We store the email components separately as arrays of characters.
    const emailParts = {
        user: ['c', 'o', 'n', 't', 'a', 'c', 't'],
        at: '@',
        domain: ['n', 'x', 'y', 'l', 'o', 'n', 't', 'e', 'c', 'h', '.', 'c', 'o', 'm']
    };

    const protectedEmailBtn = document.getElementById('protected-email');
    const emailText = document.getElementById('email-text');

    let emailRevealed = false;

    const revealEmail = (e) => {
        if (emailRevealed) return;
        
        // Assemble email address
        const fullEmail = emailParts.user.join('') + emailParts.at + emailParts.domain.join('');
        
        // Update anchor href and UI text
        protectedEmailBtn.setAttribute('href', `mailto:${fullEmail}`);
        emailText.textContent = fullEmail;
        
        // Style changes
        protectedEmailBtn.style.fontFamily = 'var(--font-mono)';
        protectedEmailBtn.style.letterSpacing = '0px';
        
        emailRevealed = true;
    };

    if (protectedEmailBtn && emailText) {
        // Trigger reveal on mouseover, focus, or touchstart
        protectedEmailBtn.addEventListener('mouseover', revealEmail);
        protectedEmailBtn.addEventListener('focus', revealEmail);
        protectedEmailBtn.addEventListener('touchstart', revealEmail, { passive: true });
        
        // Allow fallback click to reveal and navigate
        protectedEmailBtn.addEventListener('click', (e) => {
            if (!emailRevealed) {
                e.preventDefault();
                revealEmail();
            }
        });
    }

    // 6. Scroll Reveal Animation Logic
    const revealElements = document.querySelectorAll('.sustainability-wrapper, .press-card, .section-header, .bullets, .science-visual, .inquiry-content');
    
    // Add reveal class to sections on load
    revealElements.forEach(el => el.classList.add('reveal'));

    const checkReveal = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;

            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Initial check
});
