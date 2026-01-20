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
        this.particles = ['🪷', '✨', '💫', '🌸', '🪔', '🎆', '🎇', '🎉', '🎊', '🧨', '💐', '🌺', '🎀', '💕', '🌟', '⭐', '🦋', '🌹', '💖', '🏵️', '🎗️', '✧', '❋', '❊'];
        this.hearts = ['💕', '💖', '💗', '💓', '💞', '💝', '❤️', '🤍', '💚'];
        this.fireworks = ['🎆', '🎇', '✨', '💥', '🌟'];
        this.confetti = ['🎊', '🎉', '🎀', '🎗️', '🏵️'];
        this.container = document.createElement('div');
        this.container.className = 'fixed inset-0 pointer-events-none overflow-hidden z-0';
        this.container.id = 'particles';
        document.body.prepend(this.container);
        this.init();
    }
    init() {
        // Grand opening burst
        this.createFireworkShow();
        // Create initial burst of particles
        for (let i = 0; i < 15; i++) {
            setTimeout(() => this.createParticle(), i * 150);
        }
        // Continuous particles - more frequent
        setInterval(() => this.createParticle(), 600);
        // Rising hearts from bottom
        setInterval(() => this.createRisingHeart(), 800);
        // Sparkle bursts
        setInterval(() => this.createSparkleBurst(), 3000);
        // Confetti shower
        setInterval(() => this.createConfettiShower(), 4000);
        // Firework show
        setInterval(() => this.createFireworkShow(), 8000);
        // Side streamers
        setInterval(() => this.createStreamer(), 2000);
    }
    createParticle() {
        const particle = document.createElement('span');
        const sizes = ['text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        particle.className = `absolute ${size}`;
        particle.textContent = this.particles[Math.floor(Math.random() * this.particles.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '-50px';
        particle.style.transition = 'all 6s ease-in-out';
        particle.style.opacity = '0.9';
        particle.style.filter = 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.8))';
        particle.style.zIndex = '1';
        this.container.appendChild(particle);
        setTimeout(() => {
            particle.style.top = '110%';
            particle.style.left = (parseFloat(particle.style.left) + (Math.random() * 40 - 20)) + '%';
            particle.style.opacity = '0';
            particle.style.transform = `rotate(${Math.random() * 720}deg) scale(${0.3 + Math.random() * 0.7})`;
        }, 100);
        setTimeout(() => particle.remove(), 6200);
    }
    createRisingHeart() {
        const heart = document.createElement('span');
        const sizes = ['text-xl', 'text-2xl', 'text-3xl', 'text-4xl'];
        heart.className = `absolute ${sizes[Math.floor(Math.random() * sizes.length)]}`;
        heart.textContent = this.hearts[Math.floor(Math.random() * this.hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-50px';
        heart.style.transition = 'all 5s ease-out';
        heart.style.opacity = '0.8';
        heart.style.filter = 'drop-shadow(0 0 10px rgba(255, 100, 150, 0.6))';
        this.container.appendChild(heart);
        setTimeout(() => {
            heart.style.bottom = '110%';
            heart.style.left = (parseFloat(heart.style.left) + (Math.random() * 20 - 10)) + '%';
            heart.style.opacity = '0';
            heart.style.transform = `scale(1.5) rotate(${Math.random() * 30 - 15}deg)`;
        }, 100);
        setTimeout(() => heart.remove(), 5200);
    }
    createSparkleBurst() {
        const sparkles = ['✨', '🌟', '⭐', '💫', '✧', '❋'];
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 70 + 15;
        for (let i = 0; i < 12; i++) {
            const spark = document.createElement('span');
            spark.className = 'absolute text-2xl';
            spark.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            spark.style.left = x + '%';
            spark.style.top = y + '%';
            spark.style.transition = 'all 1.2s ease-out';
            spark.style.opacity = '1';
            spark.style.filter = 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.9))';
            this.container.appendChild(spark);
            setTimeout(() => {
                const angle = (i / 12) * Math.PI * 2;
                const distance = 80 + Math.random() * 40;
                spark.style.left = (x + Math.cos(angle) * distance / 8) + '%';
                spark.style.top = (y + Math.sin(angle) * distance / 8) + '%';
                spark.style.opacity = '0';
                spark.style.transform = 'scale(2) rotate(180deg)';
            }, 50);
            setTimeout(() => spark.remove(), 1300);
        }
    }
    createConfettiShower() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('span');
                confetti.className = 'absolute text-2xl';
                confetti.textContent = this.confetti[Math.floor(Math.random() * this.confetti.length)];
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-30px';
                confetti.style.transition = 'all 4s ease-in';
                confetti.style.opacity = '1';
                this.container.appendChild(confetti);
                setTimeout(() => {
                    confetti.style.top = '110%';
                    confetti.style.left = (parseFloat(confetti.style.left) + (Math.random() * 30 - 15)) + '%';
                    confetti.style.opacity = '0';
                    confetti.style.transform = `rotate(${Math.random() * 1080}deg)`;
                }, 50);
                setTimeout(() => confetti.remove(), 4100);
            }, i * 100);
        }
    }
    createFireworkShow() {
        const positions = [
            { x: 20, y: 20 }, { x: 80, y: 25 }, { x: 50, y: 15 },
            { x: 30, y: 35 }, { x: 70, y: 40 }
        ];
        positions.forEach((pos, index) => {
            setTimeout(() => this.createFirework(pos.x, pos.y), index * 400);
        });
    }
    createFirework(x, y) {
        const colors = ['rgba(255, 215, 0, 0.9)', 'rgba(27, 94, 32, 0.8)', 'rgba(255, 100, 150, 0.8)', 'rgba(255, 255, 255, 0.9)'];
        for (let i = 0; i < 16; i++) {
            const spark = document.createElement('span');
            spark.className = 'absolute text-xl';
            spark.textContent = this.fireworks[Math.floor(Math.random() * this.fireworks.length)];
            spark.style.left = x + '%';
            spark.style.top = y + '%';
            spark.style.transition = 'all 1.5s ease-out';
            spark.style.opacity = '1';
            spark.style.filter = `drop-shadow(0 0 15px ${colors[Math.floor(Math.random() * colors.length)]})`;
            this.container.appendChild(spark);
            setTimeout(() => {
                const angle = (i / 16) * Math.PI * 2;
                const distance = 100 + Math.random() * 60;
                spark.style.left = (x + Math.cos(angle) * distance / 6) + '%';
                spark.style.top = (y + Math.sin(angle) * distance / 6) + '%';
                spark.style.opacity = '0';
                spark.style.transform = 'scale(2)';
            }, 50);
            setTimeout(() => spark.remove(), 1600);
        }
    }
    createStreamer() {
        const side = Math.random() > 0.5 ? 'left' : 'right';
        const streamer = document.createElement('span');
        streamer.className = 'absolute text-4xl';
        streamer.textContent = ['🎀', '🎗️', '🏵️', '🌸', '💐'][Math.floor(Math.random() * 5)];
        streamer.style[side] = '-50px';
        streamer.style.top = Math.random() * 60 + 20 + '%';
        streamer.style.transition = 'all 4s ease-in-out';
        streamer.style.opacity = '0.9';
        this.container.appendChild(streamer);
        setTimeout(() => {
            streamer.style[side] = '110%';
            streamer.style.top = (parseFloat(streamer.style.top) + (Math.random() * 20 - 10)) + '%';
            streamer.style.opacity = '0';
            streamer.style.transform = `rotate(${Math.random() * 360}deg) scale(1.5)`;
        }, 100);
        setTimeout(() => streamer.remove(), 4200);
    }
}
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
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
    const scrollAnimator = new ScrollAnimator();
    const particles = new FloatingParticles();
    console.log('🎊 Wedding Invitation App Initialized');
    console.log('💑 May their union be blessed forever!');
});
