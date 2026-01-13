/**
 * MulyoNode Official Website
 * "Stability through Obscurity"
 */

// ==========================================
// Theme Manager
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const icon = themeToggle.querySelector('i');

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    icon.className = theme === 'light' ? 'ri-moon-line' : 'ri-sun-line';
}

// ==========================================
// Mobile Menu Toggle
// ==========================================
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.className = 'ri-close-line';
        } else {
            icon.className = 'ri-menu-line';
        }
    });

    // Close menu when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuToggle.querySelector('i').className = 'ri-menu-line';
        });
    });
}

// ==========================================
// Terminal Simulator
// ==========================================
class TerminalTyper {
    constructor(elementId) {
        this.el = document.getElementById(elementId);
        this.queue = [
            { type: 'cmd', text: 'mulyo init' },
            { type: 'out', text: 'Initializing Infrastructure... Done.', style: 't-muted' },
            { type: 'out', text: 'ConfigFile: created at ./revolusi-mental.config.js' },
            { type: 'wait', ms: 500 },
            { type: 'cmd', text: 'mulyo audit' },
            { type: 'out', text: 'Scanning codebase for critical bugs...', style: 't-muted' },
            { type: 'out', text: 'Found 32 critical vulnerabilities.' },
            { type: 'out', text: 'Applying "Structural Adjustment"...' },
            { type: 'out', text: 'Result: WTP (Wajar Tanpa Pengecualian) ✅', style: 't-success' },
            { type: 'wait', ms: 1000 },
            { type: 'cmd', text: 'mulyo start app.js --gerilya' },
            { type: 'out', text: 'Starting process in background (Ordal Mode)...' },
            { type: 'out', text: 'PID: 1337 | Status: UNTOUCHABLE', style: 't-success' },
            { type: 'wait', ms: 2000 },
            { type: 'clear' }
        ];
        this.step = 0;
        this.typingSpeed = 50;

        this.init();
    }

    init() {
        this.processQueue();
    }

    async processQueue() {
        if (this.step >= this.queue.length) {
            this.step = 0; // Loop
        }

        const item = this.queue[this.step];

        if (item.type === 'clear') {
            this.el.innerHTML = '';
            this.step++;
            this.processQueue();
            return;
        }

        if (item.type === 'wait') {
            await this.wait(item.ms);
            this.step++;
            this.processQueue();
            return;
        }

        if (item.type === 'cmd') {
            await this.typeCommand(item.text);
        } else {
            this.addOutput(item.text, item.style);
        }

        this.step++;
        this.processQueue();
    }

    async typeCommand(text) {
        const line = document.createElement('div');
        line.className = 'line';
        line.innerHTML = '<span class="t-cmd">root@palace:~$</span> <span class="text"></span><span class="cursor"></span>';
        this.el.appendChild(line);

        const textSpan = line.querySelector('.text');
        const cursor = this.el.querySelector('.cursor'); // Remove old cursors?

        // Remove ALL other cursors first
        document.querySelectorAll('.cursor').forEach(c => c.style.display = 'none');
        line.querySelector('.cursor').style.display = 'inline-block';

        // Type character by character
        for (let char of text) {
            textSpan.textContent += char;
            await this.wait(this.typingSpeed + Math.random() * 50);
            this.scrollToBottom();
        }

        await this.wait(300);
        // Remove cursor from this line after done
        line.querySelector('.cursor').style.display = 'none';
    }

    addOutput(text, styleClass = '') {
        const div = document.createElement('div');
        div.className = styleClass;
        div.textContent = text;
        this.el.appendChild(div);
        this.scrollToBottom();
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    scrollToBottom() {
        this.el.scrollTop = this.el.scrollHeight;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TerminalTyper('terminal-body');
});

// ==========================================
// Bansos Counter with Animated Chart
// ==========================================
const bansosEl = document.getElementById('bansos-counter');
const chartBars = document.querySelectorAll('.stat-chart .bar');

// Random fluctuation between 50-300
function getRandomBansos() {
    return (Math.random() * 250 + 50).toFixed(2);
}

// Update counter with random value
function updateBansosCounter() {
    if (bansosEl) {
        const value = getRandomBansos();
        bansosEl.textContent = value;

        // Animate chart bars based on value
        const percentage = parseFloat(value) / 300; // normalize to 0-1
        chartBars.forEach((bar, index) => {
            // Each bar gets a slightly different random height
            const baseHeight = percentage * 100;
            const randomVariation = Math.random() * 40 - 20; // -20 to +20
            const finalHeight = Math.min(100, Math.max(20, baseHeight + randomVariation));
            bar.style.height = `${finalHeight}%`;
            bar.style.transition = 'height 0.3s ease';
        });
    }
}

// Initial call and interval
updateBansosCounter();
setInterval(updateBansosCounter, 500);

// ==========================================
// Copy Command (works on all pages)
// ==========================================
function copyInstallCmd(event) {
    // Copy to clipboard using modern API
    navigator.clipboard.writeText('npm install -g mulyonode').then(() => {
        showCopySuccess(event);
    }).catch(() => {
        // Fallback for older browsers
        const input = document.getElementById('install-cmd');
        if (input) {
            input.select();
            document.execCommand('copy');
        }
        showCopySuccess(event);
    });
}

function showCopySuccess(event) {
    // Find the button that was clicked (could be the icon inside)
    let btn = null;

    if (event && event.target) {
        btn = event.target.closest('button');
    }

    if (!btn) {
        btn = document.querySelector('.btn-copy') || document.querySelector('.btn-copy-cta');
    }

    if (btn) {
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="ri-check-line" style="color: #22c55e; font-size: 1.2rem;"></i>';
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
            btn.innerHTML = originalIcon;
            btn.style.pointerEvents = 'auto';
        }, 2000);
    }
}

// ==========================================
// Scroll Spy (Intersection Observer)
// ==========================================
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Active when section is near top of viewport
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            updateActiveLink(id);
        }
    });
}, observerOptions);

document.querySelectorAll('.cmd-group').forEach(section => {
    observer.observe(section);
});

function updateActiveLink(id) {
    document.querySelectorAll('.doc-nav li a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// Scroll Reveal Animation
// ==========================================
const revealElements = document.querySelectorAll('.card, .philosophy-item, .testimonial, details, .cta-card');

// Add initial hidden state
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger the reveal with delay based on index
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ==========================================
// Documentation Search
// ==========================================
const docSearch = document.getElementById('doc-search');
const docGroups = document.querySelectorAll('.cmd-group');

if (docSearch) {
    docSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();

        docGroups.forEach(group => {
            let hasVisibleItems = false;
            const items = group.querySelectorAll('.cmd-item');

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                const keywords = item.getAttribute('data-cmd') ? item.getAttribute('data-cmd').toLowerCase() : '';

                if (text.includes(term) || keywords.includes(term)) {
                    item.style.display = 'block';
                    hasVisibleItems = true;
                } else {
                    item.style.display = 'none';
                }
            });

            // Hide empty groups
            group.style.display = hasVisibleItems ? 'block' : 'none';
        });
    });
}
