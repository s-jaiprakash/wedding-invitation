"use strict";
class ThemeRotator {
    constructor() {
        this.themes = ['green', 'maroon', 'royal'];
        this.themeClasses = ['', 'theme-maroon', 'theme-royal'];
        this.rotationInterval = 30 * 60 * 1000; // 30 minutes in milliseconds
        this.init();
    }
    init() {
        // Calculate which theme should be active based on current time
        this.applyThemeByTime();
        // Set up rotation timer
        this.startRotation();
        // Log current theme
        console.log(`🎨 Theme: ${this.getCurrentThemeName()} (rotates every 30 mins)`);
    }
    applyThemeByTime() {
        // Get minutes since midnight
        const now = new Date();
        const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
        // Each theme lasts 30 minutes, so divide by 30 to get which cycle we're in
        const themeIndex = Math.floor(minutesSinceMidnight / 30) % this.themes.length;
        this.applyTheme(themeIndex);
    }
    applyTheme(index) {
        // Remove all theme classes
        this.themeClasses.forEach(cls => {
            if (cls) document.documentElement.classList.remove(cls);
        });
        // Apply the new theme class (green has no class, it's default)
        if (this.themeClasses[index]) {
            document.documentElement.classList.add(this.themeClasses[index]);
        }
        this.currentThemeIndex = index;
    }
    getCurrentThemeName() {
        return this.themes[this.currentThemeIndex].charAt(0).toUpperCase() +
               this.themes[this.currentThemeIndex].slice(1);
    }
    startRotation() {
        // Calculate time until next theme change
        const now = new Date();
        const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
        const secondsIntoCurrentMinute = now.getSeconds();
        const minutesUntilNextChange = 30 - (minutesSinceMidnight % 30);
        const msUntilNextChange = (minutesUntilNextChange * 60 - secondsIntoCurrentMinute) * 1000;
        // Set timeout for next change
        setTimeout(() => {
            this.rotateTheme();
            // Then set interval for regular rotation
            setInterval(() => this.rotateTheme(), this.rotationInterval);
        }, msUntilNextChange);
    }
    rotateTheme() {
        const nextIndex = (this.currentThemeIndex + 1) % this.themes.length;
        this.applyTheme(nextIndex);
        console.log(`🎨 Theme changed to: ${this.getCurrentThemeName()}`);
    }
}
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
class StoryWriter {
    constructor() {
        this.storyEN = `Once upon a time, my family, her family, and destiny had a meeting—and I was informed of the decision later 😄.

It was an arranged marriage, simple and straightforward. We met politely, spoke carefully, and smiled awkwardly. Then I noticed her cuteness and innocence, and just like that, the arrangement started to feel perfect.

Two souls brought together by our families and fate. With everyone's blessings, I'm now getting married to a beautiful woman—proof that sometimes the best things are arranged first and loved later. ❤️`;

        this.storyTE = `మా కుటుంబాల ఆశీర్వాదాలతో, ఒక అందమైన అరేంజ్డ్ మ్యారేజ్ ద్వారా మా జీవితాల కొత్త అధ్యాయం మొదలవుతోంది.

మేము కలిసాం, మాట్లాడాం, ఆమె క్యూట్‌నెస్‌, అమాయకత్వం నచ్చాయి, అలా ఈ బంధం సహజంగా ముందుకు సాగింది.

అందరి ఆశీర్వాదాలతో ఇప్పుడు మా పెళ్లి జరగబోతోంది. ఈ ఆనందక్షణంలో మీరు కూడా భాగస్వాములు కావాలని కోరుకుంటున్నాం. ❤️`;

        this.container = document.getElementById('storyContainer');
        this.content = document.getElementById('storyContent');
        this.cursor = document.getElementById('penCursor');
        this.currentLang = document.documentElement.lang === 'te' ? 'te' : 'en';
        this.isWriting = false;
        this.hasStarted = false;
        this.charIndex = 0;
        this.writeSpeed = 30; // ms per character
        this.init();
    }
    init() {
        if (!this.container || !this.content) return;
        // Set up intersection observer to start writing when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.hasStarted) {
                    this.hasStarted = true;
                    setTimeout(() => this.startWriting(), 500);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(this.container);
        // Listen for language changes
        document.getElementById('langToggle')?.addEventListener('click', () => {
            setTimeout(() => {
                this.currentLang = document.documentElement.lang === 'te' ? 'te' : 'en';
                this.restartWriting();
            }, 100);
        });
    }
    getStory() {
        return this.currentLang === 'te' ? this.storyTE : this.storyEN;
    }
    startWriting() {
        // Sync language before starting to write
        this.currentLang = document.documentElement.lang === 'te' ? 'te' : 'en';
        this.isWriting = true;
        this.charIndex = 0;
        this.content.innerHTML = '';
        this.cursor.style.display = 'inline-block';
        this.writeNextChar();
    }
    restartWriting() {
        this.hasStarted = true;
        this.charIndex = 0;
        this.content.innerHTML = '';
        this.startWriting();
    }
    writeNextChar() {
        if (!this.isWriting) return;
        const story = this.getStory();
        if (this.charIndex < story.length) {
            const char = story[this.charIndex];
            let delay = this.writeSpeed;

            // Check for paragraph break (double newline)
            if (char === '\n' && story[this.charIndex + 1] === '\n') {
                this.content.appendChild(document.createElement('br'));
                this.content.appendChild(document.createElement('br'));
                this.charIndex += 2; // Skip both newlines
                delay = 400;
            } else if (char === '\n') {
                // Single newline - just skip it (treat as space)
                this.charIndex++;
                delay = 50;
            } else {
                const span = document.createElement('span');
                span.className = 'story-char';
                span.textContent = char;
                this.content.appendChild(span);
                // Animate the character appearing
                requestAnimationFrame(() => {
                    span.classList.add('visible');
                });
                this.charIndex++;

                // Vary speed for natural feel
                if (char === '.' || char === '!' || char === '?') {
                    delay = 300; // Pause at sentence end
                } else if (char === ',') {
                    delay = 150; // Brief pause at comma
                } else if (char === ' ') {
                    delay = 20; // Quick space
                }
            }

            setTimeout(() => this.writeNextChar(), delay);
        } else {
            // Writing complete
            this.isWriting = false;
            this.cursor.style.animation = 'pen-cursor-blink 1.5s infinite';
            // Add final flourish
            setTimeout(() => {
                this.cursor.style.display = 'none';
            }, 2000);
        }
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
        this.particles = ['🪷', '✨', '💫', '🌸', '💐', '🌺', '💕', '🌟', '🦋', '🌹', '💖'];
        this.hearts = ['💕', '💖', '💗', '💞', '❤️', '💚'];
        this.confetti = ['🎊', '🎉', '🎀', '✨'];
        this.container = document.createElement('div');
        this.container.className = 'fixed inset-0 pointer-events-none overflow-hidden z-0';
        this.container.id = 'particles';
        this.container.style.willChange = 'contents';
        document.body.prepend(this.container);
        this.isVisible = true;
        this.init();
    }
    init() {
        // Pause animations when tab is hidden
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
        });
        // Create initial burst of particles (fewer)
        for (let i = 0; i < 8; i++) {
            setTimeout(() => this.createParticle(), i * 200);
        }
        // Reduced frequency intervals
        setInterval(() => this.isVisible && this.createParticle(), 1500);
        setInterval(() => this.isVisible && this.createRisingHeart(), 2000);
        setInterval(() => this.isVisible && this.createSparkleBurst(), 6000);
        setInterval(() => this.isVisible && this.createConfettiShower(), 10000);
    }
    createParticle() {
        if (this.container.childElementCount > 30) return; // Limit max elements
        const particle = document.createElement('span');
        const sizes = ['text-2xl', 'text-3xl'];
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        particle.className = `absolute ${size}`;
        particle.textContent = this.particles[Math.floor(Math.random() * this.particles.length)];
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            top: -50px;
            opacity: 0.8;
            will-change: transform, opacity;
            transition: transform 6s ease-in-out, opacity 6s ease-in-out;
        `;
        this.container.appendChild(particle);
        requestAnimationFrame(() => {
            particle.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
            particle.style.opacity = '0';
        });
        setTimeout(() => particle.remove(), 6100);
    }
    createRisingHeart() {
        if (this.container.childElementCount > 30) return;
        const heart = document.createElement('span');
        const sizes = ['text-xl', 'text-2xl'];
        heart.className = `absolute ${sizes[Math.floor(Math.random() * sizes.length)]}`;
        heart.textContent = this.hearts[Math.floor(Math.random() * this.hearts.length)];
        heart.style.cssText = `
            left: ${Math.random() * 100}%;
            bottom: -50px;
            opacity: 0.7;
            will-change: transform, opacity;
            transition: transform 5s ease-out, opacity 5s ease-out;
        `;
        this.container.appendChild(heart);
        requestAnimationFrame(() => {
            heart.style.transform = `translateY(-${window.innerHeight + 100}px) scale(1.3)`;
            heart.style.opacity = '0';
        });
        setTimeout(() => heart.remove(), 5100);
    }
    createSparkleBurst() {
        if (this.container.childElementCount > 25) return;
        const sparkles = ['✨', '🌟', '⭐', '💫'];
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 70 + 15;
        for (let i = 0; i < 6; i++) {
            const spark = document.createElement('span');
            spark.className = 'absolute text-xl';
            spark.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            spark.style.cssText = `
                left: ${x}%;
                top: ${y}%;
                opacity: 1;
                will-change: transform, opacity;
                transition: transform 1s ease-out, opacity 1s ease-out;
            `;
            this.container.appendChild(spark);
            const angle = (i / 6) * Math.PI * 2;
            const distance = 60 + Math.random() * 30;
            requestAnimationFrame(() => {
                spark.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(1.5)`;
                spark.style.opacity = '0';
            });
            setTimeout(() => spark.remove(), 1100);
        }
    }
    createConfettiShower() {
        if (this.container.childElementCount > 20) return;
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const confetti = document.createElement('span');
                confetti.className = 'absolute text-xl';
                confetti.textContent = this.confetti[Math.floor(Math.random() * this.confetti.length)];
                confetti.style.cssText = `
                    left: ${Math.random() * 100}%;
                    top: -30px;
                    opacity: 0.9;
                    will-change: transform, opacity;
                    transition: transform 4s ease-in, opacity 4s ease-in;
                `;
                this.container.appendChild(confetti);
                requestAnimationFrame(() => {
                    confetti.style.transform = `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`;
                    confetti.style.opacity = '0';
                });
                setTimeout(() => confetti.remove(), 4100);
            }, i * 150);
        }
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
    const themeRotator = new ThemeRotator();
    const langManager = new LanguageManager();
    const countdown = new CountdownTimer('2026-01-28T10:00:00+05:30');
    const scrollAnimator = new ScrollAnimator();
    const particles = new FloatingParticles();
    const storyWriter = new StoryWriter();
    console.log('🎊 Wedding Invitation App Initialized');
    console.log('💑 May their union be blessed forever!');
});
