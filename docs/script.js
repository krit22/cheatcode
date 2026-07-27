/* ============================================================
   CheatCode Landing Page — JavaScript
   ============================================================ */

// --- Copy install command ---
function copyInstall() {
    const cmd = 'npm install -g cheatcode-cli';
    navigator.clipboard.writeText(cmd).then(() => {
        // Show toast
        const toast = document.getElementById('toast');
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2400);
        }

        // Flip copy buttons to checkmark
        const btns = document.querySelectorAll('.copy-btn');
        btns.forEach(btn => {
            btn.classList.add('copied');
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
            }, 2000);
        });
    });
}

// --- Scroll Reveal ---
(function initScrollReveal() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll(
        '.ig-terminal, .ig-instructions, .stealth-panel, .stealth-arrow, .cta-card'
    );
    elements.forEach((el) => observer.observe(el));
})();

// --- Nav background on scroll ---
(function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.style.borderBottomColor = 'rgba(30, 30, 42, 0.8)';
            nav.style.background = 'rgba(8, 8, 12, 0.95)';
        } else {
            nav.style.borderBottomColor = '';
            nav.style.background = '';
        }
    });
})();

// --- Walking Monster Brain AI ---
(function initMonsterBrain() {
    const monster = document.getElementById('walking-monster');
    const logoWrapper = document.querySelector('.terminal-logo-wrapper');
    if (!monster || !logoWrapper) return;

    let posX = 2;
    let direction = 1;
    let isMoving = false;
    let isHovering = false;
    let targetX = posX;
    let moveSpeed = 0.15;
    let brainTimer = null;

    function updateTransform() {
        monster.style.transform = `scaleX(${direction})`;
    }

    function setActionState(state) {
        monster.classList.remove('is-walking', 'is-hammering');
        if (state) monster.classList.add(state);
        if (state === 'is-hammering') {
            logoWrapper.classList.add('is-impact-shaking');
        } else {
            logoWrapper.classList.remove('is-impact-shaking');
        }
    }

    function thinkNextAction() {
        if (isHovering) return;
        const roll = Math.random();

        if (roll < 0.5) {
            const distance = 10 + Math.random() * 25;
            targetX = posX + (distance * direction);
            if (targetX > 90) { targetX = 90; direction = -1; }
            else if (targetX < 2) { targetX = 2; direction = 1; }
            moveSpeed = 0.1 + Math.random() * 0.15;
            direction = targetX > posX ? 1 : -1;
            updateTransform();
            setActionState('is-walking');
            isMoving = true;
        } else if (roll < 0.75) {
            setActionState('is-hammering');
            isMoving = false;
            brainTimer = setTimeout(() => {
                setActionState(null);
                brainTimer = setTimeout(thinkNextAction, 400 + Math.random() * 600);
            }, 800);
        } else if (roll < 0.9) {
            setActionState(null);
            isMoving = false;
            brainTimer = setTimeout(() => {
                direction *= -1;
                updateTransform();
                brainTimer = setTimeout(thinkNextAction, 800 + Math.random() * 1000);
            }, 500);
        } else {
            setActionState(null);
            isMoving = false;
            brainTimer = setTimeout(thinkNextAction, 1000 + Math.random() * 1200);
        }
    }

    logoWrapper.addEventListener('mousemove', (e) => {
        isHovering = true;
        if (brainTimer) clearTimeout(brainTimer);
        const rect = logoWrapper.getBoundingClientRect();
        let pctX = ((e.clientX - rect.left) / rect.width) * 100;
        pctX = Math.max(2, Math.min(90, pctX));
        targetX = pctX;
        moveSpeed = 0.9;
        const newDir = targetX > posX ? 1 : -1;
        if (newDir !== direction && Math.abs(targetX - posX) > 2) {
            direction = newDir;
            updateTransform();
        }
        if (Math.abs(targetX - posX) > 3) {
            setActionState('is-walking');
        } else {
            setActionState('is-hammering');
        }
        isMoving = true;
    });

    logoWrapper.addEventListener('mouseleave', () => {
        isHovering = false;
        setActionState(null);
        isMoving = false;
        brainTimer = setTimeout(thinkNextAction, 800);
    });

    function gameLoop() {
        if (isMoving) {
            const diff = targetX - posX;
            if (Math.abs(diff) < 0.8) {
                posX = targetX;
                monster.style.left = posX + '%';
                if (isHovering) {
                    setActionState('is-hammering');
                } else {
                    isMoving = false;
                    setActionState(null);
                    brainTimer = setTimeout(thinkNextAction, 300 + Math.random() * 800);
                }
            } else {
                posX += Math.sign(diff) * moveSpeed;
                monster.style.left = posX + '%';
            }
        }
        requestAnimationFrame(gameLoop);
    }

    updateTransform();
    brainTimer = setTimeout(thinkNextAction, 800);
    requestAnimationFrame(gameLoop);
})();

// --- Install Terminal Typing Animation ---
(function initInstallTerminal() {
    const body = document.getElementById('ig-term-body');
    if (!body) return;

    // Define the install sequence: each item is a line to render.
    // type: 'prompt' = user-typed command (typed char-by-char)
    // type: 'output' = system output (appears instantly with short delay)
    // type: 'blank' = empty line spacer
    // step: which ig-step card to highlight (1-indexed), 0 = none
    const sequence = [
        { type: 'prompt', text: 'npm install -g cheatcode-cli' },
        { type: 'output', text: '✓ Installed cheatcode-cli@1.2.0', cls: 'success-line' },
        { type: 'blank' },
        { type: 'prompt', text: 'cheatcode' },
        { type: 'output', text: '⚡ CheatCode — How can I help you today?', cls: 'accent-line' },
        { type: 'blank' },
        { type: 'prompt', text: 'how do I center a div in CSS?' },
        { type: 'output', text: '[AI] display: flex; justify-content: center; align-items: center;', cls: 'mai' },
    ];

    const PROMPT_PREFIX = 'krit@laptop:~$ ';
    const TYPE_SPEED = 35;      // ms per character for typed commands
    const OUTPUT_DELAY = 180;   // ms pause before each output line
    const STEP_PAUSE = 600;     // ms pause between steps
    const RESTART_DELAY = 4000; // ms pause before looping

    let hasPlayed = false;

    function highlightStep(stepNum) {
        document.querySelectorAll('.ig-step').forEach(s => s.classList.remove('active'));
        if (stepNum > 0) {
            const el = document.querySelector(`.ig-step[data-step="${stepNum}"]`);
            if (el) el.classList.add('active');
        }
    }

    function createLine(html, cls) {
        const div = document.createElement('div');
        div.className = 'ml' + (cls ? ' ' + cls : '');
        div.innerHTML = html;
        body.appendChild(div);
        body.scrollTop = body.scrollHeight;
        return div;
    }

    function typeText(el, text) {
        return new Promise(resolve => {
            let i = 0;
            const cursor = document.createElement('span');
            cursor.className = 'cursor-blink';
            cursor.textContent = '|';
            el.appendChild(cursor);

            function tick() {
                if (i < text.length) {
                    // Insert character before cursor
                    cursor.before(document.createTextNode(text[i]));
                    i++;
                    body.scrollTop = body.scrollHeight;
                    setTimeout(tick, TYPE_SPEED + Math.random() * 20);
                } else {
                    cursor.remove();
                    resolve();
                }
            }
            tick();
        });
    }

    function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    async function playSequence() {
        body.innerHTML = '';
        let lastStep = 0;

        for (const item of sequence) {
            // Highlight the instruction step card
            if (item.step && item.step !== lastStep) {
                highlightStep(item.step);
                if (lastStep > 0) await sleep(STEP_PAUSE);
                lastStep = item.step;
            }

            if (item.type === 'blank') {
                createLine('&nbsp;');
                await sleep(80);
            } else if (item.type === 'prompt') {
                const line = createLine(`<span class="mp">${PROMPT_PREFIX}</span>`);
                await typeText(line, item.text);
                await sleep(300);
            } else if (item.type === 'output') {
                await sleep(OUTPUT_DELAY);
                createLine(escapeHtml(item.text) || '&nbsp;', item.cls || 'mstealth');
            } else if (item.type === 'code') {
                await sleep(OUTPUT_DELAY);
                const div = document.createElement('div');
                div.className = 'ml code-block';
                div.innerHTML = escapeHtml(item.text).replace(/\\n/g, '<br>');
                body.appendChild(div);
                body.scrollTop = body.scrollHeight;
            }
        }

        // Show final cursor
        await sleep(400);
        createLine(`<span class="mp">${PROMPT_PREFIX}</span><span class="cursor-blink">|</span>`);
        highlightStep(0);

        // Loop after delay
        await sleep(RESTART_DELAY);
        playSequence();
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Start animation when section scrolls into view
    const wrapper = document.getElementById('ig-terminal-wrap');
    if (wrapper) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasPlayed) {
                    hasPlayed = true;
                    playSequence();
                }
            });
        }, { threshold: 0.3 });
        obs.observe(wrapper);
    }
})();

// --- Interactive Stealth Disguise Demo ---
(function initStealthDemo() {
    const tabBtn = document.getElementById('stealth-tab-btn');
    const aiContent = document.getElementById('stealth-content-ai');
    const disguiseContent = document.getElementById('stealth-content-disguise');
    const badgeText = document.getElementById('stealth-badge-text');
    const badgeDot = document.getElementById('badge-dot-indicator');
    const titleEl = document.getElementById('stealth-term-title');
    const terminalEl = document.getElementById('stealth-terminal');
    const btnLabel = document.getElementById('tab-btn-label');
    const wordEl = document.getElementById('stealth-word');
    const dynamicSubtext = document.getElementById('stealth-dynamic-subtext');

    if (!tabBtn || !aiContent || !disguiseContent) return;

    let isStealthMode = false;
    let userInteracted = false;
    let autoTimer = null;

    function animateWord(newWord, isHidden) {
        if (!wordEl) return;
        wordEl.classList.add('anim-flip-out');
        setTimeout(() => {
            wordEl.textContent = newWord;
            wordEl.classList.remove('word-visible', 'word-hidden', 'anim-flip-out');
            wordEl.classList.add(isHidden ? 'word-hidden' : 'word-visible');
            wordEl.classList.add('anim-flip-in');

            setTimeout(() => {
                wordEl.classList.remove('anim-flip-in');
            }, 30);
        }, 140);
    }

    function setStealthState(active) {
        isStealthMode = active;
        if (isStealthMode) {
            aiContent.style.display = 'none';
            disguiseContent.style.display = 'block';
            if (badgeText) badgeText.textContent = '🥷 Stealth Disguise';
            if (badgeDot) {
                badgeDot.classList.remove('active');
                badgeDot.classList.add('stealth-active');
            }
            if (terminalEl) terminalEl.classList.add('is-disguised');
            if (tabBtn) tabBtn.classList.add('is-active');
            if (btnLabel) btnLabel.textContent = 'Stealth Disguise (Tab)';

            animateWord('Hidden', true);
            if (dynamicSubtext) dynamicSubtext.textContent = 'Screen disguised as a clean console.';
        } else {
            disguiseContent.style.display = 'none';
            aiContent.style.display = 'block';
            if (badgeText) badgeText.textContent = 'Normal Mode';
            if (badgeDot) {
                badgeDot.classList.add('active');
                badgeDot.classList.remove('stealth-active');
            }
            if (terminalEl) terminalEl.classList.remove('is-disguised');
            if (tabBtn) tabBtn.classList.remove('is-active');
            if (btnLabel) btnLabel.textContent = 'Click Tab to toggle';

            animateWord('Visible', false);
            if (dynamicSubtext) dynamicSubtext.textContent = 'AI response is active on screen.';
        }
    }

    // Toggle on click
    tabBtn.addEventListener('click', (e) => {
        e.preventDefault();
        userInteracted = true;
        setStealthState(!isStealthMode);
    });

    // Listen for physical Tab keypress anywhere when stealth section is in viewport
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const rect = terminalEl.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                e.preventDefault();
                userInteracted = true;
                setStealthState(!isStealthMode);
            }
        }
    });

    // Subtle auto demo loop if user hasn't interacted yet
    function startAutoDemo() {
        if (userInteracted) return;
        autoTimer = setInterval(() => {
            if (userInteracted) {
                clearInterval(autoTimer);
                return;
            }
            setStealthState(!isStealthMode);
        }, 3000);
    }

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !userInteracted) {
                startAutoDemo();
            }
        });
    }, { threshold: 0.3 });
    obs.observe(terminalEl);
})();
