
const apiBase = "https://warzonebackend-3il3.onrender.com";

let token = "";
let currentUser = null;

async function login(username, password) {
  const res = await fetch(apiBase + "/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (data.token) {
    token = data.token;
    currentUser = data.user;
    renderApp();
  } else {
    alert("เข้าสู่ระบบไม่สำเร็จ");
  }
}

function logout() {
  token = "";
  currentUser = null;
  renderLogin();
}

function renderLogin() {
  document.getElementById("root").innerHTML = `
    <div class="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">🔐 เข้าสู่ระบบ</h2>
      <input id="username" type="text" placeholder="ชื่อผู้ใช้" class="w-full px-3 py-2 rounded-xl text-black mb-2"/>
      <input id="password" type="password" placeholder="รหัสผ่าน" class="w-full px-3 py-2 rounded-xl text-black mb-4"/>
      <button onclick="handleLogin()" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl w-full">เข้าสู่ระบบ</button>
    </div>
  `;
}

async function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  await login(username, password);
}

function renderApp() {
  document.getElementById("root").innerHTML = `
    <div class="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
      <h2 class="text-2xl font-bold mb-4">🎁 สุ่มไอเท็ม</h2>
      <p class="mb-2">ยินดีต้อนรับ <b>${currentUser.username}</b></p>
      <button onclick="gacha()" class="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl w-full text-lg font-semibold mb-2">กดสุ่ม!</button>
      <button onclick="logout()" class="text-sm text-red-400 underline">ออกจากระบบ</button>
      <div id="result" class="mt-4 text-xl"></div>
    </div>
  `;
}

async function gacha() {
  const res = await fetch(apiBase + "/api/gacha", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  document.getElementById("result").innerHTML = `
    <img src="${data.image}" class="mx-auto mb-2 max-h-40 animate-bounce"/>
    คุณได้รับ: <b>${data.name}</b>
  `;
}

renderLogin();
