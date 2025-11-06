// Tournament Data
const tournaments = [
  { name: "Squad Clash - Round 1", date: "10 Nov 2025", prize: "₹500" },
  { name: "Battle Royale Showdown", date: "15 Nov 2025", prize: "₹1000" },
  { name: "Elite Sniper Cup", date: "20 Nov 2025", prize: "₹1500" },
];

// Load tournaments dynamically
const list = document.getElementById("tournament-list");
tournaments.forEach(t => {
  const card = document.createElement("div");
  card.classList.add("tournament");
  card.innerHTML = `
    <h3>${t.name}</h3>
    <p>Date: ${t.date}</p>
    <p>Prize Pool: ${t.prize}</p>
    <button onclick="alert('Registration opens soon!')">Details</button>
  `;
  list.appendChild(card);
});

// Navigation
const sections = document.querySelectorAll(".section");
document.getElementById("home-btn").onclick = () => showSection("home");
document.getElementById("register-btn").onclick = () => showSection("register");
document.getElementById("leaderboard-btn").onclick = () => showSection("leaderboard");

function showSection(id) {
  sections.forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Registration
document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const team = document.getElementById("team-name").value;
  const leader = document.getElementById("leader-name").value;
  const members = document.getElementById("members").value;

  document.getElementById("register-message").textContent = 
    `✅ Team ${team} registered successfully! Leader: ${leader}, Players: ${members}`;
  
  e.target.reset();
});

// Leaderboard simulation
const leaderboardData = [
  { team: "Alpha Warriors", kills: 25, points: 120 },
  { team: "Noob Masters", kills: 20, points: 110 },
  { team: "Headshot Kings", kills: 15, points: 95 },
  { team: "Squad 007", kills: 10, points: 80 },
];

const tbody = document.getElementById("leaderboard-body");
function loadLeaderboard() {
  tbody.innerHTML = "";
  leaderboardData.sort((a, b) => b.points - a.points);
  leaderboardData.forEach((t, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${t.team}</td>
      <td>${t.kills}</td>
      <td>${t.points}</td>
    `;
    tbody.appendChild(row);
  });
}
loadLeaderboard();
// Payment modal logic (QR-based)
const payBtn = document.getElementById('pay-btn');
const payModal = document.getElementById('pay-modal');
const closePay = document.getElementById('close-pay');
const downloadQr = document.getElementById('download-qr');
const copyUpiBtn = document.getElementById('copy-upi');
const qrImage = document.getElementById('qr-image');

// Default UPI ID shown when copying.
// Updated to the value you provided.
const upiId = '9454881411@fam';

function openPayModal() {
  payModal.classList.remove('hidden');
  payModal.setAttribute('aria-hidden', 'false');
}

function closePayModal() {
  payModal.classList.add('hidden');
  payModal.setAttribute('aria-hidden', 'true');
}

payBtn && payBtn.addEventListener('click', openPayModal);
closePay && closePay.addEventListener('click', closePayModal);

// Close when clicking outside the content
payModal && payModal.addEventListener('click', (e) => {
  if (e.target === payModal) closePayModal();
});

// Copy UPI ID to clipboard
copyUpiBtn && copyUpiBtn.addEventListener('click', async () => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(upiId);
    } else {
      const ta = document.createElement('textarea');
      ta.value = upiId;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    alert('✅ UPI ID copied to clipboard: 9454881411@fam ' + upiId);
  } catch (err) {
    alert('Could not copy UPI ID automatically. Please copy it manually: ' + upiId);
  }
});

// If the QR image isn't present, show a friendly placeholder / note in the console
qrImage && qrImage.addEventListener('error', () => {
  console.warn('QR image not found at assets/qr.jpg. Using placeholder.');
  // fallback to SVG placeholder inside assets
  qrImage.src = 'assets/qr-placeholder.svg';
  downloadQr.href = 'assets/qr-placeholder.svg';
});

// show the UPI text inside the modal for visibility
const upiTextEl = document.getElementById('upi-text');
if (upiTextEl) upiTextEl.textContent = upiId;

// Customer care number (display + tel link)
const customerCare = '9453219874';
const customerCareModal = document.getElementById('customer-care-modal');
if (customerCareModal) {
  customerCareModal.textContent = customerCare;
  customerCareModal.href = `tel:${customerCare}`;
}
const customerCareFooter = document.getElementById('customer-care-footer');
if (customerCareFooter) {
  customerCareFooter.textContent = customerCare;
  customerCareFooter.href = `tel:${customerCare}`;
}

// Try to detect if a real QR image exists at assets/qr.jpg. If found, use it; otherwise keep placeholder.
async function ensureQr() {
  try {
    // Use HEAD request when supported; some servers may not allow HEAD, so fallback to GET
    let ok = false;
    try {
      const head = await fetch('assets/qr.jpg', { method: 'HEAD' });
      ok = head && head.ok;
    } catch (e) {
      // HEAD may fail on some static servers; try GET
      const get = await fetch('assets/qr.jpg', { method: 'GET' });
      ok = get && get.ok;
    }
    if (ok) {
      qrImage.src = 'assets/qr.jpg';
      downloadQr.href = 'assets/qr.jpg';
      console.info('Using assets/qr.jpg as QR image.');
    } else {
      // fallback will be handled by error handler
      console.info('assets/qr.jpg not found; using placeholder.');
    }
  } catch (err) {
    console.warn('Error checking assets/qr.jpg — using placeholder', err);
  }
}

// run check on load
ensureQr();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.querySelector('.main-nav');
navToggle && navToggle.addEventListener('click', () => {
  if (mainNav.style.display === 'flex') mainNav.style.display = '';
  else mainNav.style.display = 'flex';
});

// Toast helper
function showToast(message, duration = 3000) {
  let t = document.createElement('div');
  t.className = 'toast';
  t.textContent = message;
  document.body.appendChild(t);
  // trigger
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => { t.classList.remove('show'); setTimeout(()=>t.remove(),220); }, duration);
}

// Enhance registration: persist teams locally and show toast
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const team = document.getElementById('team-name').value.trim();
    const leader = document.getElementById('leader-name').value.trim();
    const members = document.getElementById('members').value.trim();
    if (!team || !leader || !members) { showToast('Please fill all registration fields'); return; }
    // save to localStorage
    const saved = JSON.parse(localStorage.getItem('teams') || '[]');
    saved.push({ team, leader, members, registeredAt: Date.now() });
    localStorage.setItem('teams', JSON.stringify(saved));
    document.getElementById('register-message').textContent = `✅ Team ${team} registered successfully!`;
    showToast(`Team ${team} registered`);
    e.target.reset();
    loadLeaderboard();
  });
}

// Allow tournament "Details" button to prefill registration and open register
document.addEventListener('click', (e) => {
  if (e.target.matches('.tournament button')) {
    // prefill team name with tournament name
    const card = e.target.closest('.tournament');
    const title = card ? card.querySelector('h3')?.textContent : '';
    if (title) document.getElementById('team-name').value = `${title} Squad`;
    showSection('register');
    showToast('Prefilled team name. Complete registration.');
  }
});
