// Toggle mobile menu
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-link, .float-donate-btn, .hero .btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Copy card number (floating)
function copyCardNumber() {
    const cardNum = document.getElementById('cardNumber').innerText;
    navigator.clipboard.writeText(cardNum.replace(/-/g, '')).then(() => {
        alert('شماره کارت کپی شد: ' + cardNum);
    });
}

// Copy card number (main donation section)
function copyMainCard() {
    const cardNum = document.getElementById('mainCardNumber').innerText;
    navigator.clipboard.writeText(cardNum.replace(/-/g, '')).then(() => {
        alert('شماره کارت کپی شد: ' + cardNum);
    });
}

// Device modal logic
const deviceModal = document.getElementById('deviceModal');
const modalBody = document.getElementById('modalBody');

function openDeviceModal(type) {
    let content = '';
    if (type === 'oxygen') {
        content = `
            <h2>آموزش استفاده از دستگاه اکسیژن‌ساز</h2>
            <ol>
                <li>دستگاه را روی سطح صاف قرار دهید و به برق متصل کنید.</li>
                <li>مخزن آب (در صورت وجود) را با آب مقطر پر کنید.</li>
                <li>دکمه روشن/خاموش را فشار دهید و صبر کنید تا چراغ سبز روشن شود.</li>
                <li>میزان اکسیژن تجویزی را با ولوم تنظیم کنید (معمولاً بین ۲ تا ۵ لیتر).</li>
                <li>ماسک یا کانوال بینی را وصل کرده و روی صورت بیمار قرار دهید.</li>
                <li>پس از اتمام، دستگاه را خاموش کرده و فیلترها را ماهیانه تمیز کنید.</li>
            </ol>
            <p style="margin-top:15px;"><strong>هشدار:</strong> از کشیدن سیگار نزدیک دستگاه خودداری کنید.</p>
        `;
    } else if (type === 'bp') {
        content = `
            <h2>آموزش اندازه‌گیری فشار خون با فشارسنج دیجیتال</h2>
            <ol>
                <li>کاف را ۲-۳ سانتی‌متر بالای آرنج ببندید (باید محکم ولی راحت باشد).</li>
                <li>دست را روی میز هم‌سطح قلب قرار دهید.</li>
                <li>دکمه شروع را فشار دهید و در حین اندازه‌گیری صحبت نکنید.</li>
                <li>عدد بالا (سیستول) و عدد پایین (دیاستول) را یادداشت کنید.</li>
                <li>فشار نرمال: حدود ۱۲۰/۸۰ میلی‌متر جیوه.</li>
            </ol>
        `;
    } else if (type === 'glucose') {
        content = `
            <h2>آموزش استفاده از دستگاه تست قند خون</h2>
            <ol>
                <li>دست‌ها را با آب گرم بشویید و خشک کنید.</li>
                <li>نوار تست را داخل دستگاه قرار دهید.</li>
                <li>با لانست، نوک انگشت را سوراخ کرده و قطره خون را روی نوار بگذارید.</li>
                <li>پس از چند ثانیه نتیجه را بخوانید و در دفترچه ثبت کنید.</li>
                <li>نرمال ناشتا: ۷۰-۱۰۰ mg/dL</li>
            </ol>
        `;
    }
    modalBody.innerHTML = content;
    deviceModal.classList.add('active');
}

function closeDeviceModal() {
    deviceModal.classList.remove('active');
}

// Close modal on outside click
deviceModal.addEventListener('click', function(e) {
    if (e.target === deviceModal) closeDeviceModal();
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

// Close lightbox on outside click (the lightbox itself, not the image)
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
});

// Sticky header shadow on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }
});
