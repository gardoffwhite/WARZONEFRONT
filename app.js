const API = "https://warzonebackend-3il3.onrender.com";
let currentUser = null;
let token = "";
let isAdmin = false;

const loginBox = document.getElementById("loginBox");
const mainApp = document.getElementById("mainApp");
const adminPanel = document.getElementById("adminPanel");
const tokenCountEl = document.getElementById("tokenCount");
const gachaResultEl = document.getElementById("gachaResult");
const welcomeMsg = document.getElementById("welcomeMsg");

async function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (data.success) {
    token = data.token;
    currentUser = username;
    isAdmin = data.role === "admin";
    showInterface();
    loadToken();
    if (isAdmin) {
      loadAdmin();
    }
  } else {
    alert(data.message || "เข้าสู่ระบบล้มเหลว");
  }
}

function logout() {
  token = "";
  currentUser = null;
  isAdmin = false;
  loginBox.classList.remove("hidden");
  mainApp.classList.add("hidden");
  adminPanel.classList.add("hidden");
}

function showInterface() {
  loginBox.classList.add("hidden");
  if (isAdmin) {
    adminPanel.classList.remove("hidden");
  } else {
    mainApp.classList.remove("hidden");
    welcomeMsg.textContent = `ยินดีต้อนรับ, ${currentUser}`;
  }
}

async function loadToken() {
  const res = await fetch(`${API}/user-info`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  tokenCountEl.textContent = data.token;
}

async function rollGacha() {
  const characterName = document.getElementById("characterName").value;
  if (!characterName) return alert("กรุณาใส่ชื่อตัวละคร");

  const btn = document.getElementById("gachaButton");
  btn.disabled = true;
  btn.textContent = "กำลังสุ่ม...";

  const res = await fetch(`${API}/gacha`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ characterName }),
  });
  const data = await res.json();
  if (data.success) {
    tokenCountEl.textContent = data.remainingTokens;

    // สล็อตเลื่อนลงแบบง่าย
    gachaResultEl.innerHTML = `
      <div class="overflow-hidden h-32 relative bg-black rounded-lg border-2 border-purple-600">
        <div class="animate-slide-down text-center p-4">
          <img src="${data.item.image}" alt="${data.item.name}" class="mx-auto h-16 mb-1"/>
          <p class="font-bold text-xl text-yellow-400">${data.item.name}</p>
        </div>
      </div>
    `;
  } else {
    alert(data.message || "สุ่มล้มเหลว");
  }

  btn.disabled = false;
  btn.textContent = "กดสุ่ม!";
}

// ========== แอดมินฟีเจอร์ ==========

async function loadAdmin() {
  loadGachaLogs();
  loadItemRates();
}

async function loadGachaLogs() {
  const res = await fetch(`${API}/gacha-logs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  const logList = document.getElementById("logList");
  logList.innerHTML = "";
  data.logs.forEach((log) => {
    const li = document.createElement("li");
    li.textContent = `🎲 [${log.date}] ${log.username} (${log.characterName}) ได้รับ ${log.itemName}`;
    logList.appendChild(li);
  });
}

async function loadItemRates() {
  const res = await fetch(`${API}/item-rates`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  const container = document.getElementById("itemRates");
  container.innerHTML = "";
  data.items.forEach((item) => {
    const row = document.createElement("div");
    row.innerHTML = `
      <input type="text" value="${item.name}" disabled class="w-1/3 px-2 py-1 rounded text-black" />
      <input type="number" value="${item.rate}" data-id="${item.id}" class="w-1/4 px-2 py-1 rounded text-black rate-input" />
    `;
    container.appendChild(row);
  });
}

async function updateItemRates() {
  const inputs = document.querySelectorAll(".rate-input");
  const updates = Array.from(inputs).map((input) => ({
    id: input.dataset.id,
    rate: parseInt(input.value),
  }));
  const res = await fetch(`${API}/update-item-rates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ rates: updates }),
  });
  const data = await res.json();
  document.getElementById("itemRateMsg").textContent = data.message;
}

async function adjustToken() {
  const username = document.getElementById("manageUsername").value;
  const amount = parseInt(document.getElementById("manageAmount").value);
  const res = await fetch(`${API}/adjust-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, amount }),
  });
  const data = await res.json();
  document.getElementById("adjustTokenMsg").textContent = data.message;
}
