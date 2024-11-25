const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Store active particles for animation
let activeParticles = [];

// Fireworks with fade-out effect
function createFireworks(x, y) {
    const particles = [];
    for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 * i) / 50;
        const speed = Math.random() * 5 + 2;
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
        });
    }

    const textParticle = {
        x: x,
        y: y - 50, // Adjust to move above the button
        text: "R+I❤️",
        alpha: 1,
    };

    activeParticles.push({ particles, textParticle });
}

// Animation loop for fireworks
function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    activeParticles.forEach((firework, index) => {
        const { particles, textParticle } = firework;

        // Draw particles
        particles.forEach((p) => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.02;
        });

        // Draw text
        if (textParticle.alpha > 0) {
            ctx.globalAlpha = textParticle.alpha;
            ctx.fillStyle = "white";
            ctx.font = "50px 'Comic Sans MS'";
            ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
            ctx.shadowBlur = 20;
            ctx.fillText(textParticle.text, textParticle.x - 30, textParticle.y);
            textParticle.alpha -= 0.01;
        }

        // Remove particles and text once fully faded
        firework.particles = particles.filter((p) => p.alpha > 0);
        if (firework.particles.length === 0 && textParticle.alpha <= 0) {
            activeParticles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateFireworks);
}
animateFireworks();

// Floating hearts that follow the mouse
function spawnHearts() {
    const heartsContainer = document.getElementById("hearts");

    for (let i = 0; i < 10; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerText = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = Math.random() * 100 + "vh";

        // Hearts follow the mouse
        heart.addEventListener("mousemove", (event) => {
            const rect = heart.getBoundingClientRect();
            const dx = event.clientX - (rect.left + rect.width / 2);
            const dy = event.clientY - (rect.top + rect.height / 2);
            const distance = Math.sqrt(dx ** 2 + dy ** 2);

            // Move heart toward the mouse if close
            if (distance < 200) {
                heart.style.transform = `translate(${dx / 10}px, ${dy / 10}px)`;
            }
        });

        heartsContainer.appendChild(heart);

        // Floating animation
        heart.style.animationDuration = `${Math.random() * 3 + 3}s`;
        setTimeout(() => heart.remove(), 8000); // Remove after 8 seconds
    }
}

// Button Click Event
document.getElementById("heart-button").addEventListener("click", (e) => {
    // Fireworks at the button's position
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    createFireworks(x, y);

    // Spawn floating hearts
    spawnHearts();
});

// Resize canvas on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
