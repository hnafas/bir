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
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;
        if (targetId.startsWith('http')) return;
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

// ========== FAB Popup Logic ==========
const fabPopup = document.getElementById('fabPopup');

function toggleFabPopup() {
    fabPopup.classList.toggle('active');
}

function closeFabPopup() {
    fabPopup.classList.remove('active');
}

// بستن پاپ‌آپ با کلیک بیرون از آن
document.addEventListener('click', function(event) {
    const fabContainer = document.getElementById('fabContainer');
    if (!fabContainer.contains(event.target)) {
        closeFabPopup();
    }
});

// بستن پاپ‌آپ با فشردن کلید Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && fabPopup.classList.contains('active')) {
        closeFabPopup();
    }
});

// ========== Comprehensive Modal System ==========
const mainModal = document.getElementById('mainModal');
const modalBody = document.getElementById('modalBody');

// Modal content database
const modalContents = {
    // ========== روانشناسی ==========
    'psychology-individual': `
        <h2>🧠 مشاوره فردی</h2>
        <h3>مشاوره فردی چیست؟</h3>
        <p>مشاوره فردی فرآیندی است که در آن مراجع با کمک روان‌شناس به شناخت بهتر خود، حل مشکلات شخصی و بهبود کیفیت زندگی می‌پردازد.</p>
        <h3>چه مشکلاتی را پوشش می‌دهد؟</h3>
        <ul>
            <li>اضطراب و استرس</li>
            <li>افسردگی و ناامیدی</li>
            <li>کمبود اعتماد به نفس</li>
            <li>مشکلات تصمیم‌گیری</li>
            <li>مدیریت خشم</li>
        </ul>
        <h3>روش‌های مورد استفاده</h3>
        <p>درمان شناختی-رفتاری (CBT)، طرحواره درمانی، روان‌درمانی پویشی و تکنیک‌های ذهن‌آگاهی از روش‌های رایج هستند.</p>
        <div class="warning">
            <strong>🔹 مدت جلسات:</strong> هر جلسه ۴۵-۶۰ دقیقه | <strong>تعداد جلسات:</strong> معمولاً ۶-۱۲ جلسه
        </div>
    `,
    'psychology-family': `
        <h2>👨‍👩‍👧‍👦 مشاوره خانواده</h2>
        <h3>هدف از مشاوره خانواده</h3>
        <p>بهبود ارتباطات بین اعضای خانواده، حل تعارضات و ایجاد محیطی سالم و حمایتگر برای همه اعضا.</p>
        <h3>موارد کاربرد</h3>
        <ul>
            <li>تعارضات زناشویی</li>
            <li>مشکلات ارتباطی والدین با فرزندان</li>
            <li>طلاق و جدایی</li>
            <li>مسائل مربوط به نوجوانان</li>
        </ul>
        <div class="warning">
            <strong>🔹 نکته:</strong> حضور تمام اعضای خانواده در جلسات توصیه می‌شود.
        </div>
    `,
    'psychology-child': `
        <h2>👧 مشاوره کودک و نوجوان</h2>
        <h3>حوزه‌های تخصصی</h3>
        <ul>
            <li><strong>مشکلات تحصیلی:</strong> افت تحصیلی، عدم تمرکز، اضطراب امتحان</li>
            <li><strong>مشکلات رفتاری:</strong> پرخاشگری، لجبازی، انزواطلبی</li>
            <li><strong>مشکلات ارتباطی:</strong> دوست‌یابی، قلدری، مهارت‌های اجتماعی</li>
        </ul>
        <h3>روش‌های درمانی</h3>
        <p>بازی‌درمانی، قصه‌درمانی، هنردرمانی و آموزش مهارت‌های زندگی از روش‌های مؤثر برای کودکان است.</p>
    `,

    // ========== مامایی ==========
    'pregnancy-care': `
        <h2>🤰 مراقبت‌های بارداری</h2>
        <h3>ویزیت‌های دوره‌ای</h3>
        <ul>
            <li><strong>سه‌ماهه اول:</strong> هر ۴ هفته یکبار</li>
            <li><strong>سه‌ماهه دوم:</strong> هر ۲-۳ هفته یکبار</li>
            <li><strong>سه‌ماهه سوم:</strong> هر هفته یکبار</li>
        </ul>
        <h3>آزمایش‌های ضروری</h3>
        <ul>
            <li>آزمایش خون کامل (CBC)</li>
            <li>غربالگری دیابت بارداری (هفته ۲۴-۲۸)</li>
            <li>سونوگرافی‌های دوره‌ای</li>
            <li>آزمایش ادرار</li>
        </ul>
        <h3>توصیه‌های تغذیه‌ای</h3>
        <p>مصرف اسید فولیک، آهن، کلسیم و ویتامین D ضروری است. از مصرف غذاهای خام، کافئین زیاد و الکل خودداری کنید.</p>
    `,
    'postpartum': `
        <h2>🤱 مراقبت‌های پس از زایمان</h2>
        <h3>شیردهی</h3>
        <ul>
            <li>شیردهی را در یک ساعت اول پس از تولد شروع کنید.</li>
            <li>نوزاد را هر ۲-۳ ساعت یکبار شیر دهید.</li>
            <li>از مشاور شیردهی برای مشکلات احتمالی کمک بگیرید.</li>
        </ul>
        <h3>بهداشت مادر</h3>
        <ul>
            <li>استراحت کافی (حداقل ۸ ساعت در شبانه‌روز)</li>
            <li>تغذیه مقوی و نوشیدن مایعات فراوان</li>
            <li>مراقبت از بخیه‌ها (در صورت سزارین یا اپیزیوتومی)</li>
        </ul>
        <h3>پیشگیری از افسردگی پس از زایمان</h3>
        <p>در صورت احساس غم مداوم، بی‌اشتهایی، بی‌خوابی یا افکار منفی نسبت به نوزاد، حتماً با روان‌شناس مشورت کنید.</p>
    `,
    'women-health': `
        <h2>👩‍⚕️ بهداشت زنان</h2>
        <h3>معاینات دوره‌ای</h3>
        <ul>
            <li>معاینه سالانه زنان (پاپ‌اسمیر از ۲۱ سالگی)</li>
            <li>ماموگرافی از ۴۰ سالگی (هر ۱-۲ سال)</li>
            <li>آزمایش HPV</li>
        </ul>
        <h3>پیشگیری از سرطان‌های زنان</h3>
        <ul>
            <li>واکسن گارداسیل برای پیشگیری از سرطان دهانه رحم</li>
            <li>خودآزمایی ماهانه پستان</li>
            <li>سبک زندگی سالم (تغذیه مناسب، ورزش، عدم استعمال دخانیات)</li>
        </ul>
    `,

    // ========== خدمات پزشکی ==========
    'general-medicine': `
        <h2>🩺 پزشک عمومی</h2>
        <h3>خدمات ارائه‌شده</h3>
        <ul>
            <li>ویزیت و معاینه اولیه</li>
            <li>تشخیص و درمان بیماری‌های شایع (سرماخوردگی، آنفولانزا، عفونت‌ها)</li>
            <li>تجویز داروهای ضروری</li>
            <li>ارجاع به متخصص در صورت نیاز</li>
        </ul>
        <h3>بیماری‌های مزمن تحت پوشش</h3>
        <ul>
            <li>دیابت (قند خون)</li>
            <li>فشار خون بالا</li>
            <li>بیماری‌های تیروئید</li>
            <li>آسم و آلرژی</li>
        </ul>
        <div class="warning">
            <strong>🔹 توجه:</strong> ویزیت‌ها <strong>کاملاً رایگان</strong> و با تعیین وقت قبلی انجام می‌شود.
        </div>
    `,

    // ========== تجهیزات پزشکی ==========
    'oxygen': `
        <h2>🫁 آموزش استفاده از دستگاه اکسیژن‌ساز</h2>
        <h3>مقدمه</h3>
        <p>دستگاه اکسیژن‌ساز (Oxygen Concentrator) هوای محیط را گرفته و نیتروژن آن را جدا می‌کند تا اکسیژن تقریباً خالص (۹۳-۹۵٪) به بیمار برساند.</p>
        <h3>مراحل راه‌اندازی</h3>
        <ol>
            <li>دستگاه را روی سطح صاف و ثابت قرار دهید.</li>
            <li>دوشاخه را مستقیماً به پریز برق وصل کنید.</li>
            <li>مخزن آب (در صورت وجود) را با آب مقطر پر کنید.</li>
            <li>لوله اکسیژن را به خروجی دستگاه متصل کنید.</li>
            <li>دکمه پاور را زده و صبر کنید (۳-۵ دقیقه).</li>
            <li>میزان اکسیژن تجویزی را تنظیم کنید (۱-۵ لیتر).</li>
        </ol>
        <div class="warning">
            <strong>⚠️ هشدار:</strong> از استعمال دخانیات نزدیک دستگاه خودداری کنید.
        </div>
    `,
    'bp': `
        <h2>💓 آموزش اندازه‌گیری فشار خون</h2>
        <h3>آمادگی قبل از اندازه‌گیری</h3>
        <ul>
            <li>۳۰ دقیقه قبل از قهوه، چای و سیگار خودداری کنید.</li>
            <li>۵ دقیقه آرام بنشینید.</li>
            <li>دست را هم‌سطح قلب روی میز قرار دهید.</li>
        </ul>
        <h3>تفسیر نتایج</h3>
        <ul>
            <li><strong>نرمال:</strong> زیر ۱۲۰/۸۰</li>
            <li><strong>پیش‌فشار خون:</strong> ۱۲۰-۱۲۹ / ۸۰-۸۴</li>
            <li><strong>فشار خون بالا:</strong> ۱۳۰ به بالا / ۸۵ به بالا</li>
        </ul>
    `,
    'glucose': `
        <h2>🩸 آموزش استفاده از دستگاه تست قند خون</h2>
        <h3>مراحل انجام تست</h3>
        <ol>
            <li>دست‌ها را بشویید و خشک کنید.</li>
            <li>نوار تست را در دستگاه قرار دهید.</li>
            <li>با لانست نوک انگشت را سوراخ کنید.</li>
            <li>قطره خون را به نوار تست نزدیک کنید.</li>
            <li>نتیجه را بخوانید و ثبت کنید.</li>
        </ol>
        <h3>مقادیر نرمال</h3>
        <ul>
            <li><strong>ناشتا:</strong> ۷۰-۱۰۰ mg/dL</li>
            <li><strong>۲ ساعت بعد از غذا:</strong> زیر ۱۴۰ mg/dL</li>
        </ul>
    `,

    // ========== بهداشت و سلامت ==========
    'hygiene': `
        <h2>🧼 بهداشت فردی - راهنمای جامع</h2>
        <h3>شستن صحیح دست‌ها</h3>
        <p>دست‌ها را حداقل ۲۰ ثانیه با آب و صابون بشویید. تمام سطوح دست را پوشش دهید.</p>
        <h3>مراقبت از دهان و دندان</h3>
        <ul>
            <li>روزی ۲ بار مسواک بزنید.</li>
            <li>نخ دندان روزانه استفاده کنید.</li>
            <li>هر ۶ ماه یکبار به دندانپزشک مراجعه کنید.</li>
        </ul>
    `,
    'nutrition': `
        <h2>🥗 تغذیه سالم - راهنمای جامع</h2>
        <h3>بشقاب سالم</h3>
        <p>۵۰٪ سبزیجات و میوه‌ها، ۲۵٪ غلات کامل، ۲۵٪ پروتئین سالم</p>
        <h3>ویتامین‌های ضروری</h3>
        <ul>
            <li><strong>A:</strong> هویج، اسفناج</li>
            <li><strong>C:</strong> مرکبات، فلفل دلمه‌ای</li>
            <li><strong>D:</strong> نور خورشید، ماهی</li>
            <li><strong>آهن:</strong> گوشت قرمز، عدس</li>
        </ul>
    `,
    'medicine': `
        <h2>💊 راهنمای مصرف صحیح داروها</h2>
        <h3>اصول کلی</h3>
        <ul>
            <li>داروها را دقیقاً مطابق دستور پزشک مصرف کنید.</li>
            <li>برچسب دارو را قبل از مصرف مطالعه کنید.</li>
            <li>داروها را با آب کافی میل کنید.</li>
        </ul>
        <div class="warning">
            <strong>⚠️ هشدار:</strong> هرگز مصرف دارو را خودسرانه قطع نکنید.
        </div>
    `,
    'mental': `
        <h2>🧠 سلامت روان - راهنمای جامع</h2>
        <h3>مدیریت استرس</h3>
        <ul>
            <li>تنفس عمیق شکمی (۴-۷-۸ ثانیه)</li>
            <li>مدیتیشن روزانه ۵-۱۰ دقیقه</li>
            <li>یادداشت‌برداری از نگرانی‌ها</li>
        </ul>
        <h3>خواب کافی</h3>
        <p>بزرگسالان به ۷-۹ ساعت خواب نیاز دارند. اتاق خواب باید تاریک و خنک باشد.</p>
    `,
    'first-aid': `
        <h2>🩹 کمک‌های اولیه در منزل</h2>
        <h3>سوختگی</h3>
        <p>۱۰-۲۰ دقیقه زیر آب خنک بگیرید. از یخ استفاده نکنید.</p>
        <h3>خونریزی</h3>
        <p>با گاز استریل ۱۰-۱۵ دقیقه فشار مستقیم وارد کنید.</p>
    `,
    'infection': `
        <h2>🦠 پیشگیری از بیماری‌های واگیر</h2>
        <h3>واکسیناسیون</h3>
        <p>برنامه واکسیناسیون کشوری را کامل کنید.</p>
        <h3>بهداشت تنفسی</h3>
        <p>هنگام سرفه و عطسه از آرنج یا دستمال استفاده کنید.</p>
    `,
    'baby-care': `
        <h2>👶 مراقبت از نوزاد در خانه</h2>
        <h3>حمام کردن</h3>
        <p>دمای آب ۳۷-۳۸ درجه باشد. هرگز نوزاد را تنها نگذارید.</p>
        <h3>علائم خطر</h3>
        <ul>
            <li>تب بالای ۳۸ درجه</li>
            <li>بی‌حالی شدید</li>
            <li>کاهش پوشک خیس</li>
        </ul>
    `,
    'exercise': `
        <h2>🏃 فعالیت بدنی - راهنمای جامع</h2>
        <h3>تمرینات کششی</h3>
        <p>هر حرکت را ۲۰-۳۰ ثانیه نگه دارید.</p>
        <h3>تمرینات هوازی</h3>
        <p>حداقل ۱۵۰ دقیقه در هفته پیاده‌روی سریع</p>
    `
};

// Open modal
function openModal(type) {
    if (modalContents[type]) {
        modalBody.innerHTML = modalContents[type];
        mainModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal() {
    mainModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
mainModal.addEventListener('click', function(e) {
    if (e.target === mainModal) closeModal();
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mainModal.classList.contains('active')) {
        closeModal();
    }
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Sticky header shadow on scroll
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    }
});
