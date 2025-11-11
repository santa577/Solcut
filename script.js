// === SOLCAT Website Script ===

// Particles Animation (auto move)
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(153, 69, 255, 0.6)';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });
  moveParticles();
  requestAnimationFrame(drawParticles);
}

function moveParticles() {
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
}

createParticles();
drawParticles();

// Fetch Live Price from GeckoTerminal
async function fetchPrice() {
  const res = await fetch('https://api.geckoterminal.com/api/v2/networks/solana/pools/2BQuidPwk81ZCSrDcZmPXjNdXUMMj74pjKV2ZqwoJhAe');
  const data = await res.json();
  const price = data?.data?.attributes?.base_token_price_usd;
  document.getElementById('price').textContent = price ? `$${parseFloat(price).toFixed(6)}` : 'N/A';
}
fetchPrice();
setInterval(fetchPrice, 30000);