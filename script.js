// Toggle mobile menu
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Smooth scroll for nav links
document.querySelectorAll('.nav-link, .float-donate-btn, .hero .btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#' || targetId.startsWith('http')) return;
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    });
});

// Copy card number (floating)
function copyCardNumber() {
    const cardNum = document.getElementById('cardNumber');
    if (cardNum) {
        navigator.clipboard.writeText(cardNum.innerText.replace(/-/g, '')).then(() => {
            alert('شماره کارت کپی شد: ' + cardNum.innerText);
        });
    }
}

// Copy card number (main donation section)
function copyMainCard() {
    const cardNum = document.getElementById('mainCardNumber');
    if (cardNum) {
        navigator.clipboard.writeText(cardNum.innerText.replace(/-/g, '')).then(() => {
            alert('شماره کارت کپی شد: ' + cardNum.innerText);
        });
    }
}

// ========== FAB Popup Logic ==========
const fabPopup = document.getElementById('fabPopup');

function toggleFabPopup() {
    if (fabPopup) fabPopup.classList.toggle('active');
}

function closeFabPopup() {
    if (fabPopup) fabPopup.classList.remove('active');
}

document.addEventListener('click', function(event) {
    const fabContainer = document.getElementById('fabContainer');
    if (fabContainer && !fabContainer.contains(event.target)) {
        closeFabPopup();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && fabPopup && fabPopup.classList.contains('active')) {
        closeFabPopup();
    }
});

// ========== Lightbox ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(src) {
    if (lightboxImg && lightbox) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

if (lightbox) {
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// ========== Sticky header shadow on scroll ==========
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
        }
    }
});
