// ãäæí åãÈÑÑí ÈÑÇí ãæÈÇíá
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ÈÓÊä ãäæ ÈÇ ˜áí˜ Ñæí áíä˜åÇ
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ÇÓ˜Ñæá äÑã Èå ÈÎÔåÇ
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

// ÊÛííÑ ÇÓÊÇíá åÏÑ åäÇã ÇÓ˜Ñæá
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ÇäíãíÔä ÔãÇÑäÏå ÈÑÇí ÂãÇÑ
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('fa-IR') + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('fa-IR') + '+';
        }
    }, 20);
}

// ÔÑæÚ ÇäíãíÔä æÞÊí ˜ÇÑÈÑ ÈÎÔ ÂãÇÑ ÑÇ ãíÈíäÏ
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-item h3');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace(/,/g, ''));
                if (!isNaN(target)) {
                    animateCounter(counter, target);
                }
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}