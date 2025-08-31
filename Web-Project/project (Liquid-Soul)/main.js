window.addEventListener('DOMContentLoaded', () => {
    // GSAP / plugin safety
    if (!window.gsap) { console.error('GSAP not loaded'); return; }
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  
    const header = document.querySelector('header');
  
    // Mobile Menu Toggle
    function toggleMobileNav() {
      document.getElementById('mobileMenu')?.classList.toggle('show');
    }
    window.toggleMobileNav = toggleMobileNav;
  
    // Initial Page Load Animations
    function runInitialAnimation() {
      const onLoadTL = gsap.timeline({ defaults: { ease: 'power2.out' } });
  
      onLoadTL
        // Header border width (CSS var)
        .to('header', {
          '--border-width': '100%',
          duration: 3
        }, 0)
  
        // Slide in desktop nav & sidebar icons
        .from('.desktop-nav a, .social-sidebar a', {
          y: -100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        }, 0)
  
        // Sidebar border (CSS var)
        .to('.social-sidebar', {
          '--border-height': '100%',
          duration: 10
        }, 0)
  
        // Fade in Hero heading
        .to('.hero-content h1', {
          opacity: 1,
          duration: 1
        }, 0)
  
        // Stroke → solid color
        .to('.hero-content h1', {
          delay: 0.5,
          duration: 1.2,
          color: 'var(--sienna)',
          '-webkit-text-stroke': '0px var(--sienna)'
        }, 0)
  
        // Slide in each line
        .from('.hero-content .line', {
          x: 100,
          delay: 1,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        }, 0)
  
        // Reveal the bottle wrapper
        .to('.hero-bottle-wrapper', {
          opacity: 1,
          scale: 1,
          delay: 1.5,
          duration: 1.3,
          ease: 'power3.out'
        }, 0)
  
        // Pop-in stamp, then a tiny vibration
        .fromTo('.hero-stamp',
          { opacity: 0, scale: 5 },
          { opacity: 1, scale: 1, delay: 2, duration: 0.4, ease: 'back.out(3)' },
          0
        )
        .to('.hero-stamp', {
          y: -2,
          repeat: 6,
          yoyo: true,
          duration: 0.06,
          delay: 2.25
        }, 0);
    }
  
    // ✅ Important: run it
    runInitialAnimation();
  });

//   Reuseble - Scroll-based Animation SetUp

function pinAndAnimation({
    trigger,
    endTrigger,
    pin,
    animation,
    markers = false,
    headerOffset = 0,
}) {
    // Define scroll end position with header offset
    const end = `top top+=${headerOffset}`;
    // create a GSAP timeline
    const tl = gsap.timeline({
        scrollTrigger: {  
            trigger,
            start: `top top+=${headerOffset}`,
            endTrigger,
            end,
            scrub: true,
            pin,
            pinSpacing: false,
            markers: markers,  
            invalidateOnRefresh: true,
        },
    });
    // Loop through each animation object
    animation.forEach(({ target, vars, position = 0 }) => {
        tl.to(target, vars, position);
    });
}

// =======================
// ScrollTrigger Configuration for desktop & Mobile
// =======================

function setupScrollAnimations() {
    const header = document.querySelector("header");
    const headerOffset = header ? header.offsetHeight - 1 : 0;

    ScrollTrigger.matchMedia({
        "(min-width: 769px)": function() {
            // bottle scroll from hero to intro
            pinAndAnimation({
                trigger: ".hero",
                endTrigger: ".section-intro",
                pin: ".hero-bottle-wrapper",
                animation: [
                    { target: ".hero-bottle", vars: { rotate: 0, scale: 0.7 } },
                ],
                headerOffset,
            });

            // part 2 ==================
            pinAndAnimation({
                trigger: ".section-intro",
                endTrigger: ".timeline-entry:nth-child(even)",
                pin: ".hero-bottle-wrapper",
                animation: [
                    { target: ".hero-bottle", vars: { rotate: 10, scale: 0.75 } },
                    { target: ".hero-bottle", vars: { x: "60%" , y:"-5%" } },
                ],
                markers: false,
                headerOffset,
            });

            // part 3 ==================
            pinAndAnimation({
                trigger:".timeline-entry:nth-child(even)",
                endTrigger: ".timeline-entry:nth-child(odd)",
                pin: ".hero-bottle-wrapper",
                animation: [
                    { target: ".hero-bottle", vars: { rotate: -10, scale: 0.75} },
                    { target: ".hero-bottle", vars: { x: "-50%" , y:"-10%" } },
                ],
                markers: false,
                headerOffset,
            });
        },
        "(max-width: 769px)": function() {
            gsap.to(".hero-bottle-wrapper", {
                opacity: 1,
                duration: 1,
                delay: 0.5,
           });
        },
    });
}

// ✅ صدا بزن
setupScrollAnimations();
