import { getApps, getApp } from './apps.js';
import { systemData } from './data.js';

export class OSManager {
    constructor() {
        this.windows = [];
        this.zIndexCounter = 100;
        this.booted = false;

        // DOM Elements
        this.desktop = document.getElementById('desktop');
        this.windowLayer = document.getElementById('window-layer');
        this.dockContainer = document.getElementById('dock-container');
        this.bootScreen = document.getElementById('boot-screen');

        // Language Dictionary
        this.translations = {
            'en': {
                'file': 'File', 'edit': 'Edit', 'view': 'View', 'go': 'Go', 'window': 'Window', 'help': 'Help',
                'lang_en': 'English', 'lang_bn': 'Bangla', 'theme': 'Apps Theme',
                'theme_cosmic': 'Cosmic (Default)', 'theme_sunset': 'Sunset', 'theme_forest': 'Forest', 'theme_ocean': 'Ocean', 'theme_berry': 'Berry',
                'mode_light': 'Light Mode', 'mode_dark': 'Dark Mode',
                'anim_effect': 'Animation Effect', 'anim_style': 'Animation Colour',
                'style_cyberpunk': 'Cyberpunk (Cyan)', 'style_green_leaf': 'Green Leaf', 'style_red_alert': 'Red Alert', 'style_neon_pink': 'Neon Pink', 'style_royal_purple': 'Royal Purple',
                'connected': 'Connected',
                'github': 'Github', 'linkedin': 'LinkedIn', 'facebook': 'Facebook', 'terminal': 'Terminal',
                'minimize_all': 'Minimize All', 'close_all': 'Close All',
                'resume': 'My Resume', 'project_reports': 'Project Descriptions',
                'user_guide': 'User Guide', 'about_os': 'About SohanOS',
                'name': 'Sohan Fardin',
                'role': 'ETE Student & Innovator',
                'bio_short': 'I am an ETE student at RUET with a deep interest in AI, robotics, and real-world problem solving. I build intelligent systems like Spytron-X and EduDial, with a focus on socially impactful technology. 🚀',
                'btn_explore': 'Explore Bio',
                'btn_contact': 'Contact Me',
                'hi_intro': 'Hi, I am',
                'role_long': 'I am a Fullstack Developer & Robotics Enthusiast',
                'bio_expanded': 'I am an ETE student at RUET with a deep interest in AI, robotics, and real-world problem solving. I build intelligent systems that combine hardware and software — from AI-powered mobile robots like Spytron-X to education-focused platforms like EduDial. I am determined to build meaningful technology that improves lives.',
                'btn_cv': 'Download CV',
                'wallpaper': 'Wallpaper', 'animation': 'Animation',
                'anim_particles': 'Data Particles', 'anim_matrix': 'Matrix Rain', 'anim_none': 'Static',
                'ug_title': 'How to Use SohanOS',
                'ug_content': `<div class="space-y-4 text-sm">
                        <div class="mb-4">
                            <h3 class="font-bold text-cyan-400 mb-2">Navigation & Menus</h3>
                            <ul class="space-y-1 ml-1 text-gray-300">
                               <li>→ <b>Top Bar:</b> Access system menus and status.</li>
                               <li>→ <b>File:</b> System file operations.</li>
                               <li>→ <b>Edit:</b> Change Language (🇺🇸 English / 🇧🇩 Bangla).</li>
                               <li>→ <b>View:</b> Change Themes & Mode.</li>
                               <li>→ <b>Go:</b> Quick links to Github, LinkedIn, Terminal.</li>
                               <li>→ <b>Window:</b> Manage open windows.</li>
                               <li>→ <b>Help:</b> View User Guide or About OS.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="font-bold text-cyan-400 mb-2">Applications</h3>
                            <ul class="space-y-1 ml-1 text-gray-300">
                               <li>→ <b>🤖 Sohan.AI:</b> Chat with the system intelligence.</li>
                               <li>→ <b>🚀 Projects:</b> Explore engineering portfolio.</li>
                               <li>→ <b>💻 Terminal:</b> Command-line interface.</li>
                               <li>→ <b>🧠 Skills:</b> Competency vizualization.</li>
                               <li>→ <b>🏆 Achievements:</b> Awards and recognitions.</li>
                               <li>→ <b>💼 Experience:</b> Work & startup journey.</li>
                               <li>→ <b>✉️ Contact:</b> Get in touch directly.</li>
                               <li>→ <b>📜 Certifications:</b> Academic & professional courses.</li>
                               <li>→ <b>👨‍💻 About:</b> Bio and personal info.</li>
                               <li>→ <b>🎓 Education:</b> Academic foundation.</li>
                            </ul>
                        </div>
                    </div>`,
                'about_title': 'About SohanOS',
                'about_content': `<div class="text-center space-y-4">
                        <div class="text-4xl animate-bounce">🌌</div>
                        <div>
                            <h2 class="text-xl font-bold">SohanOS v1.0.4</h2>
                            <p class="text-xs text-gray-500 font-mono">Emulated Web Operating System</p>
                        </div>
                        <p class="text-sm text-gray-300 px-4">
                            A personal portfolio reimagined as a functional desktop environment. 
                            Demonstrating advanced frontend engineering, interactive design, and creativity.
                        </p>
                        <div class="text-xs text-gray-400 bg-white/5 p-3 rounded border border-white/10 text-left mx-4">
                            <div class="font-bold text-gray-300 mb-2 border-b border-white/10 pb-1">System Specs</div>
                            <div class="grid grid-cols-2 gap-2">
                                <div>→ <b>Core:</b> Vanilla JS</div>
                                <div>→ <b>Style:</b> TailwindCSS</div>
                                <div>→ <b>3D:</b> Three.js</div>
                                <div>→ <b>Brain:</b> Antigravity</div>
                            </div>
                        </div>
                        <p class="text-[10px] text-gray-600">© 2025 Sohan Fardin. All rights reserved.</p>
                    </div>`
            },
            'bn': {
                'file': 'ফাইল', 'edit': 'সম্পাদনা', 'view': 'প্রদর্শন', 'go': 'যান', 'window': 'উইন্ডো', 'help': 'সাহায্য',
                'lang_en': 'ইংরেজি', 'lang_bn': 'বাংলা', 'theme': 'অ্যাপ থিম',
                'theme_cosmic': 'কসমিক (ডিফল্ট)', 'theme_sunset': 'সূর্যাস্ত', 'theme_forest': 'বন', 'theme_ocean': 'মহাসাগর', 'theme_berry': 'বেরি',
                'mode_light': 'লাইট মোড', 'mode_dark': 'ডার্ক মোড',
                'anim_effect': 'অ্যানিমেশন ইফেক্ট', 'anim_style': 'অ্যানিমেশন রঙ',
                'style_cyberpunk': 'সাইবারপাঙ্ক (সায়ান)', 'style_green_leaf': 'সবুজ পাতা', 'style_red_alert': 'রেড অ্যালার্ট', 'style_neon_pink': 'নিওন পিঙ্ক', 'style_royal_purple': 'রয়্যাল পার্পল',
                'connected': 'সংযুক্ত',
                'github': 'Github', 'linkedin': 'LinkedIn', 'facebook': 'ফেসবুক', 'terminal': 'টার্মিনাল',
                'minimize_all': 'সব মিনিমাইজ', 'close_all': 'সব বন্ধ',
                'resume': 'আমার জীবনবৃত্তান্ত', 'project_reports': 'প্রজেক্ট ডেসক্রিপশন',
                'user_guide': 'ব্যবহার নির্দেশিকা', 'about_os': 'সোহান.ওএস সম্পর্কে',
                'name': 'সোহান ফারদিন',
                'role': 'ইটিই শিক্ষার্থী এবং উদ্ভাবক',
                'bio_short': 'আমি রুয়েটের একজন ইটিই শিক্ষার্থী, যার এআই, রোবোটিক্স এবং বাস্তব জীবনের সমস্যা সমাধানে গভীর আগ্রহ রয়েছে। আমি স্পাইট্রন-এক্স এবং এডুডায়ালের মতো বুদ্ধিমান সিস্টেম তৈরি করি যা উদ্ভাবনী এবং সামাজিকভাবে প্রভাব ফেলে। 🚀',
                'btn_explore': 'পরিচয় দেখুন',
                'btn_contact': 'যোগাযোগ করুন',
                'hi_intro': 'হ্যালো, আমি',
                'role_long': 'আমি একজন ফুলস্ট্যাক ডেভেলপার এবং রোবোটিক্স প্রেমী',
                'bio_expanded': 'আমি রুয়েটের একজন ইটিই শিক্ষার্থী। আমি হার্ডওয়্যার এবং সফটওয়্যারের সমন্বয়ে বুদ্ধিমান সিস্টেম তৈরি করি — এআই-চালিত মোবাইল রোবট স্পাইট্রন-এক্স থেকে শুরু করে এডুডায়াল-এর মতো শিক্ষা-কেন্দ্রিক প্ল্যাটফর্ম। আমি বিশ্বাস করি যে ভবিষ্যৎ তাদেরই যারা মানুষের জীবনযাত্রার মান উন্নত করার জন্য অর্থপূর্ণ প্রযুক্তি তৈরি করে।',
                'btn_cv': 'সিভি ডাউনলোড করুন',
                'wallpaper': 'ওয়ালপেপার', 'animation': 'অ্যানিমেশন',
                'anim_particles': 'ডেটা কণা', 'anim_matrix': 'ম্যাট্রিক্স রেইন', 'anim_none': 'স্থির',
                'ug_title': 'সোহান ওএস কিভাবে ব্যবহার করবেন',
                'ug_content': `<div class="space-y-4 text-sm">
                        <div class="mb-4">
                            <h3 class="font-bold text-cyan-400 mb-2">ন্যাভিগেশন এবং মেনু</h3>
                            <ul class="space-y-1 ml-1 text-gray-300">
                               <li>→ <b>টপ বার:</b> সিস্টেম মেনু এবং স্ট্যাটাস।</li>
                               <li>→ <b>ফাইল:</b> ফাইল অপারেশন।</li>
                               <li>→ <b>সম্পাদনা:</b> ভাষা পরিবর্তন (🇺🇸 ইংরেজি / 🇧🇩 বাংলা)।</li>
                               <li>→ <b>প্রদর্শন:</b> থিম এবং মোড পরিবর্তন।</li>
                               <li>→ <b>যান:</b> গিটহাব, লিঙ্কডইন, টার্মিনাল লিঙ্ক।</li>
                               <li>→ <b>উইন্ডো:</b> উইন্ডো ম্যানেজমেন্ট।</li>
                               <li>→ <b>সাহায্য:</b> নির্দেশিকা এবং সম্পর্কে।</li>
                            </ul>
                        </div>
                        <div>
                            <h3 class="font-bold text-cyan-400 mb-2">অ্যাপ্লিকেশন</h3>
                            <ul class="space-y-1 ml-1 text-gray-300">
                               <li>→ <b>🤖 সোহান.এআই:</b> সিস্টেম এআই চ্যাট।</li>
                               <li>→ <b>🚀 প্রজেক্ট:</b> প্রজেক্ট এক্সপ্লোরার।</li>
                               <li>→ <b>💻 টার্মিনাল:</b> কমান্ড লাইন।</li>
                               <li>→ <b>🧠 দক্ষতা:</b> দক্ষতা ম্যাপ।</li>
                               <li>→ <b>🏆 অর্জন:</b> পুরস্কার এবং স্বীকৃতি।</li>
                               <li>→ <b>💼 অভিজ্ঞতা:</b> কর্মক্ষেত্র এবং স্টার্টআপ যাত্রা।</li>
                               <li>→ <b>✉️ যোগাযোগ:</b> সরাসরি বার্তা পাঠান।</li>
                               <li>→ <b>📜 সার্টিফিকেশন:</b> একাডেমিক এবং প্রফেশনাল কোর্স।</li>
                               <li>→ <b>👨‍💻 পরিচয়:</b> আমার সম্পর্কে।</li>
                               <li>→ <b>🎓 শিক্ষা:</b> শিক্ষাগত যোগ্যতা।</li>
                            </ul>
                        </div>
                    </div>`,
                'about_title': 'সোহান.ওএস সম্পর্কে',
                'about_content': `<div class="text-center space-y-4">
                        <div class="text-4xl animate-bounce">🌌</div>
                        <div>
                            <h2 class="text-xl font-bold">সোহান ওএস ১.০.৪</h2>
                            <p class="text-xs text-gray-500 font-mono">এমুলেটেড ওয়েব অপারেটিং সিস্টেম</p>
                        </div>
                        <p class="text-sm text-gray-300 px-4">
                            একটি ব্যক্তিগত পোর্টফোলিও যা একটি কার্যকরী ডেস্কটপ পরিবেশ হিসেবে তৈরি করা হয়েছে।
                            উন্নত ফ্রন্টএন্ড ইঞ্জিনিয়ারিং এবং ইন্টার‍্যাক্টিভ ডিজাইন প্রদর্শনের জন্য।
                        </p>
                        <div class="text-xs text-gray-400 bg-white/5 p-3 rounded border border-white/10 text-left mx-4">
                            <div class="font-bold text-gray-300 mb-2 border-b border-white/10 pb-1">সিস্টেম স্পেকস</div>
                            <div class="grid grid-cols-2 gap-2">
                                <div>→ <b>কোর:</b> ভ্যানিলা জেএস</div>
                                <div>→ <b>স্টাইল:</b> টেইলউইন্ড</div>
                                <div>→ <b>থ্রিডি:</b> থ্রি.জেএস</div>
                                <div>→ <b>ব্রেইন:</b> অ্যান্টিগ্র্যাভিটি</div>
                            </div>
                        </div>
                        <p class="text-[10px] text-gray-600">© ২০২৫ সোহান ফারদিন। সর্বস্বত্ব সংরক্ষিত।</p>
                    </div>`
            }
        };
        this.currentLang = 'en';

        this.init();
    }

    init() {
        // Update boot screen time
        const bootTime = document.getElementById('boot-time');
        if (bootTime) {
            const now = new Date();
            bootTime.innerText = `SYSTIME: ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}`;
        }

        // Initialize Clock Style
        const savedClockStyle = localStorage.getItem('os-clock-style') || 'classic';
        this.setClockStyle(savedClockStyle);

        // Initialize Wallpaper
        const savedWallpaper = localStorage.getItem('os-wallpaper') || 'b3';
        this.setWallpaper(savedWallpaper);

        // Initialize Animation - Default to 'particles'
        const savedAnimation = localStorage.getItem('os-animation') || 'particles';
        this.setAnimation(savedAnimation);

        // Boot screen is pre-rendered in HTML
        // Simulate boot delay
        setTimeout(() => this.startBoot(), 500);
        this.setupMenuEvents();

        // Handle Responsive Transitions
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                this.renderMobileAppGrid();
            }
        });
    }

    setupMenuEvents() {
        const menus = ['file', 'edit', 'view', 'go', 'window', 'help'];

        menus.forEach(id => {
            const container = document.getElementById(`menu-${id}-btn`);
            const menu = document.getElementById(`menu-${id}`);

            if (container && menu) {
                // Add click listener to the label/trigger only, or handle delegation smartly
                const label = container.querySelector('span.cursor-pointer');

                if (label) {
                    label.addEventListener('click', (e) => {
                        e.stopPropagation();

                        // Close others
                        document.querySelectorAll('.dropdown-menu').forEach(m => {
                            if (m !== menu) m.classList.remove('show');
                        });

                        // Toggle current
                        menu.classList.toggle('show');
                    });
                }

                // Prevent bubbling from menu to container (which previously might have toggled it closed)
                // But we still want interactions inside to work
                menu.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // If it's a link or action, we might want to close the menu explicitly *after* the action
                    // But for safety, let's keep it open or rely on the action to close it

                    // IF it is an A tag or has onclick, we generally want to close the menu
                    // to give visual feedback that action was accepted.
                    // However, for File links, closing immediately can break navigation on mobile.
                    // So we do NOT close here. We let the document click (next tap) close it, 
                    // or valid actions can explicitly close it.

                    // For theme toggles (divs), we strictly want to ensure the JS fires.
                    // It will fire because this is bubbling phase.

                    // We manually close only if it is a "command" type click
                    if (e.target.closest('a') || e.target.closest('[onclick]')) {
                        setTimeout(() => menu.classList.remove('show'), 150);
                    }
                });
            }
        });

        // Close menus on clicking outside
        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
            document.getElementById('clock-style-menu')?.classList.remove('active');

            // Also close mobile style menu if open
            const mobileMenu = document.getElementById('mobile-style-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                // Logic handled by its own toggle, but safe to ensure consistency
            }
        });

        // Clock Customize Button
        const clockBtn = document.getElementById('clock-customize-btn');
        const clockMenu = document.getElementById('clock-style-menu');
        if (clockBtn && clockMenu) {
            clockBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                clockMenu.classList.toggle('active');
            });
        }

        // Handle Menu Actions (delegation for data-actions)
        document.addEventListener('click', (e) => {
            const actionItem = e.target.closest('[data-action]');
            if (actionItem) {
                e.preventDefault();
                const action = actionItem.getAttribute('data-action');
                this.handleMenuAction(action);

                // Close all menus
                document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
            }
        });
    }

    handleMenuAction(action) {
        switch (action) {
            case 'social-github':
                window.open('https://github.com/sohancreation', '_blank');
                break;
            case 'social-linkedin':
                window.open('https://www.linkedin.com/in/sohan041', '_blank');
                break;
            case 'social-facebook':
                window.open('https://web.facebook.com/sohanwho', '_blank');
                break;
            case 'open-terminal':
                this.openApp('terminal');
                break;
            case 'minimize-all':
                this.windows.forEach(win => this.minimizeWindow(win.element));
                break;
            case 'close-all':
                [...this.windows].forEach(win => this.closeWindow(win.id));
                break;
            case 'user-guide':
                this.startTutorial();
                break;
            case 'about-os':
                this.openApp('about');
                break;
            case 'lock':
                window.location.reload();
                break;
        }
    }

    startTutorial() {
        // Create overlay if not exists
        if (!document.getElementById('tutorial-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'tutorial-overlay';
            document.body.appendChild(overlay);
        }

        const overlay = document.getElementById('tutorial-overlay');
        overlay.classList.add('active');

        // Add Escape key listener
        this.escHandler = (e) => {
            if (e.key === 'Escape') this.endTutorial();
        };
        document.addEventListener('keydown', this.escHandler);

        this.tutorialStep = 0;
        this.tutorialSteps = [
            {
                element: null,
                title: this.currentLang === 'bn' ? 'সোহান.ওএস-এ স্বাগতম' : 'Welcome to SohanOS',
                text: this.currentLang === 'bn' ? 'এই ওয়েব পোর্টফোলিওটি একটি ডেস্কটপ অপারেটিং সিস্টেমের মতো ডিজাইন করা হয়েছে। আসুন দেখে নিই কিভাবে এটি ব্যবহার করবেন।' : 'This web portfolio is designed like a desktop operating system. Let\'s see how to explore it.'
            },
            {
                element: '#dock-container .dock',
                title: this.currentLang === 'bn' ? 'অ্যাপ ডক' : 'App Dock',
                text: this.currentLang === 'bn' ? 'যে কোনো অ্যাপ খুলতে নিচের আইকনগুলোতে ক্লিক করুন। প্রোজেক্ট, দক্ষতা এবং আরও অনেক কিছু দেখুন।' : 'Click these icons to open applications. Explore Projects, Skills, and more.'
            },
            {
                element: '.top-bar-bg',
                title: this.currentLang === 'bn' ? 'সিস্টেম মেনু' : 'System Menu',
                text: this.currentLang === 'bn' ? 'থিম, স্টাইল বা ভাষা পরিবর্তন করতে উপরের মেনু ব্যবহার করুন।' : 'Use the top menu to change themes, styles, or switch languages.'
            },
            {
                element: '#window-layer',
                title: this.currentLang === 'bn' ? 'উইন্ডোজ' : 'Windows',
                text: this.currentLang === 'bn' ? 'একাধিক অ্যাপ একসাথে খুলুন। তাদের সরান, ছোট করুন বা বন্ধ করুন যেমন আপনি একটি পিসিতে করেন।' : 'Open multiple apps at once. Drag them, minimize, or close them just like on a real PC.'
            },
            {
                element: null,
                title: this.currentLang === 'bn' ? 'উপভোগ করুন!' : 'Enjoy Exploring!',
                text: this.currentLang === 'bn' ? 'আপনার যাত্রা শুরু করুন। সাহায্যের প্রয়োজন হলে আমাকে (AI) জিজ্ঞাসা করুন!' : 'Start your journey. Ask me (AI) if you need help!'
            }
        ];

        this.showTutorialStep();
    }

    showTutorialStep() {
        // Clean up previous
        document.querySelectorAll('.highlight-element').forEach(el => el.classList.remove('highlight-element'));
        document.querySelectorAll('.tutorial-card').forEach(el => el.remove());

        if (this.tutorialStep >= this.tutorialSteps.length) {
            this.endTutorial();
            return;
        }

        const step = this.tutorialSteps[this.tutorialStep];
        const overlay = document.getElementById('tutorial-overlay');

        // Highlight Element
        let targetRect = { top: window.innerHeight / 2, left: window.innerWidth / 2, width: 0, height: 0 };
        let hasTarget = false;

        if (step.element) {
            const el = document.querySelector(step.element);
            if (el) {
                el.classList.add('highlight-element');
                targetRect = el.getBoundingClientRect();
                hasTarget = true;
            }
        }

        // Create Card
        const card = document.createElement('div');
        card.className = 'tutorial-card';
        card.innerHTML = `
            <div class="tutorial-title">${step.title}</div>
            <div class="tutorial-text">${step.text}</div>
            <div class="tutorial-actions">
                <button class="tutorial-btn tutorial-btn-secondary" onclick="window.os.endTutorial()">${this.currentLang === 'bn' ? 'বাদ দিন' : 'Skip'}</button>
                <button class="tutorial-btn tutorial-btn-primary" onclick="window.os.nextTutorialStep()">${this.currentLang === 'bn' ? 'পরবর্তী' : 'Next'}</button>
            </div>
        `;

        document.body.appendChild(card);

        if (!hasTarget) {
            // Center Screen for intros/outros
            card.style.top = `${(window.innerHeight / 2) - 100}px`;
            card.style.left = `${(window.innerWidth / 2) - 175}px`;
        } else {
            // Determine Position relative to target
            let top, left, arrowClass;

            // Scenario 1: Target is near bottom (like the Dock) -> Place card ABOVE target
            if (targetRect.top > window.innerHeight / 2) {
                top = targetRect.top - 200; // Place above
                left = targetRect.left + (targetRect.width / 2) - 175;
                arrowClass = 'arrow-bottom'; // Arrow points down
            }
            // Scenario 2: Target is near top (like the Menu Bar) -> Place card BELOW target
            else {
                top = targetRect.bottom + 25; // Place below
                left = targetRect.left + (targetRect.width / 2) - 175;
                arrowClass = 'arrow-top'; // Arrow points up
            }

            // Boundary checks for horizontal visibility
            if (left < 20) left = 20;
            if (left + 350 > window.innerWidth) left = window.innerWidth - 370;

            card.style.top = `${top}px`;
            card.style.left = `${left}px`;
            if (arrowClass) card.classList.add(arrowClass);
        }
    }

    nextTutorialStep() {
        this.tutorialStep++;
        this.showTutorialStep();
    }

    endTutorial() {
        const overlay = document.getElementById('tutorial-overlay');
        if (overlay) {
            overlay.remove();
        }

        document.querySelectorAll('.highlight-element').forEach(el => el.classList.remove('highlight-element'));
        document.querySelectorAll('.tutorial-card').forEach(el => el.remove());

        if (this.escHandler) {
            document.removeEventListener('keydown', this.escHandler);
            this.escHandler = null;
        }

        this.tutorialStep = 999;
    }

    sendContactMessage() {
        const emailEl = document.getElementById('contact-email');
        const msgEl = document.getElementById('contact-message');
        const chatEl = document.getElementById('contact-chat');

        if (!emailEl || !msgEl || !chatEl) return;

        const email = emailEl.value.trim();
        const message = msgEl.value.trim();

        if (!email || !message) {
            alert(this.currentLang === 'bn' ? 'দয়া করে ইমেইল এবং বার্তা উভয়ই প্রদান করুন।' : 'Please provide both email and message.');
            return;
        }

        // Send via Formspree
        // URL provided by user
        const formspreeUrl = "https://formspree.io/f/xqedqjoy";

        const btn = document.querySelector('#contact button') || (document.getElementById('window-contact') ? document.getElementById('window-contact').querySelector('button') : null);
        const originalText = btn ? btn.innerHTML : 'Send';

        if (btn) {
            btn.disabled = true;
        }

        fetch(formspreeUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                message: message
            })
        })
            .then(response => {
                if (response.ok) {
                    const successMsg = this.currentLang === 'bn' ? 'সফলভাবে পাঠানো হয়েছে!' : 'Sent successfully!';
                    alert(successMsg);
                    if (btn) {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }
                    // Clear inputs
                    if (emailEl) emailEl.value = '';
                    if (msgEl) msgEl.value = '';

                    // Close window for mobile users after success (increased delay for readability)
                    if (window.innerWidth <= 768) {
                        setTimeout(() => {
                            this.closeWindow('contact');
                        }, 3000); // 3 seconds delay
                    }
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            console.error(data.errors.map(error => error.message).join(", "));
                        }
                        throw new Error('Formspree submission failed');
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                const errorMsg = this.currentLang === 'bn' ? 'পাঠাতে সমস্যা হয়েছে। ফর্ম আইডি চেক করুন।' : 'Failed to send. Please ensure you have a valid Formspree ID.';
                alert(errorMsg);
                if (btn) {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }
            });

        // Add user message to chat
        const userMsg = document.createElement('div');
        userMsg.className = 'bg-white/10 border border-white/20 p-3 rounded-2xl rounded-tr-none text-xs text-white max-w-[85%] self-end ml-auto';
        userMsg.innerText = message;
        chatEl.appendChild(userMsg);

        // Clear input
        msgEl.value = '';

        // Simulate AI/System Response
        setTimeout(() => {
            const response = document.createElement('div');
            response.className = 'bg-cyan-500/10 border border-cyan-500/20 p-3 rounded-2xl rounded-tl-none text-xs text-gray-300 max-w-[85%]';
            response.innerHTML = this.currentLang === 'bn' ?
                `ধন্যবাদ! আপনার বার্তাটি পাঠানো হয়েছে। আমি (${email}) ঠিকানায় আপনার সাথে যোগাযোগ করব।` :
                `Thanks! Your message has been received. I'll get back to you at ${email}.`;
            chatEl.appendChild(response);
            chatEl.scrollTop = chatEl.scrollHeight;
        }, 1000);

        chatEl.scrollTop = chatEl.scrollHeight;
    }

    showSystemAlert(titleKey, contentKey) {
        // Legacy support or generic alerts
        // ... (kept simple if needed, but for User Guide we use startTutorial)
    }

    setClockStyle(style) {
        const body = document.body;
        // Remove existing clock styles
        const classes = Array.from(body.classList).filter(c => c.startsWith('style-'));
        classes.forEach(c => body.classList.remove(c));

        // Add new style
        body.classList.add(`style-${style}`);

        // Persist pattern
        localStorage.setItem('os-clock-style', style);

        // Close Menu
        const menu = document.getElementById('clock-style-menu');
        if (menu) menu.classList.remove('active');
    }

    setLanguage(lang) {
        if (!this.translations[lang]) return;
        this.currentLang = lang;

        // Update all elements with data-lang-key
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.getAttribute('data-lang-key');
            if (this.translations[lang][key]) {
                el.innerText = this.translations[lang][key];
            }
        });

        // Re-render Dock and Mobile Grid to update tooltips and labels
        this.renderDock();
        if (window.innerWidth <= 768) {
            this.renderMobileAppGrid();
        }
    }

    setTheme(themeName) {
        console.log("OS: Setting theme to", themeName);
        // Clear all possible theme classes
        document.body.classList.remove('theme-sunset', 'theme-forest', 'theme-ocean', 'theme-berry');

        if (themeName !== 'cosmic') {
            document.body.classList.add(`theme-${themeName}`);
        }

        // Update Background (Three.js)
        if (window.updateBackgroundTheme) {
            window.updateBackgroundTheme(themeName);
        }
    }

    toggleMode(mode) {
        if (mode === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
    }

    setWallpaper(type) {
        const layer = document.getElementById('wallpaper-layer');
        if (!layer) return;

        // Maintain fixed positioning and ensure it's behind the animations but above the body background
        layer.style.position = 'fixed';
        layer.style.inset = '0';
        layer.style.zIndex = '1';
        layer.style.transition = 'background-image 1s ease-in-out, opacity 0.5s ease-in-out';

        // Remove previous wp- classes
        const classesToRemove = Array.from(layer.classList).filter(c => c.startsWith('wp-'));
        classesToRemove.forEach(c => layer.classList.remove(c));

        if (type !== 'none') {
            layer.classList.add(`wp-${type}`);
            layer.style.opacity = '1';
        } else {
            layer.classList.add('wp-none');
            // If none, we can either keep opacity 1 with background-image: none or fade it out
        }

        // Add specific class for the wallpaper system
        if (!layer.classList.contains('wallpaper-system')) {
            layer.classList.add('wallpaper-system');
        }

        // Update UI colors to match the wallpaper
        this.setWallpaperColors(type);

        // Persist choice
        localStorage.setItem('os-wallpaper', type);
    }

    setWallpaperColors(type) {
        const root = document.documentElement;
        let colors = {
            accent: '#a855f7', // Default Purple
            bg: 'rgba(15, 15, 20, 0.45)',
            border: 'rgba(255, 255, 255, 0.1)',
            text: '#ffffff',
            glow: 'rgba(168, 85, 247, 0.2)'
        };

        if (type === 'b1') { // Cosmic (Blue/Cyan)
            colors = {
                accent: '#22d3ee',
                bg: 'rgba(5, 10, 20, 0.75)',
                border: 'rgba(34, 211, 238, 0.4)',
                text: '#ffffff',
                glow: 'rgba(34, 211, 238, 0.5)'
            };
        } else if (type === 'b2') { // Galaxy (Deep Blue)
            colors = {
                accent: '#60a5fa',
                bg: 'rgba(10, 15, 30, 0.8)',
                border: 'rgba(96, 165, 250, 0.4)',
                text: '#ffffff',
                glow: 'rgba(96, 165, 250, 0.5)'
            };
        } else if (type === 'b3') { // Warm/Solar (Orange)
            colors = {
                accent: '#fb923c',
                bg: 'rgba(20, 10, 5, 0.75)',
                border: 'rgba(251, 146, 60, 0.4)',
                text: '#ffffff',
                glow: 'rgba(251, 146, 60, 0.5)'
            };
        }

        // Apply to CSS variables
        root.style.setProperty('--widget-accent', colors.accent);
        root.style.setProperty('--widget-bg', colors.bg);
        root.style.setProperty('--widget-border', colors.border);
        root.style.setProperty('--widget-text', colors.text);
        root.style.setProperty('--widget-glow', colors.glow);

        // Also update primary color for the whole system if wallpaper is active
        if (type !== 'none') {
            root.style.setProperty('--primary-color', colors.accent);
            root.style.setProperty('--glow-color', colors.accent);
            if (window.setAnimationColor) window.setAnimationColor(colors.accent);
        }
    }

    setAnimation(type) {
        if (window.setOSAnimation) {
            window.setOSAnimation(type);
        }
    }

    startBoot() {
        const progress = document.getElementById('boot-progress');
        const statusEl = document.getElementById('boot-status');

        const messages = [
            'Initializing Neural Engine...',
            'Loading Kernel Modules...',
            'Mounting File System...',
            'Establishing Neural Link...',
            'Syncing Portfolio Database...',
            'Boot Complete. Welcome.'
        ];

        // Animate the progress bar
        if (progress) {
            progress.style.transition = 'width 1.2s ease';
            progress.style.width = '100%';
        }

        // Cycle status messages
        messages.forEach((msg, i) => {
            setTimeout(() => {
                if (statusEl) statusEl.innerText = msg;
            }, i * 220);
        });

        // Fade out boot screen after animation
        setTimeout(() => {
            if (this.bootScreen) {
                this.bootScreen.style.transition = 'opacity 0.6s ease';
                this.bootScreen.style.opacity = '0';
                setTimeout(() => {
                    this.bootScreen.style.display = 'none';
                }, 650);
            }
            this.booted = true;
            this.renderDock();
            this.updateClock();
            this.initScrollPages();
            this.handleScrollLogic();
            this.onBootComplete();
            setInterval(() => this.updateClock(), 1000);
        }, 1600);
    }


    initScrollPages() {
        const scrollContainer = document.getElementById('scroll-container');
        if (!scrollContainer) return;

        scrollContainer.classList.remove('hidden');
        scrollContainer.innerHTML = ''; // Clear existing

        // Page 1: Hero / Widgets Page
        const heroPage = document.createElement('div');
        heroPage.id = 'home-page';
        heroPage.className = 'app-page flex-col items-center justify-center gap-12';
        scrollContainer.appendChild(heroPage);

        const widgetSidebar = document.getElementById('widget-sidebar');

        if (widgetSidebar && !this.sidebarInitialized) {
            this.sidebarInitialized = true;
            // Disable all animations/transitions during the physical move in the DOM
            widgetSidebar.style.animation = 'none';
            widgetSidebar.style.transition = 'none';
            widgetSidebar.classList.remove('animate-fade-in');

            // Remove fixed positioning and reset transforms
            widgetSidebar.classList.remove('fixed', 'top-12', 'right-6', 'right-8', 'right-12');
            widgetSidebar.classList.add('relative', 'flex-col', 'md:flex-row', 'md:justify-center', 'w-full', 'max-w-6xl', 'px-6');
            widgetSidebar.style.display = 'flex';
            widgetSidebar.style.opacity = '1';
            widgetSidebar.style.transform = 'none';

            heroPage.appendChild(widgetSidebar);

            // Force reflow and re-enable standard hover transitions only
            void widgetSidebar.offsetWidth;
            setTimeout(() => {
                widgetSidebar.style.transition = 'all 0.5s ease';
            }, 100);
        }

        // Page 2: Mobile Interface / App Quick View (Multiple page home effect)
        const mobileHomeScreen = document.getElementById('home-screen');
        if (mobileHomeScreen) {
            const gridPage = document.createElement('div');
            gridPage.id = 'grid-page';
            gridPage.className = 'app-page';

            mobileHomeScreen.classList.remove('fixed', 'inset-0', 'hidden');
            mobileHomeScreen.classList.add('flex', 'relative', 'w-full', 'max-w-4xl');
            mobileHomeScreen.style.display = 'flex';

            gridPage.appendChild(mobileHomeScreen);
            scrollContainer.appendChild(gridPage);
        }

        // Subsequent Pages: App Content Sections
        const allApps = this.getAppsData();
        const pageAppIds = ['about', 'skills', 'experience', 'projects', 'resume', 'education', 'research', 'achievements', 'certifications', 'blog', 'hobby', 'contact'];

        pageAppIds.forEach(id => {
            const app = getApp(id);
            if (app) {
                const pageSection = document.createElement('div');
                pageSection.id = `page-${id}`;
                pageSection.className = 'app-page';

                let content = app.render ? app.render() : (app.content || '');
                // Sanitize content for full-page view
                content = content.replace(/h-full/g, 'min-h-full')
                    .replace(/overflow-hidden/g, 'overflow-visible')
                    .replace(/max-h-\[.*?\]/g, ''); // Remove max-height restrictions

                pageSection.innerHTML = `
                    <div class="page-section-container">
                        <div class="page-header-premium">
                            <h2 class="page-subtitle-main">${app.id.toUpperCase()} PROTOCOL</h2>
                            <h1 class="page-title-main">${app.title.toUpperCase()}</h1>
                        </div>
                        <div class="w-full flex-1">
                            ${content}
                        </div>
                    </div>
                `;
                scrollContainer.appendChild(pageSection);
            }
        });
    }

    handleScrollLogic() {
        const container = document.getElementById('scroll-container');
        if (!container) return;

        const options = {
            root: container,
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const hash = id.replace('page-', '');
                    if (hash !== 'home-page' && hash !== 'grid-page') {
                        history.replaceState(null, null, `#${hash}`);
                    } else if (hash === 'home-page') {
                        history.replaceState(null, null, ' ');
                    }
                }
            });
        }, options);

        document.querySelectorAll('.app-page').forEach(page => {
            observer.observe(page);
        });
    }

    // Helper to get app basic data
    getAppsData() {
        const lang = this.currentLang || 'en';
        return [
            { id: 'about', title: lang === 'bn' ? 'আমার সম্পর্কে' : 'About Myself' },
            { id: 'education', title: lang === 'bn' ? 'শিক্ষা' : 'Education' },
            { id: 'skills', title: lang === 'bn' ? 'দক্ষতা' : 'Skills' },
            { id: 'projects', title: lang === 'bn' ? 'প্রজেক্ট' : 'Projects' },
            { id: 'research', title: lang === 'bn' ? 'গবেষণা' : 'Research' },
            { id: 'experience', title: lang === 'bn' ? 'অভিজ্ঞতা' : 'Experience' },
            { id: 'achievements', title: lang === 'bn' ? 'কৃতিত্ব' : 'Achievements' },
            { id: 'certifications', title: lang === 'bn' ? 'সার্টিফিকেশন' : 'Certifications' },
            { id: 'hobby', title: lang === 'bn' ? 'শখ' : 'Hobbies' },
            { id: 'contact', title: lang === 'bn' ? 'যোগাযোগ' : 'Contact' }
        ];
    }


    onBootComplete() {
        // Trigger Logo Power Up
        const logo = document.querySelector('.os-avenger-logo');
        if (logo) logo.classList.add('power-up');

        this.renderDock();
        this.renderDesktopIcons();

        if (window.innerWidth <= 768) {
            this.renderMobileAppGrid();
        }

        // OPEN VOICE ASSISTANT BY DEFAULT as primary app window
        setTimeout(() => {
            // Make sure window-layer is visible
            if (this.windowLayer) {
                this.windowLayer.style.display = 'block';
                this.windowLayer.style.visibility = 'visible';
                this.windowLayer.style.opacity = '1';
            }
            const app = getApp('voice-assistant');
            if (app) {
                this.createWindow(app);
            }
        }, 900);
    }


    renderMobileAppGrid() {
        const grid = document.getElementById('mobile-app-grid');
        if (!grid) return;

        const apps = getApps();
        grid.innerHTML = apps.map(app => `
            <div class="flex flex-col items-center gap-1 group active:scale-95 transition-transform" onclick="window.os.openApp('${app.id}')">
                <div class="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl border border-white/10 shadow-lg">
                    ${app.icon}
                </div>
                <span class="text-[10px] text-white font-medium text-center truncate w-full px-1 shadow-sm">${app.title.split(' ')[0]}</span>
            </div>
        `).join('');
    }

    renderDock() {
        if (!this.dockContainer) return;

        const apps = getApps();
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            const gridHtml = apps.map(app => `
                <div class="dock-item" onclick="window.os.openApp('${app.id}')">
                    <div class="icon-box">${app.icon}</div>
                    <span class="app-label">${app.title.split(' ')[0]}</span>
                </div>
            `).join('');
            this.dockContainer.innerHTML = `<div class="dock no-scrollbar">${gridHtml}</div>`;
        } else {
            const dockHtml = apps.map(app => `
                <div class="dock-item" onclick="window.os.openApp('${app.id}')">
                    ${app.icon}
                    <span class="dock-tooltip">${app.title}</span>
                </div>
            `).join('');
            this.dockContainer.innerHTML = `<div class="dock">${dockHtml}</div>`;
        }
    }

    renderDesktopIcons() {
        const grid = document.getElementById('desktop-grid');
        if (!grid) return;

        const apps = getApps();
        grid.innerHTML = apps.map(app => `
            <div class="desktop-icon group" onclick="window.os.openApp('${app.id}')">
                <div class="icon-box-desktop">${app.icon}</div>
                <div class="icon-label-desktop">${app.title}</div>
            </div>
        `).join('');
    }

    openApp(appId) {
        // App IDs that render as full scroll-page sections (NOT as popup windows)
        const pageAppIds = ['about', 'skills', 'experience', 'projects', 'resume', 'education', 'research', 'achievements', 'certifications', 'hobby', 'contact'];

        if (appId === 'home') {
            const container = document.getElementById('scroll-container');
            if (container) {
                container.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
        }

        if (pageAppIds.includes(appId)) {
            const page = document.getElementById(`page-${appId}`);
            if (page) {
                page.scrollIntoView({ behavior: 'smooth' });
                return;
            }
        }

        const app = getApp(appId);
        if (!app) return;

        // Check if already open
        const existingWindow = this.windows.find(w => w.id === appId);
        if (existingWindow) {
            this.focusWindow(existingWindow.element);
            if (existingWindow.element.classList.contains('minimized')) {
                this.restoreWindow(existingWindow.element);
            }
            return;
        }

        this.createWindow(app);
    }

    openProjectDetail(projectId) {
        const project = systemData.projects.find(p => p.id === projectId);
        if (!project) return;

        const lang = this.currentLang || 'en';
        const t = (obj) => obj[lang] || obj['en'] || obj;

        const content = `
            <div class="p-6 min-h-full">
                <div class="flex items-center gap-4 mb-6">
                    <div class="bg-theme-card border border-theme-card p-4 rounded-xl text-4xl shadow-sm">
                        ${project.icon}
                    </div>
                    <div>
                        <h2 class="text-3xl font-bold text-theme">${t(project.name)}</h2>
                        <p class="text-secondary font-mono text-sm">${t(project.tagline)}</p>
                    </div>
                </div>
                
                <div class="grid md:grid-cols-3 gap-6 mb-8">
                    ${Object.entries(project.stats).map(([k, v]) => `
                        <div class="bg-theme-card border border-theme-card p-4 rounded-lg shadow-sm">
                            <div class="text-xs text-theme-muted uppercase font-mono mb-1">${k}</div>
                            <div class="font-bold text-accent">${t(v)}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="prose max-w-none">
                    <h3 class="text-xl font-bold mb-2 text-theme border-b border-white/5 pb-2">${lang === 'bn' ? 'প্রজেক্ট সম্পর্কে' : 'About Project'}</h3>
                    <p class="text-theme-muted leading-relaxed mb-6">
                        ${t(project.details)}
                    </p>

                    ${project.video ? `
                        <div class="mb-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                            <video controls class="w-full aspect-video" poster="">
                                <source src="${project.video}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ` : ''}

                    ${project.document ? `
                        <div class="mb-8 p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-xl flex items-center justify-between group hover:border-cyan-500/50 transition-all shadow-sm">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-lg bg-cyan-900/20 flex items-center justify-center text-3xl">📄</div>
                                <div>
                                    <h4 class="font-bold text-theme">${lang === 'bn' ? 'প্রজেক্ট ডেসক্রিপশন' : 'Project Description'}</h4>
                                    <p class="text-[10px] text-theme-muted uppercase tracking-widest font-mono">PDF Case Study</p>
                                </div>
                            </div>
                            <a href="${project.document}" target="_blank" class="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg flex items-center gap-2">
                                <span>${lang === 'bn' ? 'ডেসক্রিপশন দেখুন' : 'View Description'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    ` : ''}

                    ${project.live_link ? `
                        <div class="mb-8 p-6 bg-purple-500/5 border border-purple-500/20 rounded-xl flex items-center justify-between group hover:border-purple-500/50 transition-all shadow-sm">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-lg bg-purple-900/20 flex items-center justify-center text-3xl">🌐</div>
                                <div>
                                    <h4 class="font-bold text-theme">${lang === 'bn' ? 'লাইভ প্রিভিউ' : 'Live Preview'}</h4>
                                    <p class="text-[10px] text-theme-muted uppercase tracking-widest font-mono">Web Application</p>
                                </div>
                            </div>
                            <a href="${project.live_link}" target="_blank" class="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-all shadow-lg flex items-center gap-2">
                                <span>${lang === 'bn' ? 'ওয়েবসাইট দেখুন' : 'Visit Website'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    ` : ''}

                    ${project.github_link ? `
                        <div class="mb-8 p-6 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group hover:border-white/30 transition-all shadow-sm">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-3xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="font-bold text-theme">${lang === 'bn' ? 'সোর্স কোড' : 'Source Code'}</h4>
                                    <p class="text-[10px] text-theme-muted uppercase tracking-widest font-mono">GitHub Repository</p>
                                </div>
                            </div>
                            <a href="${project.github_link}" target="_blank" class="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-theme rounded-lg text-xs font-bold transition-all shadow-lg flex items-center gap-2">
                                <span>${lang === 'bn' ? 'গিটহাব দেখুন' : 'View GitHub'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    ` : ''}

                    ${project.id === 'edudial' ? `
                        <div class="mb-8 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center justify-between group hover:border-emerald-500/50 transition-all shadow-sm">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-lg bg-emerald-900/20 flex items-center justify-center text-3xl">📞</div>
                                <div>
                                    <h4 class="font-bold text-theme">${lang === 'bn' ? 'লাইভ প্রোটোটাইপ ডেমো' : 'Live Prototype Demo'}</h4>
                                    <p class="text-[10px] text-theme-muted uppercase tracking-widest font-mono">IVR Call Experience</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-end gap-1">
                                <span class="text-base font-black text-emerald-400 font-mono tracking-tight">+1 (216) 616-0289</span>
                                <span class="text-[9px] text-theme-muted uppercase font-bold tracking-widest">${lang === 'bn' ? 'কল করুন উপভোগ করতে' : 'Call to Enjoy Demo'}</span>
                            </div>
                        </div>
                    ` : ''}

                    <h3 class="text-xl font-bold mb-2 text-theme border-b border-white/5 pb-2">${lang === 'bn' ? 'ব্যবহৃত প্রযুক্তি' : 'Technology Stack'}</h3>
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${project.tech.map(t => `<span class="px-3 py-1 bg-cyan-900/10 border border-cyan-500/20 text-accent rounded-full text-sm font-medium">${t}</span>`).join('')}
                    </div>
                    
                    <p class="text-xs text-theme-muted italic mt-8 opacity-60">
                        ${lang === 'bn' ? 'সোহান ওএস প্রজেক্ট ডেটাবেস v১.০ থেকে প্রাপ্ত তথ্য' : 'Data retrieved from SohanOS Project Database v1.0'}
                    </p>
                </div>
            </div>
        `;

        this.createWindow({
            id: `project-${projectId}`,
            title: `Project: ${t(project.name)}`,
            width: 800,
            height: 600,
            content: content
        });
    }

    createWindow(app) {
        const isMobile = window.innerWidth <= 768;
        const winConfig = {
            // FIXED top-left position for ALL windows as requested
            x: isMobile ? 0 : 20,
            y: isMobile ? 0 : 50,
            width: app.width || 600,
            height: app.height || 400
        };

        const winEl = document.createElement('div');
        winEl.className = 'os-window active';
        winEl.setAttribute('tabindex', '-1'); // Prevent browser auto-scroll on focus
        winEl.id = `window-${app.id}`;
        winEl.style.width = `${winConfig.width}px`;
        winEl.style.height = `${winConfig.height}px`;
        winEl.style.left = `${winConfig.x}px`;
        winEl.style.top = `${winConfig.y}px`;
        winEl.style.zIndex = ++this.zIndexCounter;

        // Content logic
        let innerContent = app.content || '';
        if (app.render) innerContent = app.render();

        winEl.innerHTML = `
            <div class="window-header">
                <div class="window-title">${app.title}</div>
                <div class="flex">
                    <button class="window-minimize-btn" aria-label="Minimize Window">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" class="pointer-events-none">
                            <path d="M5 12h14"></path>
                        </svg>
                    </button>
                    <button class="window-maximize-btn" aria-label="Maximize Window">
                        <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2.5" fill="none" class="pointer-events-none">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        </svg>
                    </button>
                    <button class="window-close-btn" aria-label="Close Window">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" class="pointer-events-none">
                            <path d="M18 6L6 18M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="window-content">
                ${innerContent}
            </div>
        `;

        this.windowLayer.appendChild(winEl);

        // Attach AI if it's the assistant app
        if (app.id === 'ai-assistant' && window.ai) {
            window.ai.attachToDOM(winEl);
        }

        // Store ref
        this.windows.push({ id: app.id, element: winEl, minimized: false });

        this.setupWindowEvents(winEl, app.id);
        this.focusWindow(winEl);

        // Special init for Terminal
        if (app.id === 'terminal') {
            this.initTerminal(winEl);
        }

        // Scale in animation forced by reflow? Already handled by CSS transition on mount + class
    }

    setupWindowEvents(winEl, appId) {
        const header = winEl.querySelector('.window-header');
        const closeBtn = winEl.querySelector('.window-close-btn');
        const minBtn = winEl.querySelector('.window-minimize-btn');
        const maxBtn = winEl.querySelector('.window-maximize-btn');

        // Close - handle all interaction types
        const handleClose = (e) => {
            console.log('Close button triggered via:', e.type);
            e.stopPropagation();
            if (e.cancelable) e.preventDefault();
            this.closeWindow(appId);
        };

        const handleMinimize = (e) => {
            e.stopPropagation();
            if (e.cancelable) e.preventDefault();
            this.minimizeWindow(winEl);
        };

        const handleMaximize = (e) => {
            e.stopPropagation();
            if (e.cancelable) e.preventDefault();
            this.toggleMaximizeWindow(winEl);
        };

        // Standard events
        if (closeBtn) closeBtn.onclick = handleClose;
        if (closeBtn) closeBtn.ontouchend = handleClose;
        if (minBtn) minBtn.onclick = handleMinimize;
        if (minBtn) minBtn.ontouchend = handleMinimize;
        if (maxBtn) maxBtn.onclick = handleMaximize;
        if (maxBtn) maxBtn.ontouchend = handleMaximize;

        // Prevent header drag from highjacking the buttons
        const stopProp = (e) => e.stopPropagation();
        if (closeBtn) {
            closeBtn.onmousedown = stopProp;
            closeBtn.ontouchstart = stopProp;
        }
        if (minBtn) {
            minBtn.onmousedown = stopProp;
            minBtn.ontouchstart = stopProp;
        }
        if (maxBtn) {
            maxBtn.onmousedown = stopProp;
            maxBtn.ontouchstart = stopProp;
        }

        // Focus on click
        winEl.addEventListener('mousedown', (e) => {
            if (e.target.closest('.window-content') || e.target.closest('.window-header')) {
                this.focusWindow(winEl);
            }
        });

        // Dragging
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialLeft = winEl.offsetLeft;
            initialTop = winEl.offsetTop;
            this.focusWindow(winEl); // Focus on drag start
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            // Boundary checks could go here
            winEl.style.left = `${initialLeft + dx}px`;
            winEl.style.top = `${initialTop + dy}px`;
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    focusWindow(winEl) {
        winEl.style.zIndex = ++this.zIndexCounter;
        winEl.classList.remove('minimized');

        // Update styling for active window vs others if needed
        document.querySelectorAll('.os-window').forEach(w => w.classList.remove('active'));
        winEl.classList.add('active');
    }

    minimizeWindow(winEl) {
        winEl.classList.add('minimized');
        winEl.classList.remove('active');
    }

    toggleMaximizeWindow(winEl) {
        if (winEl.classList.contains('maximized')) {
            winEl.classList.remove('maximized');
            // Restore previous absolute position styling visually done by css class toggle
        } else {
            winEl.classList.add('maximized');
            this.focusWindow(winEl);
        }
    }

    restoreWindow(winEl) {
        winEl.classList.remove('minimized');
        this.focusWindow(winEl);
    }

    closeAllWindows() {
        [...this.windows].forEach(win => this.closeWindow(win.id));
    }

    closeWindow(appId) {
        const index = this.windows.findIndex(w => w.id === appId);
        if (index > -1) {
            const win = this.windows[index];
            win.element.style.opacity = '0';
            win.element.style.transform = 'scale(0.9)';

            setTimeout(() => {
                win.element.remove();
                this.windows.splice(index, 1);
            }, 200);
        }
    }

    initTerminal(winEl) {
        const input = winEl.querySelector('.term-input');
        const history = winEl.querySelector('.term-history');
        const content = winEl.querySelector('.terminal-content');

        if (!input) return;

        // Focus input on click anywhere in terminal
        if (content) {
            content.addEventListener('click', () => input.focus());
        }

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = input.value.trim();
                if (cmd) {
                    // Add command to history
                    const line = document.createElement('div');
                    line.className = 'terminal-line';
                    line.innerHTML = `<span class="prompt">guest@sohanos:~$</span> <span class="cmd">${cmd}</span>`;
                    history.appendChild(line);

                    // Process Command
                    this.processCommand(cmd, history);

                    input.value = '';
                    if (content) content.scrollTop = content.scrollHeight;
                }
            }
        });

        setTimeout(() => input.focus(), 100);
    }

    processCommand(cmd, historyContainer) {
        let response = '';
        const lowerCmd = cmd.toLowerCase();

        switch (lowerCmd) {
            case 'help':
                response = 'Available commands: about, projects, skills, contact, clear, connect &lt;ip&gt;';
                break;
            case 'about':
                response = `Sohan Fardin | ETE Student @ RUET\nMindset: ${systemData.identity.mindset.en}`;
                break;
            case 'projects':
                response = systemData.projects.map(p => `• ${p.name.en} - ${p.tagline.en}`).join('\n');
                break;
            case 'clear':
                historyContainer.innerHTML = '';
                return;
            default:
                // Try AI Brain for unknown commands
                if (window.ai) {
                    const aiResult = window.ai.processInput(cmd);
                    if (aiResult.response) {
                        response = aiResult.response;
                    }
                    if (aiResult.action) {
                        aiResult.action();
                    }
                } else {
                    response = `Command not found: ${cmd}. Type 'help' for assistance.`;
                }
        }

        if (response) {
            const out = document.createElement('div');
            out.className = 'output';
            // Replace newlines with <br> for HTML rendering in terminal
            out.innerHTML = response.replace(/\n/g, '<br>');
            historyContainer.appendChild(out);
        }
    }

    switchHobbyTab(btn, tabName) {
        // Find the container (the window content) to scope the selection
        const container = btn.closest('#hobby-container') || document.getElementById('hobby-container') || document.body;

        // Use IDs which are unique
        const photoContent = document.getElementById('hobby-content-photo');
        const readingContent = document.getElementById('hobby-content-reading');

        if (!photoContent || !readingContent) return;

        // Toggle Visibility
        // Toggle Visibility with Animation
        const showContent = (el) => {
            el.classList.remove('hidden');
            el.classList.remove('animate-fade-in', 'animate-scale-in');
            void el.offsetWidth; // Trigger reflow
            el.classList.add('animate-scale-in');
        };

        const hideContent = (el) => {
            el.classList.add('hidden');
            el.classList.remove('animate-scale-in');
        };

        if (tabName === 'photo') {
            showContent(photoContent);
            hideContent(readingContent);
        } else if (tabName === 'reading') {
            hideContent(photoContent);
            showContent(readingContent);
        }

        // Update Button Styles
        // We find valid buttons in the header
        const header = btn.closest('#hobby-header');
        if (header) {
            const buttons = header.querySelectorAll('button');
            buttons.forEach(b => {
                // Reset to inactive
                b.classList.remove('active', 'bg-white/10', 'text-cyan-400', 'shadow-sm');
                b.classList.add('text-theme-muted', 'hover:text-white', 'hover:bg-white/5');
            });

            // Set clicked to active
            btn.classList.remove('text-theme-muted', 'hover:text-white', 'hover:bg-white/5');
            btn.classList.add('active', 'bg-white/10', 'text-cyan-400', 'shadow-sm');
        }
    }

    // Finder (Explorer) Logic
    switchFinderCategory(el, category) {
        const container = el.closest('.finder-app-container');
        if (!container) return;

        // Update sidebar UI
        container.querySelectorAll('.finder-sidebar-item').forEach(item => {
            item.classList.remove('active', 'bg-cyan-500/10', 'text-cyan-400', 'border', 'border-cyan-500/20');
            item.classList.add('text-theme-muted', 'hover:bg-white/5', 'hover:text-white');
        });
        el.classList.add('active', 'bg-cyan-500/10', 'text-cyan-400', 'border', 'border-cyan-500/20');
        el.classList.remove('text-theme-muted', 'hover:bg-white/5', 'hover:text-white');

        // Filter files
        const grid = container.querySelector('#finder-file-grid');
        const items = grid.querySelectorAll('.finder-item');
        let visibleCount = 0;

        items.forEach(item => {
            const type = item.getAttribute('data-type');
            if (category === 'all' || type === category) {
                item.style.display = 'flex';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Update Breadcrumb
        const breadcrumb = container.querySelector('.finder-breadcrumb');
        if (breadcrumb) breadcrumb.textContent = category;

        // Update Status
        const status = container.querySelector('.finder-status-text');
        if (status) status.textContent = `${visibleCount} items filtered`;
    }

    setFinderView(el, mode) {
        const container = el.closest('.finder-app-container');
        if (!container) return;

        // Update Toggle UI
        container.querySelectorAll('.finder-view-btn').forEach(btn => {
            btn.classList.remove('active', 'bg-white/10', 'text-white', 'font-bold');
            btn.classList.add('text-theme-muted', 'hover:text-white');
        });
        el.classList.add('active', 'bg-white/10', 'text-white', 'font-bold');
        el.classList.remove('text-theme-muted', 'hover:text-white');

        const grid = container.querySelector('#finder-file-grid');
        const items = grid.querySelectorAll('.finder-item');

        if (mode === 'list') {
            grid.classList.remove('grid', 'grid-cols-2', 'sm:grid-cols-3', 'md:grid-cols-4', 'lg:grid-cols-5', 'xl:grid-cols-6', 'gap-4');
            grid.classList.add('flex', 'flex-col', 'gap-1');

            items.forEach(item => {
                item.classList.remove('flex-col', 'items-center', 'text-center', 'p-3');
                item.classList.add('flex-row', 'items-center', 'text-left', 'px-4', 'py-2', 'justify-start', 'gap-4', 'border-b', 'border-white/5');

                const iconContainer = item.querySelector('.finder-icon-container');
                if (iconContainer) iconContainer.classList.remove('mb-3');

                const iconDiv = item.querySelector('.finder-icon');
                if (iconDiv) iconDiv.classList.replace('text-5xl', 'text-2xl');

                const nameDiv = item.querySelector('.finder-name');
                if (nameDiv) {
                    nameDiv.classList.remove('text-center', 'w-full', 'mb-0.5');
                    nameDiv.classList.add('text-left', 'w-48');
                }

                const sizeDiv = item.querySelector('.finder-size');
                if (sizeDiv) {
                    sizeDiv.classList.remove('text-[8px]');
                    sizeDiv.classList.add('text-[10px]', 'w-16', 'text-right');
                }

                const listViewInfo = item.querySelector('.list-view-only');
                if (listViewInfo) {
                    listViewInfo.classList.remove('hidden');
                    listViewInfo.classList.add('flex');
                }
            });
        } else {
            grid.classList.add('grid', 'grid-cols-2', 'sm:grid-cols-3', 'md:grid-cols-4', 'lg:grid-cols-5', 'xl:grid-cols-6', 'gap-4');
            grid.classList.remove('flex', 'flex-col', 'gap-1');

            items.forEach(item => {
                item.classList.add('flex-col', 'items-center', 'text-center', 'p-3');
                item.classList.remove('flex-row', 'items-center', 'text-left', 'px-4', 'py-2', 'justify-start', 'gap-4', 'border-b', 'border-white/5');

                const iconContainer = item.querySelector('.finder-icon-container');
                if (iconContainer) iconContainer.classList.add('mb-3');

                const iconDiv = item.querySelector('.finder-icon');
                if (iconDiv) iconDiv.classList.replace('text-2xl', 'text-5xl');

                const nameDiv = item.querySelector('.finder-name');
                if (nameDiv) {
                    nameDiv.classList.add('text-center', 'w-full', 'mb-0.5');
                    nameDiv.classList.remove('text-left', 'w-48');
                }

                const sizeDiv = item.querySelector('.finder-size');
                if (sizeDiv) {
                    sizeDiv.classList.add('text-[8px]');
                    sizeDiv.classList.remove('text-[10px]', 'w-16', 'text-right');
                }

                const listViewInfo = item.querySelector('.list-view-only');
                if (listViewInfo) {
                    listViewInfo.classList.add('hidden');
                    listViewInfo.classList.remove('flex');
                }
            });
        }
    }
}
