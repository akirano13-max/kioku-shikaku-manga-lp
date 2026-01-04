// ==========================================
// AI記憶術 LP JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // FAQアコーディオン
    initFaqAccordion();

    // スムーススクロール
    initSmoothScroll();

    // CTAボタンのアニメーション
    initCtaAnimation();
});

// FAQアコーディオン機能
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // 現在のアイテムがアクティブかチェック
            const isActive = item.classList.contains('active');

            // 全てのアイテムを閉じる
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });

            // クリックしたアイテムをトグル
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// スムーススクロール
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// CTAボタンアニメーション強化
function initCtaAnimation() {
    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(button => {
        // ホバー時のエフェクト
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });

        // クリック時のエフェクト
        button.addEventListener('click', function(e) {
            // リップルエフェクト
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// スクロール時のアニメーション
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.easy-item, .benefit-item, .faq-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// ページロード時にスクロールアニメーション初期化
window.addEventListener('load', initScrollAnimations);
