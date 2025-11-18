// DOM要素の取得
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const contactForm = document.querySelector('.contact-form');

// ハンバーガーメニューの切り替え
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ナビゲーションリンククリック時の処理
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // ヘッダーの高さを考慮
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // モバイルメニューを閉じる
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// スクロール時のヘッダー効果
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// スムーススクロール（ページ内リンク用）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// お問い合わせフォームの処理
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // バリデーション
        if (!name || !email || !service || !message) {
            showNotification('必須項目をすべて入力してください。', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('有効なメールアドレスを入力してください。', 'error');
            return;
        }
        
        // 送信処理（実際の実装では、サーバーにデータを送信）
        showNotification('お問い合わせありがとうございます。後日ご連絡いたします。', 'success');
        contactForm.reset();
    });
}

// メールアドレスのバリデーション
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 通知の表示
function showNotification(message, type = 'info') {
    // 既存の通知を削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 通知要素の作成
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // スタイルの追加
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#1e3a8a'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    // アニメーション用のCSSを追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    `;
    document.head.appendChild(style);
    
    // 通知を表示
    document.body.appendChild(notification);
    
    // 3秒後に自動削除
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素の設定
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.problem-item, .step, .diff-item, .case-item, .plan-item, .comparison, .profile-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ボタンのクリック効果
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // リップル効果の作成
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        // アニメーション用のCSSを追加
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
        
        // アニメーション完了後に要素を削除
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 数値カウンターアニメーション
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (target === 98 ? '%' : target === 24 ? '/7' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (target === 98 ? '%' : target === 24 ? '/7' : '+');
        }
    }, 16);
}

// フォームの入力時のリアルタイムバリデーション
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', function() {
        validateField(this);
    });
    
    field.addEventListener('input', function() {
        clearFieldError(this);
    });
});

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'この項目は必須です');
        return false;
    }
    
    if (fieldName === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, '有効なメールアドレスを入力してください');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    field.style.borderColor = '#ef4444';
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderColor = '#e5e7eb';
}

// パフォーマンス最適化のための画像遅延読み込み
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// FAQアコーディオン機能
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // 他のFAQアイテムを閉じる
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 現在のアイテムの状態を切り替え
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// ページ読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    initFAQ();
    
    // アクセシビリティの向上
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // フォーカス管理
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
});

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// リサイズ時の処理
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // リサイズ後の処理
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }, 250);
});

// スクロール位置の保存と復元（ページリロード時）
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});

// フォーム送信時のローディング状態
function setFormLoading(form, loading) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (loading) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
    } else {
        submitButton.disabled = false;
        submitButton.innerHTML = '送信する';
    }
}

// お問い合わせフォームの改良版
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // フォームバリデーション
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // 全フィールドのバリデーション
        let isValid = true;
        document.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('入力内容を確認してください。', 'error');
            return;
        }
        
        // ローディング状態を開始
        setFormLoading(contactForm, true);
        
        try {
            // 実際の送信処理（ここではシミュレーション）
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showNotification('お問い合わせありがとうございます。後日ご連絡いたします。', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('送信に失敗しました。再度お試しください。', 'error');
        } finally {
            setFormLoading(contactForm, false);
        }
    });
}
