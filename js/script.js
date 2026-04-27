// CURSOR
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
});
function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * .12;
    follower.style.transform = `translate(${fx - 18}px, ${fy - 18}px)`;
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .work-card, .service-item, .skill-card, .testimonial-card, .blog-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.8)';
        follower.style.width = '56px';
        follower.style.height = '56px';
    });
    el.addEventListener('mouseleave', () => {
        follower.style.width = '36px';
        follower.style.height = '36px';
    });
});

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// FILTER TABS
document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// SERVICE ITEMS
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('click', function () {
        document.querySelectorAll('.service-item').forEach(s => s.classList.remove('active'));
        this.classList.add('active');
    });
});

// COUNT UP ANIMATION
function animateCount(el, target, suffix = '') {
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        const spans = el.querySelectorAll('span');
        el.childNodes[0].nodeValue = Math.floor(current);
        // keep spans intact
        spans.forEach(s => el.appendChild(s));
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('[data-target]').forEach(el => {
                const target = parseInt(el.dataset.target);
                animateCount(el, target);
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });
const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// NAVBAR scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        nav.style.background = 'rgba(10,10,18,0.97)';
        nav.style.borderBottomColor = 'rgba(255,255,255,0.08)';
    } else {
        nav.style.background = 'linear-gradient(to bottom, rgba(10,10,18,0.95), transparent)';
    }
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu(open) {
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    toggleMenu(!isOpen);
});

// Close on link click
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

// Close on ESC
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
});

