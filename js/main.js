// DOM Elements
const header = document.getElementById('header');
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Mobile Menu
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    mobileMenu.classList.toggle('show');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        mobileMenu.classList.remove('show');
    });
});

// Nav scroll effect
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.pageYOffset > 50);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.getElementById(href.substring(1));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Intersection Observer for fade-in
const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in-section').forEach(el => fadeObserver.observe(el));

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollPos >= top && scrollPos < top + height);
        }
    });
});

// Stagger delays
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.contact-grid .fade-in-section').forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });
    document.querySelectorAll('.unified-timeline .fade-in-section').forEach((item, i) => {
        item.style.transitionDelay = `${i * 0.15}s`;
    });
});

// Architecture tabs
document.querySelectorAll('.arch-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const targetId = tab.dataset.target;
        const parent = tab.closest('.project-images');

        parent.querySelectorAll('.arch-tab').forEach(t => t.classList.remove('active'));
        parent.querySelectorAll('.arch-content').forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(targetId).classList.add('active');
    });
});

// Video Popup
function showVideoPopup(src) {
    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    overlay.id = 'video-overlay';
    overlay.innerHTML = `
        <button class="close-btn" onclick="closeVideoPopup()"><i class="fas fa-times"></i></button>
        <video controls autoplay playsinline>
            <source src="${src}" type="video/mp4">
        </video>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeVideoPopup(); });
    document.addEventListener('keydown', handleEsc);
}

function closeVideoPopup() {
    const overlay = document.getElementById('video-overlay');
    if (overlay) {
        const video = overlay.querySelector('video');
        if (video) video.pause();
        overlay.remove();
    }
    document.removeEventListener('keydown', handleEsc);
}

function handleEsc(e) {
    if (e.key === 'Escape') closeVideoPopup();
}
