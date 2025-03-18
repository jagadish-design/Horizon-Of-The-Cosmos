// Confetti Effect
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiParticles = [];

function ConfettiParticle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 2;
    this.speedY = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 3;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
}

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        confettiParticles.push(new ConfettiParticle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < confettiParticles.length; i++) {
        const p = confettiParticles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y > canvas.height) {
            p.y = 0;
            p.x = Math.random() * canvas.width;
        }
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(animateConfetti);
}

// Start Confetti Animation
createConfetti();
animateConfetti();
