import { systemData } from './data.js';

// Helper to get localized string safely
const t = (obj, lang) => {
    if (!obj) return '';
    return obj[lang] || obj['en'] || obj;
};

export function getApp(id) {
    const lang = window.os ? window.os.currentLang : 'en';

    const apps = [
        {
            id: 'voice-assistant',
            title: lang === 'bn' ? 'ভয়েস অ্যাসিস্ট্যান্ট' : 'Voice Assistant',
            icon: '🎙️',
            width: 420,
            height: 580,
            content: `
                <div class="h-full flex flex-col bg-[#020408] overflow-hidden relative font-sans text-white">
                    <!-- Futuristic Background Elements -->
                    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(34,211,238,0.12)_0%,_transparent_70%)]"></div>
                    <div class="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
                    <div class="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>
                    
                    <!-- Top Status Bar -->
                    <div class="px-6 py-3 flex items-center justify-between border-b border-white/5 backdrop-blur-md bg-white/2 relative z-20">
                        <div class="flex items-center gap-2">
                            <div class="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
                            <span class="text-[8px] font-black tracking-[0.3em] uppercase opacity-80 text-cyan-100">Neural Link Active</span>
                        </div>
                        <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-[7px] font-mono text-cyan-400">
                            <span class="w-1 h-1 rounded-full bg-cyan-400 animate-ping"></span>
                            CONNECTED
                        </div>
                    </div>

                    <!-- Main Nexus Area -->
                    <div class="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
                        <!-- Orbital Visualizer Core -->
                        <div class="relative w-44 h-44 flex items-center justify-center">
                            <!-- Layered Rotating Rings -->
                            <div class="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed animate-[spin_30s_linear_infinite]"></div>
                            <div class="absolute inset-2 rounded-full border border-blue-500/10 border-dotted animate-[spin_20s_linear_infinite_reverse]"></div>
                            <div class="absolute inset-4 rounded-full border-2 border-cyan-500/5 shadow-[inset_0_0_40px_rgba(34,211,238,0.15)]"></div>
                            
                            <!-- The Core Orb -->
                            <div class="vapi-orb w-24 h-24 rounded-full relative flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.1)]">
                                <div class="absolute inset-0 bg-gradient-to-br from-cyan-600/40 via-blue-900/40 to-black opacity-40"></div>
                                <div class="absolute inset-0 backdrop-blur-2xl border border-white/20"></div>
                                
                                <!-- Active Visualizer Bars (Improved) -->
                                <div class="absolute inset-0 flex items-center justify-center gap-1.5 overflow-hidden opacity-0 vapi-waves transition-opacity duration-700">
                                    <div class="w-1 h-6 bg-cyan-500 rounded-full animate-wave-1"></div>
                                    <div class="w-1 h-10 bg-cyan-400 rounded-full animate-wave-2"></div>
                                    <div class="w-1.5 h-14 bg-white rounded-full animate-wave-3 shadow-[0_0_15px_#fff]"></div>
                                    <div class="w-1 h-10 bg-cyan-400 rounded-full animate-wave-4"></div>
                                    <div class="w-1 h-6 bg-cyan-500 rounded-full animate-wave-5"></div>
                                </div>
                                
                                <!-- Inner Icon (Conditional hidden when talking) -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white relative z-10 transition-all duration-500 vapi-icon">
                                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
                                </svg>
                            </div>
                            
                            <!-- Pulse Rings (When Active) -->
                            <div class="absolute -inset-4 rounded-full border-2 border-cyan-400/0 transition-all duration-700 vapi-active-ring scale-75 opacity-0"></div>
                        </div>

                        <!-- Status Branding -->
                        <div class="mt-6 text-center space-y-1">
                            <h2 class="text-lg font-black italic tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 uppercase">Neuro-Sync Engine</h2>
                            <div class="flex items-center justify-center gap-3">
                                <span class="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500/50"></span>
                                <p class="text-[10px] text-cyan-400 font-mono tracking-[0.4em] uppercase status-text">
                                    <span class="status-idle">${lang === 'bn' ? 'নিষ্ক্রিয়' : 'Standby'}</span>
                                    <span class="status-active hidden">${lang === 'bn' ? 'সক্রিয়' : 'Synchronized'}</span>
                                    <span class="status-error hidden text-red-500">${lang === 'bn' ? 'বিচ্ছিন্ন' : 'Link Offline'}</span>
                                </p>
                                <span class="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500/50"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Interactive Control Panel -->
                    <div class="px-6 pb-8 pt-2 relative z-20">
                        <div class="p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-2xl relative group">
                            <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                            
                            <div class="relative bg-[#0a0c10] rounded-xl p-5 border border-white/5">
                                <p class="text-[10px] text-gray-500 font-medium leading-relaxed mb-5 text-center px-4">
                                    ${lang === 'bn' ? 'নিউরাল লিঙ্কের মাধ্যমে সরাসরি সিস্টেম নিয়ন্ত্রণ করুন। কথা বলতে নিচের বাটনে চাপ দিন।' : 'Engage the neural uplink for seamless system automation. Voice-activated protocols are now online.'}
                                </p>
                                
                                <button id="vapi-initiate-btn" onclick="window.toggleVapiCall()" 
                                    class="w-full h-14 bg-gradient-to-br from-cyan-600 via-cyan-500 to-blue-700 hover:brightness-110 text-white rounded-lg text-[11px] font-black uppercase tracking-[0.3em] shadow-[0_4px_20px_rgba(34,211,238,0.25)] active:scale-[0.98] transition-all flex items-center justify-center gap-4 relative overflow-hidden group">
                                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                                    <span class="btn-text-idle relative z-10">${lang === 'bn' ? 'সেশন শুরু' : 'Engage Link'}</span>
                                    <span class="btn-text-active relative z-10" style="display:none">${lang === 'bn' ? 'সেশন শেষ' : 'Sever Link'}</span>
                                    <div class="w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-75"></div>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Footer Branding -->
                        <div class="mt-4 flex items-center justify-center gap-2 opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-default">
                             <div class="w-1 h-1 rounded-full bg-cyan-500 animate-pulse"></div>
                             <span class="text-[6px] font-bold tracking-[0.6em] text-cyan-100 uppercase italic">Vapi Neural Link v4.0.2</span>
                        </div>
                    </div>

                    <style>
                        @keyframes shimmer {
                            100% { transform: translateX(100%); }
                        }
                        
                        /* Session Active States */
                        .vapi-session-active .vapi-orb {
                            box-shadow: 0 0 50px rgba(34,211,238,0.3), inset 0 0 20px rgba(34,211,238,0.2);
                            border-color: rgba(34,211,238,0.4);
                        }
                        
                        .vapi-session-active .vapi-icon {
                            transform: scale(0.6) translateY(-10px);
                            opacity: 0.5;
                        }
                        
                        .vapi-session-active .vapi-waves {
                            opacity: 1;
                        }
                        
                        .vapi-session-active .vapi-active-ring {
                            border-color: rgba(34,211,238,0.6);
                            scale: 1;
                            opacity: 1;
                            animation: pulse-ring 2s infinite;
                        }
                        
                        @keyframes pulse-ring {
                            0% { transform: scale(1); opacity: 0.6; }
                            100% { transform: scale(1.1); opacity: 0; }
                        }
                        
                        /* Wave Animations */
                        .vapi-session-active .animate-wave-1 { animation: voice-wave 1s infinite 0.1s; }
                        .vapi-session-active .animate-wave-2 { animation: voice-wave 1.2s infinite 0.2s; }
                        .vapi-session-active .animate-wave-3 { animation: voice-wave 0.8s infinite 0.3s; }
                        .vapi-session-active .animate-wave-4 { animation: voice-wave 1.1s infinite 0.4s; }
                        .vapi-session-active .animate-wave-5 { animation: voice-wave 0.9s infinite 0.5s; }
                        
                        @keyframes voice-wave {
                            0%, 100% { height: 10px; opacity: 0.3; }
                            50% { height: 40px; opacity: 1; }
                        }
                        
                        /* Speaking State */
                        .vapi-speaking .vapi-orb {
                            background: radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%);
                            box-shadow: 0 0 80px rgba(34,211,238,0.5);
                        }
                        
                        .vapi-speaking .vapi-waves div {
                            background-color: #fff !important;
                            box-shadow: 0 0 15px #fff;
                            animation-duration: 0.4s !important;
                        }
                        
                        /* Switch States */
                        .vapi-session-active .status-active { display: inline !important; }
                        .vapi-session-active .status-idle { display: none !important; }
                        .vapi-error .status-error { display: inline !important; }
                        .vapi-error .status-idle, .vapi-error .status-active { display: none !important; }
                        
                        .vapi-session-active .btn-text-idle { display: none !important; }
                        .vapi-session-active .btn-text-active { display: inline-block !important; }
                        
                        .vapi-session-active #vapi-initiate-btn {
                            background: linear-gradient(to bottom right, #ef4444, #991b1b) !important;
                            box-shadow: 0 4px 25px rgba(239, 68, 68, 0.4);
                        }
                    </style>
                </div>
            `
        },
        {
            id: 'ai-assistant',
            title: lang === 'bn' ? 'সোহান.এআই' : 'Sohan.AI',
            icon: '🤖',
            width: 450,
            height: 650,
            content: `
                <div id="ai-interface" class="h-full flex flex-col bg-theme-bg overflow-hidden relative">
                    <div class="absolute inset-0 neural-overlay opacity-50"></div>
                    
                    <!-- Neural Header -->
                    <div class="px-6 py-4 border-b border-white/5 bg-white/5 backdrop-blur-3xl flex items-center justify-between relative z-10">
                        <div class="flex items-center gap-3">
                            <div class="relative">
                                <div class="w-3 h-3 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
                                <div class="absolute inset-0 w-3 h-3 bg-cyan-500 rounded-full animate-ping opacity-50"></div>
                            </div>
                            <div>
                                <h2 class="text-sm font-black text-white tracking-[0.2em] uppercase">Neural Core v2.1</h2>
                                <div class="flex items-center gap-2">
                                    <span class="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                                    <p class="text-[8px] text-cyan-400 font-mono uppercase tracking-tighter">Secure Link: Active</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right hidden sm:block">
                                <p class="text-[8px] text-theme-muted font-mono uppercase opacity-40">System Load</p>
                                <div class="w-16 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                                     <div class="w-[42%] h-full bg-cyan-500 animate-pulse"></div>
                                </div>
                            </div>
                            <div class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs opacity-60 hover:opacity-100 transition-opacity cursor-help" title="Neural Core Statistics">
                                📊
                            </div>
                        </div>
                    </div>

                    <!-- Chat Matrix -->
                    <div class="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 no-scrollbar" id="ai-messages">
                        <div class="flex items-start gap-4 animate-pop-in">
                            <div class="w-9 h-9 rounded-xl ai-bubble-bot flex-shrink-0 flex items-center justify-center text-[10px] font-black text-cyan-400">CORE</div>
                            <div class="ai-bubble-bot p-4 rounded-2xl rounded-tl-none text-sm text-theme leading-relaxed">
                                <p class="mb-2"><b>Neural link established.</b></p>
                                <p class="opacity-80">${lang === 'bn' ? 'সোহান.এআই নিউরাল সিস্টেম সক্রিয়। আপনি কি সোহানের প্রোজেক্টগুলো দেখতে চান, নাকি অন্য কিছু নিয়ে কথা বলতে চান?' : 'I am **Sohan.AI**, your advanced neural window into this workspace. My high-level logic and portfolio database are fully synchronized. How shall we begin your exploration?'}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Command Input Area -->
                    <div class="p-6 border-t border-white/5 bg-black/40 backdrop-blur-2xl relative z-10">
                        
                        <!-- Voice Assistant Trigger -->
                        <div class="mb-4 flex items-center justify-between p-3 bg-white/5 border border-cyan-500/20 rounded-xl">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center animate-pulse border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-cyan-400">
                                        <path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>
                                    </svg>
                                </div>
                                <div>
                                    <p class="text-xs font-bold text-white uppercase tracking-widest">${lang === 'bn' ? 'ভয়েস এআই প্রস্তুত' : 'Voice AI Ready'}</p>
                                    <p class="text-[9px] text-theme-muted font-mono leading-tight">Click the bottom-right button to start voice session.</p>
                                </div>
                            </div>
                             <button onclick="window.toggleVapiCall()" class="vapi-trigger-btn px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.4)] active:scale-90 transition-all flex items-center gap-2">
                                <span class="btn-text-idle">${lang === 'bn' ? 'সেশন শুরু' : 'Initiate'}</span>
                                <span class="btn-text-active" style="display:none">${lang === 'bn' ? 'সেশন বন্ধ' : 'Terminate'}</span>
                            </button>
                        </div>

                        <form id="ai-form" class="relative group">
                            <div class="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-10 group-focus-within:opacity-30 transition-opacity duration-500"></div>
                            <input type="text" id="ai-input" placeholder="${lang === 'bn' ? 'কমান্ড এখানে লিখুন...' : 'Enter command protocol...'}" 
                                class="relative w-full bg-theme-bg/80 border border-white/10 rounded-2xl px-6 py-4 pr-14 text-sm text-theme focus:outline-none focus:bg-white/10 transition-all placeholder:text-theme-muted/40 font-mono shadow-2xl">
                            <button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-black rounded-xl transition-all flex items-center justify-center shadow-lg active:scale-90">
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="3" fill="none">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
                                </svg>
                            </button>
                        </form>
                        <div class="mt-4 flex items-center justify-between">
                            <p class="text-[9px] text-theme-muted opacity-30 font-mono uppercase tracking-widest italic flex items-center gap-2">
                                <span class="animate-pulse">●</span> Neural Heuristics Active
                            </p>
                            <div class="flex gap-2">
                                <span class="text-[8px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-theme-muted font-mono opacity-50">VAPI-VOICE</span>
                                <span class="text-[8px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-theme-muted font-mono opacity-50">GPT-4.0</span>
                                <span class="text-[8px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-theme-muted font-mono opacity-50">RUET-CORE</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 'projects',
            title: lang === 'bn' ? 'প্রজেক্ট এক্সপ্লোরার' : 'Project Explorer',
            icon: '🚀',
            width: 900,
            height: 600,
            render: () => {
                const projectsHtml = systemData.projects.map(p => `
                    <div class="group relative bg-theme-card border border-theme-card rounded-xl overflow-hidden hover:bg-white/10 transition-colors cursor-pointer shadow-sm" onclick="window.os.openProjectDetail('${p.id}')">
                        <div class="h-32 bg-theme-card/50 border-b border-theme-card flex items-center justify-center overflow-hidden relative">
                            <div class="absolute inset-0 bg-cyan-500/5 blur-xl group-hover:bg-cyan-500/10 transition-all"></div>
                            <span class="text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500 relative z-10">${p.icon}</span>
                        </div>
                        <div class="p-4">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-[8px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold uppercase tracking-[0.1em]">${t(p.category, lang)}</span>
                            </div>
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="font-bold text-lg text-theme group-hover:text-cyan-500 transition-colors text-glow-hover">${t(p.name, lang)}</h3>
                            </div>
                            <p class="text-[10px] text-theme-muted font-mono mb-3 uppercase tracking-wider">${t(p.tagline, lang)}</p>
                            <div class="flex flex-wrap gap-2">
                                ${p.tech.slice(0, 3).map(tr => `<span class="text-[9px] px-2 py-0.5 rounded-full bg-cyan-500/5 border border-cyan-500/10 text-theme-muted font-medium">${tr}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('');

                return `
                    <div class="p-6">
                        <div class="mb-8 pl-4 border-l-4 border-cyan-500">
                            <h2 class="text-3xl font-bold mb-1 text-theme">${lang === 'bn' ? 'ইঞ্জিনিয়ারিং পোর্টফোলিও' : 'Engineering Portfolio'}</h2>
                            <p class="text-theme-muted text-sm max-w-xl italic">${lang === 'bn' ? 'এমবেডেড সিস্টেম, এআই এবং সফটওয়্যার আর্কিটেকচারে দক্ষতা প্রদর্শনকারী নির্বাচিত কাজসমূহ।' : 'Selected works demonstrating proficiency in Embedded Systems, AI, and Software Architecture.'}</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            ${projectsHtml}
                        </div>
                    </div>
                `;
            }
        },
        {
            id: 'terminal',
            title: 'Terminal ~ zsh',
            icon: '💻',
            width: 700,
            height: 450,
            content: `
                <div class="terminal-content h-full bg-[#0d0d0d] p-4 font-mono text-sm overflow-y-auto">
                    <div class="mb-4 text-theme-muted opacity-60">
                        SohanOS v1.0.0 (kernel 4.19) <br>
                        ${lang === 'bn' ? "কমান্ড দেখতে 'help' টাইপ করুন।" : "Type 'help' to see available commands."}
                    </div>
                    <div class="term-history"></div>
                    <div class="terminal-line flex items-center">
                        <span class="prompt text-cyan-500 font-bold">guest@sohanos:~$</span>
                        <input type="text" class="term-input bg-transparent border-none outline-none text-white flex-1 ml-2 font-mono" autocomplete="off">
                    </div>
                </div>
            `
        },
        {
            id: 'skills',
            title: lang === 'bn' ? 'নিউরাল স্কিল ম্যাপ' : 'Neural Skill Map',
            icon: '🧠',
            width: 800,
            height: 550,
            render: () => {
                const skillsHtml = systemData.skills.map(s => {
                    const projectsUsingSkill = systemData.projects.filter(p =>
                        p.tech.some(t => t.toLowerCase() === s.name.toLowerCase())
                    ).map(p => t(p.name, lang));

                    const projectsText = projectsUsingSkill.length > 0
                        ? (lang === 'bn' ? `ব্যবহৃত প্রজেক্ট: ${projectsUsingSkill.join(', ')} ` : `Used in: ${projectsUsingSkill.join(', ')} `)
                        : (lang === 'bn' ? `কোনো প্রজেক্টে তালিকাভুক্ত নয়` : `Not listed in any projects`);

                    return `
        <div class="relative group">
                            <div class="px-6 py-3 bg-theme-card border border-theme-card rounded-xl backdrop-blur-md group-hover:border-accent/50 transition-all duration-300 shadow-sm">
                                <div class="flex items-center gap-3">
                                    <span class="font-mono text-accent text-[10px] uppercase font-bold tracking-tighter">${s.type}</span>
                                    <span class="font-bold text-theme">${s.name}</span>
                                </div>
                                <div class="w-full h-1 bg-black/5 mt-3 rounded-full overflow-hidden">
                                    <div class="h-full bg-gradient-to-r from-cyan-500 to-purple-500 w-[0%] opacity-80" style="width: ${s.level}%"></div>
                                </div>
                            </div>
                            <!--Skill Tooltip-->
        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-2 bg-theme-card border border-theme-card rounded-lg backdrop-blur-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-50 shadow-xl text-[10px] text-center">
            <div class="text-accent font-bold mb-1 underline decoration-accent/30 underline-offset-2 uppercase tracking-tighter">
                ${lang === 'bn' ? 'প্রজেক্ট অ্যাসোসিয়েশন' : 'Project Association'}
            </div>
            <div class="text-theme-muted leading-tight">${projectsText}</div>
            <div class="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-theme-card"></div>
        </div>
                        </div>
        `;
                }).join('');

                return `
        <div class="h-full flex flex-col p-6">
                        <h2 class="text-2xl font-bold mb-6 text-center">${lang === 'bn' ? 'কম্পিটেন্সি ম্যাট্রিক্স' : 'Competency Matrix'}</h2>
                        <div class="flex-1 flex flex-wrap content-center justify-center gap-4">
                            ${skillsHtml}
                        </div>
                    </div>
        `;
            }
        },
        {
            id: 'about',
            title: lang === 'bn' ? 'আমার সম্পর্কে' : 'About Myself',
            icon: '👨‍💻',
            width: 700,
            height: 550,
            render: () => {
                return `
        <div class="flex-1 flex flex-col md:flex-row bg-transparent text-theme overflow-hidden">
                        <!--Sidebar / Image Area-->
                        <div class="w-full md:w-1/3 bg-theme-card p-6 flex flex-col items-center border-r border-theme-card relative overflow-hidden shrink-0">
                            <div class="absolute inset-0 bg-cyan-500/5 blur-[50px]"></div>
                            <div class="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 relative z-10 shadow-lg shadow-cyan-500/10">
                                <div class="w-full h-full rounded-full bg-theme-card flex items-center justify-center overflow-hidden border border-white/10">
                                    <img src="profile.jpeg" alt="Sohan" class="w-full h-full object-cover" onerror="this.src='https://ui-avatars.com/api/?name=Sohan+Fardin&background=22d3ee&color=fff&size=200'">
                                </div>
                            </div>
                            <h2 class="mt-4 text-xl font-bold text-center z-10 text-theme">${t(systemData.identity.name, lang)}</h2>
                            <p class="text-[10px] text-accent font-mono text-center z-10 uppercase tracking-widest font-bold">${t(systemData.identity.role, lang)}</p>
                            
                            <div class="mt-8 w-full space-y-2 z-10">
                                <div class="bg-black/5 border border-black/5 p-2 px-3 rounded-lg text-[11px] flex justify-between">
                                    <span class="text-theme-muted font-medium">${lang === 'bn' ? 'বিশ্ববিদ্যালয়' : 'University'}</span>
                                    <span class="text-theme font-bold">${t(systemData.identity.university, lang)}</span>
                                </div>
                                <div class="bg-black/5 border border-black/5 p-2 px-3 rounded-lg text-[11px] flex justify-between">
                                    <span class="text-theme-muted font-medium">${lang === 'bn' ? 'আইডি' : 'ID'}</span>
                                    <span class="font-mono text-theme font-bold">${t(systemData.identity.roll, lang)}</span>
                                </div>
                            </div>
                        </div>

                        <!--Content Area-->
        <div class="w-full md:w-2/3 p-8 overflow-y-auto bg-white/5">
            <h3 class="text-2xl font-bold mb-4 flex items-center gap-2 text-theme">
                <span class="text-accent underline decoration-2 underline-offset-4">#</span> ${lang === 'bn' ? 'জীবনী' : 'Biography'}
            </h3>
            <div class="text-theme-muted leading-relaxed text-sm mb-8 border-l-2 border-accent/30 pl-4 py-1 space-y-3">
                ${t(systemData.identity.bio, lang).split('\n').filter(p => p.trim()).map(p => `<p>${p}</p>`).join('')}
            </div>

            <h3 class="text-xl font-bold mb-3 flex items-center gap-2 text-theme">
                <span class="text-accent underline decoration-2 underline-offset-4">#</span> ${lang === 'bn' ? 'আগ্রহ' : 'Interests'}
            </h3>
            <div class="flex flex-wrap gap-2 mb-8">
                ${t(systemData.identity.interests, lang).map(i => `
                                    <span class="px-3 py-1 bg-theme-card border border-theme-card rounded-lg text-xs text-theme-muted hover:text-accent hover:border-accent/30 transition-all cursor-default shadow-sm font-medium">
                                        ${i}
                                    </span>
                                `).join('')}
            </div>

            <h3 class="text-xl font-bold mb-3 flex items-center gap-2 text-theme">
                <span class="text-accent underline decoration-2 underline-offset-4">#</span> ${lang === 'bn' ? 'দর্শন' : 'Philosophy'}
            </h3>
            <div class="bg-theme-card border border-theme-card rounded-xl p-6 relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                    <span class="text-4xl text-accent">"</span>
                </div>
                <p class="text-lg italic text-theme font-medium relative z-10 leading-relaxed">
                    ${t(systemData.identity.mindset, lang)}
                </p>
            </div>
        </div>
                    </div>
        `;
            }
        },
        {
            id: 'education',
            title: lang === 'bn' ? 'শিক্ষা' : 'Education',
            icon: '🎓',
            width: 750,
            height: 580,
            render: () => {
                return `
        <div class="flex flex-col bg-theme-bg relative min-h-full">
                        <!--Header -->
                        <div class="p-8 border-b border-white/5 bg-white/5 backdrop-blur-xl shrink-0">
                            <h2 class="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                                <span class="w-2 h-8 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full"></span>
                                ${lang === 'bn' ? 'শিক্ষাগত যোগ্যতা' : 'Academic Foundation'}
                            </h2>
                            <p class="text-xs text-theme-muted font-mono uppercase tracking-[0.2em] mt-2 opacity-60">
                                ${lang === 'bn' ? 'আমার শিক্ষার ইতিহাস এবং একাডেমিক অর্জন' : 'Education history and academic credentials'}
                            </p>
                        </div>
                        
                        <!--Content -->
        <div class="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin">
            <div class="max-w-3xl mx-auto space-y-10">
                ${systemData.identity.education.map((edu, idx) => `
                                    <div class="relative pl-8 border-l-2 border-white/5 hover:border-blue-500/30 transition-colors group">
                                        <!-- Timeline Bullet -->
                                        <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-theme-bg border-2 border-white/10 group-hover:border-blue-500 transition-all duration-500 group-hover:scale-125 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                        
                                        <div class="space-y-4">
                                            <div class="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                                <div>
                                                    <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">${t(edu.institution, lang)}</h3>
                                                    <p class="text-sm text-blue-500 font-medium">${t(edu.location, lang)}</p>
                                                </div>
                                                <div class="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-theme-muted whitespace-nowrap self-start md:self-center">
                                                    ${t(edu.duration, lang)}
                                                </div>
                                            </div>

                                            <div class="bg-white/5 border border-white/5 rounded-2xl p-6 group-hover:bg-white/10 transition-all duration-500">
                                                <p class="text-lg font-bold text-gray-200 mb-2">${t(edu.degree, lang)}</p>
                                                <p class="text-sm text-theme-muted leading-relaxed italic">
                                                    ${t(edu.details, lang)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
            </div>
        </div>
                    </div>
        `;
            }
        },
        {
            id: 'resume',
            title: lang === 'bn' ? 'জীবনবৃত্তান্ত' : 'Resume.pdf',
            icon: '📄',
            width: 800,
            height: 900,
            render: () => {
                const isMobile = window.innerWidth <= 768;
                return `
        <div class="h-full flex flex-col bg-theme-card text-theme overflow-hidden">
                        <div class="flex-1 w-full bg-black/20 relative group">
                            ${isMobile ? `
                                <div class="flex flex-col items-center justify-center h-full p-8 text-center space-y-6">
                                    <div class="text-6xl animate-bounce">📄</div>
                                    <div>
                                        <h3 class="text-xl font-bold mb-2">Resume Preview</h3>
                                        <p class="text-sm text-theme-muted mb-6">Interactive preview is disabled on small screens for better performance.</p>
                                    </div>
                                    <div class="flex flex-col gap-3 w-full max-w-[200px]">
                                        <a href="resume.pdf" target="_blank" class="px-6 py-3 bg-cyan-600 text-white rounded-xl font-bold shadow-lg text-center">Open Full PDF</a>
                                        <a href="resume.pdf" download class="px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-bold text-center">Download</a>
                                    </div>
                                </div>
                            ` : `
                                <iframe src="resume.pdf" class="w-full h-full border-none shadow-inner"></iframe>
                                <div class="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                                     <a href="resume.pdf" download="Sohan_Fardin_Resume.pdf" class="px-8 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-500 transition-all font-bold shadow-2xl active:scale-95 flex items-center gap-2">
                                        <span>Download PDF</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                     </a>
                                </div>
                            `}
                        </div>
                        <div class="p-4 bg-theme-card border-t border-theme-card flex items-center justify-between text-[10px] text-theme-muted font-mono uppercase tracking-widest bg-black/40">
                            <span>Digital Document v2.1</span>
                            <a href="resume.pdf" target="_blank" class="hover:text-accent underline">Source Link</a>
                        </div>
                    </div>
        `;
            }
        },
        {
            id: 'achievements',
            title: lang === 'bn' ? 'কৃতিত্ব এবং স্বীকৃতি' : 'Achievements',
            icon: '🏆',
            width: 800,
            height: 600,
            render: () => {
                return `
        <div class="p-6 md:p-10 space-y-8">
                        <div>
                            <h2 class="text-3xl font-bold text-theme mb-2">${lang === 'bn' ? 'কৃতিত্ব এবং স্বীকৃতি' : 'Achievements & Recognitions'}</h2>
                            <div class="h-1 w-20 bg-cyan-500 rounded-full"></div>
                        </div>
                        
                        <div class="grid gap-6">
                            ${systemData.achievements.map((a, i) => `
                                <div class="relative bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group overflow-hidden">
                                    <div class="absolute top-0 right-0 p-8 text-6xl opacity-10 group-hover:scale-110 transition-transform duration-500">${a.icon}</div>
                                    <div class="relative z-10">
                                        <div class="flex items-center gap-3 mb-2">
                                            <span class="text-2xl">${a.icon}</span>
                                            <h3 class="text-xl font-bold text-cyan-400">${t(a.title, lang)}</h3>
                                        </div>
                                        <p class="inline-block px-3 py-1 bg-cyan-500/10 text-accent text-xs font-bold rounded-full mb-4 border border-cyan-500/30">
                                            ${t(a.award, lang)}
                                        </p>
                                        <ul class="space-y-2 mb-6">
                                            ${a.details.map(d => `
                                                <li class="flex items-start gap-2 text-sm text-theme-muted group-hover:text-theme transition-colors">
                                                    <span class="text-cyan-500 mt-1">•</span>
                                                    <span>${t(d, lang)}</span>
                                                </li>
                                            `).join('')}
                                        </ul>

                                        ${a.images && a.images.length > 0 ? `
                                            <div class="flex flex-wrap gap-4 mt-4">
                                                ${a.images.map(img => `
                                                    <div class="relative group/img overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-black/20 backdrop-blur-sm cursor-zoom-in transition-all hover:border-cyan-500/50">
                                                        <img src="${img}" 
                                                             alt="Achievement" 
                                                             class="h-32 w-auto object-cover transition-transform duration-700 group-hover/img:scale-110"
                                                             onclick="window.open('${img}', '_blank')">
                                                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-2">
                                                            <span class="text-[9px] font-bold text-white uppercase tracking-widest">${img.includes('certi') ? 'Certificate' : img.includes('medal') ? 'Medal' : 'Recognition'}</span>
                                                        </div>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
        `;
            }
        },
        {
            id: 'hobby',
            title: lang === 'bn' ? 'শখ' : 'Hobbies',
            icon: '🎨',
            width: 950,
            height: 700,
            render: () => {
                // Book list data remains same
                const books = [
                    { title: "Atomic Habits", author: "James Clear", description: "An easy and proven way to build good habits and break bad ones.", color: "from-yellow-600 to-red-600" },
                    { title: "The Psychology of Money", author: "Morgan Housel", description: "Timeless lessons on wealth, greed, and happiness.", color: "from-green-600 to-teal-600" },
                    { title: "Deep Work", author: "Cal Newport", description: "Rules for focused success in a distracted world.", color: "from-blue-600 to-indigo-600" },
                    { title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", description: "What the rich teach their kids about money.", color: "from-purple-600 to-pink-600" },
                    { title: "Think and Grow Rich", author: "Napoleon Hill", description: "The landmark bestseller.", color: "from-amber-600 to-orange-600" },
                    { title: "How to Win Friends", author: "Dale Carnegie", description: "The only book you need to lead you to success.", color: "from-red-600 to-rose-600" },
                    { title: "7 Habits", author: "Stephen R. Covey", description: "Powerful lessons in personal change.", color: "from-cyan-600 to-sky-600" },
                    { title: "Power of Now", author: "Eckhart Tolle", description: "A guide to spiritual enlightenment.", color: "from-teal-600 to-emerald-600" },
                    { title: "Mindset", author: "Carol S. Dweck", description: "The new psychology of success.", color: "from-indigo-600 to-violet-600" },
                    { title: "Subtle Art", author: "Mark Manson", description: "A counterintuitive approach to living a good life.", color: "from-orange-600 to-red-600" }
                ];

                const images = [];
                for (let i = 1; i <= 23; i++) {
                    const ext = i <= 10 ? 'jpg' : 'jpeg';
                    images.push(`${i}.${ext}`);
                }

                const photosHtml = images.map(img => `
        <div class="group relative break-inside-avoid mb-4 overflow-hidden rounded-xl border border-white/5 bg-black/20 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-zoom-in"
    onclick="window.open('${img}', '_blank')">
        <img src="${img}" loading="lazy" class="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100" alt="Sohan Photography">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div class="text-white">
                    <p class="text-[10px] uppercase tracking-widest font-bold text-cyan-400 mb-1">Photography</p>
                    <p class="text-xs font-mono opacity-80">IMG_${img}</p>
                </div>
            </div>
        </div>
    `).join('');

                const booksHtml = books.map(book => `
        <div class="group relative flex flex-col bg-theme-card border border-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-cyan-500/30">
                        <!--Book Cover / Header Area-->
                        <div class="relative h-32 bg-gradient-to-br ${book.color || 'from-gray-800 to-black'} p-4 flex items-end">
                            <div class="absolute inset-0 bg-black/10"></div>
                            <div class="relative z-10 w-full flex items-end gap-3">
                                <div class="w-16 h-24 -mb-8 rounded bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform origin-bottom-left">
                                    📖
                                </div>
                                <div class="flex-1 pb-1">
                                    <h3 class="font-bold text-white text-base leading-tight drop-shadow-md line-clamp-1">${book.title}</h3>
                                    <p class="text-[10px] text-white/80 font-mono uppercase tracking-wider">${book.author}</p>
                                </div>
                            </div>
                        </div>

                        <!--Content Body-->
        <div class="flex-1 p-4 pt-10 flex flex-col gap-3">
            <div class="flex items-center gap-2 mb-1">
                <span class="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold uppercase tracking-wide">Self-Improvement</span>
                <span class="text-[9px] px-1.5 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 font-bold uppercase tracking-wide">Read</span>
            </div>

            <p class="text-xs text-theme-muted leading-relaxed line-clamp-3">
                ${book.description}
            </p>

            <!-- Bottom Progress / Action -->
            <div class="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-xs text-theme-muted">
                <div class="flex items-center gap-1.5">
                    <div class="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div class="bg-cyan-500 w-full h-full"></div>
                    </div>
                    <span class="text-[9px] font-mono opacity-60">100%</span>
                </div>
                <button class="hover:text-cyan-400 transition-colors" title="View Details">↗</button>
            </div>
        </div>
                    </div>
        `).join('');

                return `
        <div class="flex-1 flex flex-col bg-transparent text-theme overflow-hidden h-full relative">
                        <!--Modern Header with Pill Tabs-->
                        <div id="hobby-header" class="p-6 pb-4 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between bg-white/5 backdrop-blur-xl sticky top-0 z-30 gap-4">
                            <div>
                                <h2 class="text-2xl font-bold text-white tracking-tight">${lang === 'bn' ? 'শখ এবং অবসর' : 'Hobbies & Leisure'}</h2>
                                <p class="text-xs text-theme-muted font-mono uppercase tracking-widest mt-1 opacity-70">
                                    ${lang === 'bn' ? 'ব্যক্তিগত জগৎ' : 'Personal Space'}
                                </p>
                            </div>
                            
                            <div class="flex gap-1 bg-black/40 p-1.5 rounded-xl self-start md:self-auto border border-white/5">
                                <button onclick="window.os.switchHobbyTab(this, 'photo')" class="hobby-tab-btn active px-4 py-2 rounded-lg text-xs font-bold transition-all bg-theme-bg text-cyan-400 shadow-sm">
                                    <span class="mr-2">📸</span> ${lang === 'bn' ? 'ফটোগ্রাফি' : 'Photography'}
                                </button>
                                <button onclick="window.os.switchHobbyTab(this, 'reading')" class="hobby-tab-btn px-4 py-2 rounded-lg text-xs font-bold transition-all text-theme-muted hover:text-white hover:bg-white/5">
                                    <span class="mr-2">📚</span> ${lang === 'bn' ? 'বই পড়া' : 'Reading'}
                                </button>
                            </div>
                        </div>

                        <!--Content Area-->
        <div id="hobby-container" class="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin bg-black/20">

            <!-- Photography Section (Masonry-ish) -->
            <div id="hobby-content-photo" class="animate-fade-in block">
                <div class="mb-6 px-2">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-bold text-theme flex items-center gap-2">
                            <span class="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
                            ${lang === 'bn' ? 'গ্যালারি' : 'Gallery Collection'}
                        </h3>
                        <span class="text-xs text-theme-muted font-mono bg-white/5 px-2 py-1 rounded border border-white/10 text-[9px]">${images.length} SHOTS</span>
                    </div>
                    <p class="text-xs md:text-sm text-theme-muted border-l-2 border-white/10 pl-3 md:pl-4 italic">
                        ${lang === 'bn' ? 'আমার তোলা কিছু প্রিয় মুহূর্ত।' : 'Some of my favorite photos that I clicked.'}
                    </p>
                </div>
                <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    ${photosHtml}
                </div>
            </div>

            <!-- Reading Section -->
            <div id="hobby-content-reading" class="hidden animate-fade-in">
                <div class="mb-6 px-2">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-bold text-theme flex items-center gap-2">
                            <span class="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                            ${lang === 'bn' ? 'ডিজিটাল বুকশেলফ' : 'Digital Bookshelf'}
                        </h3>
                        <span class="text-xs text-theme-muted font-mono bg-white/5 px-2 py-1 rounded border border-white/10 text-[9px]">${books.length} BOOKS</span>
                    </div>
                    <p class="text-xs md:text-sm text-theme-muted border-l-2 border-white/10 pl-3 md:pl-4 italic">
                        ${lang === 'bn' ? 'এখানে আমার ১০টি প্রিয় বই রয়েছে যা আমাকে অনেক সাহায্য করেছে।' : 'Here is my most favorite 10 books which help me a lot.'}
                    </p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                    ${booksHtml}
                </div>
            </div>

        </div>
                    </div>
        `;
            }
        },
        {
            id: 'contact',
            title: lang === 'bn' ? 'যোগাযোগ' : 'Contact',
            icon: '✉️',
            width: 800,
            height: 650,
            render: () => {
                return `
        <div class="h-full flex flex-col md:flex-row bg-transparent overflow-y-auto md:overflow-hidden">
                        <!--Left: Info & Socials-->
                        <div class="w-full md:w-2/5 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10 bg-white/5 flex flex-col justify-between shrink-0 md:h-full md:overflow-y-auto">
                            <div>
                                <h2 class="text-2xl md:text-3xl font-bold text-theme mb-2 md:mb-4">${lang === 'bn' ? 'আমার সাথে যোগাযোগ করুন' : 'Get in Touch'}</h2>
                                <p class="text-theme-muted text-xs md:text-sm mb-6 md:mb-8 leading-relaxed">
                                    ${lang === 'bn' ? 'নতুন আইডিয়া বা কোলাবোরেশন নিয়ে কথা বলতে চান? আমাকে বার্তা পাঠান!' : 'Have a project in mind or just want to say hi? I\'d love to hear from you.'}
                                </p>
                                
                                <div class="grid grid-cols-1 gap-3 md:space-y-4 md:block">
                                    <!-- Static Email Display -->
                                    <div class="p-3 md:p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-2 shadow-lg">
                                        <div class="flex items-center gap-2 opacity-60">
                                            <span class="text-xs">📧</span>
                                            <span class="text-[9px] md:text-[10px] text-theme-muted uppercase tracking-widest font-mono">Official Email</span>
                                        </div>
                                        <div class="text-[11px] md:text-sm text-theme select-text font-mono break-all bg-black/30 p-2 md:p-3 rounded-xl border border-white/5 shadow-inner">
                                            sohanfardin546@gmail.com
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-2 gap-3 md:block md:space-y-4">
                                        <a href="https://www.linkedin.com/in/sohan041" target="_blank" class="flex items-center gap-3 md:gap-4 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/30 transition-all group">
                                            <div class="w-8 h-8 md:w-10 md:h-10 bg-white/5 rounded-lg flex items-center justify-center text-lg md:text-xl group-hover:scale-110 transition-transform">💼</div>
                                            <div class="min-w-0">
                                                <div class="text-[9px] md:text-[10px] text-theme-muted uppercase tracking-widest font-mono">LinkedIn</div>
                                                <div class="text-xs md:text-sm text-theme truncate">/in/sohan041</div>
                                            </div>
                                        </a>
                                        <a href="https://github.com/sohancreation" target="_blank" class="flex items-center gap-3 md:gap-4 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 group">
                                            <div class="w-8 h-8 md:w-10 md:h-10 bg-white/5 rounded-lg flex items-center justify-center text-lg md:text-xl group-hover:scale-110 transition-transform">🐙</div>
                                            <div class="min-w-0">
                                                <div class="text-[9px] md:text-[10px] text-theme-muted uppercase tracking-widest font-mono">GitHub</div>
                                                <div class="text-xs md:text-sm text-theme truncate">/sohanfardin</div>
                                            </div>
                                        </a>
                                    </div>
                                    <a href="https://web.facebook.com/sohanwho" target="_blank" class="flex items-center gap-3 md:gap-4 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-blue-600/10 hover:border-blue-600/30 transition-all group">
                                        <div class="w-8 h-8 md:w-10 md:h-10 bg-white/5 rounded-lg flex items-center justify-center text-lg md:text-xl group-hover:scale-110 transition-transform">👤</div>
                                        <div class="min-w-0">
                                            <div class="text-[9px] md:text-[10px] text-theme-muted uppercase tracking-widest font-mono">Facebook</div>
                                            <div class="text-xs md:text-sm text-theme truncate">Sohan Fardin</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            
                            <div class="hidden md:block text-[10px] text-theme-muted font-mono mt-8">
                                Located in Bangladesh | UTC+6
                            </div>
                        </div>

                        <!--Right: Message Form & Chatbox-->
        <div class="w-full md:w-3/5 p-4 md:p-8 flex flex-col gap-4 md:gap-6 shrink-0 md:h-full md:overflow-hidden">
            <div class="flex-1 flex flex-col min-h-[300px] md:min-h-0 md:overflow-hidden">
                <h3 class="text-base md:text-lg font-bold text-theme mb-3 md:mb-4 flex items-center gap-2">
                    <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    ${lang === 'bn' ? 'সরাসরি বার্তা' : 'Direct Message'}
                </h3>

                <div class="flex-1 bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col shadow-inner md:overflow-hidden">
                    <div class="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 scrollbar-thin max-h-[200px] md:max-h-full" id="contact-chat">
                        <div class="bg-cyan-500/10 border border-cyan-500/20 p-3 rounded-2xl rounded-tl-none text-xs text-theme-muted max-w-[90%] md:max-w-[85%] leading-relaxed">
                            ${lang === 'bn' ? 'হ্যালো! আমি সোহান। আমাকে সরাসরি এখানে মেসেজ পাঠাতে পারেন।' : 'Hi! I\'m Sohan. You can send me a quick message right here.'}
                        </div>
                    </div>

                    <div class="space-y-3 bg-black/20 p-1 rounded-xl shrink-0">
                        <input type="email" id="contact-email" placeholder="${lang === 'bn' ? 'আপনার ইমেইল...' : 'Your Email...'}"
                            class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-theme focus:border-cyan-500 outline-none transition-all placeholder:text-white/20">
                            <div class="flex gap-2">
                                <textarea id="contact-message" placeholder="${lang === 'bn' ? 'আপনার বার্তা...' : 'Your message...'}"
                                    class="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-theme focus:border-cyan-500 outline-none transition-all resize-none h-14 md:h-12 placeholder:text-white/20"></textarea>
                                <button onclick="window.os.sendContactMessage()" class="bg-cyan-500 active:bg-cyan-600 hover:bg-cyan-400 text-black px-4 py-2 rounded-xl transition-all flex items-center justify-center min-w-[50px] shadow-lg shadow-cyan-500/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
                    </div>
        `;
            }
        },
        {
            id: 'certifications',
            title: lang === 'bn' ? 'সার্টিফিকেশন' : 'Certifications',
            icon: '📜',
            width: 800,
            height: 600,
            render: () => {
                return `
        <div class="h-full bg-transparent overflow-hidden flex flex-col">
                        <div class="p-8 border-b border-white/5 bg-white/5">
                            <h2 class="text-3xl font-bold text-theme flex items-center gap-3">
                                <span class="text-accent underline decoration-2 underline-offset-4">📜</span>
                                ${lang === 'bn' ? 'সার্টিফিকেশন এবং কোর্স' : 'Certifications & Courses'}
                            </h2>
                            <p class="text-theme-muted text-sm mt-2 font-medium">
                                ${lang === 'bn' ? 'আমার পেশাগত দক্ষতা বৃদ্ধির লক্ষ্যে সম্পন্ন করা বিভিন্ন কোর্সসমূহ।' : 'Academic and professional certifications completed to sharpen engineering skills.'}
                            </p>
                        </div>
                        
                        <div class="flex-1 overflow-y-auto p-8">
                            <div class="grid gap-8">
                                ${systemData.certifications.map(c => `
                                    <div class="group relative bg-theme-card border border-theme-card rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300 shadow-xl">
                                        <div class="flex flex-col lg:flex-row">
                                            <!-- Image/Certificate Preview -->
                                            <div class="w-full lg:w-2/5 aspect-[4/3] lg:aspect-auto bg-black/20 relative overflow-hidden group-hover:bg-black/0 transition-colors">
                                                <img src="${c.image}" alt="${t(c.title, lang)}" 
                                                    class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105 cursor-zoom-in"
                                                    onclick="window.open('${c.image}', '_blank')">
                                                <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                                     <div class="text-[10px] text-white/70 font-mono uppercase tracking-widest flex items-center gap-2">
                                                        <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span> verified credential
                                                     </div>
                                                </div>
                                            </div>
                                            
                                            <!-- Info -->
                                            <div class="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                                                <div class="mb-4">
                                                    <h3 class="text-xl font-bold text-theme group-hover:text-accent transition-colors leading-tight mb-1">
                                                        ${t(c.title, lang)}
                                                    </h3>
                                                    <p class="text-accent font-medium text-sm">
                                                        ${t(c.institution, lang)}
                                                    </p>
                                                </div>
                                                
                                                <div class="space-y-4 mb-6">
                                                    <div>
                                                        <span class="text-[10px] text-theme-muted uppercase tracking-widest font-mono block mb-1">Topics Covered</span>
                                                        <p class="text-xs text-theme-muted bg-white/5 border border-white/10 rounded-lg p-3 italic">
                                                            ${t(c.covered, lang)}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span class="text-[10px] text-theme-muted uppercase tracking-widest font-mono block mb-1">Impact</span>
                                                        <p class="text-sm text-theme leading-relaxed">
                                                            ${t(c.description, lang)}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div class="flex items-center gap-4">
                                                    <button onclick="window.open('${c.image}', '_blank')" 
                                                        class="flex-1 py-2 bg-accent/10 border border-accent/20 rounded-xl text-accent text-xs font-bold hover:bg-accent/20 hover:border-accent/40 transition-all active:scale-95">
                                                        View Certificate
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
        `;
            }
        },
        {
            id: 'experience',
            title: lang === 'bn' ? 'অভিজ্ঞতা' : 'Experience',
            icon: '💼',
            width: 900,
            height: 700,
            render: () => {
                return `
        <div class="flex flex-col bg-theme-bg relative min-h-full">
                        <!--Header -->
                        <div class="p-8 border-b border-white/5 bg-white/5 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 class="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                                    <span class="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></span>
                                    ${lang === 'bn' ? 'পেশাগত যাত্রা' : 'Professional Journey'}
                                </h2>
                                <p class="text-xs text-theme-muted font-mono uppercase tracking-[0.2em] mt-2 opacity-60">
                                    ${lang === 'bn' ? 'উদ্ভাবন এবং নেতৃত্বের ইতিহাস' : 'A timeline of innovation & leadership'}
                                </p>
                            </div>
                            <div class="flex items-center gap-3 px-4 py-2 bg-black/30 rounded-2xl border border-white/5 shadow-inner">
                                <div class="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                <span class="text-[10px] font-bold text-white/80 uppercase tracking-widest">${lang === 'bn' ? 'সক্রিয়ভাবে শিখছি' : 'Active Growth'}</span>
                            </div>
                        </div>
                        
                        <!--Timeline Content-->
        <div class="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin scrollbar-thumb-white/10" id="experience-container">
            <div class="relative max-w-4xl mx-auto">
                <!-- Modern Vertical Line -->
                <div class="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent opacity-20"></div>

                <div class="space-y-16 relative">
                    ${systemData.experience.map((exp, idx) => {
                    const isEven = idx % 2 === 0;
                    return `
                                            <div class="relative flex flex-col md:items-center group">
                                                <!-- Center Node -->
                                                <div class="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-theme-bg border border-white/10 flex items-center justify-center z-10 group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-500 shadow-2xl">
                                                    <span class="text-xl filter group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">${exp.icon}</span>
                                                </div>

                                                <!-- Card Container -->
                                                <div class="flex flex-col md:flex-row w-full items-start md:items-center">
                                                    <div class="hidden md:block w-1/2 ${isEven ? 'pr-12 text-right' : ''}">
                                                        ${isEven ? `
                                                            <div class="inline-block px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                                                                ${exp.duration[lang === 'bn' ? 'bn' : 'en']}
                                                            </div>
                                                        ` : ''}
                                                    </div>
                                                    
                                                    <div class="w-full md:w-1/2 pl-16 md:pl-12 ${isEven ? '' : ''}">
                                                        <div class="relative bg-white/5 border border-white/10 p-6 rounded-3xl group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500 shadow-xl overflow-hidden backdrop-blur-xl">
                                                            <!-- Subtle Corner Glow -->
                                                            <div class="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/5 blur-[40px] rounded-full group-hover:bg-cyan-500/10 transition-all"></div>
                                                            
                                                            <div class="relative z-10">
                                                                <div class="md:hidden inline-block px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 text-[9px] font-mono font-bold uppercase tracking-widest mb-3">
                                                                    ${exp.duration[lang === 'bn' ? 'bn' : 'en']}
                                                                </div>
                                                                
                                                                ${!isEven ? `
                                                                    <div class="hidden md:inline-block px-3 py-1 rounded-full bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
                                                                        ${exp.duration[lang === 'bn' ? 'bn' : 'en']}
                                                                    </div>
                                                                ` : ''}

                                                                <h3 class="text-xl md:text-2xl font-black text-white leading-tight mb-2 group-hover:text-cyan-400 transition-colors">${t(exp.role, lang)}</h3>
                                                                
                                                                <div class="flex flex-wrap gap-2 mb-6">
                                                                    ${(exp.tech || ['Engineering', 'Strategy']).map(t => `
                                                                        <span class="text-[9px] px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-theme-muted font-bold uppercase tracking-tighter">${t}</span>
                                                                    `).join('')}
                                                                </div>

                                                                <ul class="space-y-3">
                                                                    ${exp.description.map(item => `
                                                                        <li class="flex items-start gap-4 text-sm text-theme-muted/80 group-hover:text-theme transition-colors">
                                                                            <span class="w-1.5 h-1.5 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full mt-2 shrink-0"></span>
                                                                            <span class="leading-relaxed">${t(item, lang)}</span>
                                                                        </li>
                                                                    `).join('')}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        `;
                }).join('')}
                </div>
            </div>

            <div class="mt-20 text-center">
                <span class="px-6 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-mono text-theme-muted uppercase tracking-[0.4em] opacity-40">Journey Continues...</span>
            </div>
        </div>
                    </div>
        `;
            }
        },
        {
            id: 'explorer',
            title: lang === 'bn' ? 'ফাইল এক্সপ্লোরার' : 'Finder',
            icon: '📁',
            width: 850,
            height: 550,
            render: () => {
                const files = [
                    { name: 'resume.pdf', icon: '📄', label: lang === 'bn' ? 'জীবনবৃত্তান্ত' : 'My Resume', size: '2.4 MB', type: 'doc', date: 'Jan 15, 2025' },
                    { name: 'edudial.pdf', icon: '📕', label: lang === 'bn' ? 'এডুডায়াল ডেসক্রিপশন' : 'EduDial Description', size: '3.1 MB', type: 'doc', date: 'Feb 10, 2025' },
                    { name: 'project description.pdf', icon: '📗', label: lang === 'bn' ? 'রোবটিক্স ডেসক্রিপশন' : 'Robotics Description', size: '4.8 MB', type: 'doc', date: 'Dec 22, 2024' },
                    { name: 'krishios.pdf', icon: '🌾', label: lang === 'bn' ? 'কৃষি ওএস ডেসক্রিপশন' : 'KrishiOS Description', size: '1.8 MB', type: 'doc', date: 'Feb 15, 2025' },
                    { name: 'neurodristi.pdf', icon: '👁️', label: lang === 'bn' ? 'নিউরোদৃষ্টি ডেসক্রিপশন' : 'NeuroDristi Description', size: '1.6 MB', type: 'doc', date: 'Feb 10, 2025' },
                    { name: 'certi1.jpeg', icon: '🖼️', label: lang === 'bn' ? 'এনএইচএসপিসি সার্টিফিকেট' : 'NHSPC Cert', size: '1.2 MB', type: 'img', date: 'Mar 05, 2023' },
                    { name: 'medal1.jpeg', icon: '🏅', label: lang === 'bn' ? 'প্রগ্রামিং মেডেল' : 'NHSPC Medal', size: '0.8 MB', type: 'img', date: 'Mar 05, 2023' },
                    { name: 'certi2.jpeg', icon: '🖼️', label: lang === 'bn' ? 'গণিত অলিম্পিয়াড সার্টিফিকেট' : 'Math Olympiad', size: '1.1 MB', type: 'img', date: 'Apr 12, 2022' },
                    { name: 'medal2.jpeg', icon: '🎖️', label: lang === 'bn' ? 'গণিত অলিম্পিয়াড মেডেল' : 'Math Medal', size: '0.7 MB', type: 'img', date: 'Apr 12, 2022' },
                    { name: 'bdapps.jpeg', icon: '🚀', label: lang === 'bn' ? 'বিডিঅ্যাপস সার্টিফিকেট' : 'bdapps Cert', size: '1.5 MB', type: 'rec', date: 'Jan 20, 2025' },
                    { name: 'harvard.png', icon: '📜', label: lang === 'bn' ? 'হার্ভার্ড সিএস৫০ সার্টিফিকেট' : 'Harvard CS50', size: '0.2 MB', type: 'rec', date: 'Sep 10, 2024' }
                ];

                const sidebarItems = [
                    { id: 'fav', label: lang === 'bn' ? 'প্রিয়' : 'Favorites', icon: '⭐️', active: true, cat: 'all' },
                    { id: 'doc', label: lang === 'bn' ? 'ডকুমেন্টস' : 'Documents', icon: '📂', cat: 'doc' },
                    { id: 'img', label: lang === 'bn' ? 'ছবি' : 'Photos', icon: '🌅', cat: 'img' },
                    { id: 'rec', label: lang === 'bn' ? 'সাম্প্রতিক' : 'Recents', icon: '🕒', cat: 'rec' }
                ];

                const filesHtml = files.map(f => `
        <div class="finder-item group flex flex-col items-center p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer relative"
    data-type="${f.type}"
    onclick="window.open('${f.name}', '_blank')">
                        <div class="finder-icon-container relative mb-3 flex justify-center">
                            <div class="finder-icon text-5xl filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-300">${f.icon}</div>
                            <!-- Mini type badge -->
                            <div class="absolute -bottom-1 -right-1 bg-white/10 backdrop-blur-md rounded-md px-1 py-0.5 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span class="text-[7px] font-bold text-white uppercase">${f.name.split('.').pop()}</span>
                            </div>
                        </div>
                        <div class="finder-name text-[11px] font-bold text-theme text-center leading-tight mb-0.5 truncate w-full px-1">${f.label}</div>
                        <div class="finder-size text-[8px] text-theme-muted uppercase tracking-tighter font-mono opacity-40">${f.size}</div>
                        <!--List view details(hidden in grid)-->
        <div class="list-view-only hidden flex-1 items-center justify-end gap-6 text-[10px] text-theme-muted font-mono pr-4">
            <span class="w-12 text-center bg-white/5 rounded px-2 py-0.5 border border-white/10 text-[9px] font-bold">${f.type.toUpperCase()}</span>
            <span class="w-24 text-right">${f.date}</span>
        </div>
                    </div>
        `).join('');

                return `
        <div class="h-full flex bg-theme-bg overflow-hidden text-theme finder-app-container">
                        <!--Finder Sidebar-->
                        <div class="w-44 bg-black/40 border-r border-white/5 flex flex-col shrink-0">
                            <div class="p-5 flex items-center gap-2 mb-2">
                                <div class="flex gap-1.5">
                                    <div class="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                    <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                    <div class="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                </div>
                            </div>
                            
                            <div class="flex-1 px-3 space-y-6">
                                <div class="finder-sidebar-section">
                                    <h3 class="px-3 text-[9px] font-bold text-theme-muted uppercase tracking-widest mb-3 opacity-50">${lang === 'bn' ? 'অ্যাপস' : 'Favorites'}</h3>
                                    <div class="space-y-0.5">
                                        ${sidebarItems.map(item => `
                                            <div onclick="window.os.switchFinderCategory(this, '${item.cat}')" 
                                                 class="finder-sidebar-item flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${item.active ? 'active bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'hover:bg-white/5 text-theme-muted hover:text-white'}">
                                                <span class="text-sm opacity-80">${item.icon}</span>
                                                <span>${item.label}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>

                                <div class="finder-sidebar-section">
                                    <h3 class="px-3 text-[9px] font-bold text-theme-muted uppercase tracking-widest mb-3 opacity-50">${lang === 'bn' ? 'ট্যাগ' : 'Tags'}</h3>
                                    <div class="space-y-2 px-3">
                                        <div class="flex items-center gap-2 text-[10px] text-theme-muted hover:text-white transition-colors cursor-pointer group">
                                            <div class="w-2 h-2 rounded-full bg-red-500 group-hover:scale-110 transition-transform"></div> <span>Work</span>
                                        </div>
                                        <div class="flex items-center gap-2 text-[10px] text-theme-muted hover:text-white transition-colors cursor-pointer group">
                                            <div class="w-2 h-2 rounded-full bg-cyan-500 group-hover:scale-110 transition-transform"></div> <span>Projects</span>
                                        </div>
                                        <div class="flex items-center gap-2 text-[10px] text-theme-muted hover:text-white transition-colors cursor-pointer group" onclick="window.os.switchFinderCategory(this, 'all')">
                                            <div class="w-2 h-2 rounded-full bg-purple-500 group-hover:scale-110 transition-transform"></div> <span>Important</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="p-4 mt-auto">
                                <div class="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div class="flex items-center justify-between text-[8px] text-theme-muted uppercase mb-2">
                                        <span>iCloud Drive</span>
                                        <span>85%</span>
                                    </div>
                                    <div class="w-full h-1 bg-black/20 rounded-full overflow-hidden">
                                        <div class="w-[85%] h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.3)]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!--Main Explorer Area-->
        <div class="flex-1 flex flex-col min-w-0">
            <!-- Toolbar -->
            <div class="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/5 backdrop-blur-md">
                <div class="flex items-center gap-6">
                    <div class="flex items-center gap-2">
                        <button class="p-1.5 hover:bg-white/5 rounded-lg opacity-40 hover:opacity-100 transition-all text-xs active:scale-90">◀</button>
                        <button class="p-1.5 hover:bg-white/5 rounded-lg opacity-40 hover:opacity-100 transition-all text-xs active:scale-90">▶</button>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-bold font-mono">
                        <span class="text-theme-muted opacity-40">S:</span>
                        <span class="opacity-20">/</span>
                        <span class="text-theme-muted opacity-40">documents</span>
                        <span class="opacity-20">/</span>
                        <span class="text-cyan-400 finder-breadcrumb">all</span>
                    </div>
                </div>

                <div class="flex items-center gap-1 bg-black/30 p-1 rounded-lg border border-white/5">
                    <button onclick="window.os.setFinderView(this, 'grid')" class="finder-view-btn active p-1.5 px-2.5 rounded-md bg-white/10 text-[10px] font-bold transition-all">Grid</button>
                    <button onclick="window.os.setFinderView(this, 'list')" class="finder-view-btn p-1.5 px-2.5 rounded-md text-[10px] text-theme-muted hover:text-white transition-all">List</button>
                </div>
            </div>

            <!-- File Grid/List -->
            <div class="flex-1 p-6 overflow-y-auto scrollbar-thin finder-content-area shadow-inner">
                <div id="finder-file-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 content-start transition-all duration-300">
                    ${filesHtml}
                </div>
            </div>

            <!-- Footer / Status Bar -->
            <div class="h-8 border-t border-white/5 bg-black/20 flex items-center justify-between px-5 text-[9px] text-theme-muted uppercase tracking-widest font-mono">
                <span class="finder-status-text">${files.length} items, 15.6 MB total</span>
                <div class="flex items-center gap-3">
                    <span class="text-green-500 animate-pulse">• Secure Drive</span>
                    <span class="opacity-40">Syncing...</span>
                </div>
            </div>
        </div>
                    </div>
        `;
            }
        },

        {
            id: 'research',
            title: lang === 'bn' ? 'গবেষণা' : 'Research',
            icon: '🔬',
            width: 700,
            height: 500,
            render: () => {
                return `
        <div class="h-full flex flex-col items-center justify-center bg-black/50 text-center p-8">
                        <div class="text-6xl mb-6 animate-pulse filter drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">🔬</div>
                        <h2 class="text-2xl font-bold text-white mb-2">${lang === 'bn' ? 'গবেষণা ও প্রকাশনা' : 'Research & Publications'}</h2>
                        <p class="text-theme-muted text-sm max-w-md">
                            ${lang === 'bn' ? 'আমার সাম্প্রতিক গবেষণার কাজগুলো এখানে খুব শীঘ্রই যুক্ত করা হবে।' : 'My recent research work and publications will be added here soon.'}
                        </p>
                    </div>
        `;
            }
        }
    ];

    return apps.find(a => a.id === id);
}

// Export function to get all apps (needed for Dock)
export function getApps() {
    const lang = window.os ? window.os.currentLang : 'en';

    return [
        {
            id: 'voice-assistant',
            title: lang === 'bn' ? 'ভয়েস এআই' : 'Voice AI',
            icon: '🎙️'
        },
        {
            id: 'ai-assistant',
            title: lang === 'bn' ? 'সোহান.এআই' : 'Sohan.AI',
            icon: '🤖'
        },
        { id: 'about', title: lang === 'bn' ? 'আমার সম্পর্কে' : 'About Myself', icon: '👨‍💻' },
        { id: 'education', title: lang === 'bn' ? 'শিক্ষা' : 'Education', icon: '🎓' },
        { id: 'skills', title: lang === 'bn' ? 'দক্ষতা' : 'Skills', icon: '🧠' },
        { id: 'projects', title: lang === 'bn' ? 'প্রজেক্ট' : 'Projects', icon: '🚀' },
        { id: 'research', title: lang === 'bn' ? 'গবেষণা' : 'Research', icon: '🔬' },
        { id: 'achievements', title: lang === 'bn' ? 'কৃতিত্ব' : 'Achievements', icon: '🏆' },
        { id: 'experience', title: lang === 'bn' ? 'অভিজ্ঞতা' : 'Experience', icon: '💼' },
        { id: 'certifications', title: lang === 'bn' ? 'সার্টিফিকেশন' : 'Certifications', icon: '📜' },
        { id: 'resume', title: lang === 'bn' ? 'রিজিউম' : 'Resume.pdf', icon: '📄' },
        { id: 'hobby', title: lang === 'bn' ? 'শখ' : 'Hobbies', icon: '🎨' },
        { id: 'terminal', title: lang === 'bn' ? 'টার্মিনাল' : 'Terminal', icon: '💻' },
        { id: 'contact', title: lang === 'bn' ? 'যোগাযোগ' : 'Contact', icon: '✉️' },
        { id: 'explorer', title: lang === 'bn' ? 'ফাইল' : 'Files', icon: '📁' }
    ];
}
