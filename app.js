"use strict";
class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.langToggle = document.getElementById('langToggle');
        this.langText = document.getElementById('langText');
        this.langIcon = document.getElementById('langIcon');
        this.init();
    }
    init() {
        const savedLang = localStorage.getItem('weddingLang');
        if (savedLang) {
            this.currentLang = savedLang;
            this.applyLanguage();
        }
        this.langToggle?.addEventListener('click', () => this.toggleLanguage());
    }
    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'te' : 'en';
        localStorage.setItem('weddingLang', this.currentLang);
        this.applyLanguage();
    }
    applyLanguage() {
        const elements = document.querySelectorAll('[data-en][data-te]');
        elements.forEach((el) => {
            const text = this.currentLang === 'en' ? el.dataset.en : el.dataset.te;
            if (text) {
                el.textContent = text;
            }
        });
        if (this.langText) {
            this.langText.textContent = this.currentLang === 'en' ? 'తెలుగు' : 'English';
        }
        if (this.langIcon) {
            this.langIcon.textContent = '🇮🇳';
        }
        document.documentElement.lang = this.currentLang === 'en' ? 'en' : 'te';
        if (this.currentLang === 'te') {
            document.body.classList.add('telugu-active');
        }
        else {
            document.body.classList.remove('telugu-active');
        }
    }
    getCurrentLanguage() {
        return this.currentLang;
    }
}
class CountdownTimer {
    constructor(weddingDateStr) {
        this.weddingDate = new Date(weddingDateStr);
        this.daysEl = document.getElementById('days');
        this.hoursEl = document.getElementById('hours');
        this.minutesEl = document.getElementById('minutes');
        this.secondsEl = document.getElementById('seconds');
        this.init();
    }
    init() {
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
    }
    updateCountdown() {
        const now = new Date().getTime();
        const distance = this.weddingDate.getTime() - now;
        if (distance < 0) {
            if (this.daysEl)
                this.daysEl.textContent = '🎊';
            if (this.hoursEl)
                this.hoursEl.textContent = '🎉';
            if (this.minutesEl)
                this.minutesEl.textContent = '💑';
            if (this.secondsEl)
                this.secondsEl.textContent = '💕';
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (this.daysEl)
            this.daysEl.textContent = this.padNumber(days);
        if (this.hoursEl)
            this.hoursEl.textContent = this.padNumber(hours);
        if (this.minutesEl)
            this.minutesEl.textContent = this.padNumber(minutes);
        if (this.secondsEl)
            this.secondsEl.textContent = this.padNumber(seconds);
    }
    padNumber(num) {
        return num.toString().padStart(2, '0');
    }
}
class RSVPHandler {
    constructor() {
        this.form = document.getElementById('rsvpForm');
        this.modal = document.getElementById('successModal');
        this.closeModalBtn = document.getElementById('closeModal');
        this.rsvpButtons = document.querySelectorAll('.rsvp-btn');
        this.init();
    }
    init() {
        this.rsvpButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => this.handleRSVP(e));
        });
        this.closeModalBtn?.addEventListener('click', () => this.closeModal());
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal)
                this.closeModal();
        });
    }
    handleRSVP(e) {
        const button = e.currentTarget;
        const response = button.dataset.response;
        const nameInput = this.form?.querySelector('input[type="text"]');
        const phoneInput = this.form?.querySelector('input[type="tel"]');
        const guestsSelect = this.form?.querySelector('select');
        const name = nameInput?.value.trim();
        const phone = phoneInput?.value.trim();
        const guests = guestsSelect?.value;
        if (!name) {
            this.shakeElement(nameInput);
            nameInput?.focus();
            return;
        }
        console.log('RSVP Submitted:', {
            name,
            phone,
            guests,
            response
        });
        this.showModal();
        if (nameInput)
            nameInput.value = '';
        if (phoneInput)
            phoneInput.value = '';
        if (guestsSelect)
            guestsSelect.selectedIndex = 0;
    }
    showModal() {
        this.modal?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    closeModal() {
        this.modal?.classList.add('hidden');
        document.body.style.overflow = '';
    }
    shakeElement(el) {
        if (!el)
            return;
        el.classList.add('shake');
        el.style.borderColor = '#ff4444';
        setTimeout(() => {
            el.classList.remove('shake');
            el.style.borderColor = '';
        }, 500);
    }
}
class ScrollAnimator {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);
        document.querySelectorAll('section').forEach((section) => {
            section.style.opacity = '0';
            observer.observe(section);
        });
    }
}
class FloatingParticles {
    constructor() {
        this.particles = ['🪷', '✨', '💫', '🌸', '🪔'];
        this.container = document.createElement('div');
        this.container.className = 'fixed inset-0 pointer-events-none overflow-hidden z-0';
        this.container.id = 'particles';
        document.body.prepend(this.container);
        this.init();
    }
    init() {
        setInterval(() => this.createParticle(), 3000);
    }
    createParticle() {
        const particle = document.createElement('span');
        particle.className = 'absolute text-2xl opacity-50';
        particle.textContent = this.particles[Math.floor(Math.random() * this.particles.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '-50px';
        particle.style.transition = 'all 10s linear';
        this.container.appendChild(particle);
        setTimeout(() => {
            particle.style.top = '110%';
            particle.style.left = (parseFloat(particle.style.left) + (Math.random() * 20 - 10)) + '%';
            particle.style.opacity = '0';
        }, 100);
        setTimeout(() => {
            particle.remove();
        }, 10100);
    }
}
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        .shake {
            animation: shake 0.3s ease-in-out;
        }
        .telugu-active {
            font-family: 'Noto Sans Telugu', 'Poppins', sans-serif;
        }
        section {
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        section.fade-in-up {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
}
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    const langManager = new LanguageManager();
    const countdown = new CountdownTimer('2026-01-28T10:00:00+05:30');
    const rsvpHandler = new RSVPHandler();
    const scrollAnimator = new ScrollAnimator();
    const particles = new FloatingParticles();
    console.log('🎊 Wedding Invitation App Initialized');
    console.log('💑 May their union be blessed forever!');
});
