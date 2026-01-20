// Wedding Invitation App - TypeScript

type Language = 'en' | 'te';

interface TranslationElement extends HTMLElement {
    dataset: DOMStringMap & {
        en?: string;
        te?: string;
    };
}

// Language Management
class LanguageManager {
    private currentLang: Language = 'en';
    private langToggle: HTMLElement | null;
    private langText: HTMLElement | null;
    private langIcon: HTMLElement | null;

    constructor() {
        this.langToggle = document.getElementById('langToggle');
        this.langText = document.getElementById('langText');
        this.langIcon = document.getElementById('langIcon');

        this.init();
    }

    private init(): void {
        // Check for saved language preference
        const savedLang = localStorage.getItem('weddingLang') as Language;
        if (savedLang) {
            this.currentLang = savedLang;
            this.applyLanguage();
        }

        // Add click listener
        this.langToggle?.addEventListener('click', () => this.toggleLanguage());
    }

    private toggleLanguage(): void {
        this.currentLang = this.currentLang === 'en' ? 'te' : 'en';
        localStorage.setItem('weddingLang', this.currentLang);
        this.applyLanguage();
    }

    private applyLanguage(): void {
        // Update all translatable elements
        const elements = document.querySelectorAll<TranslationElement>('[data-en][data-te]');

        elements.forEach((el) => {
            const text = this.currentLang === 'en' ? el.dataset.en : el.dataset.te;
            if (text) {
                el.textContent = text;
            }
        });

        // Update toggle button
        if (this.langText) {
            this.langText.textContent = this.currentLang === 'en' ? 'తెలుగు' : 'English';
        }
        if (this.langIcon) {
            this.langIcon.textContent = '🇮🇳';
        }

        // Update document language
        document.documentElement.lang = this.currentLang === 'en' ? 'en' : 'te';

        // Add Telugu font class for Telugu text
        if (this.currentLang === 'te') {
            document.body.classList.add('telugu-active');
        } else {
            document.body.classList.remove('telugu-active');
        }
    }

    public getCurrentLanguage(): Language {
        return this.currentLang;
    }
}

// Countdown Timer
class CountdownTimer {
    private weddingDate: Date;
    private daysEl: HTMLElement | null;
    private hoursEl: HTMLElement | null;
    private minutesEl: HTMLElement | null;
    private secondsEl: HTMLElement | null;

    constructor(weddingDateStr: string) {
        this.weddingDate = new Date(weddingDateStr);
        this.daysEl = document.getElementById('days');
        this.hoursEl = document.getElementById('hours');
        this.minutesEl = document.getElementById('minutes');
        this.secondsEl = document.getElementById('seconds');

        this.init();
    }

    private init(): void {
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
    }

    private updateCountdown(): void {
        const now = new Date().getTime();
        const distance = this.weddingDate.getTime() - now;

        if (distance < 0) {
            // Wedding has passed
            if (this.daysEl) this.daysEl.textContent = '🎊';
            if (this.hoursEl) this.hoursEl.textContent = '🎉';
            if (this.minutesEl) this.minutesEl.textContent = '💑';
            if (this.secondsEl) this.secondsEl.textContent = '💕';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (this.daysEl) this.daysEl.textContent = this.padNumber(days);
        if (this.hoursEl) this.hoursEl.textContent = this.padNumber(hours);
        if (this.minutesEl) this.minutesEl.textContent = this.padNumber(minutes);
        if (this.secondsEl) this.secondsEl.textContent = this.padNumber(seconds);
    }

    private padNumber(num: number): string {
        return num.toString().padStart(2, '0');
    }
}

// RSVP Handler
class RSVPHandler {
    private form: HTMLFormElement | null;
    private modal: HTMLElement | null;
    private closeModalBtn: HTMLElement | null;
    private rsvpButtons: NodeListOf<HTMLButtonElement>;

    constructor() {
        this.form = document.getElementById('rsvpForm') as HTMLFormElement | null;
        this.modal = document.getElementById('successModal');
        this.closeModalBtn = document.getElementById('closeModal');
        this.rsvpButtons = document.querySelectorAll('.rsvp-btn');

        this.init();
    }

    private init(): void {
        this.rsvpButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => this.handleRSVP(e));
        });

        this.closeModalBtn?.addEventListener('click', () => this.closeModal());
        this.modal?.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
    }

    private handleRSVP(e: Event): void {
        const button = e.currentTarget as HTMLButtonElement;
        const response = button.dataset.response;

        // Get form data
        const nameInput = this.form?.querySelector('input[type="text"]') as HTMLInputElement;
        const phoneInput = this.form?.querySelector('input[type="tel"]') as HTMLInputElement;
        const guestsSelect = this.form?.querySelector('select') as HTMLSelectElement;

        const name = nameInput?.value.trim();
        const phone = phoneInput?.value.trim();
        const guests = guestsSelect?.value;

        if (!name) {
            this.shakeElement(nameInput);
            nameInput?.focus();
            return;
        }

        // In a real application, you would send this data to a backend
        console.log('RSVP Submitted:', {
            name,
            phone,
            guests,
            response
        });

        // Show success modal
        this.showModal();

        // Reset form
        if (nameInput) nameInput.value = '';
        if (phoneInput) phoneInput.value = '';
        if (guestsSelect) guestsSelect.selectedIndex = 0;
    }

    private showModal(): void {
        this.modal?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    private closeModal(): void {
        this.modal?.classList.add('hidden');
        document.body.style.overflow = '';
    }

    private shakeElement(el: HTMLElement | null): void {
        if (!el) return;
        el.classList.add('shake');
        el.style.borderColor = '#ff4444';
        setTimeout(() => {
            el.classList.remove('shake');
            el.style.borderColor = '';
        }, 500);
    }
}

// Smooth Scroll Animation
class ScrollAnimator {
    private observerOptions: IntersectionObserverInit = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    constructor() {
        this.init();
    }

    private init(): void {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Observe sections
        document.querySelectorAll('section').forEach((section) => {
            section.style.opacity = '0';
            observer.observe(section);
        });
    }
}

// Floating Particles Effect (Optional Enhancement)
class FloatingParticles {
    private container: HTMLElement;
    private particles: string[] = ['🪷', '✨', '💫', '🌸', '🪔'];

    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'fixed inset-0 pointer-events-none overflow-hidden z-0';
        this.container.id = 'particles';
        document.body.prepend(this.container);

        this.init();
    }

    private init(): void {
        // Create particles periodically
        setInterval(() => this.createParticle(), 3000);
    }

    private createParticle(): void {
        const particle = document.createElement('span');
        particle.className = 'absolute text-2xl opacity-50';
        particle.textContent = this.particles[Math.floor(Math.random() * this.particles.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '-50px';
        particle.style.transition = 'all 10s linear';

        this.container.appendChild(particle);

        // Animate falling
        setTimeout(() => {
            particle.style.top = '110%';
            particle.style.left = (parseFloat(particle.style.left) + (Math.random() * 20 - 10)) + '%';
            particle.style.opacity = '0';
        }, 100);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 10100);
    }
}

// Add shake animation CSS dynamically
function addDynamicStyles(): void {
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

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Add dynamic styles
    addDynamicStyles();

    // Initialize Language Manager
    const langManager = new LanguageManager();

    // Initialize Countdown Timer (January 28, 2026, 10:00 AM IST)
    const countdown = new CountdownTimer('2026-01-28T10:00:00+05:30');

    // Initialize RSVP Handler
    const rsvpHandler = new RSVPHandler();

    // Initialize Scroll Animations
    const scrollAnimator = new ScrollAnimator();

    // Initialize Floating Particles (subtle background effect)
    const particles = new FloatingParticles();

    console.log('🎊 Wedding Invitation App Initialized');
    console.log('💑 May their union be blessed forever!');
});

// Classes are available globally
