import { OSManager } from './os-manager.js';
import { AIBrain } from './ai-brain.js';
import * as THREE from 'three';

console.log("SohanOS Booting...");

// Initialize Systems
window.ai = new AIBrain();
window.os = new OSManager();

// --- 3D Background (Simplified for OS feel) ---
// --- 3D Background (Simplified for OS feel) ---
const canvas = document.querySelector('#bg-canvas');
let particlesMaterial;
let scene;

if (canvas) {
    scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        premultipliedAlpha: false
    });
    renderer.setClearAlpha(0);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 30;

    // Particles representing "Data"
    const geometry = new THREE.BufferGeometry();
    const count = 1000;
    const posArray = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    window.particlesMaterial = particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x22d3ee, // Default Cyan
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(geometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation Line
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    const animate = () => {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.001;

        // Interactive tilt
        particlesMesh.rotation.y += mouseX * 0.05;
        particlesMesh.rotation.x += mouseY * 0.05;

        renderer.render(scene, camera);
    };

    animate();

    // Wallpaper Logo Tilt Effect
    const logoContainer = document.getElementById('os-logo-container');
    window.addEventListener('mousemove', (e) => {
        if (!logoContainer) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        logoContainer.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Background Animation API
let matrixInterval = null;
window.currentAnimationColor = window.currentAnimationColor || "#22d3ee";

window.setOSAnimation = (type) => {
    console.log("OS: Background Animation ->", type);
    const canvas3d = document.querySelector('#bg-canvas');
    const existingMatrix = document.getElementById('matrix-canvas');

    // Cleanup Matrix
    if (existingMatrix) existingMatrix.remove();
    if (matrixInterval) {
        clearInterval(matrixInterval);
        matrixInterval = null;
    }

    // Handle Types
    if (type === 'none') {
        if (canvas3d) canvas3d.style.display = 'none';
    } else if (type === 'particles') {
        if (canvas3d) canvas3d.style.display = 'block';
        if (window.particlesMaterial) {
            window.particlesMaterial.size = 0.15;
            window.particlesMaterial.opacity = 0.8;
        }
    } else if (type === 'matrix') {
        if (canvas3d) canvas3d.style.display = 'none';
        initMatrixRain();
    } else if (type === 'sonic') {
        if (canvas3d) canvas3d.style.display = 'none';
        initSonicEffect();
    } else if (type === 'constellation') {
        if (canvas3d) canvas3d.style.display = 'none';
        initConstellationEffect();
    }
};

// Initial Animation Check
const savedAnimation = localStorage.getItem('os-animation') || 'particles';
if (savedAnimation !== 'particles') {
    setTimeout(() => window.setOSAnimation(savedAnimation), 100);
}



function initSonicEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.zIndex = '2'; // Above wallpaper (z-1) but below content
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.4';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let offset = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = window.currentAnimationColor;
        ctx.lineWidth = 2;

        const waves = 5;
        for (let n = 0; n < waves; n++) {
            ctx.beginPath();
            ctx.globalAlpha = (1 - (n / waves)) * 0.5;
            const amp = 50 + (n * 20);
            const freq = 0.005 + (n * 0.002);

            for (let x = 0; x < canvas.width; x++) {
                const y = canvas.height / 2 + Math.sin(x * freq + offset + (n * 0.5)) * amp;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        offset += 0.05;
        ctx.globalAlpha = 1;
    }
    matrixInterval = setInterval(draw, 1000 / 60);
}

function initConstellationEffect() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.zIndex = '2'; // Above wallpaper (z-1)
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 15000);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = window.currentAnimationColor;
        ctx.fillStyle = window.currentAnimationColor;
        ctx.lineWidth = 0.5;

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    ctx.globalAlpha = 1 - (dist / 150);
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
            ctx.globalAlpha = 1;
        }
    }
    matrixInterval = setInterval(draw, 1000 / 60);
}

function initMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '2'; // Above wallpaper (z-1)
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "SOHANFARDIN0101RUETENGINEER";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) drops[x] = 1;

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = window.currentAnimationColor; // Use global color
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
                drops[i] = 0;

            drops[i]++;
        }
    }

    matrixInterval = setInterval(draw, 33);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, { once: true });
}

// Background Theme API
window.updateBackgroundTheme = (themeName) => {
    let color = "#22d3ee"; // Default cosmic
    switch (themeName) {
        case 'sunset': color = "#fb923c"; break;
        case 'forest': color = "#4ade80"; break;
        case 'ocean': color = "#3b82f6"; break;
        case 'berry': color = "#ec4899"; break;
        case 'cosmic':
        default: color = "#22d3ee"; break;
    }
    window.setAnimationColor(color);
};

// Background Color API
window.setAnimationColor = (colorHex) => {
    console.log("OS: Animation Style ->", colorHex);
    window.currentAnimationColor = colorHex;

    // Update Global CSS Variable for background glow
    document.documentElement.style.setProperty('--glow-color', colorHex);

    // Auto-enable particles if animation is currently hidden or off
    const canvas3d = document.querySelector('#bg-canvas');
    const matrixCanvas = document.getElementById('matrix-canvas');
    if ((!canvas3d || canvas3d.style.display === 'none') && !matrixCanvas) {
        window.setOSAnimation('particles');
    }

    // Update Particles if they exist
    if (window.particlesMaterial) {
        window.particlesMaterial.color.set(new THREE.Color(colorHex));
        window.particlesMaterial.needsUpdate = true;
    }

    // Matrix color is picked up in next frame via window.currentAnimationColor
};
