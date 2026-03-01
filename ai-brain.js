import { systemData } from './data.js';

export class AIBrain {
    constructor() {
        this.memory = [];
        this.domElements = null;
        this.lastContext = { id: null, type: null, topic: null };

        // Build portfolio knowledge strings from data
        this.portfolio = {
            projects: (systemData.projects || []).map(p => ({
                id: p.id,
                name: (p.name && p.name.en) || p.id,
                tagline: (p.tagline && p.tagline.en) || '',
                description: (p.description && p.description.en) || '',
                tech: (p.tech || []).join(', '),
                details: (p.details && p.details.en) || ''
            })),
            skills: (systemData.skills || []).map(s => ({
                name: s.name,
                type: s.type,
                level: s.level
            })),
            achievements: (systemData.achievements || []).map(a => ({
                title: (a.title && a.title.en) || '',
                award: (a.award && a.award.en) || '',
                details: (a.details || []).map(d => (d && d.en) || '').join('. ')
            })),
            experience: (systemData.experience || []).map(e => ({
                role: (e.role && e.role.en) || '',
                duration: (e.duration && e.duration.en) || '',
                description: (e.description || []).map(d => (d && d.en) || '').join('. ')
            })),
            bio: (systemData.identity && systemData.identity.bio && systemData.identity.bio.en) || '',
            mindset: (systemData.identity && systemData.identity.mindset && systemData.identity.mindset.en) || '',
            name: (systemData.identity && systemData.identity.name && systemData.identity.name.en) || 'Sohan Fardin',
            role: (systemData.identity && systemData.identity.role && systemData.identity.role.en) || 'ETE Student & Innovator',
            university: 'RUET',
            roll: '2204041'
        };
    }

    attachToDOM(container) {
        this.domElements = {
            input: container.querySelector('#ai-input'),
            form: container.querySelector('#ai-form'),
            messages: container.querySelector('#ai-messages')
        };

        if (this.domElements.form) {
            this.domElements.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleInput(this.domElements.input.value);
            });
        }
    }

    async handleInput(text) {
        if (!text.trim()) return;
        const userInput = text.trim();
        this.addMessage(userInput, 'user');
        if (this.domElements.input) this.domElements.input.value = '';

        this.memory.push({ role: 'user', content: userInput });
        while (this.memory.length > 20) this.memory.shift();

        const thinkingMsg = this.addMessage('Processing query...', 'ai', true);

        // Small delay to show thinking animation
        await new Promise(r => setTimeout(r, 400 + Math.random() * 600));

        try {
            const result = this.processInput(userInput);
            if (thinkingMsg) thinkingMsg.remove();

            if (result.action) result.action();

            this.addMessage(result.response, 'ai');
            this.memory.push({ role: 'model', content: result.response });
        } catch (error) {
            console.error("AI Error:", error);
            if (thinkingMsg) thinkingMsg.remove();
            this.addMessage("System encountered an error. Please try again.", 'ai');
        }
    }

    processInput(input) {
        const q = input.toLowerCase().trim();

        // === 1. OS COMMANDS ===

        // Theme commands
        const themes = ['sunset', 'forest', 'ocean', 'berry', 'cosmic'];
        const foundTheme = themes.find(t => q.includes(t));
        if (foundTheme && (q.includes('theme') || q.includes('change') || q.includes('set') || q.includes('switch') || q.includes('apply') || q.includes('make'))) {
            return {
                response: `🎨 Visual cortex recalibrated. Theme set to **${foundTheme.toUpperCase()}** spectrum.`,
                action: () => window.os.setTheme(foundTheme)
            };
        }
        if (q.includes('theme') && !foundTheme) {
            return { response: "Available theme spectrums: **Sunset** 🌅, **Forest** 🌲, **Ocean** 🌊, **Berry** 🫐, **Cosmic** ✨. Which one would you like?" };
        }

        // Language commands
        if (q.includes('bangla') || q.includes('bengali') || q.match(/\bbn\b/)) {
            return {
                response: "ভাষা পরিবর্তন করা হয়েছে। এখন **বাংলায়** কথা বলব। 🇧🇩",
                action: () => window.os.setLanguage('bn')
            };
        }
        if ((q.includes('english') || q.match(/\ben\b/)) && (q.includes('language') || q.includes('switch') || q.includes('change') || q.includes('speak'))) {
            return {
                response: "Language protocol updated to **English**. 🇬🇧",
                action: () => window.os.setLanguage('en')
            };
        }

        // Open app commands
        const appMap = [
            { id: 'about', keys: ['about', 'bio', 'myself', 'profile', 'who is sohan', 'introduce'] },
            { id: 'education', keys: ['education', 'study', 'academic', 'college', 'university', 'ruet', 'school', 'degree'] },
            { id: 'skills', keys: ['skill', 'tech stack', 'technology', 'programming language', 'what can you do', 'expertise'] },
            { id: 'projects', keys: ['project', 'work', 'portfolio', 'built', 'created', 'developed'] },
            { id: 'achievements', keys: ['achievement', 'award', 'prize', 'winner', 'competition', 'contest', 'olympiad'] },
            { id: 'experience', keys: ['experience', 'job', 'career', 'timeline', 'professional'] },
            { id: 'certifications', keys: ['certification', 'certificate', 'course', 'cs50', 'harvard'] },
            { id: 'resume', keys: ['resume', 'cv', 'biodata', 'download resume'] },
            { id: 'hobby', keys: ['hobby', 'hobbies', 'photography', 'reading', 'book', 'photo', 'interest'] },
            { id: 'terminal', keys: ['terminal', 'cmd', 'command line', 'bash', 'console', 'shell'] },
            { id: 'contact', keys: ['contact', 'email', 'reach', 'social media', 'message', 'connect', 'hire'] },
            { id: 'explorer', keys: ['file', 'finder', 'explorer', 'document', 'browse'] }
        ];

        if (q.includes('open') || q.includes('show') || q.includes('launch') || q.includes('start') || q.includes('run') || q.includes('go to') || q.includes('see') || q.includes('view') || q.includes('display')) {
            for (const app of appMap) {
                if (app.keys.some(k => q.includes(k)) || q.includes(app.id)) {
                    return {
                        response: `⚡ Launching **${app.id.toUpperCase()}** module. Initialization complete.`,
                        action: () => window.os.openApp(app.id)
                    };
                }
            }
        }

        // Open project detail
        const projectMap = [
            { id: 'spytron-x', keys: ['spytron', 'spy robot', 'surveillance robot'] },
            { id: 'edudial', keys: ['edudial', 'edu dial', 'ivr', 'offline education', 'phone education'] },
            { id: 'krishios', keys: ['krishi', 'krishios', 'agriculture', 'farming', 'farm'] },
            { id: 'neurodristi', keys: ['wheelchair', 'eye control', 'eye track', 'assistive', 'disabled', 'neurodristi', 'neuro dristi'] },
            { id: 'spider-spy', keys: ['spider', 'spider spy', 'spider robot'] }
        ];

        for (const proj of projectMap) {
            if (proj.keys.some(k => q.includes(k))) {
                const projData = this.portfolio.projects.find(p => p.id === proj.id);
                const desc = projData ? projData.tagline : '';
                return {
                    response: `📂 Opening project schematics for **${proj.id.toUpperCase()}**.\n${desc ? '**Description:** ' + desc : ''}`,
                    action: () => window.os.openProjectDetail(proj.id)
                };
            }
        }

        // Open files
        if (q.includes('resume') && (q.includes('pdf') || q.includes('download') || q.includes('file'))) {
            return { response: "📄 Opening **resume.pdf** in secure viewer.", action: () => window.open('resume.pdf', '_blank') };
        }

        // Time/date
        if (q.includes('time') || q.includes('date') || q.includes('clock') || q.includes('day')) {
            const now = new Date();
            return { response: `🕐 System time: **${now.toLocaleTimeString()}** | Date: **${now.toLocaleDateString()}** | Day: **${now.toLocaleDateString('en', { weekday: 'long' })}**` };
        }

        // === 2. KNOWLEDGE BASE ===

        // Greetings
        if (q.match(/^(hi|hello|hey|yo|sup|assalamu|salam|greet|howdy|good morning|good evening|good afternoon)/)) {
            const greetings = [
                "**Neural System Online.** 🧠 I'm Sohan.AI — your interface to Sohan Fardin's engineering world. Ask me about his projects, skills, achievements, or tell me to control the OS!",
                "**Welcome, Operator.** ⚡ Sohan.AI is fully operational. I can open apps, explore projects, change themes, or answer questions about Sohan's work. What's your command?",
                "**Connection Established.** 🔗 Neural Core active. Try: *\"Show me projects\"*, *\"Who is Sohan?\"*, or *\"Change theme to ocean\"*."
            ];
            return { response: greetings[Math.floor(Math.random() * greetings.length)] };
        }

        // Who are you
        if (q.includes('who are you') || q.includes('what are you') || q.includes('your name') || q.includes('sohan.ai') || q.includes('introduce yourself')) {
            return { response: "I am **Sohan.AI** 🤖, a neural interface built to navigate Sohan Fardin's engineering portfolio. I can explore his projects, display skills, open apps, change themes, switch languages, and answer questions about his work. I'm your OS-level assistant!" };
        }

        // Who is Sohan  
        if (q.includes('who is sohan') || q.includes('about sohan') || q.includes('tell me about sohan') || q.includes('sohan fardin')) {
            return {
                response: `**${this.portfolio.name}** is a ${this.portfolio.role} at **${this.portfolio.university}** (Roll: ${this.portfolio.roll}).\n\n${this.portfolio.bio.split('\n\n')[0]}\n\n**Mindset:** *"${this.portfolio.mindset}"*\n\nWant to explore deeper? Try: *"Show projects"*, *"Open achievements"*, or *"Tell me about Spytron"*.`,
                action: () => window.os.openApp('about')
            };
        }

        // Projects info (without opening)
        if (q.includes('how many project') || q.includes('list project') || q.includes('all project') || q.includes('what project')) {
            const projList = this.portfolio.projects.map((p, i) => `${i + 1}. **${p.name}** — ${p.tagline}`).join('\n');
            return { response: `Sohan has built **${this.portfolio.projects.length} major projects**:\n\n${projList}\n\nSay a project name to learn more!` };
        }

        // Individual project queries
        for (const proj of this.portfolio.projects) {
            if (q.includes(proj.name.toLowerCase()) || q.includes(proj.id)) {
                let response = `**${proj.name}** — ${proj.tagline}\n\n${proj.description}\n\n**Tech Stack:** ${proj.tech}`;

                if (proj.id === 'edudial') {
                    response += `\n\n📞 **Live Prototype Demo Call: +1 (216) 616-0289**`;
                }

                response += `\n\n${proj.details ? '**Details:** ' + proj.details.substring(0, 250) + '...' : ''}\n\nWant to see the full project? Say *"open ${proj.name.toLowerCase()}"*`;

                return {
                    response: response,
                    action: () => window.os.openProjectDetail(proj.id)
                };
            }
        }

        // Skills info
        if (q.includes('skill') || q.includes('tech') || q.includes('what can') || q.includes('programming') || q.includes('know') || q.includes('expertise')) {
            const byType = {};
            for (const s of this.portfolio.skills) {
                if (!byType[s.type]) byType[s.type] = [];
                byType[s.type].push(`${s.name} (${s.level}%)`);
            }
            let skillText = "**Sohan's Technical Arsenal:**\n\n";
            for (const [type, skills] of Object.entries(byType)) {
                skillText += `🔹 **${type.charAt(0).toUpperCase() + type.slice(1)}:** ${skills.join(', ')}\n`;
            }
            return {
                response: skillText + "\nWant a visual breakdown? Say *\"open skills\"*.",
                action: () => window.os.openApp('skills')
            };
        }

        // Achievements
        if (q.includes('achievement') || q.includes('award') || q.includes('won') || q.includes('winner') || q.includes('prize') || q.includes('competition')) {
            const achList = this.portfolio.achievements.map(a => `🏆 **${a.title}** — ${a.award}`).join('\n');
            return {
                response: `**Sohan's Achievements:**\n\n${achList}\n\nWant details? Say *\"open achievements\"*.`,
                action: () => window.os.openApp('achievements')
            };
        }

        // Experience
        if (q.includes('experience') || q.includes('work history') || q.includes('career') || q.includes('job') || q.includes('professional')) {
            const expList = this.portfolio.experience.map(e => `💼 **${e.role}** (${e.duration})\n   ${e.description}`).join('\n\n');
            return {
                response: `**Professional Experience:**\n\n${expList}`,
                action: () => window.os.openApp('experience')
            };
        }

        // Education
        if (q.includes('education') || q.includes('university') || q.includes('college') || q.includes('study') || q.includes('degree') || q.includes('academic')) {
            const edu = (systemData.identity && systemData.identity.education) || [];
            const eduText = edu.map(e => {
                const inst = (e.institution && e.institution.en) || '';
                const deg = (e.degree && e.degree.en) || '';
                const dur = (e.duration && e.duration.en) || '';
                return `🎓 **${inst}**\n   ${deg} | ${dur}`;
            }).join('\n\n');
            return {
                response: `**Education Background:**\n\n${eduText}`,
                action: () => window.os.openApp('education')
            };
        }

        // Hobbies
        if (q.includes('hobby') || q.includes('hobbies') || q.includes('photo') || q.includes('reading') || q.includes('book') || q.includes('free time') || q.includes('interest')) {
            return {
                response: "**Sohan's Hobbies:**\n\n📸 **Photography** — A collection of 23 photographs capturing life through an engineer's lens.\n📚 **Reading** — Top 10 self-help and personal development books.\n\nWant to explore? Say *\"open hobby\"*.",
                action: () => window.os.openApp('hobby')
            };
        }

        // Thank you
        if (q.includes('thank') || q.includes('thanks') || q.includes('thx') || q.includes('appreciate')) {
            return { response: "You're welcome! ⚡ Sohan.AI is always here. Feel free to explore more anytime." };
        }

        // Bye
        if (q.match(/^(bye|goodbye|exit|quit|close|see you|later)/)) {
            return { response: "**Neural link closing.** 👋 See you next time, Operator. Sohan.AI — always standing by." };
        }

        // Help
        if (q.includes('help') || q.includes('what can you do') || q.includes('commands') || q.includes('how to use') || q.includes('guide')) {
            return {
                response: "**Sohan.AI Command Guide** ⚡\n\n" +
                    "🔹 **Explore Portfolio:** *\"Show projects\"*, *\"Open skills\"*, *\"Tell me about Spytron\"*\n" +
                    "🔹 **OS Control:** *\"Change theme to sunset\"*, *\"Switch to Bangla\"*\n" +
                    "🔹 **Information:** *\"Who is Sohan?\"*, *\"List achievements\"*, *\"Show experience\"*\n" +
                    "🔹 **Apps:** *\"Open terminal\"*, *\"Open contact\"*, *\"Open explorer\"*\n" +
                    "🔹 **Quick Info:** *\"What time is it?\"*, *\"List all projects\"*\n\n" +
                    "Just type naturally — I understand variations like *\"skill\"*, *\"skills\"*, *\"show my skills\"*, etc."
            };
        }

        // NHSPC specific
        if (q.includes('nhspc') || q.includes('programming contest') || q.includes('national programming')) {
            return {
                response: "🏆 Sohan won the **National High School Programming Contest (NHSPC)** for **2 consecutive years** (2016 & 2017), achieving 1st place at the national level. This reflects his early excellence in problem-solving and logic.",
                action: () => window.os.openApp('achievements')
            };
        }

        // Math olympiad
        if (q.includes('math') && (q.includes('olympiad') || q.includes('competition'))) {
            return {
                response: "🧮 Sohan secured **2nd place** at the **Regional Mathematics Olympiad (2018)**, demonstrating strong analytical thinking and mathematical reasoning.",
                action: () => window.os.openApp('achievements')
            };
        }

        // bdapps
        if (q.includes('bdapps') || q.includes('innovation summit')) {
            return {
                response: "🚀 Sohan's project **EduDial** was selected among the **Top 25 teams** at the **bdapps Innovation Summit 2025** (National Level). Recognized for innovation, social impact, and scalability.\n\n📞 **To enjoy EduDial Live demo Call: +1 (216) 616-0289**",
                action: () => window.os.openApp('achievements')
            };
        }

        // Python/specific skill
        if (q.includes('python')) {
            const py = this.portfolio.skills.find(s => s.name === 'Python');
            return { response: `🐍 Sohan's Python proficiency is at **${py ? py.level : 90}%**. He uses Python for AI/ML, Flask web development, automation, and embedded projects like EduDial and KrishiOS.` };
        }
        if (q.includes('arduino')) {
            const ard = this.portfolio.skills.find(s => s.name === 'Arduino');
            return { response: `⚡ Arduino proficiency: **${ard ? ard.level : 95}%**. Sohan has extensive experience with Arduino for robotics (Spytron-X), IoT devices, and embedded systems.` };
        }
        if (q.includes('javascript') || q.includes('js')) {
            const js = this.portfolio.skills.find(s => s.name === 'JavaScript');
            return { response: `📜 JavaScript proficiency: **${js ? js.level : 85}%**. Used for full-stack web development, React apps, this very portfolio OS, and interactive projects.` };
        }

        // CS50
        if (q.includes('cs50') || q.includes('harvard')) {
            return {
                response: "📜 Sohan completed **CS50x: Introduction to Computer Science** from **Harvard University** (via edX). Covered C, Python, Algorithms, Data Structures, and Web Development.",
                action: () => window.os.openApp('certifications')
            };
        }

        // Contact
        if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('connect') || q.includes('message')) {
            return {
                response: "📧 Want to get in touch with Sohan? Opening the **Contact** module where you can send a direct message!",
                action: () => window.os.openApp('contact')
            };
        }

        // Resume
        if (q.includes('resume') || q.includes('cv')) {
            return {
                response: "📄 Opening Sohan's **Resume** module. You can view and download the full CV.",
                action: () => window.os.openApp('resume')
            };
        }

        // Failures / challenges
        if (q.includes('failure') || q.includes('challenge') || q.includes('mistake') || q.includes('problem') || q.includes('struggle')) {
            const failures = (systemData.logs && systemData.logs.failures) || [];
            if (failures.length > 0) {
                return { response: "**Engineering Log — Failures & Fixes:**\n\n" + failures.map(f => `⚠️ ${f}`).join('\n\n') + "\n\n*Every failure is a lesson in Sohan's engineering journey.*" };
            }
            return { response: "Every great engineer faces setbacks. Sohan iterates fast and learns from each failure. Ask about specific projects to learn more!" };
        }

        // Boikhata
        if (q.includes('boikhata') || q.includes('ledger') || q.includes('accounting')) {
            return { response: "📒 **Boikhata MM** is Sohan's startup — a smart digital ledger system with real-time balance calculation, AI-driven expense analysis, and predictive financial insights. Currently in active development (2025–Present)." };
        }

        // === 3. FUZZY MATCHING - Check for partial matches in apps ===
        for (const app of appMap) {
            if (app.keys.some(k => q.includes(k))) {
                return {
                    response: `Looks like you're asking about **${app.id}**. Let me open that for you! ⚡`,
                    action: () => window.os.openApp(app.id)
                };
            }
        }

        // === 4. DEFAULT RESPONSE ===
        const defaults = [
            "I'm specialized in navigating **Sohan Fardin's portfolio**. Try asking about his **projects**, **skills**, **achievements**, or say *\"help\"* to see all commands! 🧠",
            "I didn't quite catch that. I can help with: **portfolio exploration**, **OS control** (themes, language), and **project details**. Type *\"help\"* for a full guide! ⚡",
            "Hmm, that's outside my knowledge core. But I excel at exploring Sohan's work! Try: *\"Who is Sohan\"*, *\"Show projects\"*, *\"Change theme to forest\"*, or *\"Open contact\"*. 🔗"
        ];

        return { response: defaults[Math.floor(Math.random() * defaults.length)] };
    }

    executeOSCommand(cmd) {
        try {
            switch (cmd.action) {
                case 'SET_THEME':
                    if (window.os && window.os.setTheme) window.os.setTheme(cmd.value);
                    break;
                case 'SET_LANG':
                    if (window.os && window.os.setLanguage) window.os.setLanguage(cmd.value);
                    break;
                case 'OPEN_APP':
                    if (window.os && window.os.openApp) window.os.openApp(cmd.id);
                    break;
                case 'OPEN_FILE':
                    window.open(cmd.name, '_blank');
                    break;
                case 'OPEN_PROJECT':
                    if (window.os && window.os.openProjectDetail) window.os.openProjectDetail(cmd.id);
                    break;
            }
        } catch (e) {
            console.error("OS Command execution failed:", e);
        }
    }

    addMessage(text, sender, isThinking = false) {
        if (!this.domElements || !this.domElements.messages) return null;

        const div = document.createElement('div');
        div.className = 'flex items-start gap-4 ' + (sender === 'user' ? 'flex-row-reverse' : '') + ' animate-pop-in mb-6';

        const avatar = sender === 'ai'
            ? '<div class="w-9 h-9 rounded-xl ai-bubble-bot flex-shrink-0 flex items-center justify-center text-[10px] font-black text-cyan-400 shadow-2xl">CORE</div>'
            : '<div class="w-9 h-9 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 shadow-2xl"><img src="profile.jpeg" class="w-full h-full object-cover" onerror="this.src=\'https://ui-avatars.com/api/?name=Sohan+Fardin&background=a855f7&color=fff\'"></div>';

        let formattedText = text;
        if (!isThinking) {
            formattedText = text
                .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                .replace(/\*(.*?)\*/g, '<i>$1</i>')
                .replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px;font-size:12px">$1</code>')
                .replace(/\n/g, '<br>');
        }

        const bubbleClass = sender === 'ai' ? 'ai-bubble-bot' : 'ai-bubble-user';
        const cornerClass = sender === 'ai' ? 'rounded-tl-none' : 'rounded-tr-none';

        const thinkingHTML = '<div class="neural-typing"><div class="neural-dot"></div><div class="neural-dot"></div><div class="neural-dot"></div></div>';
        const logId = Math.random().toString(36).substr(2, 9).toUpperCase();
        const logHTML = sender === 'ai' && !isThinking
            ? '<div class="absolute -bottom-4 left-0 text-[7px] text-theme-muted opacity-0 group-hover:opacity-100 transition-opacity font-mono uppercase tracking-tighter mt-1">LOG ID: ' + logId + '</div>'
            : '';

        div.innerHTML = avatar +
            '<div class="' + bubbleClass + ' p-4 rounded-2xl ' + cornerClass + ' max-w-[85%] text-sm leading-relaxed relative group">' +
            (isThinking ? thinkingHTML : formattedText) +
            logHTML +
            '</div>';

        this.domElements.messages.appendChild(div);
        this.domElements.messages.scrollTop = this.domElements.messages.scrollHeight;
        return isThinking ? div : null;
    }
}
